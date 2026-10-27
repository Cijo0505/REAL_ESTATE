
document.addEventListener("DOMContentLoaded", function () {

    // Fictional sample rental properties
    const rentalProperties = [
        {
            id: 101,
            name: "Modern Rental Apartment",
            city: "Chennai",
            type: "Apartment",
            rent: 18000,
            bedrooms: 2,
            area: 1100,
            image: "../images/nw1.jpg"
        },
        {
            id: 102,
            name: "Luxury Rental Villa",
            city: "Bangalore",
            type: "Villa",
            rent: 65000,
            bedrooms: 4,
            area: 2600,
            image: "../images/nw2.jpg"
        },
        {
            id: 103,
            name: "Family Rental House",
            city: "Coimbatore",
            type: "Independent House",
            rent: 25000,
            bedrooms: 3,
            area: 1700,
            image: "../images/nw3.jpeg"
        },
        {
            id: 104,
            name: "City Rental Apartment",
            city: "Hyderabad",
            type: "Apartment",
            rent: 22000,
            bedrooms: 2,
            area: 1200,
            image: "../images/n4.jpg"
        },
        {
            id: 105,
            name: "Premium Garden Villa",
            city: "Chennai",
            type: "Villa",
            rent: 85000,
            bedrooms: 4,
            area: 3000,
            image: "../images/n5.jpg"
        },
        {
            id: 106,
            name: "Affordable Rental Flat",
            city: "Madurai",
            type: "Apartment",
            rent: 9000,
            bedrooms: 1,
            area: 650,
            image: "../images/n6.webp"
        },
        {
            id: 107,
            name: "Spacious Family Rental",
            city: "Bangalore",
            type: "Independent House",
            rent: 35000,
            bedrooms: 3,
            area: 2000,
            image: "../images/home9.jpg"
        },
        {
            id: 108,
            name: "Compact Rental Apartment",
            city: "Coimbatore",
            type: "Apartment",
            rent: 12000,
            bedrooms: 1,
            area: 750,
            image: "../images/home10.jpg"
        },
        {
            id: 109,
            name: "Luxury Rental Residence",
            city: "Hyderabad",
            type: "Villa",
            rent: 75000,
            bedrooms: 4,
            area: 2800,
            image: "../images/home7.jpg"
        }
    ];

    const form = document.getElementById(
        "rentSearchForm"
    );

    const cityInput = document.getElementById(
        "rentCity"
    );

    const typeInput = document.getElementById(
        "rentType"
    );

    const budgetInput = document.getElementById(
        "rentBudget"
    );

    const sortInput = document.getElementById(
        "rentSort"
    );

    const grid = document.getElementById(
        "rentPropertyGrid"
    );

    const count = document.getElementById(
        "rentResultCount"
    );

    const empty = document.getElementById(
        "rentEmpty"
    );

    const clearButton = document.getElementById(
        "rentClearFilters"
    );

    let filteredProperties = [...rentalProperties];

    function formatRent(amount) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    }

    function filterProperties() {
        const city = cityInput.value;
        const type = typeInput.value;
        const budget = Number(budgetInput.value);

        filteredProperties = rentalProperties.filter(
            property => {

                if (city && property.city !== city) {
                    return false;
                }

                if (type && property.type !== type) {
                    return false;
                }

                if (
                    budget &&
                    property.rent > budget
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
                (a, b) => a.rent - b.rent
            );
        } else if (sort === "price-high") {
            filteredProperties.sort(
                (a, b) => b.rent - a.rent
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

        count.textContent =
            filteredProperties.length +
            " rental properties found";

        empty.hidden =
            filteredProperties.length > 0;

        filteredProperties.forEach(property => {

            const card = document.createElement(
                "article"
            );

            card.className = "rent-property-card";

            card.innerHTML = `
                <div class="rent-card-image-wrap">

                    <img
                        src="${property.image}"
                        alt="${property.name}"
                        class="rent-card-image"
                    >

                    <span class="rent-card-badge">
                        For Rent
                    </span>

                </div>

                <div class="rent-card-body">

                    <h3>${property.name}</h3>

                    <p class="rent-card-location">
                        📍 ${property.city}
                    </p>

                    <div class="rent-card-price">
                        ${formatRent(property.rent)}
                        <small>/ month</small>
                    </div>

                    <div class="rent-card-features">

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

                    <button
                        type="button"
                        class="rent-card-button"
                        data-id="${property.id}"
                    >
                        View Rental Details
                    </button>

                </div>
            `;

            grid.appendChild(card);
        });

        grid.querySelectorAll(
            ".rent-card-button"
        ).forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const id = Number(
                        button.dataset.id
                    );

                    const property =
                        rentalProperties.find(
                            item => item.id === id
                        );

                    if (!property) return;

                    alert(
                        property.name + "\n" +
                        "Location: " + property.city + "\n" +
                        "Type: " + property.type + "\n" +
                        "Bedrooms: " +
                            property.bedrooms + "\n" +
                        "Area: " +
                            property.area + " sq.ft\n" +
                        "Monthly Rent: " +
                            formatRent(property.rent) +
                        "\n\n" +
                        "This is a demonstration listing. " +
                        "Rental enquiries are not connected yet."
                    );
                }
            );
        });
    }

    form.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            filterProperties();
        }
    );

    sortInput.addEventListener(
        "change",
        sortProperties
    );

    clearButton.addEventListener(
        "click",
        function () {
            form.reset();
            sortInput.value = "default";
            filterProperties();
        }
    );

    // Display all rental properties initially
    filterProperties();

});