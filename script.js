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
	// const buttons = document.querySelectorAll(".read-more-btn");
document.querySelectorAll('.read-more-btn').forEach(button => {
	button.addEventListener('click', () => {
		const container = button.closest('.services__list-item');
		const shortText = container.querySelector('.short-text');
		const fullText = container.querySelector('.full-text');
		const isExpanded = fullText.classList.contains('active-service');

		if (isExpanded) {
			fullText.classList.remove('active-service');
			shortText.classList.add('active-service');

		} else {
			shortText.classList.remove('active-service');
			fullText.classList.add('active-service');
		}
	});
});




	const slider = document.querySelector('.slider');
	const track = document.querySelector('.slider-track');
	const cards = document.querySelectorAll('.slider-track .card');
	const prevBtn = document.querySelector('.slider-btn--prev');
	const nextBtn = document.querySelector('.slider-btn--next');
	let currentIndex = 0;
	const visibleCards = 3; // Change this value for more/less visible cards

	function updateSlider() {
		const cardWidth = cards[0].offsetWidth + 16; // 16px margin, adjust if needed
		track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
	}

	prevBtn.addEventListener('click', function () {
		if (currentIndex > 0) {
			currentIndex--;
			updateSlider();
		}
	});

	nextBtn.addEventListener('click', function () {
		if (currentIndex < cards.length - visibleCards) {
			currentIndex++;
			updateSlider();
		}
	});

	// Optional: swipe support for mobile
	let startX = 0;
	slider.addEventListener('touchstart', function (e) {
		startX = e.touches[0].clientX;
	});
	slider.addEventListener('touchend', function (e) {
		let endX = e.changedTouches[0].clientX;
		if (endX < startX - 30) nextBtn.click();
		if (endX > startX + 30) prevBtn.click();
	});

	// Responsive: update on resize
	window.addEventListener('resize', updateSlider);

	updateSlider();
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
	let basePriceTerapia = 180; // Default to 30min price
	let currentQuantity = 1;

	// Function to update all card prices based on the selected quantity
	const updateAllPrices = () => {
		allPrices.forEach((priceEl) => {
			// Skip update if price text contains a range (e.g., "60-100 zł")
			if (!priceEl.textContent.includes("-")) {
				const card = priceEl.closest(".pricing__block-card");
				const basePrice = parseInt(priceEl.getAttribute("data-base-price"), 10);
				const fullPrice = basePrice * currentQuantity;
				let finalPrice = fullPrice;

				if ([5, 10].includes(currentQuantity)) {
					finalPrice *= 0.9;
				}

				priceEl.textContent = `${Math.round(finalPrice)} zł`;

				let oldPriceEl = card.querySelector(".old-price");
				if ([5, 10].includes(currentQuantity)) {
					if (!oldPriceEl) {
						oldPriceEl = document.createElement("div");
						oldPriceEl.className = "old-price";
						priceEl.parentNode.insertBefore(oldPriceEl, priceEl);
					}
					oldPriceEl.innerHTML = `<s>${fullPrice} zł</s>`;
					oldPriceEl.classList.remove("hidden");
				} else if (oldPriceEl) {
					oldPriceEl.classList.add("hidden");
				}
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
		// Skip initialization for price ranges
		if (!price.textContent.includes("-")) {
			const basePrice = parseInt(price.textContent);
			price.setAttribute("data-base-price", basePrice);
		}
	});

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


document.getElementById('openModalBtn').onclick = function() {
                    document.getElementById('aboutModal').style.display = 'block';
					document.body.style.overflow = 'hidden';
                };
                document.getElementById('closeModalBtn').onclick = function() {
                    document.getElementById('aboutModal').style.display = 'none';
					document.body.style.overflow = '';

                };
                window.onclick = function(event) {
                    var modal = document.getElementById('aboutModal');
                    if (event.target == modal) {
                        modal.style.display = 'none';
                    }
                };