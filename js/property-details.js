


document.addEventListener("DOMContentLoaded", function () {

    // Get the container from property-details.html
    const detailContainer = document.getElementById("detailContainer");

    if (!detailContainer) {
        console.error("detailContainer was not found.");
        return;
    }

    // Property data
    const properties = [
        {
            id: 1,
            title: "Modern Apartment",
            city: "Chennai",
            type: "Apartment",
            price: 4500000,
            bedrooms: 3,
            bathrooms: 2,
            area: 1500,
            age: 5,
            image: "../images/home1.avif",
            description:
                "A modern and comfortable apartment located in a convenient residential area. This property offers spacious rooms and is suitable for a family."
        },
        {
            id: 2,
            title: "Luxury Villa",
            city: "Bangalore",
            type: "Villa",
            price: 9500000,
            bedrooms: 4,
            bathrooms: 3,
            area: 2400,
            age: 3,
            image: "../images/home2.avif",
            description:
                "A spacious luxury villa with modern facilities and comfortable living spaces."
        },
        {
            id: 3,
            title: "Family House",
            city: "Coimbatore",
            type: "Independent House",
            price: 6000000,
            bedrooms: 3,
            bathrooms: 2,
            area: 1800,
            age: 7,
            image: "../images/home3.avif",
            description:
                "A comfortable independent family house with spacious rooms and a peaceful residential environment."
        },
        {
            id: 4,
            title: "City Apartment",
            city: "Hyderabad",
            type: "Apartment",
            price: 3500000,
            bedrooms: 2,
            bathrooms: 2,
            area: 1100,
            age: 4,
            image: "../images/home4.avif",
            description:
                "A compact city apartment suitable for small families and working professionals."
        },
        {
            id: 5,
            title: "Premium Villa",
            city: "Chennai",
            type: "Villa",
            price: 15000000,
            bedrooms: 4,
            bathrooms: 4,
            area: 3200,
            age: 2,
            image: "../images/home6.jpg",
            description:
                "A premium villa offering spacious rooms, modern facilities and excellent living space."
        },
        {
            id: 6,
            title: "Affordable Apartment",
            city: "Madurai",
            type: "Apartment",
            price: 2200000,
            bedrooms: 2,
            bathrooms: 1,
            area: 900,
            age: 8,
            image: "../images/home7.jpg",
            description:
                "An affordable apartment with practical living space and convenient access to local facilities."
        },
        {
            id: 7,
            title: "Spacious Family Home",
            city: "Bangalore",
            type: "Independent House",
            price: 8500000,
            bedrooms: 3,
            bathrooms: 3,
            area: 2100,
            age: 6,
            image: "../images/home8.webp",
            description:
                "A spacious independent family home with comfortable bedrooms and generous living areas."
        },
        {
            id: 8,
            title: "Compact Apartment",
            city: "Coimbatore",
            type: "Apartment",
            price: 1800000,
            bedrooms: 1,
            bathrooms: 1,
            area: 650,
            age: 5,
            image: "../images/home9.jpg",
            description:
                "A compact and affordable apartment suitable for individuals or small households."
        },
        {
            id: 9,
            title: "Luxury Garden Villa",
            city: "Hyderabad",
            type: "Villa",
            price: 12000000,
            bedrooms: 4,
            bathrooms: 4,
            area: 2800,
            age: 3,
            image: "../images/home10.jpg",
            description:
                "A luxury villa with spacious interiors and a comfortable residential environment."
        }
    ];

    // Read property ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = Number(urlParams.get("id"));

    // Find selected property
    let property = properties.find(function (item) {
        return item.id === propertyId;
    });

    // Also support property selected from Favorites/Recommendations
    const savedProperty = localStorage.getItem("selectedProperty");

    if (!property && savedProperty) {
        try {
            property = JSON.parse(savedProperty);
        } catch (error) {
            console.error("Could not read selectedProperty.");
        }
    }

    // Property not found
    if (!property) {
        detailContainer.innerHTML = `
            <div class="property-not-found">
                <h2>Property Not Found</h2>
                <p>Sorry, the requested property could not be found.</p>

                <a href="properties.html" class="property-back-button">
                    ← Back to Properties
                </a>
            </div>
        `;

        return;
    }

    // Format price in Indian Rupees
    function formatPrice(price) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(price);
    }

    // Display property
    detailContainer.innerHTML = `
        <section class="property-details-card">

            <div class="property-details-image">
                <img
                    src="${property.image}"
                    alt="${property.title}"
                    onerror="this.src='../images/mod apmt.jpg'"
                >
            </div>

            <div class="property-details-content">

                <span class="property-type-badge">
                    ${property.type}
                </span>

                <h1>${property.title}</h1>

                <p class="property-location">
                    📍 ${property.city}
                </p>

                <h2 class="property-details-price">
                    ${formatPrice(property.price)}
                </h2>

                <div class="property-details-features">

                    <div class="property-feature">
                        <strong>${property.bedrooms}</strong>
                        <span>Bedrooms</span>
                    </div>

                    <div class="property-feature">
                        <strong>${property.bathrooms}</strong>
                        <span>Bathrooms</span>
                    </div>

                    <div class="property-feature">
                        <strong>${property.area}</strong>
                        <span>Sq.ft</span>
                    </div>

                    <div class="property-feature">
                        <strong>${property.age}</strong>
                        <span>Years Old</span>
                    </div>

                </div>

                <div class="property-description">

                    <h3>Property Description</h3>

                    <p>
                        ${property.description}
                    </p>

                </div>

                <div class="property-details-actions">

                    <button
                        type="button"
                        id="favoritePropertyButton"
                        class="property-action-button"
                    >
                        ♡ Add to Favorites
                    </button>

                    <a
                        href="properties.html"
                        class="property-back-button"
                    >
                        ← Back to Properties
                    </a>

                </div>

            </div>

        </section>
    `;

    // Favorite button
    const favoriteButton =
        document.getElementById("favoritePropertyButton");

    if (favoriteButton) {

        let favorites = [];

        try {
            favorites =
                JSON.parse(localStorage.getItem("favorites")) || [];
        } catch (error) {
            favorites = [];
        }

        const isFavorite = favorites.some(function (item) {
            return Number(item.id) === Number(property.id);
        });

        if (isFavorite) {
            favoriteButton.textContent = "♥ Added to Favorites";
        }

        favoriteButton.addEventListener("click", function () {

            let currentFavorites = [];

            try {
                currentFavorites =
                    JSON.parse(localStorage.getItem("favorites")) || [];
            } catch (error) {
                currentFavorites = [];
            }

            const existingIndex = currentFavorites.findIndex(
                function (item) {
                    return Number(item.id) === Number(property.id);
                }
            );

            if (existingIndex === -1) {

                currentFavorites.push(property);

                localStorage.setItem(
                    "favorites",
                    JSON.stringify(currentFavorites)
                );

                favoriteButton.textContent =
                    "♥ Added to Favorites";

            } else {

                currentFavorites.splice(existingIndex, 1);

                localStorage.setItem(
                    "favorites",
                    JSON.stringify(currentFavorites)
                );

                favoriteButton.textContent =
                    "♡ Add to Favorites";
            }
        });
    }

});