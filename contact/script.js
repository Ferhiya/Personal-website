document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Display alert message
    alert('Thank you, ' + name + '! Your message has been submitted.');

    // Reset form fields
    document.getElementById('contactForm').reset();
});
