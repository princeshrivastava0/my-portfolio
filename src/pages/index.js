import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import About from "@/components/About";
// import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";

import LoaderScreen from "@/components/LoaderScreen";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const portfolioBtn = useRef(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Home");
  const [initialWidth, setInitialWidth] = useState(() => {
    return typeof window !== "undefined" ? window.innerWidth : 1024;
  });
  const [isLandScape, setIsLandScape] = useState(() => {
    return typeof window !== "undefined"
      ? window.matchMedia("(orientation: landscape)").matches
      : false;
  });
  const [threshold, setThreshold] = useState(
    initialWidth > 1000
      ? { min: 0.5, max: 0.5 }
      : (!isLandScape && initialWidth < 375) ||
        (isLandScape && initialWidth < 768)
      ? { min: 0.2, max: 0.3 }
      : { min: 0.3, max: 0.5 }
  );

  // console.log("isLandScape: ", isLandScape, "Threshold: ", threshold);

  // Detecting Landscape mode
  useEffect(() => {
    const checkLandScape = () => {
      setInitialWidth(window.innerWidth);
      setIsLandScape(window.matchMedia("(orientation: landscape)").matches);
      setTimeout(() => {
        // Force a scroll event to re-trigger Intersection Observer
        window.dispatchEvent(new Event("scroll"));
      }, 100);
    };

    checkLandScape();

    window.addEventListener("resize", checkLandScape);
    return () => window.removeEventListener("resize", checkLandScape);
  }, []);

  // Refs for each section
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    portfolio: useRef(null),
    contact: useRef(null),
  };

  // Identifying the visible Section
  useEffect(() => {
    const observerOptions = {
      root: null, // Viewport is the root
      threshold: isLandScape ? threshold.min : threshold.max, // At least 50% of the section must be visible
    };

    // console.log("CurrentThreshold: ", observerOptions.threshold);

    const observer = new IntersectionObserver((sectionsArray) => {
      sectionsArray.forEach((section) => {
        if (section.isIntersecting) {
          setActiveSection(section.target.id);
        }
      });
    }, observerOptions);

    // console.log("ActiveSection: ", activeSection);

    // Observe all sections
    Object.values(sectionRefs).forEach((sectionRef) => {
      if (sectionRef.current) observer.observe(sectionRef.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((sectionRef) => {
        if (sectionRef.current) observer.unobserve(sectionRef.current);
      });
    };
  }, [isLandScape, threshold]);

  // Loader Screen
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false); // Hide the loader when the page is fully loaded
      }, 1500);
    };

    if (document.readyState === "complete") {
      // If the page is already loaded, remove loader immediately
      handleLoad();
    } else {
      // Otherwise, wait for window to load
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad); // Cleanup on unmount
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @media screen and (max-width: 1000px) and (orientation: landscape) {
          .main-container {
            height: clamp(50vw, 80vw, 100vw) !important;
          }
        }
      `}</style>
      {loading && <LoaderScreen />}
      {/* <Whatsapp /> */}
      <Header portfolioBtn={portfolioBtn} activeSection={activeSection} />
      <main>
        <section
          ref={sectionRefs.home}
          id="home"
          style={{ height: "100vh" }}
          className="main-container"
        >
          <Main portfolioBtn={portfolioBtn} />
        </section>
        <section
          ref={sectionRefs.about}
          id="about"
          style={{ minHeight: "100vh" }}
        >
          <About />
        </section>
        {/* <section
          ref={sectionRefs.portfolio}
          id="portfolio"
          style={{ height: "100vh" }}
        >
          <Portfolio />
        </section> */}
        <section
          ref={sectionRefs.contact}
          id="contact"
          style={{ minHeight: "auto" }}
        >
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}
