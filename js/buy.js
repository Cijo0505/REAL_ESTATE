
document.addEventListener("DOMContentLoaded", function () {

    // Sample properties for sale.
    // These IDs match the existing Properties page.

    const properties = [
        {
            id: 1,
            name: "Modern Apartment",
            city: "Chennai",
            type: "Apartment",
            price: 4500000,
            bedrooms: 3,
            area: 1500,
            image: "../images/mod apmt.jpg"
        },
        {
            id: 2,
            name: "Luxury Villa",
            city: "Bangalore",
            type: "Villa",
            price: 9500000,
            bedrooms: 4,
            area: 2400,
            image: "../images/home10.jpg"
        },
        {
            id: 3,
            name: "Family House",
            city: "Coimbatore",
            type: "Independent House",
            price: 6000000,
            bedrooms: 3,
            area: 1800,
            image: "../images/home9.jpg"
        },
        {
            id: 4,
            name: "City Apartment",
            city: "Hyderabad",
            type: "Apartment",
            price: 3500000,
            bedrooms: 2,
            area: 1100,
            image: "../images/home8.webp"
        },
        {
            id: 5,
            name: "Premium Villa",
            city: "Chennai",
            type: "Villa",
            price: 15000000,
            bedrooms: 4,
            area: 3200,
            image: "../images/home7.jpg"
        },
        {
            id: 6,
            name: "Affordable Apartment",
            city: "Madurai",
            type: "Apartment",
            price: 2200000,
            bedrooms: 2,
            area: 900,
            image: "../images/home6.jpg"
        },
        {
            id: 7,
            name: "Spacious Family Home",
            city: "Bangalore",
            type: "Independent House",
            price: 8500000,
            bedrooms: 3,
            area: 2100,
            image: "../images/home5.avif"
        },
        {
            id: 8,
            name: "Compact Apartment",
            city: "Coimbatore",
            type: "Apartment",
            price: 1800000,
            bedrooms: 1,
            area: 650,
            image: "../images/home4.avif"
        },
        {
            id: 9,
            name: "Luxury Garden Villa",
            city: "Hyderabad",
            type: "Villa",
            price: 12000000,
            bedrooms: 4,
            area: 2800,
            image: "../images/home3.avif"
        }
    ];

    const form = document.getElementById(
        "buySearchForm"
    );

    const cityInput = document.getElementById(
        "buyCity"
    );

    const typeInput = document.getElementById(
        "buyType"
    );

    const budgetInput = document.getElementById(
        "buyBudget"
    );

    const sortInput = document.getElementById(
        "buySort"
    );

    const grid = document.getElementById(
        "buyPropertyGrid"
    );

    const count = document.getElementById(
        "buyResultCount"
    );

    const empty = document.getElementById(
        "buyEmpty"
    );

    const clearButton = document.getElementById(
        "buyClearFilters"
    );

    let filteredProperties = [...properties];

    function formatPrice(price) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(price);
    }

    function getFavorites() {
        try {
            const favorites = JSON.parse(
                localStorage.getItem("favorites") || "[]"
            );

            return Array.isArray(favorites)
                ? favorites
                : [];

        } catch {
            return [];
        }
    }

    function toggleFavorite(id) {
        const favorites = getFavorites();

        const updated = favorites.includes(id)
            ? favorites.filter(
                favoriteId => favoriteId !== id
            )
            : [...favorites, id];

        localStorage.setItem(
            "favorites",
            JSON.stringify(updated)
        );

        renderProperties();
    }

    function filterProperties() {
        const city = cityInput.value;
        const type = typeInput.value;
        const budget = Number(budgetInput.value);

        filteredProperties = properties.filter(
            property => {

                if (city && property.city !== city) {
                    return false;
                }

                if (type && property.type !== type) {
                    return false;
                }

                if (
                    budget &&
                    property.price > budget
                ) {
                    return false;
                }

                return true;
            }
        );

        sortProperties();
    }

    function sortProperties() {
        const sort = sortInput.value;

        if (sort === "price-low") {
            filteredProperties.sort(
                (a, b) => a.price - b.price
            );
        } else if (sort === "price-high") {
            filteredProperties.sort(
                (a, b) => b.price - a.price
            );
        } else if (sort === "area-high") {
            filteredProperties.sort(
                (a, b) => b.area - a.area
            );
        } else {
            filteredProperties.sort(
                (a, b) => a.id - b.id
            );
        }

        renderProperties();
    }

    function renderProperties() {
        grid.innerHTML = "";

        const favorites = getFavorites();

        count.textContent =
            filteredProperties.length +
            " properties available";

        empty.hidden =
            filteredProperties.length > 0;

        filteredProperties.forEach(property => {

            const isSaved = favorites.includes(
                property.id
            );

            const card = document.createElement(
                "article"
            );

            card.className = "buy-property-card";

            card.innerHTML = `
                <div class="buy-card-image-wrap">

                    <img
                        src="${property.image}"
                        alt="${property.name}"
                        class="buy-card-image"
                    >

                    <span class="buy-sale-badge">
                        For Sale
                    </span>

                </div>

                <div class="buy-card-body">

                    <h3>${property.name}</h3>

                    <p class="buy-card-location">
                        📍 ${property.city}
                    </p>

                    <div class="buy-card-price">
                        ${formatPrice(property.price)}
                    </div>

                    <div class="buy-card-features">

                        <span>
                            🛏 ${property.bedrooms} BHK
                        </span>

                        <span>
                            📐 ${property.area} sq.ft
                        </span>

                        <span>
                            🏠 ${property.type}
                        </span>

                    </div>

                    <div class="buy-card-actions">

                        <a
                            href="property-details.html?id=${property.id}"
                            class="buy-details-btn"
                        >
                            View Details
                        </a>

                        <button
                            type="button"
                            class="buy-save-btn
                                ${isSaved ? "saved" : ""}"
                            data-id="${property.id}"
                        >
                            ${isSaved ? "♥ Saved" : "♡ Save"}
                        </button>

                    </div>

                </div>
            `;

            grid.appendChild(card);
        });

        grid.querySelectorAll(
            ".buy-save-btn"
        ).forEach(button => {

            button.addEventListener(
                "click",
                function () {
                    toggleFavorite(
                        Number(button.dataset.id)
                    );
                }
            );
        });
    }

    // Search button
    form.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            filterProperties();
        }
    );

    // Sort dropdown
    sortInput.addEventListener(
        "change",
        sortProperties
    );

    // Clear filters
    clearButton.addEventListener(
        "click",
        function () {
            form.reset();
            sortInput.value = "default";
            filterProperties();
        }
    );

    // Show all properties initially.
    filterProperties();

});
