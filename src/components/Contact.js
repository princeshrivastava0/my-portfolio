import { useState, useRef } from "react";
import SuccessModal from "./SuccessModal";
import ReCAPTCHA from "react-google-recaptcha";

function Contact() {
  const [userName, setUserName] = useState("");
  const [modalUser, setModalUser] = useState("");
  const [formStatus, setFormStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [error, setError] = useState(null);
  const recaptchaRef = useRef(null);

  const formatName = (name) => {
    return name
      .split(" ") // Split by spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
      .join(" "); // Join words back
  };

  const handleUserNameChange = (e) => {
    const formattedName = formatName(e.target.value);
    setUserName(formattedName);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // Captcha Code - Starts

    if (!recaptchaToken) {
      setError("Please complete the CAPTCHA verification.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    setFormStatus(true);

    const captchaResponse = await fetch("/api/verifyCaptcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recaptchaToken }),
    });

    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      setFormStatus(false);
      setRecaptchaToken(null); // Reset CAPTCHA
      setError("CAPTCHA verification failed.");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    // Captcha Code Ends

    const formData = new FormData(event.target);
    formData.delete("g-recaptcha-response");
    const jsonObject = Object.fromEntries(formData);

    const response = await fetch("/api/sendForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObject),
    });

    const data = await response.json();

    if (data.success) {
      setShow(true);
      setFormStatus(false);
      event.target.reset();
      setModalUser(userName);
      setUserName("");
      setError("");
      if (recaptchaRef.current) recaptchaRef.current.reset();
      setRecaptchaToken(null);
    } else {
      console.log("Form Submission Error: ", data.message);
      setShow(false);
      setFormStatus(false);
      setUserName("");
      setError("Form submission failed, please try again.");
      if (recaptchaRef.current) recaptchaRef.current.reset();
      setRecaptchaToken(null);
    }
  };
  return (
    <>
      <style jsx>
        {`
          .success-btn {
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

          .success-btn:hover {
            box-shadow: 0px 0px 10px 3px #ff6b6b;
          }

          .success-btn:active {
            transform: scale(0.95);
          }

          .contact-heading:before {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 5%;
            border-bottom: 3px solid red;
            border-radius: 10px;
            transform: translateX(-50%);
          }

          .contact-bg {
            background: url("/main-bg.svg") no-repeat center center;
            background-size: 100%;
          }

          ::placeholder {
            color: #000;
            opacity: 0.7; /* Firefox */
            text-transform: capitalize;
          }

          ::-ms-input-placeholder {
            /* Edge 12 -18 */
            color: #000;
          }

          @media screen and (max-width: 768px) {
            .form-container {
              width: 90% !important;
            }
          }
        `}
      </style>

      <div
        style={{
          paddingTop: "120px",
          paddingBottom: "120px",
        }}
        className="contact-bg"
      >
        {/* Heading */}
        <h2
          className="fw-bold contact-heading position-relative pb-1"
          style={{
            fontSize: "2.25rem",
            letterSpacing: "1px",
            color: "#000000",
            textAlign: "center",
          }}
        >
          Contact{" "}
          <span style={{ color: "#FF6B6B", fontWeight: "700" }}>Me!</span>
        </h2>

        {/* Form */}
        <div
          className="d-flex justify-content-center mx-auto rounded shadow p-3 pb-0 mt-5 form-container"
          style={{
            width: "50%",
            backgroundColor: "#fff",
          }}
        >
          <form onSubmit={onSubmit} className="p-3 w-100">
            <div className="d-flex flex-column flex-xl-row align-items-center justify-content-between">
              {/* Full Name Input */}
              <div className="d-flex flex-column w-100 w-md-50 me-xl-2 ms-2 ms-xl-0">
                <label htmlFor="username" className="fw-bold mt-3 mb-1">
                  Full Name
                </label>
                <input
                  id="username"
                  type="text"
                  name="name"
                  required
                  placeholder="Please Enter Your Full Name"
                  className="rounded p-3"
                  style={{
                    backgroundColor: "rgba(240,240,240,0.5)",
                    color: "#000",
                    outline: "none",
                    border: "1px solid rgba(0,0,0,0.5)",
                  }}
                  value={userName}
                  onChange={handleUserNameChange}
                />
              </div>

              {/* Mobile Input */}
              <div className="d-flex flex-column w-100 w-md-50 ms-2">
                <label htmlFor="phone" className="fw-bold mt-3 mb-1">
                  Contact No.
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91-1234567890"
                  className="rounded p-3"
                  style={{
                    backgroundColor: "rgba(240,240,240,0.5)",
                    color: "#000000",
                    outline: "none",
                    border: "1px solid rgba(0,0,0,0.5)",
                  }}
                  pattern="[0-9]{10,13}"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="d-flex flex-column">
              <label htmlFor="user-email" className="fw-bold mt-3 mb-1">
                Email
              </label>
              <input
                id="user-email"
                type="email"
                name="email"
                required
                placeholder="Please Enter Your Email Address"
                className="rounded p-3"
                style={{
                  backgroundColor: "rgba(240,240,240,0.5)",
                  color: "#000",
                  outline: "none",
                  border: "1px solid rgba(0,0,0,0.5)",
                  textTransform: "lowercase",
                }}
              />
            </div>

            {/* Textarea */}
            <div>
              <label htmlFor="message" className="fw-bold mt-3 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="w-100 rounded p-3"
                placeholder="Please Enter Your Query"
                style={{
                  height: "200px",
                  minHeight: "200px",
                  backgroundColor: "rgba(240,240,240,0.5)",
                  color: "#000",
                  outline: "none",
                  border: "1px solid rgba(0,0,0,0.5)",
                }}
              ></textarea>
            </div>

            {/* Subject Text Input */}
            <input
              type="hidden"
              name="subject"
              value={`Portfolio Query - ${userName}`}
            ></input>
            {/* Google Captcha */}
            <div className="d-flex justify-content-center align-items-center flex-column recaptcha-container">
              <ReCAPTCHA
                ref={recaptchaRef}
                className="my-2 mx-auto"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={(token) => {
                  setRecaptchaToken(token);
                }}
                loading="lazy"
              />

              {error && (
                <span
                  className="fw-bold"
                  style={{ color: "red", fontSize: "0.8rem" }}
                >
                  {error}
                </span>
              )}
            </div>

            {/* Submit Btn */}
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="success-btn my-4 fw-bold"
                disabled={formStatus ? true : false}
                style={{ opacity: formStatus ? "0.8" : "1" }}
              >
                {formStatus ? (
                  <div
                    className="spinner-border text-light"
                    role="status"
                    style={{ height: "1.5rem", width: "1.5rem" }}
                  ></div>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>
        <SuccessModal setShow={setShow} show={show} userName={modalUser} />
      </div>
    </>
  );
}

export default Contact;
