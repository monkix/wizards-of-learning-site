import { startTransition, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './App.css'
import { siteContent } from './siteContent'

const floatingPieces = [
  { label: 'โจทย์', className: 'piece piece-gap' },
  { label: 'ประสบการณ์', className: 'piece piece-adventure' },
  { label: 'กลไก', className: 'piece piece-mechanic' },
  { label: 'การสะท้อน', className: 'piece piece-element' },
]

function SectionTitle({ eyebrow, title, body }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-copy">{body}</p>
    </div>
  )
}

function App() {
  const prefersReducedMotion = useReducedMotion()
  const [tilt, setTilt] = useState({ rotateX: -10, rotateY: 12 })

  const handleSceneMove = (event) => {
    if (prefersReducedMotion) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    startTransition(() => {
      setTilt({
        rotateX: (0.5 - y) * 18,
        rotateY: (x - 0.5) * 22,
      })
    })
  }

  const resetScene = () => {
    startTransition(() => {
      setTilt({ rotateX: -10, rotateY: 12 })
    })
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">
            <img src={siteContent.brand.logo} alt="Wizards of Learning logo" />
          </span>
          <span className="brand-copy">
            <strong>{siteContent.brand.title}</strong>
            <small>{siteContent.brand.subtitle}</small>
          </span>
        </a>
        <nav className="nav">
          {siteContent.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="hero-kicker">{siteContent.hero.kicker}</p>
            <h1>{siteContent.hero.title}</h1>
            <p className="hero-body">{siteContent.hero.body}</p>

            <div className="hero-actions">
              <a className="primary-action" href={siteContent.hero.primaryAction.href}>
                {siteContent.hero.primaryAction.label}
              </a>
              <a className="secondary-action" href={siteContent.hero.secondaryAction.href}>
                {siteContent.hero.secondaryAction.label}
              </a>
            </div>

            <div className="hero-pillars" aria-label="Core themes">
              {siteContent.hero.pillars.map((pillar) => (
                <span key={pillar}>{pillar}</span>
              ))}
            </div>

            <div className="hero-trust-grid">
              {siteContent.hero.trustSignals.map((signal) => (
                <article key={signal.title} className="hero-trust-card">
                  <h3>{signal.title}</h3>
                  <p>{signal.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div
            className="scene-wrap"
            onMouseMove={handleSceneMove}
            onMouseLeave={resetScene}
          >
            <motion.div
              className="scene"
              animate={prefersReducedMotion ? { rotateX: -6, rotateY: 8 } : tilt}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            >
              <div className="scene-glow scene-glow-blue" />
              <div className="scene-glow scene-glow-orange" />
              <div className="scene-floor" />

              <motion.div
                className="scene-card scene-card-main"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -10, 0], rotateZ: [-2, 2, -2] }
                }
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p>การเรียนรู้ที่ออกแบบมาอย่างตั้งใจ</p>
                <strong>ทั้งสนุก ชัดเจน และพร้อมใช้งานในบริบทจริงขององค์กร</strong>
              </motion.div>

              <motion.div
                className="scene-card scene-card-side"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, 12, 0], rotateZ: [3, -1, 3] }
                }
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span>แนวทาง WoL</span>
                <ul>
                  <li>ตั้งโจทย์</li>
                  <li>ออกแบบประสบการณ์</li>
                  <li>วางกลไกการเรียนรู้</li>
                  <li>ชวนสะท้อนและต่อยอด</li>
                </ul>
              </motion.div>

              {floatingPieces.map((piece, index) => (
                <motion.div
                  key={piece.label}
                  className={piece.className}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: [0, index % 2 === 0 ? -14 : 14, 0],
                          x: [0, index % 2 === 0 ? 8 : -8, 0],
                          rotateZ: [0, index % 2 === 0 ? 6 : -6, 0],
                        }
                  }
                  transition={{
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {piece.label}
                </motion.div>
              ))}

              <motion.div
                className="token token-star"
                animate={prefersReducedMotion ? undefined : { rotate: [0, 12, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="token token-die"
                animate={
                  prefersReducedMotion ? undefined : { y: [0, -16, 0], rotate: [8, -8, 8] }
                }
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="token token-chip"
                animate={prefersReducedMotion ? undefined : { x: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </section>

        <section className="insight-strip" id="about">
          {siteContent.highlights.map((item) => (
            <article key={item.title} className="insight-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <section className="content-section">
          <SectionTitle
            eyebrow={siteContent.summary.eyebrow}
            title={siteContent.summary.title}
            body={siteContent.summary.body}
          />

          <div className="summary-grid">
            {siteContent.summary.panels.map((panel) => (
              <article key={panel.title} className="summary-panel">
                <p className="summary-label">{panel.label}</p>
                <h3>{panel.title}</h3>
                <p>{panel.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section partners-section">
          <SectionTitle
            eyebrow={siteContent.partnersSection.eyebrow}
            title={siteContent.partnersSection.title}
            body={siteContent.partnersSection.body}
          />

          <div className="partner-wall" aria-label="Organizations WoL has worked with">
            {siteContent.partnersSection.items.map((partner) => (
              <article key={partner.name} className="partner-logo-card">
                <img src={partner.logo} alt={partner.name} loading="lazy" />
              </article>
            ))}
          </div>
        </section>

        <section className="content-section featured-section" id="work">
          <SectionTitle
            eyebrow={siteContent.featuredSection.eyebrow}
            title={siteContent.featuredSection.title}
            body={siteContent.featuredSection.body}
          />

          <div className="featured-grid">
            {siteContent.featuredSection.items.map((item) => (
              <article key={item.title} className="feature-card">
                <p className="feature-tag">{item.tag}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section case-studies-section">
          <SectionTitle
            eyebrow={siteContent.caseStudiesSection.eyebrow}
            title={siteContent.caseStudiesSection.title}
            body={siteContent.caseStudiesSection.body}
          />

          <div className="case-study-grid">
            {siteContent.caseStudiesSection.items.map((item) => (
              <article key={`${item.year}-${item.title}`} className="case-study-card">
                <div className="case-study-meta">
                  <span>{item.year}</span>
                  <span>{item.type}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="case-study-client">ลูกค้า: {item.client}</p>
                <p>{item.summary}</p>
                <p className="case-study-outcome">{item.outcome}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section proof-section">
          <SectionTitle
            eyebrow={siteContent.proofSection.eyebrow}
            title={siteContent.proofSection.title}
            body={siteContent.proofSection.body}
          />

          <div className="proof-grid">
            {siteContent.proofSection.items.map((item) => (
              <article key={item.sourceUrl} className="proof-card">
                <p className="summary-label">{item.sourceLabel}</p>
                <h3>{item.headline}</h3>
                <p>{item.summary}</p>
                <a className="proof-link" href={item.sourceUrl} target="_blank" rel="noreferrer">
                  ดูแหล่งอ้างอิง
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section process-section" id="process">
          <SectionTitle
            eyebrow={siteContent.processSection.eyebrow}
            title={siteContent.processSection.title}
            body={siteContent.processSection.body}
          />

          <div className="process-grid">
            {siteContent.processSection.items.map((item) => (
              <article key={item.step} className="process-card">
                <span className="process-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section" id="contact">
          <div className="cta-card">
            <div>
              <p className="eyebrow">{siteContent.cta.eyebrow}</p>
              <h2>{siteContent.cta.title}</h2>
              <p className="section-copy">{siteContent.cta.body}</p>
            </div>
            <div className="cta-meta">
              {siteContent.cta.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="cta-actions">
              <a className="primary-action" href={siteContent.cta.primaryAction.href}>
                {siteContent.cta.primaryAction.label}
              </a>
              <a className="secondary-action" href={siteContent.cta.secondaryAction.href}>
                {siteContent.cta.secondaryAction.label}
              </a>
            </div>
          </div>

          <div className="contact-panel">
            <SectionTitle
              eyebrow={siteContent.contactSection.eyebrow}
              title={siteContent.contactSection.title}
              body={siteContent.contactSection.body}
            />

            <div className="contact-grid">
              {siteContent.contactSection.items.map((item) => (
                <a key={item.label} className="contact-card" href={item.href}>
                  <p className="summary-label">{item.label}</p>
                  <strong>{item.value}</strong>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
