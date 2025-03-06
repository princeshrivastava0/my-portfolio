import Typewriter from "typewriter-effect";
import { useRouter } from "next/router";

function Main({ portfolioBtn }) {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }

        .custom-typewriter-cursor {
          color: #ff6b6b !important;
          animation: blink 0.8s infinite;
        }

        .typewriter-text {
          color: #ff6b6b;
          font-weight: 700 !important;
          letter-spacing: 1px;
        }

        .action-btn {
          background-color: #ff6b6b;
          border: none;
          outline: none;
          height: 50px;
          width: 200px;
          font-size: 100%;
          position: relative;
          transition: all 0.1s ease-in-out;
          font-weight: 600;
          box-shadow: 0px 0px 3px 1px #000000;
          border-radius: 10px;
          color: #fff;
        }

        .action-btn:hover {
          box-shadow: 0px 0px 10px 3px #ff6b6b;
        }

        .action-btn:active {
          transform: scale(0.95);
        }

        .main-bg {
          background: url("/main-bg.svg") no-repeat center center;
          background-size: 100%;
        }

        @media screen and (max-width: 768px) {
          .hand-gif {
            width: 10% !important;
          }
        }
      `}</style>
      <main
        id="home"
        style={{
          height: "100vh",
        }}
        className="d-flex justify-content-center align-items-center main-bg"
      >
        <div className="col-md-6 col-12 mt-5">
          <h1
            className="fw-bold"
            style={{
              fontSize: "3rem",
              letterSpacing: "1px",
              color: "#000000",
              textAlign: "center",
            }}
          >
            Hi, there!
            <span>
              <img
                src="https://media.tenor.com/0CpFOKGVaeMAAAAi/hand-waving-hand.gif"
                alt="hand-waving"
                width={"5%"}
                className="mb-1 ms-3 hand-gif"
              />
            </span>
          </h1>
          <h1 className="d-flex align-items-end justify-content-center my-3">
            <span
              style={{
                color: "#000000",
                fontSize: "2.5rem0",
                fontWeight: "500",
              }}
            >
              I'm
            </span>
            &nbsp;
            <span>
              <Typewriter
                options={{
                  strings: ["Prince Shrivastava", "a Web Developer"],
                  autoStart: true,
                  loop: true,
                  cursorClassName: "custom-typewriter-cursor",
                  wrapperClassName: "typewriter-text",
                }}
              />
            </span>
          </h1>

          <p
            className="mt-3 px-3"
            style={{
              fontSize: "1.15rem",
              letterSpacing: "0.5px",
              fontWeight: "500",
              textAlign: "center",
              color: "#000000",
            }}
          >
            I'm a passionate Web Developer specializing in crafting dynamic and
            responsive Web Applications. I turn ideas into interactive digital
            experiences. Explore my work and let's build something amazing
            together!
          </p>

          <div className="d-flex justify-content-evenly mt-5 col-md-8 col-12 mx-auto">
            {/* Portfolio Button */}
            <button
              className="action-btn m-3"
              onClick={() => {
                portfolioBtn.current = true;
                setTimeout(() => {
                  portfolioBtn.current = false;
                }, 1000);
                router.push("/#portfolio");
              }}
            >
              Portfolio
            </button>
            {/* Download Button */}
            <button className="action-btn m-3">Download Resume</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
