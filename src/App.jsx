import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import DecryptedText from "./components/DecryptedText/DecryptedText";
import WarpText from "./components/WarpText/WarpText";
import AccordionGallery from "./components/AccordionGallery/AccordionGallery";

import profileImage from "./assets/profile.jpeg.jpeg";
import projectUI1 from "./assets/project-ui1.png";
import projectUI2 from "./assets/project-ui2.png";
import projectUI3 from "./assets/project-ui3.png";
import projectUI4 from "./assets/project-ui4.png";
import projectUI5 from "./assets/project-ui5.png";
import projectUI6 from "./assets/project-ui6.png";
import projectUI7 from "./assets/project-ui7.png";
import projectUI8 from "./assets/project-ui8.png";
import projectUI9 from "./assets/project-ui9.png";
import projectUI10 from "./assets/project-ui10.png";

import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  /* ==========================================
     PROJECT UI
  ========================================== */

  const projectItems = [
    {
      image: projectUI1,
      title: "SIPANTES",
      description: "Project UI SIPANTES",
    },
    {
      image: projectUI2,
      title: "SIPANTES",
      description: "Project UI SIPANTES",
    },
    {
      image: projectUI3,
      title: "SIPANTES",
      description: "Project UI SIPANTES",
    },
    {
      image: projectUI4,
      title: "SIPANTES",
      description: "Project UI SIPANTES",
    },
    {
      image: projectUI5,
      title: "SIPANTES",
      description: "Project UI SIPANTES",
    },
    {
      image: projectUI6,
      title: "SIPANTES",
      description: "Project UI SIPANTES",
    },
    {
      image: projectUI7,
      title: "SIPANTES",
      description: "Project UI SIPANTES",
    },
    {
      image: projectUI8,
      title: "SIPANTES",
      description: "Project UI SIPANTES",
    },
    {
      image: projectUI9,
      title: "SIPANTES",
      description: "Project UI SIPANTES",
    },
    {
      image: projectUI10,
      title: "SIPANTES",
      description: "Project UI SIPANTES",
    },
  ];

  /* ==========================================
     LOADING SCREEN
  ========================================== */

  useEffect(() => {
    const letters = document.querySelectorAll(".loading-letter");

    gsap.set(letters, {
      opacity: 0,
      y: 50,
    });

    gsap.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      gsap.killTweensOf(letters);
    };
  }, []);

  /* ==========================================
     SCROLL ANIMATION
  ========================================== */

  useEffect(() => {
    if (loading) {
      return;
    }

    const ctx = gsap.context(() => {
      /* ========================================
         HERO
      ======================================== */

      gsap.fromTo(
        ".hero-label",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".hero-title",
        {
          opacity: 0,
          y: 50,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top 60%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".who-am-i-button",
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top 60%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );

      /* ========================================
         ABOUT
      ======================================== */

      gsap.fromTo(
        ".about-title",
        {
          opacity: 0,
          x: -70,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top 75%",
            end: "top 25%",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        ".about-photo-wrapper",
        {
          opacity: 0,
          x: -60,
          scale: 0.92,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-layout",
            start: "top 80%",
            end: "top 35%",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        ".about-introduction",
        {
          opacity: 0,
          x: 60,
        },
        {
          opacity: 1,
          x: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
            end: "top 40%",
            scrub: 1.1,
          },
        }
      );

      gsap.fromTo(
        ".about-text p:not(.about-introduction)",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 70%",
            end: "bottom 35%",
            scrub: 1.2,
          },
        }
      );

      /* ========================================
         EDUCATION
      ======================================== */

      gsap.fromTo(
        ".education-title",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".education-section",
            start: "top 80%",
            end: "top 45%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".education-item",
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: ".education-timeline",
            start: "top 80%",
            end: "bottom 45%",
            scrub: 1.2,
          },
        }
      );

      /* ========================================
         PROJECTS
      ======================================== */

      gsap.fromTo(
        ".projects-section h2",
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-section",
            start: "top 75%",
            end: "top 30%",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        ".project-gallery-wrapper",
        {
          opacity: 0,
          y: 50,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".project-gallery-wrapper",
            start: "top 85%",
            end: "top 45%",
            scrub: 1.2,
          },
        }
      );

      /* ========================================
         CONTACT
      ======================================== */

      gsap.fromTo(
        ".contact-section .section-label",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-section",
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".contact-section h2",
        {
          opacity: 0,
          x: 70,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-section",
            start: "top 75%",
            end: "top 30%",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        ".contact-form",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      /* ========================================
         FOOTER
      ======================================== */

      gsap.fromTo(
        ".footer p",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer",
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [loading]);

  /* ==========================================
     WHO AM I
  ========================================== */

  const handleWhoAmI = () => {
    const aboutSection = document.getElementById("about");

    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* ==========================================
     CONTACT FORM
  ========================================== */

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const subject = encodeURIComponent(
      `Pesan dari website - ${name}`
    );

    const body = encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
    );

    const destinationEmail =
      "faishalbizero10@gmail.com";

    window.location.href =
      `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
  };

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">

          <div className="loading-title">
            {"FAISHAL.".split("").map((letter, index) => (
              <span
                key={index}
                className="loading-letter"
              >
                {letter}
              </span>
            ))}
          </div>

          <div className="loading-bar">
            <div className="loading-progress" />
          </div>

        </div>
      </div>
    );
  }

  /* ==========================================
     WEBSITE
  ========================================== */

  return (
    <main className="website">

      {/* ========================================
          HOME
      ======================================== */}

      <section
        id="home"
        className="hero-section"
      >
        <div className="hero-content">

          <span className="hero-label">
            WELCOME TO MY WEBSITE
          </span>

          <div className="hero-title">
            <WarpText
              text={`HALO, SELAMAT DATANG DI
WEBSITE PRIBADI SAYA`}
              color="#000000"
              warpStrength={0.08}
              warpScale={1.7}
              speed={0.55}
              pointerInfluence={0.42}
              pointerStrength={0.38}
              refraction={0.018}
              ripple
              fontSize="clamp(4rem, 10vw, 10rem)"
              fontWeight={800}
              fontFamily="Karantina, sans-serif"
              letterSpacing="-0.02em"
              lineHeight={0.85}
              style={{
                width: "100%",
                height: "320px",
              }}
            />
          </div>

          <p className="hero-subtitle">
            Wilujeng sumping, mangga di-scroll ka handap
          </p>

          <button
            type="button"
            className="who-am-i-button"
            onClick={handleWhoAmI}
          >
            <span>Who Am I</span>
            <span className="button-arrow">
              ↓
            </span>
          </button>

        </div>
      </section>

      {/* ========================================
          ABOUT
      ======================================== */}

      <section
        id="about"
        className="about-section"
      >
        <div className="about-content">

          <DecryptedText
            text="ABOUT ME"
            speed={55}
            maxIterations={15}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            animateOn="view"
            revealDirection="center"
            sequential
            className="section-label"
          />

          <h2 className="about-title">
            FAISHAL.
          </h2>

          <div className="about-layout">

            <div className="about-photo-wrapper">

              <div className="about-photo">

                <img
                  src={profileImage}
                  alt="Foto profil Faishal"
                  className="profile-image"
                />

              </div>

            </div>

            <div className="about-text">

              <p className="about-introduction">
                Perkenalkan saya Faishal Akbar Hidayat.
              </p>

              <p>
                Saya adalah seorang lulusan Informatika
                yang memiliki ketertarikan pada
                pengembangan website, desain antarmuka
                pengguna (UI), teknologi, dan dunia digital.
              </p>

              <p>
                Saya senang mempelajari teknologi baru
                dan membangun berbagai project yang dapat
                memberikan pengalaman digital yang menarik,
                fungsional, dan mudah digunakan.
              </p>

            </div>

          </div>

          {/* ========================================
              EDUCATION
          ======================================== */}

          <div className="education-section">

            <div className="education-title">

              <span className="education-label">
                EDUCATION
              </span>

              <h3>
                Riwayat Pendidikan
              </h3>

            </div>

            <div className="education-timeline">

              <div className="education-item">

                <div className="education-icon">
                  🎓
                </div>

                <div className="education-content">

                  <span className="education-level">
                    UNIVERSITAS
                  </span>

                  <h4>
                    Universitas Sebelas April Sumedang
                  </h4>

                </div>

              </div>

              <div className="education-item">

                <div className="education-icon">
                  🏫
                </div>

                <div className="education-content">

                  <span className="education-level">
                    SMA
                  </span>

                  <h4>
                    SMAN 3 Sumedang
                  </h4>

                </div>

              </div>

              <div className="education-item">

                <div className="education-icon">
                  📚
                </div>

                <div className="education-content">

                  <span className="education-level">
                    SMP
                  </span>

                  <h4>
                    SMPN 4 Sumedang
                  </h4>

                </div>

              </div>

              <div className="education-item">

                <div className="education-icon">
                  ✏️
                </div>

                <div className="education-content">

                  <span className="education-level">
                    SD
                  </span>

                  <h4>
                    SDN Cipameungpeuk
                  </h4>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================
          PROJECTS
      ======================================== */}

      <section
        id="projects"
        className="projects-section"
      >
        <div className="section-container">

          <DecryptedText
            text="PROJECTS"
            speed={55}
            maxIterations={15}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            animateOn="view"
            revealDirection="center"
            sequential
            className="section-label"
          />

          <h2>
            Project yang pernah saya buat
          </h2>

          {/* ====================================
              PROJECT UI SIPANTES
          ==================================== */}

          <div className="project-description">

            <span className="project-category">
              PROJECT UI
            </span>

            <h3>
              SIPANTES
            </h3>

            <p>
              Tampilan antarmuka pengguna (UI)
              untuk project SIPANTES.
            </p>

          </div>

          <div className="project-gallery-wrapper">

            <AccordionGallery
              items={projectItems}
            />

          </div>

        </div>
      </section>

      {/* ========================================
          CONTACT
      ======================================== */}

      <section
        id="contact"
        className="contact-section"
      >
        <div className="section-container">

          <DecryptedText
            text="CONTACT"
            speed={55}
            maxIterations={15}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            animateOn="view"
            revealDirection="center"
            sequential
            className="section-label"
          />

          <h2>
            Let's Work Together
          </h2>

          <form
            className="contact-form"
            onSubmit={handleContactSubmit}
          >

            <div className="contact-field">

              <label htmlFor="name">
                Nama
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Masukkan nama"
                required
              />

            </div>

            <div className="contact-field">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Masukkan email"
                required
              />

            </div>

            <div className="contact-field">

              <label htmlFor="message">
                Pesan
              </label>

              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tulis pesan Anda..."
                required
              />

            </div>

            <button
              type="submit"
              className="contact-submit"
            >
              Kirim Pesan
              <span>
                →
              </span>
            </button>

          </form>

        </div>
      </section>

      {/* ========================================
          FOOTER
      ======================================== */}

      <footer className="footer">

        <div className="footer-content">

          <div className="footer-top">

            <div className="footer-brand">

              <h3>
                FAISHAL.
              </h3>

              <p>
                Personal website yang berisi tentang profil,
                pendidikan, project, dan informasi kontak saya.
              </p>

            </div>

            <div className="footer-column">

              <h4>
                NAVIGATION
              </h4>

              <a href="#home">
                Home
              </a>

              <a href="#about">
                About
              </a>

              <a href="#projects">
                Projects
              </a>

              <a href="#contact">
                Contact
              </a>

            </div>

            <div className="footer-column">

              <h4>
                CONTACT
              </h4>

              <a
                href="#contact"
                className="footer-contact-link"
              >
                Let's Work Together
                <span>
                  →
                </span>
              </a>

            </div>

            {/* ========================================
                SOCIAL MEDIA
            ======================================== */}

            <div className="footer-column">

              <h4>
                SOCIAL
              </h4>

              <div className="footer-socials">

                {/* INSTAGRAM */}

                <a
                  href="https://www.instagram.com/faishall__h?igsh=NDdtZGhnajYzYzAz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Faishal"
                  title="Instagram"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >

                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                    />

                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />

                  </svg>

                  <span>
                    Instagram
                  </span>

                </a>

                {/* GITHUB */}

                <a
                  href="https://github.com/faishallh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Faishal"
                  title="GitHub"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="currentColor"
                  >

                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />

                  </svg>

                  <span>
                    GitHub
                  </span>

                </a>

                {/* LINKEDIN */}

                <a
                  href="https://www.linkedin.com/in/faishal-h-b63601297?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Faishal"
                  title="LinkedIn"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="currentColor"
                  >

                    <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.67H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.38 4.28 5.47v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0-4.14ZM3.56 20.45h3.56V8.99H3.56v11.46ZM22.22 0H1.78C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.78 24h20.44C23.2 24 24 23.22 24 22.25V1.75C24 .78 23.2 0 22.22 0Z" />

                  </svg>

                  <span>
                    LinkedIn
                  </span>

                </a>

              </div>

            </div>

          </div>

          <div className="footer-bottom">

            <p>
              © 2026 FAISHAL. ALL RIGHTS RESERVED.
            </p>

            <span className="footer-credit">
              MADE WITH CODE & CREATIVITY
            </span>

          </div>

        </div>

      </footer>

    </main>
  );
}

export default App;