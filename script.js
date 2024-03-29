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
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const currentMonthYear = document.getElementById('currentMonthYear');
const daysOfWeekContainer = document.getElementById('daysOfWeek'); 
const calendarDays = document.getElementById('calendarDays');

const eventBox1 = document.getElementById('eventBox1'); // Reference to the event box for event 1
const eventBox2 = document.getElementById('eventBox2'); // Reference to the event box for event 2
const eventBox3 = document.getElementById('eventBox3'); // Reference to the event box for event 3

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
const events = [
    { name: "Board Meeting", date: "2024-03-21",time: "12:00 PM" },
    { name: "Presentation", date: "2024-03-25",time: "10:00 AM" },
    { name: "Town Hall", date: "2024-03-10",time: "4:00 PM" },
    { name: "Board Meeting", date: "2024-04-05",time: "1:00 PM" },
    { name: "Board Meeting", date: "2024-05-09",time: "3:00 PM" },
    // Add more events as needed
];

// Highlighting specific days
const highlightedDays = ["2024-03-21", "2024-03-25"];

renderCalendar(currentMonth, currentYear, events, highlightedDays);

prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear, events, highlightedDays);
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear, events, highlightedDays);
});

function renderCalendar(month, year, events, highlightedDays = []) {
  currentMonthYear.textContent = `${getMonthName(month)} ${year}`;
  daysOfWeekContainer.innerHTML = '';

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  daysOfWeek.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = day;
    daysOfWeekContainer.appendChild(dayElement);
  });

  calendarDays.innerHTML = '';

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  for (let i = 1; i <= firstDayOfMonth; i++) {
    const prevMonthDay = document.createElement('div');
    prevMonthDay.textContent = daysInPrevMonth - firstDayOfMonth + i;
    prevMonthDay.classList.add('day', 'prev-month-day');
    calendarDays.appendChild(prevMonthDay);
  }

  for (let i = 1; i <= lastDayOfMonth; i++) {
    const day = document.createElement('div');
    day.textContent = i;
    day.dataset.date = `${year}-${month + 1}-${i}`;
    day.classList.add('day');

    // Check if the current day has events
    const eventForDay = events.find(event => event.date === day.dataset.date);
    if (eventForDay) {
      day.classList.add('event-day'); // Add a class to indicate an event day
    }

    // Check if the current day is in the list of highlighted days
    if (highlightedDays.includes(`${year}-${month + 1}-${i}`)) {
      day.classList.add('highlighted-day');
    }

    calendarDays.appendChild(day);
  }

  const totalDaysRendered = firstDayOfMonth + lastDayOfMonth;
  const remainingDays = 42 - totalDaysRendered;

  for (let i = 1; i <= remainingDays; i++) {
    const nextMonthDay = document.createElement('div');
    nextMonthDay.textContent = i;
    nextMonthDay.classList.add('day', 'next-month-day');
    calendarDays.appendChild(nextMonthDay);
  }
  
  renderEvents(month, year, events); // Call renderEvents after rendering the calendar
}


function getMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
}

function renderEvents(month, year, events) {
  const eventsContainer = document.querySelector('.events-container');
  eventsContainer.innerHTML = '';

  // Filter events for the displayed month
  const eventsForMonth = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === month && eventDate.getFullYear() === year;
  });

  eventsForMonth.forEach(event => {
    const eventBox = document.createElement('div');
    eventBox.classList.add('event-box');

    const dateContainer = document.createElement('div'); // Create a container for the date
    dateContainer.classList.add('date-container');

    const eventDate = document.createElement('div');
    eventDate.classList.add('event-date');
    const monthAbbreviation = new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase();
    eventDate.textContent = monthAbbreviation;

    const eventFullDate = document.createElement('div');
    eventFullDate.classList.add('event-full-date');
    eventFullDate.textContent = new Date(event.date).getDate() +1;

    dateContainer.appendChild(eventDate);
    dateContainer.appendChild(eventFullDate);
    eventBox.appendChild(dateContainer);

    const eventDetails = document.createElement('div');
    eventDetails.classList.add('event-details');

    const eventName = document.createElement('div');
    eventName.classList.add('event-name');
    eventName.textContent = event.name;

    const eventTime = document.createElement('div');
    eventTime.classList.add('event-time');
    eventTime.textContent = event.time;

    eventDetails.appendChild(eventName);
    eventDetails.appendChild(eventTime);
    eventBox.appendChild(eventDetails);

    // Append the event box to the events container
    eventsContainer.appendChild(eventBox);
  });
}



document.addEventListener("DOMContentLoaded", function () {
  const carouselContainer = document.querySelector(".carousel-container");
  const announcements = document.querySelectorAll(".announcement");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const announcementWidth = announcements[0].offsetWidth; // Width of one announcement
  const carouselWidth = carouselContainer.offsetWidth; // Width of the visible carousel
  const numVisibleAnnouncements = Math.floor(carouselWidth / announcementWidth); // Number of announcements visible at once
  let currentIndex = 0;

  function moveCarousel() {
    currentIndex++;
    if (currentIndex >= announcements.length - numVisibleAnnouncements + 1) {
      currentIndex = 0;
    }
    const offset = -currentIndex * announcementWidth;
    carouselContainer.style.transform = `translateX(${offset}px)`;
  }

  function moveBackward() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = announcements.length - numVisibleAnnouncements;
    }
    const offset = -currentIndex * announcementWidth;
    carouselContainer.style.transform = `translateX(${offset}px)`;
  }

  nextButton.addEventListener("click", moveCarousel);
  prevButton.addEventListener("click", moveBackward);

  setInterval(moveCarousel, 4000);
});
