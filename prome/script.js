document.getElementById("waitlistForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
  
    // Simple simulation of form submission
    console.log(`User signed up: ${name}, ${email}`);
  
    // Show a thank-you message
    document.getElementById("thankYouMessage").style.display = "block";
  
    // Clear the form
    document.getElementById("waitlistForm").reset();
  });
  