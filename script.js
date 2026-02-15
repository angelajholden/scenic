const body = document.querySelector("body");
const buttons = document.querySelectorAll(".menu_button");
const open = document.querySelector(".open_button");

function copyright() {
	const date = document.getElementById("date");
	const year = new Date().getFullYear();
	if (!date) return;
	date.textContent = year;
}

function menuToggle() {
	if (!open) return;
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

function escapeToggle() {
	if (!open) return;
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && body.classList.contains("menu_active")) {
			body.classList.remove("menu_active");
			open.setAttribute("aria-expanded", "false");
		}
	});
}

function form() {
	const form = document.querySelector("form");
	if (!form) return;

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
		if (!btn) return;
		btn.disabled = true;
		btn.textContent = "Sending...";
	});
}

function printButton() {
	const print = document.querySelector(".print_icon");
	if (!print) return;
	print.addEventListener("click", () => window.print());
}

function sharingIcons() {
	// get the url
	const URL = window.location.href;

	// get the title
	let title = document.querySelector(".primary_heading");
	if (title) {
		title = title.textContent;
	}

	// get the featured img
	let image = document.querySelector("img");
	if (image) {
		image = image.src;
	}

	// get the a element
	const facebook = document.querySelector(".facebook");
	const x = document.querySelector(".x");
	const pinterest = document.querySelector(".pinterest");
	const linkedin = document.querySelector(".linkedin");
	const email = document.querySelector(".email");

	facebook.href = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${URL}`);
	x.href = encodeURI(`https://twitter.com/intent/tweet?text=${title} ${URL}`);
	pinterest.href = encodeURI(`https://www.pinterest.com/pin/create/button/?url=${URL}&media=${image}&description=${title}`);
	linkedin.href = encodeURI(`https://www.linkedin.com/shareArticle?mini=true&url=${URL}`);
	email.href = encodeURI(`mailto:?subject=${title}&body=${title} ${URL}`);
}

document.addEventListener("DOMContentLoaded", () => {
	copyright();
	menuToggle();
	escapeToggle();
	form();
	printButton();
	sharingIcons();
});
