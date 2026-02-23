// API endpoint to handle contact form submissions
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Log the complete message details (viewable in Vercel dashboard)
    console.log('🔔 NEW CONTACT FORM SUBMISSION');
    console.log('================================');
    console.log(`📧 From: ${name} <${email}>`);
    console.log(`📝 Subject: ${subject}`);
    console.log(`💬 Message: ${message}`);
    console.log(`🕐 Time: ${new Date().toISOString()}`);
    console.log(`🌐 IP: ${req.headers['x-forwarded-for'] || 'unknown'}`);
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