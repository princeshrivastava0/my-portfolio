import { useState } from "react";

function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "1c84f217-4afd-465c-b46f-f598e6dc50bf");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <>
      <style jsx>
        {`
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
            height: 49px;
            width: 199px;
            transform: translateY(1px);
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
            color: #fff;
            opacity: 0.7; /* Firefox */
          }

          ::-ms-input-placeholder {
            /* Edge 12 -18 */
            color: #fff;
          }
        `}
      </style>
      <section
        id="contact"
        style={{ paddingTop: "120px", paddingBottom: "120px" }}
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
          className="d-flex justify-content-center mx-auto rounded shadow p-3 pb-0 mt-5"
          style={{ width: "50%", backgroundColor: "#fff" }}
        >
          <form onSubmit={onSubmit} className="p-3 w-100">
            <div className="d-flex align-items-center justify-content-between">
              {/* Full Name Input */}
              <div className="d-flex flex-column w-50 me-2">
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
                    backgroundColor: "#1F2022",
                    color: "#fff",
                    outline: "none",
                  }}
                />
              </div>

              {/* Mobile Input */}
              <div className="d-flex flex-column w-50 ms-2">
                <label htmlFor="phone" className="fw-bold mt-3 mb-1">
                  Contact No.
                </label>
                <input
                  id="phone"
                  type="number"
                  name="phone"
                  required
                  placeholder="+91-1234567890"
                  className="rounded p-3"
                  style={{
                    backgroundColor: "#1F2022",
                    color: "#fff",
                    outline: "none",
                  }}
                  min={10}
                  max={13}
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
                  backgroundColor: "#1F2022",
                  color: "#fff",
                  outline: "none",
                }}
              />
            </div>

            {/* Textarea */}
            <div>
              <label htmlFor="message" className="fw-bold mt-3 mb-1">
                Message
              </label>
              <textarea
                name="message"
                required
                className="w-100 rounded p-3"
                placeholder="Please Enter Your Query"
                style={{
                  height: "200px",
                  minHeight: "200px",
                  backgroundColor: "#1F2022",
                  color: "#fff",
                  outline: "none",
                }}
              ></textarea>
              <span></span>
            </div>

            {/* Access Key Input */}
            <input
              type="hidden"
              name="access_key"
              value="1c84f217-4afd-465c-b46f-f598e6dc50bf"
            ></input>

            {/* Subject Text Input */}
            <input
              type="hidden"
              name="subject"
              value="New Query from My Portfolio"
            ></input>

            {/* Submit Btn */}
            <div className="d-flex justify-content-center">
              <button type="submit" className="action-btn my-4 fw-bold">
                Send Message
              </button>
            </div>
          </form>
          <span>{result}</span>
        </div>
      </section>
    </>
  );
}

export default Contact;
