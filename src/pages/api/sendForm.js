import { getCookie, deleteCookie } from "cookies-next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // return res.status(405).json({ message: "Method Not Allowed" });
    return res.redirect("/");
  }

  // ✅ Check if CAPTCHA was already verified within the last 2 minutes
  const captchaVerified = getCookie("captchaVerified", { req, res });

  if (!captchaVerified) {
    return res.status(400).json({
      success: false,
      message: "CAPTCHA verification expired or missing",
    });
  }

  if (req.method === "POST") {
    const formData = req.body;

    formData.access_key = process.env.FORM_KEY;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Clear the CAPTCHA cookie after successful submission
      deleteCookie("captchaVerified", { req, res });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
