// =========================================
// CONTACT PAGE
// =========================================

const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    contactSuccess.textContent =
        "Thank you, " + name + "! Your message has been submitted successfully.";

    contactSuccess.style.display = "block";

    contactForm.reset();

    setTimeout(function () {
        contactSuccess.style.display = "none";
    }, 5000);
});