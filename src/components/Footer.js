import Link from "next/link";

function Footer() {
  const socialMedia = [
    {
      title: "Github",
      path: "https://github.com/princeshrivastava0",
      icon: "github",
    },
    {
      title: "LinkedIn",
      path: "https://www.linkedin.com/in/prince-shrivastava/",
      icon: "linkedin",
    },
    {
      title: "Youtube",
      path: "https://www.youtube.com/@coding.prince",
      icon: "youtube",
    },
    {
      title: "Instagram",
      path: "https://www.instagram.com/princeshrivastava.dev/",
      icon: "instagram",
    },
  ];

  const footerNav = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "#",
    },
    {
      title: "Portfolio",
      path: "#",
    },
    {
      title: "Blog",
      path: "#",
    },
    {
      title: "Contact",
      path: "#",
    },
  ];

  return (
    <>
      <style jsx>{`
        .icons:hover {
          filter: drop-shadow(0px 0px 5px #ff6b6b);
        }

        .text-hover:hover {
          filter: drop-shadow(0px 0px 1px #fff);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 200px 1fr;
        }

        .grid-row-2 {
          grid-row: 2;
          grid-column: 1 / 3;
        }

        @media screen and (max-width: 768px) {
          .logo-text {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
      <footer className="footer-grid" style={{ backgroundColor: "#000000" }}>
        {/* Left Container */}
        <div
          className="mx-auto d-flex justify-content-between align-items-center"
          style={{ width: "80%" }}
        >
          <div>
            {/* Logo */}
            <Link
              className="d-flex align-items-center text-decoration-none"
              href={"/"}
            >
              <span
                className="fw-bold pt-3 px-2 text-hover logo-text"
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: "3px",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Prince Shrivastava
              </span>
            </Link>

            <p
              style={{ color: "#fff", fontSize: "0.8rem", width: "50%" }}
              className="px-2 my-3"
            >
              A passionate Web Developer building dynamic, responsive, and
              user-friendly web applications that enhance user experience and
              contribute to the overall success of a product.
            </p>
          </div>

          {/* Social Media */}
          <div className="d-flex justify-content-center flex-column">
            <h6
              style={{ color: "#fff", fontSize: "1.5rem" }}
              className="ms-2 fw-bold"
            >
              SOCIAL
            </h6>
            <div className="d-flex">
              {socialMedia.map((socialMedia, index) => {
                return (
                  <span
                    key={`social-media-${index}`}
                    className="mx-2 my-3 icons d-flex justify-content-center align-items-center"
                    style={{ width: "35px", height: "35px" }}
                  >
                    <a
                      href={socialMedia.path}
                      title={socialMedia.title}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={`/${socialMedia.icon}.png`} width={"100%"} />
                    </a>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* copyright */}
        <div
          className="py-5 grid-row-2 d-flex flex-column align-items-center justify-content-center mx-auto"
          style={{ borderTop: "1px solid rgba(255,255,255,0.3)", width: "80%" }}
        >
          <h6
            className="d-flex d-md-block flex-column justify-content-center align-items-center"
            style={{ fontSize: "0.8rem", color: "#fff", fontWeight: "500" }}
          >
            Copyright &copy; {new Date().getFullYear()}{" "}
          </h6>
          <a
            href="https://www.princeshrivastava.com"
            className="text-decoration-none fw-bold my-2 my-md-0"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.8rem",
              color: "#fff",
              fontWeight: "400",
            }}
          >
            Made by{" "}
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: "700",
                textDecoration: "underline",
                letterSpacing: "0.5px",
              }}
            >
              Prince Shrivastava
            </span>
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
