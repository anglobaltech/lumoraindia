import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Parse the incoming request body
    const { name, email, phone, message } = await req.json();

    // 1. Create a transporter using Gmail settings
    // Ensure EMAIL_USER and EMAIL_PASS are set in your .env.local
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // 2. Setup email data
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Sent FROM your auth email (Gmail requirement)
      to: ["mail@anglobalservices.com", "info@anglobalservices.com"],   // Destination email
      replyTo: email,                               // VERY IMPORTANT: Allows you to click 'Reply' to email the customer
      subject: `Lumora India: New Inquiry from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #ec4899; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Website Inquiry</h1>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #333;">You have received a new message from the <strong>Lumora India</strong> contact form.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 100px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #333;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #333;">${phone}</td>
              </tr>
            </table>

            <p style="margin-top: 25px; color: #666;"><strong>Message:</strong></p>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #ec4899; color: #444; line-height: 1.6;">
              ${message}
            </div>
          </div>
          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #999;">
            This email was generated from your website contact form.
          </div>
        </div>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Nodemailer Error Details:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}