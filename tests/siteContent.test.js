import test from 'node:test'
import assert from 'node:assert/strict'
import { siteContent } from '../src/siteContent.js'

test('hero copy presents WoL as a credible learning partner', () => {
  assert.match(siteContent.hero.body, /องค์กร|หน่วยงาน|ทีม/)
  assert.doesNotMatch(siteContent.hero.body, /ข้อมูลสาธารณะ|ตีความผ่านกรอบ|prototype/i)
})

test('navigation and section labels stay Thai-first', () => {
  for (const item of siteContent.nav) {
    assert.match(item.label, /[\u0E00-\u0E7F]/)
  }

  assert.match(siteContent.summary.eyebrow, /[\u0E00-\u0E7F]/)
  assert.match(siteContent.featuredSection.eyebrow, /[\u0E00-\u0E7F]/)
  assert.match(siteContent.processSection.eyebrow, /[\u0E00-\u0E7F]/)
  assert.match(siteContent.cta.eyebrow, /[\u0E00-\u0E7F]/)
})

test('cta focuses on client action instead of implementation tech', () => {
  assert.doesNotMatch(siteContent.cta.body, /Vite|React|Framer Motion/i)
  assert.ok(
    siteContent.cta.tags.some((tag) => /คุย|ออกแบบ|เวิร์กช็อป|โครงการ/.test(tag)),
  )
})

test('partners section lists recognized organizations', () => {
  assert.ok(siteContent.partnersSection.items.length >= 12)
  assert.ok(siteContent.partnersSection.items.every((item) => item.name && item.logo))
  assert.ok(siteContent.partnersSection.items.every((item) => !item.logo.startsWith('/')))
  assert.ok(siteContent.partnersSection.items.some((item) => item.name === 'UNICEF'))
  assert.ok(siteContent.partnersSection.items.some((item) => item.name === 'สสส.'))
  assert.ok(siteContent.partnersSection.items.some((item) => item.name === 'SEA Thailand'))
})

test('case studies are concrete and tied to real clients', () => {
  assert.ok(siteContent.caseStudiesSection.items.length >= 4)

  for (const item of siteContent.caseStudiesSection.items) {
    assert.ok(item.client)
    assert.ok(item.outcome)
    assert.match(item.year, /^\d{4}$/)
  }
})

test('contact section includes real WoL channels', () => {
  assert.equal(siteContent.contactSection.email, 'contact@wizardsoflearning.com')
  assert.equal(siteContent.contactSection.phone, '0841401212')
  assert.match(siteContent.contactSection.linktree, /^https:\/\/linktr\.ee\//)
})

test('brand uses the provided WoL logo asset', () => {
  assert.equal(siteContent.brand.logo, 'brand/wol-logo.png')
})

test('public proof section cites attributable external sources', () => {
  assert.ok(siteContent.proofSection.items.length >= 3)

  for (const item of siteContent.proofSection.items) {
    assert.ok(item.sourceLabel)
    assert.match(item.sourceUrl, /^https?:\/\//)
    assert.ok(item.summary)
  }
})
