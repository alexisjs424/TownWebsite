// JavaScript for the slideshow

// Initialize slide index
let slideIndex = 0;
showSlides();

// Function to display slides
function showSlides() {
  let slides = document.getElementsByClassName("mySlides");

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.opacity = 0;  
  }

  // Increment slide index and reset to 0 if exceeds number of slides
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }    

  // Display current slide with fading effect
  slides[slideIndex - 1].style.opacity = 1;  

  // Call showSlides function again after a certain interval
  setTimeout(showSlides, 5000); // Change slide every 5 seconds (adjust as needed)
}
