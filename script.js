const body = document.querySelector("body");
const buttons = document.querySelectorAll(".menu_button");
const open = document.querySelector(".open_button");

function copyright() {
	const date = document.getElementById("date");
	const year = new Date().getFullYear();
	if (date) {
		date.textContent = year;
	}
}

function menuToggle() {
	if (open) {
		buttons.forEach((button) => {
			button.addEventListener("click", () => {
				const isActive = body.classList.toggle("menu_active");
				if (isActive) {
					open.setAttribute("aria-expanded", "true");
				} else {
					open.setAttribute("aria-expanded", "false");
				}
			});
		});
	}
}

function escapeToggle() {
	if (open) {
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && body.classList.contains("menu_active")) {
				body.classList.remove("menu_active");
				open.setAttribute("aria-expanded", "false");
			}
		});
	}
}

function form() {
	const form = document.querySelector("form");
	if (form) {
		const url = form.querySelector('input[name="page_url"]');
		if (url) url.value = window.location.href;

		const path = form.querySelector('input[name="page_path"]');
		if (path) path.value = window.location.pathname;

		form.addEventListener("submit", (e) => {
			if (!form.checkValidity()) {
				e.preventDefault();
				form.reportValidity();
				return;
			}

			const btn = form.querySelector('button[type="submit"]');
			if (btn) {
				btn.disabled = true;
				btn.textContent = "Sending...";
			}
		});
	}
}

function printButton() {
	const print = document.querySelector(".print_icon");
	if (print) {
		print.addEventListener("click", () => {
			console.log("clicked");
			window.print();
		});
	}
}

function sharingIcons() {
	// get the url
	const URL = window.location.href;
	const encodeUrl = encodeURI(URL);

	// get the featured img
	const image = document.querySelector("img");
	if (!image) return;
	const imgEncode = encodeURI(image.src);

	// get the title
	const title = document.querySelector(".primary_heading");
	if (!title) return;
	const titleEncode = encodeURI(title.textContent);

	const facebook = document.querySelector(".facebook");
	const x = document.querySelector(".x");
	const pinterest = document.querySelector(".pinterest");
	const linkedin = document.querySelector(".linkedin");
	const email = document.querySelector(".email");

	facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}`;
	x.href = `https://twitter.com/intent/tweet?text=${titleEncode}%20${encodeUrl}`;
	pinterest.href = `https://www.pinterest.com/pin/create/button/?url=${encodeUrl}&media=${imgEncode}&description=${titleEncode}`;
	linkedin.href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeUrl}`;
	email.href = `mailto:?subject=${titleEncode}&body=${titleEncode}%20${encodeUrl}`;
}

document.addEventListener("DOMContentLoaded", () => {
	copyright();
	menuToggle();
	escapeToggle();
	form();
	printButton();
	sharingIcons();
});
