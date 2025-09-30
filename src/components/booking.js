const monthYear = document.getElementById("month-year");
const daysContainer = document.getElementById("days");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

const checkInDisplay = document.getElementById("check-in");
const checkOutDisplay = document.getElementById("check-out");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let checkInDate = null;
let checkOutDate = null;

const clearBtn = document.getElementById("clear-selection");
const reserveBtn = document.getElementById("reserve-dates");

const reservedDates = [
    "2025-10-05",
    "2025-10-12",
    "2025-10-18"
];

clearBtn.addEventListener("click", () => {
    checkInDate = null;
    checkOutDate = null;
    updateDisplay();
    renderCalendar(currentMonth, currentYear);
});

reserveBtn.addEventListener("click", () => {
    if(checkInDate && checkOutDate){
        
        const checkInStr = formatDate(checkInDate);
        const checkOutStr = formatDate(checkOutDate);
        
        alert(`Reservado desde ${checkInStr} hasta ${checkOutStr}`);

        let tempDate = new Date(checkInDate);
        while(tempDate <= checkOutDate){
            reservedDates.push(tempDate.toISOString().split('T')[0]);
            tempDate.setDate(tempDate.getDate() + 1);
        }

        checkInDate = null;
        checkOutDate = null;
        updateDisplay();
        renderCalendar(currentMonth, currentYear);
    } else {
        alert("Selecciona check-in y check-out antes de reservar.");
    }
});

function renderCalendar(month, year) {
    daysContainer.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    monthYear.textContent = `${monthNames[month]} ${year}`;

    let startDay = firstDay === 0 ? 6 : firstDay - 1;

    // Días vacíos
    for(let i=0; i<startDay; i++){
        const emptyDiv = document.createElement("div");
        daysContainer.appendChild(emptyDiv);
    }

    for(let d=1; d<=daysInMonth; d++){
    const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const dayDiv = document.createElement("div");
    dayDiv.textContent = d;

    if(reservedDates.includes(dateStr)){
        dayDiv.classList.add("reserved");
    } else {
        dayDiv.addEventListener("click", () => handleDateClick(dateStr));
    }

    const dayObj = new Date(dateStr);

    if(checkInDate && checkOutDate){
        if(dayObj.getTime() === checkInDate.getTime()){
            dayDiv.classList.add("check-in");
        } else if(dayObj.getTime() === checkOutDate.getTime()){
            dayDiv.classList.add("check-out");
        } else if(dayObj > checkInDate && dayObj < checkOutDate){
            dayDiv.classList.add("in-range");
        }
    } else if(checkInDate && dayObj.getTime() === checkInDate.getTime()){
        dayDiv.classList.add("check-in");
    }

    daysContainer.appendChild(dayDiv);
}
}

function handleDateClick(dateStr) {
    const clickedDate = new Date(dateStr);

    if(!checkInDate || (checkInDate && checkOutDate)){
        checkInDate = clickedDate;
        checkOutDate = null;
    } else if(clickedDate > checkInDate){
        checkOutDate = clickedDate;
    } else {

        checkInDate = clickedDate;
        checkOutDate = null;
    }

    updateDisplay();
    renderCalendar(currentMonth, currentYear);
}

function updateDisplay() {
    checkInDisplay.textContent = checkInDate ? formatDate(checkInDate) : "--/--/----";
    checkOutDisplay.textContent = checkOutDate ? formatDate(checkOutDate) : "--/--/----";
}

function formatDate(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return `${String(d).padStart(2,"0")}/${String(m).padStart(2,"0")}/${y}`;
}

prevBtn.addEventListener("click", () => {
    currentMonth--;
    if(currentMonth < 0){
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener("click", () => {
    currentMonth++;
    if(currentMonth > 11){
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});


renderCalendar(currentMonth, currentYear);