import nodemailer from "nodemailer";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !phone || !email || !message) {
      return Response.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.RECEIVER_EMAIL) {
      return Response.json(
        { error: "Email service is not configured yet." },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Sahadat Media" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `New project inquiry from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #0f172a; padding: 32px;">
          <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 18px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #f97316, #ec4899); color: #ffffff; padding: 28px;">
              <h1 style="margin: 0; font-size: 24px;">New Portfolio Contact Request</h1>
              <p style="margin: 8px 0 0;">A visitor wants to discuss a video editing project.</p>
            </div>
            <div style="padding: 28px; color: #1f2937;">
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Phone:</strong> ${safePhone}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <div style="margin-top: 22px;">
                <strong>Message:</strong>
                <p style="line-height: 1.7; white-space: pre-wrap;">${safeMessage}</p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    return Response.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
