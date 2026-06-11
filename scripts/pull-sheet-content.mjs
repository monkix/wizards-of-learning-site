import dotenv from 'dotenv'
import { writeFile } from 'node:fs/promises'

dotenv.config({ path: new URL('../.env.local', import.meta.url) })
dotenv.config()

const sheetUrl = process.env.GOOGLE_SHEET_CSV_URL

if (!sheetUrl) {
  console.error('Missing required environment variable: GOOGLE_SHEET_CSV_URL')
  process.exit(1)
}

function parseCsvLine(line) {
  const values = []
  let current = ''
  let inQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]
    const nextCharacter = line[index + 1]

    if (character === '"' && inQuotes && nextCharacter === '"') {
      current += '"'
      index += 1
      continue
    }

    if (character === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (character === ',' && !inQuotes) {
      values.push(current)
      current = ''
      continue
    }

    current += character
  }

  values.push(current)
  return values.map((value) => value.trim())
}

function parseCsv(csvText) {
  const lines = csvText
    .replace(/\r\n/g, '\n')
    .split('\n')
    .filter((line) => line.trim().length > 0)

  if (lines.length < 2) {
    throw new Error('Google Sheet CSV does not contain enough rows.')
  }

  const headers = parseCsvLine(lines[0])
  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line)
    return headers.reduce((row, header, index) => {
      row[header] = cells[index] ?? ''
      return row
    }, {})
  })
}

function requireValue(record, fieldName, context) {
  const value = record[fieldName]?.trim()

  if (!value) {
    throw new Error(`Missing "${fieldName}" in ${context}`)
  }

  return value
}

function filterBySection(rows, sectionName) {
  return rows.filter((row) => row.section === sectionName)
}

function singleMap(rows, sectionName) {
  return filterBySection(rows, sectionName).reduce((acc, row, index) => {
    const key = requireValue(row, 'key', `${sectionName} row ${index + 1}`)
    const value = requireValue(row, 'value', `${sectionName} row ${index + 1}`)
    acc[key] = value
    return acc
  }, {})
}

function orderedItems(rows, sectionName, requiredFields) {
  const grouped = new Map()

  for (const row of filterBySection(rows, sectionName)) {
    const item = requireValue(row, 'item', `${sectionName} row`)
    const field = requireValue(row, 'key', `${sectionName} row`)
    const value = requireValue(row, 'value', `${sectionName} row`)

    if (!grouped.has(item)) grouped.set(item, {})
    grouped.get(item)[field] = value
  }

  return [...grouped.entries()]
    .sort(([left], [right]) => Number(left) - Number(right))
    .map(([item, values]) => {
      for (const field of requiredFields) {
        if (!values[field]) {
          throw new Error(`Missing "${field}" in ${sectionName} item ${item}`)
        }
      }

      return values
    })
}

function pipeList(value = '') {
  return value
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)
}

function buildContent(rows) {
  const meta = singleMap(rows, 'meta')
  const hero = singleMap(rows, 'hero')
  const summary = singleMap(rows, 'summary')
  const cta = singleMap(rows, 'cta')

  return {
    brand: {
      title: meta.brandTitle ?? 'Wizards of Learning',
      subtitle: meta.brandSubtitle ?? 'playful learning studio',
    },
    nav: [
      { label: meta.navAbout ?? 'About', href: '#about' },
      { label: meta.navWork ?? 'Work', href: '#work' },
      { label: meta.navProcess ?? 'Process', href: '#process' },
      { label: meta.navContact ?? 'Contact', href: '#contact' },
    ],
    hero: {
      kicker: requireValue(hero, 'kicker', 'hero'),
      title: requireValue(hero, 'title', 'hero'),
      body: requireValue(hero, 'body', 'hero'),
      primaryAction: {
        label: requireValue(hero, 'primaryActionLabel', 'hero'),
        href: hero.primaryActionHref || '#work',
      },
      secondaryAction: {
        label: requireValue(hero, 'secondaryActionLabel', 'hero'),
        href: hero.secondaryActionHref || '#process',
      },
      pillars: pipeList(requireValue(hero, 'pillars', 'hero')),
    },
    highlights: orderedItems(rows, 'highlights', ['title', 'body']),
    summary: {
      eyebrow: requireValue(summary, 'eyebrow', 'summary'),
      title: requireValue(summary, 'title', 'summary'),
      body: requireValue(summary, 'body', 'summary'),
      panels: orderedItems(rows, 'summaryPanels', ['label', 'title', 'body']),
    },
    featuredSection: {
      eyebrow: summary.featuredEyebrow ?? 'Featured Threads',
      title: summary.featuredTitle ?? 'ตัวอย่างสิ่งที่เว็บไซต์นี้สามารถหยิบมาเล่า',
      body:
        summary.featuredBody ??
        'คัดหัวข้อจากข้อมูลสาธารณะที่สะท้อนทั้งงานเชิงพาณิชย์ งานเพื่อสังคม และการแบ่งปันองค์ความรู้ของ Wizards of Learning',
      items: orderedItems(rows, 'featuredItems', ['tag', 'title', 'body']),
    },
    processSection: {
      eyebrow: summary.processEyebrow ?? 'Inspired by WoL Framework Thinking',
      title: summary.processTitle ?? 'แปลงกรอบคิด WoL ให้เป็นภาษาบนหน้าเว็บ',
      body:
        summary.processBody ??
        'อ้างอิงวิธีคิดจากสกิล WoL ที่เน้นเริ่มจาก learning gap แล้วค่อยพาไปสู่ประสบการณ์ กลไก และผลลัพธ์ที่ผู้เล่นสะท้อนกลับได้',
      items: orderedItems(rows, 'processItems', ['step', 'title', 'body']),
    },
    cta: {
      eyebrow: requireValue(cta, 'eyebrow', 'cta'),
      title: requireValue(cta, 'title', 'cta'),
      body: requireValue(cta, 'body', 'cta'),
      tags: pipeList(requireValue(cta, 'tags', 'cta')),
    },
  }
}

function serializeSiteContent(content) {
  return `export const siteContent = ${JSON.stringify(content, null, 2)}\n`
}

async function main() {
  const response = await fetch(sheetUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch Google Sheet CSV: ${response.status} ${response.statusText}`)
  }

  const csvText = await response.text()
  const rows = parseCsv(csvText)
  const content = buildContent(rows)

  await writeFile(new URL('../src/siteContent.js', import.meta.url), serializeSiteContent(content))

  console.log('Updated src/siteContent.js from Google Sheet successfully.')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
