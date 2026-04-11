import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { orderId, user, address, cartItems, totals, paymentMethod } = await request.json();
    
    // Create Nodemailer Transporter
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

    // Generate HTML list of Cart Items
    const itemsHtml = cartItems.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name || "Product"} (x${item.quantity || 1})</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price * (item.quantity || 1)}</td>
      </tr>
    `).join('');

    // Setup Email Data
    const mailOptions = {
      from: `"Lumora India" <${process.env.EMAIL_USER}>`, 
      to: user?.email || process.env.EMAIL_USER, 
      bcc: "rishuchauhan1535@gmail.com", 
      subject: `Order Confirmed! Your Lumora India Order #${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #ec4899; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Order Confirmed! 🎉</h1>
            <p style="margin: 5px 0 0 0;">Order ID: ${orderId}</p>
          </div>
          <div style="padding: 20px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #333;">Hi ${user?.name || "Customer"},</p>
            <p style="color: #666;">Thank you for shopping with Lumora India! We've received your order and are getting it ready for dispatch.</p>
            
            <h3 style="color: #333; margin-top: 30px; border-bottom: 2px solid #ec4899; display: inline-block; padding-bottom: 5px;">Order Summary</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              ${itemsHtml}
              <tr>
                <td style="padding: 10px; font-weight: bold;">Shipping:</td>
                <td style="padding: 10px; text-align: right;">${totals.shippingFee === 0 ? 'FREE' : `₹${totals.shippingFee}`}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; font-size: 18px; color: #ec4899;">Total Paid (${paymentMethod}):</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; font-size: 18px;">₹${totals.finalAmount}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; background-color: #f9f9f9; padding: 15px; border-radius: 8px;">
              <h4 style="margin: 0 0 10px 0; color: #333;">Delivery Address:</h4>
              <p style="margin: 0; color: #666; line-height: 1.5;">
                ${user?.name || "Customer"}<br>${address}<br>Phone: ${user?.phone || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Order email sent successfully!"
    }, { status: 200 });

  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}