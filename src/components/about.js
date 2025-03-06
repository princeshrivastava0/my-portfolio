function About() {
  const skills = [
    "HTML",
    "CSS",
    "Bootstrap",
    "JavaScript",
    "React.js",
    "Next.js",
    "React Native",
    "Express.js",
    "MongoDB",
    "Git",
    "Github",
    "Visual Studio Code",
    "Adobe Photoshop",
    "Adobe Premiere Pro",
    "WordPress",
    "SEO",
  ];

  return (
    <>
      <style jsx>{`
        .about-heading:before {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 5%;
          border-bottom: 3px solid red;
          border-radius: 10px;
          transform: translateX(-50%);
        }

        .skill {
          transition: all 0.3s ease-in-out;
        }

        .skill:hover {
          transform: scale(1.1);
          background-color: rgba(255, 107, 107, 0.3);
          color: #ff6b6b;
        }

        @media screen and (max-width: 768px) {
          .mobile-container {
            width: 100% !important;
            text-align: center;
          }
        }
      `}</style>
      <section id="about" style={{ height: "100vh", paddingTop: "120px" }}>
        <h2
          className="fw-bold about-heading position-relative pb-1"
          style={{
            fontSize: "2.25rem",
            letterSpacing: "1px",
            color: "#000000",
            textAlign: "center",
          }}
        >
          About <span style={{ color: "#FF6B6B", fontWeight: "700" }}>Me</span>
        </h2>

        {/* About Content */}
        <div className="container mt-md-5 mt-3 p-3 d-flex flex-column flex-md-row justify-content-between align-items-start">
          {/* Left Container */}
          <div
            style={{ width: "48%" }}
            className="mobile-container px-1 p-md-0"
          >
            <h3 className="mb-3 fw-bold">Hey, I'm Prince!</h3>
            <p style={{ textAlign: "justify" }}>
              I'm a passionate <strong>Web Developer</strong> specializing in
              <strong> JavaScript</strong>, with expertise in modern web
              technologies like{" "}
              <strong>React.js, Next.js, Express.js, and React Native</strong>.
              I craft dynamic, responsive, and user-friendly web applications
              that enhance user experience and contribute to the overall success
              of a product.
            </p>
            <p style={{ textAlign: "justify" }}>
              I also enjoy creating and sharing content about Web Development,
              helping others in the developer community learn and grow. Check
              out some of my work in the Portfolio section!
            </p>
            <p style={{ textAlign: "justify" }}>
              I'm active on{" "}
              <a
                className="text-decoration-none fw-bold"
                style={{ color: "#ff6b6b" }}
                href="https://www.linkedin.com/in/prince-shrivastava/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              ,{" "}
              <a
                className="text-decoration-none fw-bold"
                style={{ color: "#ff6b6b" }}
                href="https://www.youtube.com/@coding.prince"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
              , and{" "}
              <a
                className="text-decoration-none fw-bold"
                style={{ color: "#ff6b6b" }}
                href="https://www.instagram.com/princeshrivastava.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              , where I post valuable insights and tutorials on Web Development
              & Programming. Feel free to connect or follow me there!
            </p>
            <p style={{ textAlign: "justify" }}>
              I'm open for exciting job opportunities where I can contribute,
              learn, and grow. If you have a role that aligns with my skills and
              experience, don’t hesitate to reach out!
            </p>
          </div>

          {/* Right Container */}
          <div
            style={{ width: "48%" }}
            className="mobile-container px-1 p-md-0"
          >
            <h3 className="mb-3 fw-bold">My skills</h3>
            {skills.map((skill, index) => {
              return (
                <span
                  key={`skill-${index}`}
                  className="d-inline-block rounded m-2 p-2 px-3 shadow skill"
                  style={{
                    backgroundColor: "rgba(153, 153, 153, 0.2)",
                    cursor: "default",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
