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
			const arrow = this.querySelector(".arrow"); // Select the arrow within the button

			// Check visibility to toggle
			if (fullText.classList.contains("hidden")) {
				// Show full text
				fullText.classList.remove("hidden");
				shortText.classList.add("hidden");
				arrow.src = "./assets/icons/up-arrow.png"; // Change to 'up' arrow
			} else {
				// Hide full text
				fullText.classList.add("hidden");
				shortText.classList.remove("hidden");
				arrow.src = "./assets/icons/down-arrow.png"; // Change to 'down' arrow
			}
			this.appendChild(arrow); // Append the arrow to ensure order
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	// Select the buttons and price display element
	const duration30Btn = document.getElementById("duration30");
	const duration50Btn = document.getElementById("duration50");
	const priceDisplay = document.getElementById("priceTherapy");

	// Add click event listener for the 30 min button
	duration30Btn.addEventListener("click", function () {
		priceDisplay.textContent = "140 zł"; // Update price
		this.classList.add("active"); // Mark as active
		duration50Btn.classList.remove("active"); // Remove active from the other button
	});

	// Add click event listener for the 50 min button
	duration50Btn.addEventListener("click", function () {
		priceDisplay.textContent = "200 zł"; // Update price
		this.classList.add("active"); // Mark as active
		duration30Btn.classList.remove("active"); // Remove active from the other button
	});
});
