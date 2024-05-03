let isRented = false;

function toggleRentStatus() {
  isRented = !isRented;
  updateRentButton();
}

function updateRentButton() {
  const rentButton = document.getElementById("rentButton");
  if (isRented) {
    rentButton.classList.remove("btn-success");
    rentButton.classList.add("btn-danger");
    rentButton.textContent = "Déjà Loué";
  } else {
    rentButton.classList.remove("btn-danger");
    rentButton.classList.add("btn-success");
    rentButton.textContent = "Louer";
  }
}

document
  .getElementById("rentButton")
  .addEventListener("click", toggleRentStatus);
