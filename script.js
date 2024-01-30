const userLang = navigator.language || navigator.userLanguage;
const supportedLanguages = ["pl", "ua"];

function loadContent(language) {
	const filename = "index_" + language + ".html";
	fetch(filename)
		.then((response) => {
			if (!response.ok) {
				throw new Error("File not found or error loading language file");
			}
			return response.text();
		})
		.then((html) => {
			document.querySelector("html").innerHTML = html;
		})
		.catch((error) => {
			console.error("Error loading language file:", error);
			// Load another file or perform fallback action here
			loadFallbackContent();
		});
}

function loadFallbackContent() {
	// Load another file or perform fallback action here
	// For example, load a default language or show an error message
	loadContent("pl");
}

if (supportedLanguages.includes(userLang)) {
	loadContent(userLang);
} else {
	loadFallbackContent();
}
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
console.log(toggleBtn);
console.log(toggleBtnIcon);
console.log(dropDownMenu);

toggleBtn.addEventListener("click", () => {
	console.log("object");
	dropDownMenu.classList.toggle("open");
	const isOpen = dropDownMenu.classList.contains("open");

	toggleBtnIcon.classList = isOpen
		? (toggleBtnIcon.src = "./assets/icons/close.png")
		: (toggleBtnIcon.src = "./assets/icons/burger.png");
});
