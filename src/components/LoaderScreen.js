import { useState, useEffect } from "react";

function LoaderScreen() {
  // Preventing page-scroll when the loading screen is active
  useEffect(() => {
    document.documentElement.style.overflow = "hidden"; // Hides scrollbar
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto"; // Restores scrollbar
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .loader {
          transform: rotateZ(45deg);
          perspective: 1000px;
          border-radius: 50%;
          width: 68px;
          height: 68px;
          font-weight: 900;
          color: #000;
        }
        .loader:before,
        .loader:after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: inherit;
          height: inherit;
          border-radius: 50%;
          transform: rotateX(70deg);
          animation: 1s spin linear infinite;
        }
        .loader:after {
          color: #ff3d00;
          transform: rotateY(70deg);
          animation-delay: 0.4s;
        }

        @keyframes rotate {
          0% {
            transform: translate(-50%, -50%) rotateZ(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotateZ(360deg);
          }
        }

        @keyframes rotateccw {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }

        @keyframes spin {
          0%,
          100% {
            box-shadow: 0.2em 0px 0 0px currentcolor;
          }
          12% {
            box-shadow: 0.2em 0.2em 0 0 currentcolor;
          }
          25% {
            box-shadow: 0 0.2em 0 0px currentcolor;
          }
          37% {
            box-shadow: -0.2em 0.2em 0 0 currentcolor;
          }
          50% {
            box-shadow: -0.2em 0 0 0 currentcolor;
          }
          62% {
            box-shadow: -0.2em -0.2em 0 0 currentcolor;
          }
          75% {
            box-shadow: 0px -0.2em 0 0 currentcolor;
          }
          87% {
            box-shadow: 0.2em -0.2em 0 0 currentcolor;
          }
        }

        @media screen and (max-width: 768px) {
          .loader-container {
            height: 100dvh !important;
          }

          .mobile-text > * {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
      <div
        className="loader-container position-fixed w-100 d-flex flex-column justify-content-center align-items-center bg-white"
        style={{
          height: "100vh",
          zIndex: "100",
          opacity: "0.9",
        }}
      >
        <span className="loader mb-5"></span>
        <div
          className="mobile-text d-flex align-items-center"
          style={{ marginBottom: "100px" }}
        >
          <span
            className="mt-md-2 mt-md-0"
            style={{
              color: "#444444",
              fontSize: "2rem",
            }}
          >
            {"< "}
          </span>
          <span
            className="fw-bold px-2 logo-text text-hover"
            style={{
              fontSize: "3rem",
              letterSpacing: "3px",
              color: "#444444",
              textAlign: "center",
              fontFamily: `"Agustina", "Poppins", sans-serif`,
            }}
          >
            Prince Shrivastava
          </span>
          <span
            className="mt-md-2 mt-md-0"
            style={{
              color: "#444444",
              fontSize: "2rem",
            }}
          >
            {" />"}
          </span>
        </div>
      </div>
    </>
  );
}

export default LoaderScreen;
