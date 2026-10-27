
const searchForm = document.getElementById("searchForm");

if (searchForm) {
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const location =
            document.getElementById("location").value.trim();

        const type =
            document.getElementById("propertyType").value;

        const budget =
            document.getElementById("budget").value;

        const params = new URLSearchParams();

        if (location) {
            params.set("location", location);
        }

        if (type) {
            params.set("type", type);
        }

        if (budget) {
            params.set("budget", budget);
        }

        window.location.href =
            "pages/properties.html?" + params.toString();
    });
}

/* DASHBOARD */

document.addEventListener("DOMContentLoaded", function () {

    const savedCount =
        document.getElementById("savedCount");

    if (!savedCount) return;

    // Favorites will be stored in localStorage
    // when we build the Saved Properties page.

    try {
        const favorites = JSON.parse(
            localStorage.getItem("favorites") || "[]"
        );

        savedCount.textContent =
            Array.isArray(favorites) ? favorites.length : 0;

    } catch (error) {
        savedCount.textContent = "0";
    }

});