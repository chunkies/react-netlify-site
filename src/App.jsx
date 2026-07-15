import { useCallback, useEffect, useRef, useState } from 'react'
import {
  aboutFrame,
  featuredPortfolioItems,
  heroFrame,
  mobileHeroFrame,
  openingFrames,
  portfolioItems,
} from './portfolioData'
import './App.css'

const disciplines = ['Street', 'Portrait', 'Documentary', 'Colour']

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h13M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function usePortfolioMotion() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const hero = document.querySelector('.hero')
    const revealElements = document.querySelectorAll('[data-reveal]')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactViewport = window.matchMedia('(max-width: 760px)')
    let scrollFrame = 0

    root.classList.add('motion-enabled')

    const revealImmediately = reduceMotion.matches
    let observer

    if (revealImmediately) {
      revealElements.forEach((element) => element.classList.add('is-visible'))
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          })
        },
        {
          rootMargin: '0px 0px -10% 0px',
          threshold: 0.12,
        },
      )

      revealElements.forEach((element) => observer.observe(element))
    }

    const updateScrollMotion = () => {
      const scrollTop = window.scrollY
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollRange > 0 ? Math.min(scrollTop / scrollRange, 1) : 0

      root.style.setProperty('--scroll-progress', progress.toFixed(4))

      if (hero && !reduceMotion.matches && !compactViewport.matches) {
        const heroProgress = Math.min(scrollTop / Math.max(hero.offsetHeight, 1), 1)
        hero.style.setProperty('--hero-parallax', `${(heroProgress * 48).toFixed(2)}px`)
      }

      scrollFrame = 0
    }

    const requestScrollUpdate = () => {
      if (scrollFrame) return
      scrollFrame = window.requestAnimationFrame(updateScrollMotion)
    }

    const readyFrame = window.requestAnimationFrame(() => {
      setIsReady(true)
      updateScrollMotion()
    })

    window.addEventListener('scroll', requestScrollUpdate, { passive: true })
    window.addEventListener('resize', requestScrollUpdate)

    return () => {
      window.cancelAnimationFrame(readyFrame)
      window.cancelAnimationFrame(scrollFrame)
      window.removeEventListener('scroll', requestScrollUpdate)
      window.removeEventListener('resize', requestScrollUpdate)
      observer?.disconnect()
      root.classList.remove('motion-enabled')
      root.style.removeProperty('--scroll-progress')
      hero?.style.removeProperty('--hero-parallax')
    }
  }, [])

  return isReady
}

function OpeningSequence({ onComplete }) {
  return (
    <div
      className="opening-sequence"
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) onComplete()
      }}
    >
      <div className="opening-sequence-brand">
        <span>Jean Ruiu</span>
        <span>Melbourne · Photography</span>
      </div>
      <div className="opening-panels">
        {openingFrames.map((frame, index) => (
          <figure className={`opening-panel opening-panel-${index + 1}`} key={frame.slug}>
            <img
              src={frame.displayImage}
              alt=""
              width={frame.orientation === 'portrait' ? '933' : '1400'}
              height={frame.orientation === 'portrait' ? '1400' : '933'}
              fetchPriority="high"
            />
            <figcaption>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {frame.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

function GalleryModal({ activeIndex, items, onClose, onNext, onPrevious, onSelect }) {
  const [isIndexOpen, setIsIndexOpen] = useState(false)
  const closeButtonRef = useRef(null)
  const indexButtonRef = useRef(null)
  const activeThumbnailRef = useRef(null)
  const touchStartX = useRef(null)
  const activeItem = items[activeIndex]

  useEffect(() => {
    const previousActiveElement = document.activeElement
    const siteShell = document.querySelector('.site-shell')
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    siteShell?.setAttribute('inert', '')
    siteShell?.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = 'hidden'

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
      siteShell?.removeAttribute('inert')
      siteShell?.removeAttribute('aria-hidden')
      previousActiveElement?.focus()
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()

        if (isIndexOpen) {
          setIsIndexOpen(false)
          window.requestAnimationFrame(() => indexButtonRef.current?.focus())
        } else {
          onClose()
        }
        return
      }

      if (event.key.toLowerCase() === 'i') {
        event.preventDefault()
        setIsIndexOpen((current) => !current)
        return
      }

      if (!isIndexOpen && event.key === 'ArrowRight') {
        event.preventDefault()
        onNext()
        return
      }

      if (!isIndexOpen && event.key === 'ArrowLeft') {
        event.preventDefault()
        onPrevious()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = Array.from(
        document.querySelectorAll('.gallery-modal button:not([disabled])'),
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements.at(-1)

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isIndexOpen, onClose, onNext, onPrevious])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const adjacentItems = [
      items[(activeIndex - 1 + items.length) % items.length],
      items[(activeIndex + 1) % items.length],
    ]

    activeThumbnailRef.current?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    })

    adjacentItems.forEach((item) => {
      const image = new Image()
      image.src = item.image
    })
  }, [activeIndex, items])

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const travel = touchEndX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(travel) < 55) return
    if (travel < 0) onNext()
    else onPrevious()
  }

  const selectFromIndex = (index) => {
    onSelect(index)
    setIsIndexOpen(false)
  }

  return (
    <div className="gallery-modal" role="dialog" aria-modal="true" aria-label="Full photography portfolio">
      <div className="gallery-topbar">
        <p>
          Full portfolio
          <span>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        </p>
        <div className="gallery-topbar-actions">
          <button
            className="gallery-index-toggle"
            type="button"
            onClick={() => setIsIndexOpen((current) => !current)}
            aria-expanded={isIndexOpen}
            ref={indexButtonRef}
          >
            {isIndexOpen ? 'View frame' : 'Index'} <span aria-hidden="true">⌘I</span>
          </button>
          <button className="gallery-close" type="button" onClick={onClose} ref={closeButtonRef}>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>

      {isIndexOpen ? (
        <section className="gallery-index" aria-labelledby="gallery-index-title">
          <header>
            <p>Complete archive</p>
            <h2 id="gallery-index-title">{items.length} photographs. One continuous index.</h2>
          </header>
          <div className="gallery-index-grid">
            {items.map((item, index) => (
              <button
                className={`${index === activeIndex ? 'is-active' : ''}${item.orientation === 'portrait' ? ' is-portrait' : ''}`.trim()}
                type="button"
                onClick={() => selectFromIndex(index)}
                aria-label={`View frame ${item.id}: ${item.alt}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                key={item.slug}
              >
                <img src={item.thumbnail} alt="" loading="lazy" decoding="async" />
                <span>{item.id}</span>
                <small>{item.category}</small>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <>
          <div
            className="gallery-stage"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button className="gallery-arrow gallery-arrow-previous" type="button" onClick={onPrevious}>
              <ArrowIcon />
              <span className="screen-reader-only">Previous photograph</span>
            </button>

            <figure className={`gallery-figure gallery-figure-${activeItem.orientation}`} key={activeItem.image}>
              <div className="gallery-image-frame">
                <img src={activeItem.image} alt={activeItem.alt} decoding="async" fetchPriority="high" />
              </div>
              <figcaption>
                <span>{activeItem.category}</span>
                <p>{activeItem.location}</p>
              </figcaption>
            </figure>

            <button className="gallery-arrow gallery-arrow-next" type="button" onClick={onNext}>
              <ArrowIcon />
              <span className="screen-reader-only">Next photograph</span>
            </button>
          </div>

          <div className="gallery-filmstrip-wrap">
            <nav className="gallery-filmstrip" aria-label="Choose a photograph">
              {items.map((item, index) => (
                <button
                  className={`${index === activeIndex ? 'is-active' : ''}${item.orientation === 'portrait' ? ' is-portrait' : ''}`.trim()}
                  type="button"
                  onClick={() => onSelect(index)}
                  aria-label={`View frame ${item.id}: ${item.alt}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  ref={index === activeIndex ? activeThumbnailRef : null}
                  key={item.slug}
                >
                  <img src={item.thumbnail} alt="" loading="lazy" decoding="async" />
                  <span>{item.id}</span>
                </button>
              ))}
            </nav>
            <p>Arrow keys · Swipe · I for index · Esc to close</p>
          </div>
        </>
      )}

      <p className="screen-reader-only" aria-live="polite">
        Showing frame {activeItem.id} of {items.length}: {activeItem.alt}
      </p>
    </div>
  )
}

function App() {
  const isReady = usePortfolioMotion()
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(null)
  const [showOpeningSequence, setShowOpeningSequence] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const openGallery = useCallback((index = 0) => setActiveGalleryIndex(index), [])
  const closeGallery = useCallback(() => setActiveGalleryIndex(null), [])
  const showNextImage = useCallback(() => {
    setActiveGalleryIndex((current) => (
      current === null ? 0 : (current + 1) % portfolioItems.length
    ))
  }, [])
  const showPreviousImage = useCallback(() => {
    setActiveGalleryIndex((current) => (
      current === null ? 0 : (current - 1 + portfolioItems.length) % portfolioItems.length
    ))
  }, [])
  const selectGalleryImage = useCallback((index) => setActiveGalleryIndex(index), [])

  return (
    <>
      <div className={`site-shell${isReady ? ' is-ready' : ''}${showOpeningSequence ? ' is-opening' : ''}`}>
        <div className="scroll-progress" aria-hidden="true" />

        <header className="site-header page-width">
          <a className="identity" href="#contact-email" aria-label="Go to Jean Ruiu's contact details">
            <span className="identity-mark" aria-hidden="true">JR</span>
            <span className="identity-copy">
              <strong>Jean Ruiu</strong>
              <small>Photography</small>
            </span>
          </a>

          <nav aria-label="Primary navigation">
            <a href="#work">Portfolio</a>
            <a href="#about">About</a>
            <a className="nav-cta" href="#contact">Enquire</a>
          </nav>
        </header>

        <main id="top">
          <section className="hero" aria-labelledby="hero-title">
            <picture className="hero-media">
              <source media="(max-width: 760px)" srcSet={mobileHeroFrame.image} />
              <img
                className="hero-image"
                src={heroFrame.image}
                alt="A night street portrait in Melbourne"
                width="2400"
                height="1600"
                fetchPriority="high"
              />
            </picture>
            <div className="hero-overlay" />

            {showOpeningSequence && (
              <OpeningSequence onComplete={() => setShowOpeningSequence(false)} />
            )}

            <div className="hero-content page-width">
              <div className="hero-main">
                <p className="hero-kicker">Street &amp; documentary photography · Melbourne</p>
                <h1 id="hero-title" aria-label="The city never holds still.">
                  <span className="hero-title-line">
                    <span>The city</span>
                  </span>
                  <span className="hero-title-line">
                    <span><em>never</em> holds</span>
                  </span>
                  <span className="hero-title-line">
                    <span>still.</span>
                  </span>
                </h1>
                <p className="hero-lede">
                  Unscripted people, strange light, and the split-seconds that make a place feel alive.
                </p>
                <a className="text-link text-link-light" href="#work">
                  Enter the work <ArrowIcon />
                </a>
              </div>

              <div className="hero-meta">
                <span>Selected works · {portfolioItems.length} frames</span>
                <span>Melbourne · Day into night</span>
              </div>
            </div>
          </section>

          <section className="intro page-width" aria-labelledby="intro-title">
            <p className="section-label" data-reveal="up">The work</p>
            <div className="intro-copy" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
              <h2 id="intro-title">
                The odd gestures, hard light, and human collisions that make a city impossible to stage.
              </h2>
              <p>
                Jean Ruiu photographs Melbourne as it moves: instinctive street portraits, graphic
                fragments, and the charged space between strangers after dark.
              </p>
            </div>
          </section>

          <section className="work-section page-width" id="work" aria-labelledby="work-title">
            <header className="section-heading" data-reveal="up">
              <div>
                <p className="section-label">Selected frames</p>
                <h2 id="work-title">A visual rhythm, not a highlight reel.</h2>
              </div>
              <div className="section-heading-aside">
                <p>
                  Ten photographs set the pace here. The complete archive is always one click away.
                </p>
                <button
                  className="gallery-launch"
                  type="button"
                  onClick={() => openGallery(0)}
                  aria-label={`Browse the full portfolio — ${portfolioItems.length} frames`}
                >
                  <span className="gallery-launch-copy">Browse full portfolio</span>
                  <span className="gallery-launch-meta">
                    <span>{portfolioItems.length} frames</span>
                    <ArrowIcon />
                  </span>
                </button>
              </div>
            </header>

            <div className="work-grid">
              {featuredPortfolioItems.map((item, index) => (
                <figure
                  className={`work-item work-item-${item.layout}${item.orientation === 'portrait' ? ' work-frame-portrait' : ''}`}
                  data-reveal="project"
                  key={item.slug}
                  style={{ '--reveal-delay': `${(index % 2) * 80}ms` }}
                >
                  <button
                    className="work-image-wrap"
                    type="button"
                    onClick={() => openGallery(item.galleryIndex)}
                    aria-label={`Open frame ${item.id} in the portfolio viewer: ${item.alt}`}
                  >
                    <img
                      src={item.displayImage}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      width={item.orientation === 'portrait' ? '933' : '1400'}
                      height={item.orientation === 'portrait' ? '1400' : '933'}
                      sizes="(max-width: 760px) 100vw, 56vw"
                    />
                    <span className="frame-mark">Frame {item.id}</span>
                    <span className="work-view-label">
                      View frame <ArrowIcon />
                    </span>
                  </button>
                  <figcaption>
                    <p>{item.category}</p>
                    <span>{item.location}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="archive-note" data-reveal="up">
              The complete portfolio contains {portfolioItems.length} photographs across gallery studies,
              colour, daytime street work, portraiture, and the city after dark.
            </p>
          </section>

          <section className="about-section" id="about" aria-labelledby="about-title">
            <div className="about-inner page-width">
              <figure className="about-image" data-reveal="image">
                <img
                  src={aboutFrame.displayImage}
                  alt={aboutFrame.alt}
                  loading="lazy"
                  decoding="async"
                  width="933"
                  height="1400"
                />
                <figcaption>Street portraits</figcaption>
              </figure>

              <div className="about-copy">
                <p className="section-label" data-reveal="up">Approach</p>
                <h2 id="about-title" data-reveal="up" style={{ '--reveal-delay': '70ms' }}>
                  Instinct first. The frame comes after.
                </h2>
                <div className="about-body" data-reveal="up" style={{ '--reveal-delay': '130ms' }}>
                  <p>
                    I photograph the moment before people arrange themselves—the gestures, glare,
                    colour, and collisions that make the street feel alive.
                  </p>
                  <p>
                    Based in Melbourne and available for portraits, events, editorial work, and
                    documentary commissions.
                  </p>
                </div>

                <ul
                  className="discipline-list"
                  aria-label="Photography disciplines"
                  data-reveal="list"
                  style={{ '--reveal-delay': '180ms' }}
                >
                  {disciplines.map((discipline, index) => (
                    <li key={discipline}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {discipline}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="contact-section page-width" id="contact" aria-labelledby="contact-title">
            <div className="contact-panel" data-reveal="up">
              <figure className="contact-headshot">
                <img
                  className="contact-headshot-image"
                  src="/images/jean-ruiu-headshot.webp"
                  alt="Jean Ruiu photographing his reflection in a layered, colourful window display"
                  loading="lazy"
                  decoding="async"
                  width="1252"
                  height="1248"
                />
                <figcaption>Jean Ruiu · Self-portrait</figcaption>
              </figure>

              <div className="contact-details">
                <p className="contact-overline">Contact · Melbourne, Australia · Available for commissions</p>
                <h2 id="contact-title">Direct, uncomplicated, and open to the right idea.</h2>
                <p className="contact-intro">
                  For portraits, events, editorial commissions, prints, or a conversation about the work.
                </p>

                <div className="contact-list" aria-label="Contact details">
                  <a
                    className="contact-link"
                    id="contact-email"
                    href="mailto:Artimestypej99@gmail.com"
                  >
                    <span>Email</span>
                    <strong>Artimestypej99@gmail.com</strong>
                    <small>Write to Jean</small>
                    <ArrowIcon />
                  </a>
                  <a
                    className="contact-link"
                    href="https://www.instagram.com/j_e_a_n_l_u_c/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Instagram</span>
                    <strong>@j_e_a_n_l_u_c</strong>
                    <small>View profile</small>
                    <ArrowIcon />
                  </a>
                  <a className="contact-link" href="tel:+61468399616">
                    <span>Phone</span>
                    <strong>0468 399 616</strong>
                    <small>Call Jean</small>
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer page-width" data-reveal="up">
          <div>
            <strong>Jean Ruiu</strong>
            <span>Photographer · Melbourne</span>
          </div>
          <p>© 2026 · All photographs by Jean Ruiu</p>
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>

      {activeGalleryIndex !== null && (
        <GalleryModal
          activeIndex={activeGalleryIndex}
          items={portfolioItems}
          onClose={closeGallery}
          onNext={showNextImage}
          onPrevious={showPreviousImage}
          onSelect={selectGalleryImage}
        />
      )}
    </>
  )
}

export default App
