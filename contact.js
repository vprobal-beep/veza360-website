const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(contactForm);
  const subject = `Veza 360 inquiry: ${fields.get("interest")}`;
  const body = [
    `Name: ${fields.get("name")}`,
    `Company: ${fields.get("company")}`,
    `Email: ${fields.get("email")}`,
    "",
    fields.get("message"),
  ].join("\r\n");
  const status = contactForm.querySelector(".contact-status");
  status.hidden = false;
  status.textContent = "Send the draft from your email app to complete your inquiry.";
  window.location.href = `mailto:info@veza360.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const categorySelect = document.querySelector(".faq-category-select");
const categoryButtons = document.querySelectorAll("[data-category]");
const productQuestions = document.querySelector(".faq-product");
const categoryContact = document.querySelector(".faq-category-contact");

function selectCategory(index) {
  categorySelect.selectedIndex = index;
  categoryButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.category) === index));
  });
  productQuestions.hidden = index !== 0;
  categoryContact.hidden = index === 0;
}

categorySelect.addEventListener("change", () => selectCategory(categorySelect.selectedIndex));
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => selectCategory(Number(button.dataset.category)));
});
