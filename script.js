const body = document.querySelector("body");
const buttons = document.querySelectorAll(".menu_button");
const open = document.querySelector(".open_button");

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

document.addEventListener("DOMContentLoaded", () => {
	menuToggle();
	escapeToggle();
	form();
});
