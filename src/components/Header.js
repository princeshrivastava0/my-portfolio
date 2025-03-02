import Link from "next/link";
import { useState, useEffect } from "react";
import ScrollIndicator from "./ScrollIndicator";

function Header() {
  const [isActiveTab, setIsActiveTab] = useState("Home");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    if (scrollHeight > 100 && scrollHeight < 200) {
      setIsActiveTab("About");
    } else if (scrollHeight >= 200 && scrollHeight < 300) {
      setIsActiveTab("Portfolio");
    } else if (scrollHeight >= 300 && scrollHeight < 400) {
      setIsActiveTab("Blog");
    } else if (scrollHeight >= 400) {
      setIsActiveTab("Contact");
    } else {
      setIsActiveTab("Home");
    }
  }, [scrollHeight]);

  const navItems = [
    {
      title: "Home",
      path: "home",
    },
    {
      title: "About",
      path: "about",
    },
    {
      title: "Portfolio",
      path: "portfolio",
    },
    {
      title: "Blog",
      path: "blog",
    },
    {
      title: "Contact",
      path: "contact",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // Get scroll position in pixels
      const viewportHeight = window.innerHeight; // Get viewport height in pixels
      const scrollVh = (scrollY / viewportHeight) * 100; // Convert to vh

      setScrollHeight(scrollVh);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      const preventScroll = () => {
        window.scrollTo(scrollLeft, scrollTop);
      };

      window.addEventListener("scroll", preventScroll);

      return () => {
        window.removeEventListener("scroll", preventScroll);
      };
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > window.innerHeight) {
        // Landscape mode detected
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .active-tab {
          color: #ff6b6b !important;
          position: relative;
        }

        .tab-hover {
          position: relative;
        }

        .active-tab:before,
        .active-tab:after {
          width: 50% !important;
          border-bottom: 2px solid #ff6b6b !important;
        }

        .tab-hover:before,
        .tab-hover:after,
        .active-tab:before,
        .active-tab:after {
          content: "";
          position: absolute;
          bottom: -3px;
          width: 0;
          transition: width 0.3s ease-in-out;
          padding-top: 10px;
          border-bottom: 2px solid #444444;
        }

        .tab-hover:before,
        .active-tab:before {
          left: 49%;
        }

        .tab-hover:after,
        .active-tab:after {
          right: 49%;
        }

        .tab-hover:hover:before,
        .tab-hover:hover:after {
          width: 50%;
          border-bottom: 2px solid #444444;
        }

        .text-hover:hover {
          color: #ff6b6b !important;
          transition: color 0.2s ease-in-out;
        }

        @media screen and (max-width: 1100px) {
          .header-container {
            width: 100% !important;
            border-radius: 0 !important;
            border: 0 !important;
          }
          .logo-text {
            font-size: 1rem !important;
          }

          .large-nav {
            display: none !important;
          }
        }

        @media screen and (min-width: 601px) and (max-width: 1100px) {
          .logo-text {
            font-size: 2vw !important;
          }
        }
      `}</style>

      {/* ProgressBar */}
      <ScrollIndicator />

      <header
        className="header-container d-flex justify-content-between mx-auto py-1 px-3 position-fixed"
        style={{
          width: "100%",
          height: "70px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#fff",
          boxShadow: "0 0 10px 3px #FF6B6B",
          zIndex: "3",
        }}
      >
        {/* Logo */}
        <Link
          className="d-flex align-items-center text-decoration-none px-4"
          href={"/"}
        >
          <span
            className="mt-2 mt-md-0"
            style={{
              color: "#444444",
              fontSize: "1.5rem",
            }}
          >
            {"< "}
          </span>
          <span
            className="fw-bold px-2 logo-text text-hover"
            style={{
              fontSize: "1.5rem",
              letterSpacing: "3px",
              color: "#444444",
              textAlign: "center",
            }}
          >
            Prince Shrivastava
          </span>
          <span
            className="mt-2 mt-md-0"
            style={{
              color: "#444444",
              fontSize: "1.5rem",
            }}
          >
            {" />"}
          </span>
        </Link>

        {/* Right Container */}
        <div className="d-flex">
          {/* DrawerIcon */}
          <button
            className="d-md-none"
            style={{
              backgroundColor: "transparent",
              outline: "none",
              border: "none",
            }}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.3s ease",
                transform: isDrawerOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <i
                className={`bi bi-${isDrawerOpen ? "x" : "list"}`}
                style={{ fontSize: "2rem", color: "#444444" }}
              ></i>
            </span>
          </button>
          {/* Navbar */}
          <nav className="d-none d-md-flex justify-content-end align-items-center">
            {navItems.map((item, index) => {
              return (
                <Link
                  className={`text-decoration-none mx-4`}
                  key={`nav-item-${index}`}
                  href={`#${item.path}`}
                  onClick={() => setIsActiveTab(item.title)}
                >
                  <span
                    className={`fw-bold ${
                      isActiveTab === item.title ? "active-tab" : "tab-hover"
                    }`}
                    style={{ color: "#444444" }}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className=" d-flex d-md-none position-fixed w-100 drawer-container"
        style={{
          height: "100vh",
          zIndex: "2",
          transform: isDrawerOpen ? "translateX(0%)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <nav
          className="d-flex flex-column justify-content-center align-items-left shadow"
          style={{
            maxWidth: "300px",
            width: "50%",
            backgroundColor: "#181825",
          }}
        >
          {navItems.map((item, index) => {
            return (
              <Link
                className={`text-decoration-none my-2 mx-2 px-4`}
                key={`nav-item-${index}`}
                href={item.path}
                onClick={() => setIsActiveTab(item.title)}
              >
                <span
                  style={{ fontSize: "1.25rem" }}
                  className={`fw-bold ${
                    isActiveTab === item.title
                      ? "active-tab"
                      : "text-light tab-hover"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default Header;
