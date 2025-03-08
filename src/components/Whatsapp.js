import { useState, useEffect } from "react";

function Whatsapp() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000); // Runs the animation for 300ms
    }, 5000); // Triggers every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <style jsx>{`
        @keyframes vibrate {
          0% {
            transform: rotate(0);
          }
          20% {
            transform: rotate(25deg);
          }
          40% {
            transform: rotate(-25deg);
          }
          60% {
            transform: rotate(25deg);
          }
          80% {
            transform: rotate(-25deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        .btn-container {
          bottom: 20px;
          right: 20px;
        }

        .btn-text {
          background-color: #fff;
          outline: 1px solid #ff6b6b;
          ${animate ? "animation: vibrate 1s;" : ""}
        }

        .whatsapp-btn {
          border: none;
          outline: none;
          background: transparent;
          font-size: 2.5rem;
        }

        .whatsapp-btn:active {
          transform: scale(0.9);
        }
      `}</style>
      <div className="position-fixed btn-container">
        <span
          className="d-none d-md-inline-block btn-text px-3 rounded fw-bold"
          style={{ fontSize: "0.9rem" }}
        >
          Let's Chat! 💬
        </span>
        <a
          className="whatsapp-btn d-flex justify-content-center align-items-center"
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Whatsapp"
        >
          <i className="bi bi-whatsapp" style={{ color: "#ff6b6b" }}></i>
        </a>
      </div>
    </>
  );
}

export default Whatsapp;
