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

	// Select all quantity buttons and all card price displays
	const quantityBtns = document.querySelectorAll(".quantity-btn");
	const allPrices = document.querySelectorAll(".pricing__block-card-price");
	const allCards = document.querySelectorAll(".pricing__block-card");

	// Store the base price for Terapia indywidualna and initialize currentQuantity
	let basePriceTerapia = 140; // Default to 30min price
	let currentQuantity = 1;

	// Function to update all card prices based on the selected quantity
	const updateAllPrices = () => {
		allPrices.forEach((priceEl) => {
			const card = priceEl.closest(".pricing__block-card"); // Find the card element that contains the price element
			const basePrice = parseInt(priceEl.getAttribute("data-base-price"), 10);
			const fullPrice = basePrice * currentQuantity; // Calculate the full price without discount
			let finalPrice = fullPrice; // Initialize finalPrice with fullPrice

			// Check if the discount applies
			if ([5, 10].includes(currentQuantity)) {
				finalPrice *= 0.9; // Apply 10% discount
			}

			// Update the displayed price
			priceEl.textContent = `${Math.round(finalPrice)} zł`; // Update with the potentially discounted final price

			// Manage the old-price display
			let oldPriceEl = card.querySelector(".old-price"); // Try to find an existing old-price element within the card
			if ([5, 10].includes(currentQuantity)) {
				// If a discount applies, show or update the old price
				if (!oldPriceEl) {
					// If there's no old-price element, create it
					oldPriceEl = document.createElement("div");
					oldPriceEl.className = "old-price";
					priceEl.parentNode.insertBefore(oldPriceEl, priceEl); // Insert it before the current price element
				}
				oldPriceEl.innerHTML = `<s>${fullPrice} zł</s>`; // Set the content to the full price, crossed out
				oldPriceEl.classList.remove("hidden"); // Ensure it's visible
			} else if (oldPriceEl) {
				// If no discount applies, hide the old-price element if it exists
				oldPriceEl.classList.add("hidden");
			}
		});
	};

	// Function to show/hide first and last card based on selected quantity
	const updateCardVisibility = () => {
		const shouldHideCards = currentQuantity === 5 || currentQuantity === 10;
		if (allCards[0]) {
			allCards[0].style.display = shouldHideCards ? "none" : "";
			allCards[allCards.length - 1].style.display = shouldHideCards
				? "none"
				: "";
		}
	};

	// Initialize base prices and add data-base-price attribute to each card price
	allPrices.forEach((price) => {
		const basePrice = parseInt(price.textContent);
		price.setAttribute("data-base-price", basePrice);
	});

	const priceDisplayTherapia = document.getElementById("priceTherapy");

	// Event listeners for duration buttons
	function updateTerapiaPrice() {
		let finalPrice = basePriceTerapia * currentQuantity; // Calculate the price based on current settings
		const oldPriceElement = document.querySelector(
			".terapia-indywidualna .old-price"
		);

		if ([5, 10].includes(currentQuantity)) {
			// Only show old price if a discount applies
			finalPrice *= 0.9; // Apply discount
			if (!oldPriceElement) {
				// If old-price element doesn't exist, create it
				const oldPriceEl = document.createElement("div");
				oldPriceEl.className = "old-price";
				// Insert it in the correct place within the TERAPIA INDYWIDUALNA card
				const priceContainer = document.querySelector(
					".terapia-indywidualna .pricing__block-card-price"
				).parentNode;
				priceContainer.insertBefore(oldPriceEl, priceContainer.firstChild); // Adjust as necessary
			}
			// Update old-price content
			oldPriceElement.innerHTML = `<s>${
				basePriceTerapia * currentQuantity
			} zł</s>`;
			oldPriceElement.classList.remove("hidden");
		} else {
			// Hide old-price element if no discount applies
			if (oldPriceElement) oldPriceElement.classList.add("hidden");
		}

		// Update the displayed current price
		document.getElementById("priceTherapy").textContent = `${Math.round(
			finalPrice
		)} zł`;
	}

	[duration30Btn, duration50Btn].forEach((btn) => {
		btn?.addEventListener("click", function () {
			// Remove 'active' class from both buttons, then add it back to the clicked one
			[duration30Btn, duration50Btn].forEach((button) =>
				button.classList.remove("active")
			);
			this.classList.add("active");

			// Update basePriceTerapia based on selected button
			basePriceTerapia = parseInt(this.getAttribute("data-price"), 10);

			// Call function to update TERAPIA INDYWIDUALNA pricing and old-price display
			updateTerapiaPrice();
		});
	});

	// Event listeners for quantity buttons
	// Inside your DOMContentLoaded event listener, within the quantity button click event handler:
	quantityBtns.forEach((btn) => {
		btn.addEventListener("click", function () {
			currentQuantity = parseInt(this.getAttribute("data-quantity"));

			// Since you're handling discounts differently now:
			// Update the displayed prices without applying the discount directly in the calculation
			const fullPrice = basePriceTerapia * currentQuantity; // Calculate full price

			// Optionally handle displaying discounted prices in a separate element if applicable

			// Now, manage visibility of discount descriptions and old prices based on the current quantity
			const hasDiscount = currentQuantity === 5 || currentQuantity === 10;
			document.querySelectorAll(".discount-desc").forEach((desc) => {
				desc.classList.toggle("hidden", !hasDiscount);
			});
			document.querySelectorAll(".old-price").forEach((oldPrice) => {
				if (hasDiscount) {
					oldPrice.innerHTML = `<s>${fullPrice} zł</s>`;
					oldPrice.classList.remove("hidden");
				} else {
					oldPrice.classList.add("hidden");
				}
			});

			currentQuantity = parseInt(this.getAttribute("data-quantity"), 10);

			// Make the 30-minute button active
			duration30Btn.classList.add("active");
			if (duration50Btn) {
				duration50Btn.classList.remove("active");
			}

			// Set basePriceTerapia to the 30-minute session price
			basePriceTerapia = parseInt(duration30Btn.getAttribute("data-price"), 10);

			// Proceed with updating all card prices and visibility as before
			updateAllPrices();
			updateCardVisibility();
			quantityBtns.forEach((btn) => btn.classList.remove("active"));
			this.classList.add("active");
		});
	});

	// Initial updates
	updateAllPrices();
	updateCardVisibility();
});

document.addEventListener("DOMContentLoaded", function () {
	const certificates = document.querySelectorAll(".certificate");

	certificates.forEach((certificate) => {
		certificate.addEventListener("click", function () {
			console.log("object");
			const src = this.src;
			const overlay = document.createElement("div");
			overlay.classList.add("fullscreen-overlay");
			overlay.innerHTML = `<img src="${src}" alt="Full Screen Certificate">`;
			document.body.appendChild(overlay);
			overlay.style.display = "flex";

			overlay.addEventListener("click", function () {
				document.body.removeChild(overlay);
			});
		});
	});
});
