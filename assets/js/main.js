const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const scrollTopButton = document.querySelector(".scroll-top");
const revealItems = document.querySelectorAll(".reveal");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener("scroll", () => {
  scrollTopButton.classList.toggle("visible", window.scrollY > 600);
});

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const whatsappNumber = "2348063463411";

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const fields = [];

    data.forEach((value, key) => {
      if (value) {
        fields.push(`${key}: ${value}`);
      }
    });

    const message = fields.length
      ? `Hello Animal Health Care Centre, I would like to make an enquiry.%0A%0A${encodeURIComponent(fields.join("\n"))}`
      : "Hello Animal Health Care Centre, I would like to make an enquiry.";

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank", "noopener");
    form.reset();
  });
});
