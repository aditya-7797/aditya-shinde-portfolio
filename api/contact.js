// Simple contact form handler - No dependencies required!
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Log the complete message details (viewable in Vercel dashboard)
    console.log('🔔 NEW CONTACT FORM SUBMISSION');
    console.log('================================');
    console.log(`📧 From: ${name} <${email}>`);
    console.log(`📝 Subject: ${subject}`);
    console.log(`💬 Message: ${message}`);
    console.log(`🕐 Time: ${new Date().toISOString()}`);
    console.log('================================');

    return res.status(200).json({ 
      message: 'Message sent successfully! I will get back to you soon.',
      success: true 
    });

  } catch (error) {
    console.error('❌ Form submission error:', error);
    return res.status(500).json({ 
      message: 'Error sending message. Please try again.',
      success: false 
    });
  }
}