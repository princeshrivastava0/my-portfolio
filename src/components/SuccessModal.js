import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";

function SuccessModal({ setShow, show, userName }) {
  useEffect(() => {
    const preventScroll = (event) => {
      event.preventDefault();
    };

    if (show) {
      document.body.style.paddingRight = "0px"; // Prevents width shift
    } else {
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.paddingRight = "0px";
    };
  }, [show]);

  return (
    <>
      <style jsx global>
        {`
          .success-modal {
            overflow: hidden;
            border-radius: 25px;
          }
        `}
      </style>
      {/* Success Modal */}
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        contentClassName="success-modal"
        keyboard={true}
        onHide={() => setShow(false)}
        animation
        className="personal_profile_modal call_details_modal black-modal px-3"
      >
        <Modal.Header
          style={{
            backgroundColor: "#171717",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            border: "none",
            color: "#fff",
            padding: "20px 0",
          }}
          className="position-relative"
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-center w-100 fw-bold"
            style={{ fontSize: "1rem" }}
          >
            {/* Success Heading */}
            Submission Successful!
          </Modal.Title>

          {/* Close Btn */}
          <button
            className="position-absolute"
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontSize: "1.5rem",
              right: "20px",
            }}
            onClick={() => setShow(false)}
          >
            <i className="bi bi-x-octagon"></i>
          </button>
        </Modal.Header>
        <Modal.Body style={{}} className="p-3 text-center fw-bold">
          Thank you for reaching out,
          {userName && (
            <>
              &nbsp;
              <span
                className="fw-bold"
                style={{ color: "#FF6B6B", textTransform: "capitalize" }}
              >
                {userName}!
              </span>
            </>
          )}
          &nbsp;We have received your message and will get back to you shortly.
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SuccessModal;
