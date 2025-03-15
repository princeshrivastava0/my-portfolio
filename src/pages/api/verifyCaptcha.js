import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // return res.status(405).json({ message: "Method Not Allowed" });
    return res.redirect("/");
  }

  const { recaptchaToken } = req.body;

  if (!recaptchaToken) {
    return res
      .status(400)
      .json({ success: false, message: "Missing CAPTCHA token" });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

  try {
    const captchaResponse = await fetch(verificationURL, { method: "POST" });
    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return res
        .status(400)
        .json({ success: false, message: "CAPTCHA verification failed" });
    }

    setCookie("captchaVerified", "true", {
      req,
      res,
      maxAge: 120, // 2 minutes (120 seconds)
      httpOnly: true, // Prevent client-side access
      secure: true, // Only send over HTTPS
      sameSite: "Strict", // Prevent CSRF attacks
    });

    return res.status(200).json({ success: true, message: "CAPTCHA verified" });
  } catch (error) {
    console.error("Error verifying CAPTCHA:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
