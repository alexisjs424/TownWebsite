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
    { name: "Board Meeting", date: "2024-03-21" },
    { name: "Presentation", date: "2024-03-25" },
    { name: "Presentation Numba 2", date: "2024-04-05" },
    // Add more events as needed
];

renderCalendar(currentMonth, currentYear);

prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

function renderCalendar(month, year) {
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

  for (let i = 1; i <= lastDayOfMonth; i++) { // Start from 1 instead of 0
    const day = document.createElement('div');
    day.textContent = i; // Remove the period after the date
    day.dataset.date = `${year}-${month + 1}-${i}`;
    day.classList.add('day');
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
  
  renderEvents(); // Call renderEvents after rendering the calendar
}

function getMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
}


// Function to render events
function renderEvents() {
  const eventsContainer = document.querySelector('.events-container');
  eventsContainer.innerHTML = ''; // Clear previous events

  events.forEach(event => {
    const eventBox = document.createElement('div');
    eventBox.classList.add('event-box');

    const eventDate = document.createElement('div');
    eventDate.classList.add('event-date');
    eventDate.textContent = event.date;

    const eventName = document.createElement('div');
    eventName.classList.add('event-name');
    eventName.textContent = event.name;

    eventBox.appendChild(eventDate);
    eventBox.appendChild(eventName);
    eventsContainer.appendChild(eventBox);
  });
}

// Call renderEvents function to initially render events
renderEvents();
