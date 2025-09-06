const axios = require('axios');

// Handle CAPTCHA verification
const verifyCaptcha = async (req, res) => {
  const { captchaToken } = req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;  // Ensure this key is set in your .env file
  const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

  if (!captchaToken) {
    return res.status(400).json({
      success: false,
      message: 'Captcha token is missing',
    });
  }

  try {
    const response = await axios.post(verifyUrl, null, {
      params: {
        secret: secretKey,
        response: captchaToken,
      },
    });

    const data = response.data;
    if (data.success) {
      res.json({ success: true });
    } else {
      res.status(400).json({
        success: false,
        message: 'CAPTCHA verification failed',
        errors: data['error-codes'],
      });
    }
  } catch (error) {
    console.error('Captcha verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during CAPTCHA verification',
      error: error.message,
    });
  }
};

module.exports = {
  verifyCaptcha,
};
