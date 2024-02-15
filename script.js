// Get the select element
const languageSelect = document.getElementById("languageSelect");

// Add event listener to handle language change
languageSelect.addEventListener("change", function () {
	// Get the selected language value
	const selectedLanguage = this.value;

	// Redirect to the corresponding page for the selected language
	if (selectedLanguage === "ua") {
		window.location.href = "index_ua.html"; // Redirect to the Ukrainian version
	} else if (selectedLanguage === "pl") {
		window.location.href = "index.html"; // Redirect to the Polish version
	}
});

let acc = document.getElementsByClassName("accordion-item");

for (let i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {
		this.classList.toggle("active");
		let panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
}

const toggleBtn = document.querySelector(".burger");
const toggleBtnIcon = document.querySelector(".burger img");
const dropDownMenu = document.querySelector(".dropdown-menu");

toggleBtn.addEventListener("click", () => {
	dropDownMenu.classList.toggle("open");
	const isOpen = dropDownMenu.classList.contains("open");

	toggleBtnIcon.classList = isOpen
		? (toggleBtnIcon.src = "./assets/icons/close.png")
		: (toggleBtnIcon.src = "./assets/icons/burger.png");
});

// Read more functionality

document.addEventListener("DOMContentLoaded", function () {
	const buttons = document.querySelectorAll(".read-more-btn");
	buttons.forEach(function (button) {
		button.addEventListener("click", function () {
			// Directly find the short-text and full-text related to this button
			const parentParagraph = this.parentNode;
			const fullText = parentParagraph.querySelector(".full-text");
			const shortText = parentParagraph.querySelector(".short-text");

			// Check visibility to toggle
			if (fullText.classList.contains("hidden")) {
				// Show full text
				fullText.classList.remove("hidden");
				shortText.classList.add("hidden");
			} else {
				// Hide full text
				fullText.classList.add("hidden");
				shortText.classList.remove("hidden");
			}
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	// Select duration buttons and price display for Terapia indywidualna
	const duration30Btn = document.getElementById("duration30");
	const duration50Btn = document.getElementById("duration50");
	const priceDisplayTherapia = document.getElementById("priceTherapy");

	// Select all quantity buttons and all card price displays
	const quantityBtns = document.querySelectorAll(".quantity-btn");
	const allPrices = document.querySelectorAll(".pricing__block-card-price");
	const allCards = document.querySelectorAll(".pricing__block-card");

	// Store the base price for Terapia indywidualna and initialize currentQuantity
	let basePriceTerapia = 140; // Default to 30min price
	let currentQuantity = 1;

	// Function to update price for Terapia indywidualna based on duration and quantity
	const updateTerapiaPrice = () => {
		const newPrice = basePriceTerapia * currentQuantity;
		priceDisplayTherapia.textContent = `${newPrice} zł`;
	};

	// Function to update all card prices based on the selected quantity
	const updateAllPrices = () => {
		allPrices.forEach((price) => {
			const basePrice = parseInt(price.getAttribute("data-base-price"));
			const newPrice = basePrice * currentQuantity;
			price.textContent = `${newPrice} zł`;
		});
	};

	// Function to show/hide first and last card based on selected quantity
	const updateCardVisibility = () => {
		// Hide first and last card for quantities 5 and 10
		const shouldHideCards = currentQuantity === 5 || currentQuantity === 10;
		allCards[0].style.display = shouldHideCards ? "none" : ""; // First card
		allCards[allCards.length - 1].style.display = shouldHideCards ? "none" : ""; // Last card
	};

	// Initialize base prices and add data-base-price attribute to each card price
	allPrices.forEach((price) => {
		const basePrice = parseInt(price.textContent);
		price.setAttribute("data-base-price", basePrice);
	});

	// Event listeners for duration buttons
	[duration30Btn, duration50Btn].forEach((btn) => {
		btn.addEventListener("click", function () {
			// Update basePriceTerapia based on the clicked button's data-price attribute
			basePriceTerapia = parseInt(this.getAttribute("data-price"));

			// Set active class on clicked button and remove from the other
			duration30Btn.classList.toggle("active", this === duration30Btn);
			duration50Btn.classList.toggle("active", this === duration50Btn);

			// Update the Terapia indywidualna price display
			updateTerapiaPrice();
		});
	});

	// Event listeners for quantity buttons
	quantityBtns.forEach((btn) => {
		btn.addEventListener("click", function () {
			// Update currentQuantity based on the clicked button's data-quantity attribute
			currentQuantity = parseInt(this.getAttribute("data-quantity"));

			// Update prices across all cards and for Terapia indywidualna
			updateAllPrices();
			updateTerapiaPrice();
			updateCardVisibility(); // Update card visibility based on the current quantity

			// Reset active class on all quantity buttons and set it on the clicked one
			quantityBtns.forEach((btn) => btn.classList.remove("active"));
			this.classList.add("active");
		});
	});

	// Initial updates
	updateTerapiaPrice();
	updateAllPrices();
	updateCardVisibility(); // Ensure the card visibility is correct on initial load
});
