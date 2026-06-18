import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, company, message } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'support@safetyguild.org',
      subject: `New Contact Form: ${firstName} ${lastName || ''}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0f172a; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #eab308; margin-bottom: 5px;">New Contact Form Submission</h2>
          <p style="color: #64748b; margin-top: 0; font-size: 14px;">Someone submitted a message via the Safety Guild website contact form.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          
          <table style="width: 100%; font-size: 15px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 6px 0;">${firstName} ${lastName || ''}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Company:</td>
              <td style="padding: 6px 0;">${company || 'Not specified'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #eab308; border-radius: 4px;">
            <p style="margin: 0; line-height: 1.6;">${message}</p>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">
            Sent from safetyguild.org contact form
          </p>
        </div>
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({ error: error.message });
  }
}
