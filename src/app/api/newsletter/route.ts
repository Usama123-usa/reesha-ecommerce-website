import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 1. Email to the subscriber (Welcome/Thank You)
    const subscriberMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: `Welcome to Reesha Gifting- Be Part of the Story`,
      text: `Welcome to Reesha

Hello,

Thank you for subscribing to our newsletter! We truly appreciate you joining us.

We are glad to have you as part of Reesha Gifting. At this moment, our team is focused on bringing you thoughtful updates, inspiration, and meaningful stories through our occasional letters on the art of living, giving, and connecting.

Warm regards,
Reesha`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #eaeaea; border-radius: 16px; background-color: #FAFAF9;">
          <h2 style="color: #6C5F56; font-size: 24px; text-align: center; margin-bottom: 20px;">Welcome to Reesha</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333333;">Hello,</p>
          <p style="font-size: 16px; line-height: 1.6; color: #333333;">Thank you for subscribing to our newsletter! We truly appreciate you joining us.</p>
          <p style="font-size: 16px; line-height: 1.6; color: #333333;">We are glad to have you as part of Reesha Gifting. At this moment, our team is focused on bringing you thoughtful updates, inspiration, and meaningful stories through our occasional letters on the art of living, giving, and connecting.</p>
          <p style="font-size: 16px; line-height: 1.6; color: #333333; margin-top: 30px;">Warm regards,<br><strong style="color: #6C5F56;">Reesha</strong></p>
        </div>
      `,
    };

    // 2. Email to the owner (Notification)
    const ownerMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'emmadsaman@gmail.com',
      subject: `New Newsletter Subscriber: ${email}`,
      text: `A new user has subscribed to the Reesha newsletter: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>New Newsletter Subscriber</h3>
          <p><strong>Email Address:</strong> ${email}</p>
          <p>This user has requested to join the "Be Part of the Story" newsletter on the Reesha website.</p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(subscriberMailOptions),
      transporter.sendMail(ownerMailOptions)
    ]);

    return NextResponse.json(
      { message: 'Subscribed successfully!' },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  } catch (error: any) {
    console.error('SMTP Newsletter Error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
