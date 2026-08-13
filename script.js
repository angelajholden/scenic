const body = document.querySelector("body");
const open = document.querySelector(".open_button");
const close = document.querySelector(".close_button");

function copyright() {
	const date = document.getElementById("date");
	const year = new Date().getFullYear();
	if (!date) return;
	date.textContent = year;
}

function menuToggle() {
	if (!open || !close) return;

	open.addEventListener("click", () => {
		body.classList.add("menu_active");
		open.setAttribute("aria-expanded", "true");
		close.focus();
	});

	close.addEventListener("click", () => {
		closeMenu();
	});
}

function closeMenu() {
	if (!open) return;
	body.classList.remove("menu_active");
	open.setAttribute("aria-expanded", "false");
	open.focus();
}

function escapeToggle() {
	if (!open) return;
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && body.classList.contains("menu_active")) {
			closeMenu();
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
	const sharing = document.querySelector(".social_sharing");
	if (!sharing) return;

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
	const facebook = sharing.querySelector(".facebook");
	const x = sharing.querySelector(".x");
	const pinterest = sharing.querySelector(".pinterest");
	const linkedin = sharing.querySelector(".linkedin");
	const email = sharing.querySelector(".email");
	if (!facebook || !x || !pinterest || !linkedin || !email) return;

	facebook.href = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${URL}`);
	x.href = encodeURI(`https://twitter.com/intent/tweet?text=${title} ${URL}`);
	pinterest.href = encodeURI(
		`https://www.pinterest.com/pin/create/button/?url=${URL}&media=${image}&description=${title}`,
	);
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
