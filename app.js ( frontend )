document.getElementById('generate-btn').addEventListener('click', function() {
    const topText = document.getElementById('top-text').value;
    const bottomText = document.getElementById('bottom-text').value;
    const fileInput = document.getElementById('image-upload');
    
    // Ensure that an image is selected
    if (!fileInput.files.length) {
        alert('Please upload an image!');
        return;
    }

    const formData = new FormData();
    formData.append('topText', topText);
    formData.append('bottomText', bottomText);
    formData.append('image', fileInput.files[0]);

    // Send image and text data to the server
    fetch('/generate-meme', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Display the generated meme
            const memeImage = document.getElementById('meme-image');
            memeImage.src = data.url;
            memeImage.style.display = 'block'; // Ensure it's visible
        } else {
            alert('Failed to generate meme. Try again!');
        }
    })
    .catch(err => {
        console.error('Error:', err);
    });
});

// Handle image upload and display the selected image on the screen
document.getElementById('image-upload').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgElement = document.getElementById('meme-image');
        imgElement.src = event.target.result;
        imgElement.style.display = 'block';  // Ensure image is visible
    };
    reader.readAsDataURL(e.target.files[0]);
});
