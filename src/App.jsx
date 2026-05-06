import { startTransition, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './App.css'

const highlights = [
  {
    title: 'ออกแบบบอร์ดเกมและสื่อการเรียนรู้',
    body:
      'วางเว็บไซต์ให้สะท้อนบทบาทหลักของ WoL ในฐานะทีมที่ออกแบบประสบการณ์การเรียนรู้ผ่านการเล่นอย่างเป็นระบบ',
  },
  {
    title: 'เชื่อมการเล่นกับผลลัพธ์การเรียนรู้',
    body:
      'ใช้ภาษาที่พาให้เห็นว่าเกมไม่ใช่แค่กิจกรรมสนุก แต่เป็นเครื่องมือสื่อสาร ทดลอง และสะท้อนความคิดได้จริง',
  },
  {
    title: 'เล่าเรื่องแบบอบอุ่น ชัด และชวนลงมือ',
    body:
      'คุมโทนให้เป็นมิตร อ่านง่าย และไม่แข็งแบบองค์กร เพื่อให้ทั้งครู ทีมพัฒนา และพาร์ตเนอร์เข้าถึงได้',
  },
]

const featuredWork = [
  {
    title: 'Wishlist',
    tag: 'Financial Learning',
    body:
      'หยิบโครงการบอร์ดเกมการเงินที่ WoL ทำร่วมกับพาร์ตเนอร์มาเป็นตัวอย่างของการเรียนรู้ที่จับต้องได้และขยายผลได้จริง',
  },
  {
    title: 'Play & Learn',
    tag: 'Social Impact',
    body:
      'สื่อสารมุมที่ WoL ทำงานเชิงสังคมและการกระจายโอกาสการเรียนรู้ ผ่านโปรเจกต์ที่พาเกมไปถึงโรงเรียนและชุมชน',
  },
  {
    title: 'Podcast & Community',
    tag: 'Knowledge Sharing',
    body:
      'แสดงมิติของ WoL ที่ไม่ได้แค่ผลิตเกม แต่ยังแบ่งปันความรู้เรื่อง gamification, learning design และวัฒนธรรมการเล่น',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Frame the Gap',
    body: 'เริ่มจากปัญหาการเรียนรู้จริง ว่าอยากให้ผู้เล่นเข้าใจ รู้สึก หรือกล้าลองอะไรเพิ่มขึ้น',
  },
  {
    step: '02',
    title: 'Build the Adventure',
    body: 'แปลงโจทย์ให้เป็นประสบการณ์ที่ชวนเล่น มีอารมณ์ มีภารกิจ และทำให้คนอยากมีส่วนร่วม',
  },
  {
    step: '03',
    title: 'Shape the Mechanic',
    body: 'ออกแบบระบบการตัดสินใจ ฟีดแบ็ก และข้อจำกัดให้ความสนุกทำงานไปพร้อมกับการเรียนรู้',
  },
  {
    step: '04',
    title: 'Facilitate & Reflect',
    body: 'ปิดท้ายด้วยการใช้งานจริง เวิร์กช็อป และการสะท้อนผล เพื่อให้เกมพาไปสู่การเปลี่ยนแปลงที่วัดได้',
  },
]

const floatingPieces = [
  { label: 'Gap', className: 'piece piece-gap' },
  { label: 'Adventure', className: 'piece piece-adventure' },
  { label: 'Mechanic', className: 'piece piece-mechanic' },
  { label: 'Element', className: 'piece piece-element' },
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
          <span className="brand-mark">WoL</span>
          <span className="brand-copy">
            <strong>Wizards of Learning</strong>
            <small>playful learning studio</small>
          </span>
        </a>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="hero-kicker">เว็บไซต์ต้นแบบด้วย React 19 + Vite 8</p>
            <h1>เปลี่ยนการเรียนรู้ให้ขยับได้ เหมือนประสบการณ์การเล่นที่ดี</h1>
            <p className="hero-body">
              หน้าเว็บนี้ออกแบบจากข้อมูลสาธารณะของ Wizards of Learning และตีความผ่านกรอบ
              WoL เพื่อสื่อว่าเกมสามารถเป็นทั้งสื่อเรียนรู้ เครื่องมือสนทนา และจุดเริ่มต้นของการลงมือทำได้จริง
            </p>

            <div className="hero-actions">
              <a className="primary-action" href="#work">
                ดูตัวอย่างงาน
              </a>
              <a className="secondary-action" href="#process">
                วิธีคิดของ WoL
              </a>
            </div>

            <div className="hero-pillars" aria-label="Core themes">
              <span>Board Game Design</span>
              <span>Learning Experience</span>
              <span>Facilitation</span>
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
                <p>Design for how people learn</p>
                <strong>Playful systems that teach, reveal, and invite action.</strong>
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
                <span>WoL Flow</span>
                <ul>
                  <li>Gap</li>
                  <li>Adventure</li>
                  <li>Mechanic</li>
                  <li>Element</li>
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
          {highlights.map((item) => (
            <article key={item.title} className="insight-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <section className="content-section">
          <SectionTitle
            eyebrow="What This Website Is Saying"
            title="ภาพรวมที่ควรปรากฏบนเว็บของ WoL"
            body="ใช้การเล่าเรื่องที่ทำให้คนเห็น WoL เป็นทั้งทีมออกแบบเกม ทีมคิดการเรียนรู้ และผู้ประสานบทสนทนาที่ทำให้การเรียนรู้รู้สึกเป็นเรื่องชวนเข้าใกล้"
          />

          <div className="summary-grid">
            <article className="summary-panel">
              <p className="summary-label">Brand Reading</p>
              <h3>สดใส เป็นมิตร และไม่เด็กเกินไป</h3>
              <p>
                สีหลักยึดฟ้าและส้มของ WoL พร้อมพื้นหลังสว่างและพื้นที่หายใจเยอะ เพื่อให้เว็บดูเปิดรับคนเข้ามาสำรวจ ไม่กดดันเหมือนหน้าองค์กรแบบเดิม
              </p>
            </article>

            <article className="summary-panel">
              <p className="summary-label">Interaction Choice</p>
              <h3>3D motion แบบเบา เพื่อทำให้แนวคิด “การเล่น” รู้สึกจับต้องได้</h3>
              <p>
                ใช้ scene แบบ layered card, token และ die ที่ขยับตามเมาส์ แทนการใส่ three.js หนัก
                ๆ เพื่อให้ยังคงความลื่นและเหมาะกับ landing page
              </p>
            </article>
          </div>
        </section>

        <section className="content-section featured-section" id="work">
          <SectionTitle
            eyebrow="Featured Threads"
            title="ตัวอย่างสิ่งที่เว็บไซต์นี้สามารถหยิบมาเล่า"
            body="คัดหัวข้อจากข้อมูลสาธารณะที่สะท้อนทั้งงานเชิงพาณิชย์ งานเพื่อสังคม และการแบ่งปันองค์ความรู้ของ Wizards of Learning"
          />

          <div className="featured-grid">
            {featuredWork.map((item) => (
              <article key={item.title} className="feature-card">
                <p className="feature-tag">{item.tag}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section process-section" id="process">
          <SectionTitle
            eyebrow="Inspired by WoL Framework Thinking"
            title="แปลงกรอบคิด WoL ให้เป็นภาษาบนหน้าเว็บ"
            body="อ้างอิงวิธีคิดจากสกิล WoL ที่เน้นเริ่มจาก learning gap แล้วค่อยพาไปสู่ประสบการณ์ กลไก และผลลัพธ์ที่ผู้เล่นสะท้อนกลับได้"
          />

          <div className="process-grid">
            {processSteps.map((item) => (
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
              <p className="eyebrow">Next Move</p>
              <h2>พร้อมต่อยอดเป็นเว็บจริงได้ทันที</h2>
              <p className="section-copy">
                โปรเจกต์นี้ตั้งต้นด้วย Vite รุ่นล่าสุดในเครื่องของคุณ และวางโครงไว้สำหรับแตก
                component, เพิ่ม CMS, หรือเชื่อมฟอร์มติดต่อในขั้นถัดไป
              </p>
            </div>
            <div className="cta-meta">
              <span>Vite 8</span>
              <span>React 19</span>
              <span>Framer Motion</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
