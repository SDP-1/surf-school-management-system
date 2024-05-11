const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');

router.get('/generateQRCode', async (req, res) => {
    try {
        const googleFormLink = 'https://docs.google.com/forms/d/e/1FAIpQLScRe6zScirXmWsO6y4zatGcKD7ImGDrrdK8wyY99FXQM6Q54Q/viewform?usp=sf_link';

        // Generate QR code with the Google Form link
        const qrCode = await QRCode.toDataURL(googleFormLink);
        
        res.json({ qrCode });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
