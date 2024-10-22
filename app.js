document.getElementById('generate-btn').addEventListener('click', function() {
    const topText = document.getElementById('top-text').value;
    const bottomText = document.getElementById('bottom-text').value;
    const canvas = document.getElementById('meme-canvas');
    const context = canvas.getContext('2d');
    const image = document.getElementById('meme-image');

    // Set canvas dimensions to match the image
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Set text style
    context.font = '40px Impact';
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.textAlign = 'center';

    // Add top text
    context.fillText(topText.toUpperCase(), canvas.width / 2, 50);
    context.strokeText(topText.toUpperCase(), canvas.width / 2, 50);

    // Add bottom text
    context.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
    context.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);

    // Show canvas
    canvas.style.display = 'block';
});

document.getElementById('image-upload').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgElement = document.getElementById('meme-image');
        imgElement.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});
