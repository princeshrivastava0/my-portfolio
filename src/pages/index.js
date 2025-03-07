import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Whatsapp from "@/components/Whatsapp";
import LoaderScreen from "@/components/LoaderScreen";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const portfolioBtn = useRef(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Home");

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
      threshold: 0.5, // At least 50% of the section must be visible
    };

    const observer = new IntersectionObserver((sectionsArray) => {
      sectionsArray.forEach((section) => {
        if (section.isIntersecting) {
          setActiveSection(section.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    Object.values(sectionRefs).forEach((sectionRef) => {
      if (sectionRef.current) observer.observe(sectionRef.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((sectionRef) => {
        if (sectionRef.current) observer.unobserve(sectionRef.current);
      });
    };
  }, []);

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
      {loading && <LoaderScreen />}
      <Whatsapp />
      <Header portfolioBtn={portfolioBtn} activeSection={activeSection} />
      <main>
        <section ref={sectionRefs.home} id="home" style={{ height: "100vh" }}>
          <Main portfolioBtn={portfolioBtn} />
        </section>
        <section
          ref={sectionRefs.about}
          id="about"
          style={{ minHeight: "100vh" }}
        >
          <About />
        </section>
        <section
          ref={sectionRefs.portfolio}
          id="portfolio"
          style={{ height: "100vh" }}
        >
          <Portfolio />
        </section>
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
