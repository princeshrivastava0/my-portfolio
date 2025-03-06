import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ScrollIndicator from "./ScrollIndicator";

function Header({ portfolioBtn }) {
  const [isActiveTab, setIsActiveTab] = useState("Home");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const isTabClicked = useRef(false);
  const [deviceWidth, setDeviceWidth] = useState(769);

  useEffect(() => {
    if (deviceWidth > 768) {
      if (!isTabClicked.current && !portfolioBtn.current) {
        // Only update on scroll if no recent tab click
        if (scrollHeight > 80 && scrollHeight < 180) {
          setIsActiveTab("About");
        } else if (scrollHeight >= 180 && scrollHeight < 280) {
          setIsActiveTab("Portfolio");
        } else if (scrollHeight >= 280) {
          setIsActiveTab("Contact");
        } else {
          setIsActiveTab("Home");
        }
      }
    }

    // if (deviceWidth < 769) {
    //   if (!isTabClicked.current && !portfolioBtn.current) {
    //     // Only update on scroll if no recent tab click
    //     if (scrollHeight > 80 && scrollHeight < 180) {
    //       setIsActiveTab("About");
    //     } else if (scrollHeight >= 180 && scrollHeight < 280) {
    //       setIsActiveTab("Portfolio");
    //     } else if (scrollHeight >= 280) {
    //       setIsActiveTab("Contact");
    //     } else {
    //       setIsActiveTab("Home");
    //     }
    //   }
    // }

    if (portfolioBtn.current) {
      setIsActiveTab("Portfolio");
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

  // Preventing page-scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.documentElement.style.overflow = "hidden"; // Hides scrollbar
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.documentElement.style.overflow = "auto"; // Restores scrollbar
      document.body.style.overflow = "auto";
    };
  }, [isDrawerOpen]);

  // Detecting Landscape display
  useEffect(() => {
    const handleResize = () => {
      // Landscape mode detected
      if (window.innerWidth > window.innerHeight) {
        setIsDrawerOpen(false);
      }

      setDeviceWidth(window.innerWidth);
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
          {/* Large-Navbar */}
          <nav className="d-none d-md-flex justify-content-end align-items-center">
            {navItems.map((item, index) => {
              return (
                <Link
                  className={`text-decoration-none mx-4`}
                  key={`nav-item-${index}`}
                  href={`#${item.path}`}
                  onClick={() => {
                    setIsActiveTab(item.title);
                    isTabClicked.current = true;
                    setTimeout(() => {
                      isTabClicked.current = false; // Re-enable scroll updates after 1s
                    }, 1000);
                  }}
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
            backgroundColor: "#444444",
          }}
        >
          {navItems.map((item, index) => {
            return (
              <Link
                className={`text-decoration-none my-2 mx-2 px-4`}
                key={`nav-item-${index}`}
                href={`#${item.path}`}
                onClick={() => {
                  setIsDrawerOpen(false);
                  setIsActiveTab(item.title);
                }}
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
