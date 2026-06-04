import { Resend } from 'resend';

// Use environment variable first, then fallback to user's provided API key
const resend = new Resend(process.env.RESEND_API_KEY );

export default async function handler(req, res) {
  // CORS configurations (essential so frontend can trigger it during local testing/preview)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Preflight check
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, jobTitle, rating, text } = req.body;

  if (!name || !text || !rating) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'Austinrlawler@gmail.com',
      subject: `New Testimonial: ${name} (${rating} Stars)`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0f172a; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #eab308; margin-bottom: 5px;">New Testimonial Submitted</h2>
          <p style="color: #64748b; margin-top: 0; font-size: 14px;">A student/client has submitted feedback on the Safety Guild website.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          
          <table style="width: 100%; font-size: 15px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 6px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Job / Company:</td>
              <td style="padding: 6px 0;">${jobTitle || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Rating:</td>
              <td style="padding: 6px 0; color: #eab308;">${'★'.repeat(rating)} (${rating}/5)</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #eab308; border-radius: 4px;">
            <p style="margin: 0; font-style: italic; line-height: 1.6;">"${text}"</p>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">
            To publish this testimonial live on the website, go to your site with "?admin=true" added to the URL and enter your password to edit and approve.
          </p>
        </div>
      `
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: error.message });
  }
}
