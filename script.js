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
	let currentQuantity = 1;
	const quantityBtns = document.querySelectorAll(".quantity-btn");
	const allCards = document.querySelectorAll(".pricing__block-card");

	// Helper: updates price for a single card
	function updateCardPrice(card) {
		const priceEl = card.querySelector(".pricing__block-card-price");
		const durationBtn = card.querySelector(".duration-btn.active");
		const oldPriceEl = card.querySelector(".old-price");

		if (!priceEl || priceEl.textContent.includes("-")) return;

		let basePrice;

		// Priority 1: use active duration button if available
		if (durationBtn) {
			basePrice = parseInt(durationBtn.getAttribute("data-price"), 10);
			priceEl.setAttribute("data-base-price", basePrice);
		} else {
			const existing = priceEl.getAttribute("data-base-price");
			if (existing) {
				basePrice = parseInt(existing, 10);
			} else {
				const match = priceEl.textContent.match(/(\d+)\s*zł/);
				basePrice = match ? parseInt(match[1], 10) : 0;
				priceEl.setAttribute("data-base-price", basePrice);
			}
		}

		priceEl.setAttribute("data-base-price", basePrice);

		let fullPrice = basePrice * currentQuantity;
		let finalPrice = fullPrice;
		let showOldPrice = false;

		// Special logic for "masaj" card
		if (
			priceEl.classList.contains("pricing__block-card-price-masaj") &&
			(currentQuantity === 5 || currentQuantity === 10)
		) {
			const paidQuantity = currentQuantity === 5 ? 4 : 9;
			finalPrice = basePrice * paidQuantity;
			showOldPrice = true;
		} else if (currentQuantity === 5) {
			finalPrice = fullPrice * 0.95; // 5% discount for 5-pack
			showOldPrice = true;
		} else if (currentQuantity === 10) {
			finalPrice = fullPrice * 0.9; // 10% discount for 10-pack
			showOldPrice = true;
		}

		priceEl.textContent = `${Math.round(finalPrice)} zł`;

		// Show/hide old price
		if (oldPriceEl) {
			if (showOldPrice) {
				oldPriceEl.innerHTML = `<s>${fullPrice} zł</s>`;
				oldPriceEl.classList.remove("hidden");
			} else {
				oldPriceEl.classList.add("hidden");
			}
		}
	}

	function updateAllCardPrices() {
		allCards.forEach((card) => {
			updateCardPrice(card);
		});
	}

	allCards.forEach((card) => {
		const durationBtns = card.querySelectorAll(".duration-btn");
		const priceEl = card.querySelector(".pricing__block-card-price");

		const activeBtn = card.querySelector(".duration-btn.active");
		if (priceEl && activeBtn && !priceEl.textContent.includes("-")) {
			const basePrice = parseInt(activeBtn.getAttribute("data-price"), 10);
			priceEl.setAttribute("data-base-price", basePrice);
		}

		durationBtns.forEach((btn) => {
			btn.addEventListener("click", function () {
				durationBtns.forEach((b) => b.classList.remove("active"));
				this.classList.add("active");
				updateCardPrice(card);
			});
		});
	});

	quantityBtns.forEach((btn) => {
		btn.addEventListener("click", function () {
			currentQuantity = parseInt(this.getAttribute("data-quantity"), 10);

			quantityBtns.forEach((b) => b.classList.remove("active"));
			this.classList.add("active");

			const hasDiscount = [5, 10].includes(currentQuantity);

			document.querySelectorAll(".discount-desc").forEach((desc) => {
				if (hasDiscount) {
					if (window.location.pathname.includes("pricing_ua.html")) {
						desc.textContent = currentQuantity === 5 ? "5% знижки" : "10% знижки";
					} else {
						desc.textContent = currentQuantity === 5 ? "5% zniżki" : "10% zniżki";
					}
					desc.classList.remove("hidden");
				} else {
					desc.classList.add("hidden");
				}
			});

			document.querySelectorAll(".discount-desc-masaj").forEach((desc) => {
				if (hasDiscount && currentQuantity === 5) {
					desc.textContent = window.location.pathname.includes("pricing_ua.html") ? "4+1 безкоштовно" : "4+1 gratis";
					desc.classList.remove("hidden");
				} else if (hasDiscount && currentQuantity === 10) {
					desc.textContent = window.location.pathname.includes("pricing_ua.html") ? "9+1 безкоштовно" : "9+1 gratis";
					desc.classList.remove("hidden");
				} else {
					desc.classList.add("hidden");
				}
			});

			allCards.forEach((card) => {
				const durationBtns = card.querySelectorAll(".duration-btn");
				const defaultBtn = Array.from(durationBtns).find(
					(btn) => btn.getAttribute("data-duration") === "30"
				);
				if (defaultBtn) {
					durationBtns.forEach((btn) => btn.classList.remove("active"));
					defaultBtn.classList.add("active");
				}
			});

			updateAllCardPrices();
			updateCardVisibility();
		});
	});

	function updateCardVisibility() {
		const shouldHide = [5, 10].includes(currentQuantity);
		document.querySelectorAll('.hide-on-multi').forEach(card => {
			card.style.display = shouldHide ? "none" : "";
		});
	}

	updateAllCardPrices();
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


document.querySelectorAll('.about__modal-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = document.getElementById('aboutModal');
        document.getElementById('modalImg').src = btn.dataset.img;
        document.getElementById('modalImg').alt = btn.dataset.name;
        document.getElementById('modalMission').textContent = btn.dataset.mission;
        document.getElementById('modalTitle').textContent = btn.dataset.title;
        const experienceList = JSON.parse(btn.dataset.experience);
        const modalExperience = document.getElementById('modalExperience');
        modalExperience.innerHTML = '';
        experienceList.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            modalExperience.appendChild(li);
        });

        // Certificates
        let certificates = [];
        try {
            certificates = JSON.parse(btn.dataset.certificates || "[]");
        } catch (e) {
            // fallback for old format
            certificates = (JSON.parse(btn.dataset.certificates || "[]")).map(src => ({src, orientation: "vertical"}));
        }
        const modalCertificates = document.getElementById('modalCertificates');
        modalCertificates.innerHTML = '';
        certificates.forEach(cert => {
            const img = document.createElement('img');
            img.className = 'certificate';
            img.src = cert.src || cert;
            img.alt = 'certificate';
            img.setAttribute('data-aos', 'fade-up');
            if (cert.orientation === "horizontal") {
                img.classList.add('certificate--horizontal');
            }
            modalCertificates.appendChild(img);
        });

        // Re-attach click event to new certificates
        modalCertificates.querySelectorAll('.certificate').forEach((certificate) => {
            certificate.addEventListener("click", function () {
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

        modal.style.display = 'block';
    });
});
document.getElementById('closeModalBtn').onclick = function() {
    document.getElementById('aboutModal').style.display = 'none';
};
document.getElementById('aboutModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});