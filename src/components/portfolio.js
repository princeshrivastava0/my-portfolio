function Portfolio() {
  return (
    <>
      <style jsx>{`
        .portfolio-heading:before {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 5%;
          border-bottom: 3px solid red;
          border-radius: 10px;
          transform: translateX(-50%);
        }
      `}</style>
      <section
        id="portfolio"
        style={{
          height: "100vh",
          backgroundColor: "#fff",
          paddingTop: "120px",
        }}
      >
        <h2
          className="fw-bold portfolio-heading position-relative pb-1"
          style={{
            fontSize: "2.25rem",
            letterSpacing: "1px",
            color: "#000000",
            textAlign: "center",
          }}
        >
          Port
          <span style={{ color: "#FF6B6B", fontWeight: "700" }}>folio</span>
        </h2>
      </section>
    </>
  );
}

export default Portfolio;
