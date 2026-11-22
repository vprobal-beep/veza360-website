const contactForm = document.querySelector(".contact-form");

const selectRoot = document.querySelector("[data-select]");
if (selectRoot) {
  const nativeSelect = selectRoot.querySelector(".contact-native-select");
  const trigger = selectRoot.querySelector(".contact-select-trigger");
  const valueLabel = selectRoot.querySelector(".contact-select-value");
  const menu = selectRoot.querySelector(".contact-select-menu");
  const options = Array.from(selectRoot.querySelectorAll(".contact-select-option"));

  const setOpen = (isOpen) => {
    selectRoot.classList.toggle("is-open", isOpen);
    trigger.setAttribute("aria-expanded", String(isOpen));
    menu.hidden = !isOpen;
  };

  const selectOption = (option) => {
    const value = option.dataset.value || "";
    nativeSelect.value = value;
    nativeSelect.dispatchEvent(new Event("change", { bubbles: true }));
    valueLabel.textContent = value;
    valueLabel.classList.remove("is-placeholder");
    options.forEach((item) => {
      item.setAttribute("aria-selected", String(item === option));
    });
    setOpen(false);
    trigger.focus();
  };

  const focusOptionAt = (index) => {
    const bounded = (index + options.length) % options.length;
    options[bounded].focus();
  };

  trigger.addEventListener("click", () => {
    const willOpen = menu.hidden;
    setOpen(willOpen);
    if (willOpen) {
      const selectedIndex = options.findIndex((item) => item.getAttribute("aria-selected") === "true");
      focusOptionAt(selectedIndex >= 0 ? selectedIndex : 0);
    }
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
      const selectedIndex = options.findIndex((item) => item.getAttribute("aria-selected") === "true");
      focusOptionAt(selectedIndex >= 0 ? selectedIndex : event.key === "ArrowUp" ? options.length - 1 : 0);
    }
  });

  options.forEach((option, index) => {
    option.addEventListener("click", (event) => {
      event.stopPropagation();
      selectOption(option);
    });

    option.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusOptionAt(index + 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        focusOptionAt(index - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        focusOptionAt(0);
      } else if (event.key === "End") {
        event.preventDefault();
        focusOptionAt(options.length - 1);
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectOption(option);
      } else if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        trigger.focus();
      } else if (event.key === "Tab") {
        setOpen(false);
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!selectRoot.contains(event.target)) {
      setOpen(false);
    }
  });

  nativeSelect.addEventListener("invalid", () => {
    trigger.focus();
    setOpen(true);
  });
}

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
const faqSelectRoot = document.querySelector("[data-faq-select]");
const faqTrigger = faqSelectRoot?.querySelector(".faq-select-trigger");
const faqValue = faqSelectRoot?.querySelector(".faq-select-value");
const faqMenu = faqSelectRoot?.querySelector(".faq-select-menu");
const faqOptions = faqSelectRoot ? Array.from(faqSelectRoot.querySelectorAll(".faq-select-option")) : [];

function setFaqMenuOpen(isOpen) {
  if (!faqSelectRoot || !faqTrigger || !faqMenu) return;
  faqSelectRoot.classList.toggle("is-open", isOpen);
  faqTrigger.setAttribute("aria-expanded", String(isOpen));
  faqMenu.hidden = !isOpen;
}

function selectCategory(index) {
  categorySelect.selectedIndex = index;
  categoryButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.category) === index));
  });
  if (faqValue && categorySelect.options[index]) {
    faqValue.textContent = categorySelect.options[index].textContent;
  }
  faqOptions.forEach((option) => {
    option.setAttribute("aria-selected", String(Number(option.dataset.index) === index));
  });
  productQuestions.hidden = index !== 0;
  categoryContact.hidden = index === 0;
}

categorySelect.addEventListener("change", () => selectCategory(categorySelect.selectedIndex));
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => selectCategory(Number(button.dataset.category)));
});

if (faqSelectRoot && faqTrigger && faqMenu) {
  const focusFaqOptionAt = (index) => {
    const bounded = (index + faqOptions.length) % faqOptions.length;
    faqOptions[bounded].focus();
  };

  faqTrigger.addEventListener("click", () => {
    const willOpen = faqMenu.hidden;
    setFaqMenuOpen(willOpen);
    if (willOpen) {
      focusFaqOptionAt(categorySelect.selectedIndex >= 0 ? categorySelect.selectedIndex : 0);
    }
  });

  faqTrigger.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setFaqMenuOpen(true);
      focusFaqOptionAt(categorySelect.selectedIndex >= 0 ? categorySelect.selectedIndex : 0);
    }
  });

  faqOptions.forEach((option, index) => {
    option.addEventListener("click", (event) => {
      event.stopPropagation();
      selectCategory(Number(option.dataset.index));
      setFaqMenuOpen(false);
      faqTrigger.focus();
    });

    option.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusFaqOptionAt(index + 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        focusFaqOptionAt(index - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        focusFaqOptionAt(0);
      } else if (event.key === "End") {
        event.preventDefault();
        focusFaqOptionAt(faqOptions.length - 1);
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCategory(Number(option.dataset.index));
        setFaqMenuOpen(false);
        faqTrigger.focus();
      } else if (event.key === "Escape") {
        event.preventDefault();
        setFaqMenuOpen(false);
        faqTrigger.focus();
      } else if (event.key === "Tab") {
        setFaqMenuOpen(false);
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!faqSelectRoot.contains(event.target)) {
      setFaqMenuOpen(false);
    }
  });
}
