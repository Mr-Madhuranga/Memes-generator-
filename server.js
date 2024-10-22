const express = require('express');
const multer = require('multer');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const fs = require('fs');

// Setup express
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Save with timestamp
    }
});
const upload = multer({ storage: storage });

// API to handle meme generation
app.post('/generate-meme', upload.single('image'), async (req, res) => {
    const topText = req.body.topText.toUpperCase();
    const bottomText = req.body.bottomText.toUpperCase();
    const imagePath = req.file.path;

    try {
        // Load the uploaded image
        const image = await loadImage(imagePath);

        // Create a canvas and draw the image
        const canvas = createCanvas(image.width, image.height);
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);

        // Set text styles
        context.font = '40px Impact';
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.textAlign = 'center';

        // Add top text
        context.fillText(topText, image.width / 2, 50);
        context.strokeText(topText, image.width / 2, 50);

        // Add bottom text
        context.fillText(bottomText, image.width / 2, image.height - 30);
        context.strokeText(bottomText, image.width / 2, image.height - 30);

        // Save the generated meme as an image
        const outputFilePath = `./memes/${Date.now()}-meme.png`;
        const out = fs.createWriteStream(outputFilePath);
        const stream = canvas.createPNGStream();
        stream.pipe(out);

        out.on('finish', () => {
            res.json({ success: true, url: outputFilePath });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error generating meme' });
    }
});

// Create necessary directories if not exist
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
if (!fs.existsSync('./memes')) fs.mkdirSync('./memes');

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
