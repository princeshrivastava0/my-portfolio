import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import About from "@/components/about";
import Portfolio from "@/components/portfolio";
import Contact from "@/components/contact";
import Whatsapp from "@/components/whatsapp";
import LoaderScreen from "@/components/LoaderScreen";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const portfolioBtn = useRef(false);
  const [loading, setLoading] = useState(true);

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
      {loading ? <LoaderScreen /> : ""}
      <Whatsapp />
      <Header portfolioBtn={portfolioBtn} />
      <Main portfolioBtn={portfolioBtn} />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
}
