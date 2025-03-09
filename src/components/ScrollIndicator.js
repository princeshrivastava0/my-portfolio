import { useState, useEffect } from "react";

function ScrollIndicator() {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollWidth(scrolled);
    };

    // Attach event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Cleanup event listener on unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="position-fixed w-100 d-none d-md-block"
      style={{
        top: "0px",
        left: 0,
        height: "3px",
        zIndex: 99,
      }}
    >
      <div
        className="position-absolute rounded-pill"
        style={{
          width: `${scrollWidth}%`,
          height: "5px",
          backgroundColor: "#FF6B6B ",
          bottom: 0,
        }}
      ></div>
    </div>
  );
}

export default ScrollIndicator;
