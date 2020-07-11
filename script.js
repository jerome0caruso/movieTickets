const conatiner = document.querySelector(".container");//screen and seats
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count")//number in the text for tix qty
const total = document.getElementById("total")//acc. price of all tix
const movieSelect = document.getElementById("movie");//movie selector
let ticketPrice = parseInt(movieSelect.value);//Integer value of each movie price

populateUI();
function setMovieData(movieIndex, moviePrice){// sets LS with price and which movie/index
    localStorage.setItem("selectedIndex", movieIndex);
    localStorage.setItem("selectedPrice", moviePrice);
}

function updateSelectedCount() {// toggles the selected(blue)for each seat And changes the price and tix qty
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const seatsIndex = [...selectedSeats].map(seat =>[...seats].indexOf(seat));//selected seats gets indexed
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;//updates UI 
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI() {
    const seatsFromLS = JSON.parse(localStorage.getItem("selectedSeats"));//pulls sel seats from LS
    if(seatsFromLS !==null && seatsFromLS.length > 0) {
       seatsFromLS.map(index => seats[index].classList.add("selected"))//adds sel to each seat from LS
    }
    const selectedMovieIndex = localStorage.getItem("selectedIndex")
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;// grabs Movie/index from LS
    }
   
}
function changeTakenSeats() {
    
}


movieSelect.addEventListener("change", (e) => {// grabs ticket price and updates
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

conatiner.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {//contains???
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
})

updateSelectedCount();
