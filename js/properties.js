
/* SAMPLE PROPERTY DATA */

const properties = [
    {
        id: 1,
        name: "Modern Apartment",
        city: "Chennai",
        type: "Apartment",
        price: 4500000,
        bedrooms: 3,
        area: 1500,
        image: "../images/home1.avif"
    },
    {
        id: 2,
        name: "Luxury Villa",
        city: "Bangalore",
        type: "Villa",
        price: 9500000,
        bedrooms: 4,
        area: 2400,
        image: "../images/home2.avif"
    },
    {
        id: 3,
        name: "Family House",
        city: "Coimbatore",
        type: "Independent House",
        price: 6000000,
        bedrooms: 3,
        area: 1800,
        image: "../images/home3.avif"
    },
    {
        id: 4,
        name: "City Apartment",
        city: "Hyderabad",
        type: "Apartment",
        price: 3500000,
        bedrooms: 2,
        area: 1100,
        image: "../images/home4.avif"
    },
    {
        id: 5,
        name: "Premium Villa",
        city: "Chennai",
        type: "Villa",
        price: 15000000,
        bedrooms: 4,
        area: 3200,
        image: "../images/home6.jpg"
    },
    {
        id: 6,
        name: "Affordable Apartment",
        city: "Madurai",
        type: "Apartment",
        price: 2200000,
        bedrooms: 2,
        area: 900,
        image: "../images/home7.jpg"
    },
    {
        id: 7,
        name: "Spacious Family Home",
        city: "Bangalore",
        type: "Independent House",
        price: 8500000,
        bedrooms: 3,
        area: 2100,
        image: "../images/home8.webp"
    },
    {
        id: 8,
        name: "Compact Apartment",
        city: "Coimbatore",
        type: "Apartment",
        price: 1800000,
        bedrooms: 1,
        area: 650,
        image: "../images/home9.jpg"
    },
    {
        id: 9,
        name: "Luxury Garden Villa",
        city: "Hyderabad",
        type: "Villa",
        price: 12000000,
        bedrooms: 4,
        area: 2800,
        image: "../images/home10.jpg"
    }
];

/* ELEMENTS */

const propertyGrid =
    document.getElementById("propertyGrid");

const filterForm =
    document.getElementById("filterForm");

const locationInput =
    document.getElementById("filterLocation");

const typeInput =
    document.getElementById("filterType");

const budgetInput =
    document.getElementById("filterBudget");

const bedroomsInput =
    document.getElementById("filterBedrooms");

const sortInput =
    document.getElementById("sortPrice");

const resultCount =
    document.getElementById("resultCount");

const emptyMessage =
    document.getElementById("emptyMessage");

/* FAVORITES */

function getFavorites() {
    try {
        const saved = JSON.parse(
            localStorage.getItem("favorites") || "[]"
        );

        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function toggleFavorite(id) {
    let favorites = getFavorites();

    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    displayProperties();
}

/* FORMAT PRICE */

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

/* DISPLAY PROPERTY CARDS */

function displayProperties() {

    const location =
        locationInput.value.trim().toLowerCase();

    const type = typeInput.value;

    const budget = Number(budgetInput.value);

    const bedrooms = Number(bedroomsInput.value);

    let filtered = properties.filter(property => {

        const matchesLocation =
            !location ||
            property.city.toLowerCase().includes(location);

        const matchesType =
            !type || property.type === type;

        const matchesBudget =
            !budget || property.price <= budget;

        const matchesBedrooms =
            !bedrooms || property.bedrooms === bedrooms;

        return matchesLocation &&
               matchesType &&
               matchesBudget &&
               matchesBedrooms;
    });

    /* SORT */

    if (sortInput.value === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sortInput.value === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    propertyGrid.innerHTML = "";

    resultCount.textContent =
        filtered.length + " properties found";

    emptyMessage.hidden = filtered.length !== 0;

    const favorites = getFavorites();

    filtered.forEach(property => {

        const isSaved = favorites.includes(property.id);

        const card = document.createElement("article");
        card.className = "listing-card";

        card.innerHTML = `
            <div class="listing-image">
                <img src="${property.image}"
                     alt="${property.name}">

                <span class="listing-badge">
                    For Sale
                </span>

                <button
                    type="button"
                    class="favorite-btn ${isSaved ? "saved" : ""}"
                    data-id="${property.id}"
                    aria-label="${isSaved ? "Remove from" : "Add to"} favorites"
                >
                    ${isSaved ? "♥" : "♡"}
                </button>
            </div>

            <div class="listing-info">
                <h3>${property.name}</h3>

                <p class="listing-location">
                    📍 ${property.city}
                </p>

                <p class="listing-price">
                    ${formatPrice(property.price)}
                </p>

                <div class="listing-features">
                    <span>🛏 ${property.bedrooms} BHK</span>
                    <span>📐 ${property.area} Sq.ft</span>
                    <span>${property.type}</span>
                </div>

                <a href="property-details.html?id=${property.id}"
                   class="listing-view-btn">
                    View Details
                </a>
            </div>
        `;

        propertyGrid.appendChild(card);
    });
}

/* APPLY FILTERS */

filterForm.addEventListener("submit", function(event) {
    event.preventDefault();
    displayProperties();
});

/* RESET FILTERS */

document.getElementById("resetFilters")
    .addEventListener("click", function() {

        filterForm.reset();
        sortInput.value = "default";
        displayProperties();
    });

/* SORT BY PRICE */

sortInput.addEventListener("change", displayProperties);

/* FAVORITE BUTTONS */

propertyGrid.addEventListener("click", function(event) {

    const button = event.target.closest(".favorite-btn");

    if (!button) return;

    toggleFavorite(Number(button.dataset.id));
});

/* RECEIVE SEARCH FROM HOME PAGE */

const params = new URLSearchParams(
    window.location.search
);

locationInput.value = params.get("location") || "";
typeInput.value = params.get("type") || "";
budgetInput.value = params.get("budget") || "";

/* INITIAL DISPLAY */

displayProperties();