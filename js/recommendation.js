document.addEventListener("DOMContentLoaded", function () {

    const recommendationForm =
        document.getElementById("recommendationForm");

    const recommendationGrid =
        document.getElementById("recommendationGrid");

    const recommendationCount =
        document.getElementById("recommendationCount");

    const recommendationEmpty =
        document.getElementById("recommendationEmpty");

    const recommendationSort =
        document.getElementById("recommendationSort");


    /* =====================================================
       PROPERTY DATA
    ===================================================== */

    const properties = [

        {
            id: 1,
            title: "Modern Apartment",
            city: "Chennai",
            type: "Apartment",
            price: 4500000,
            bedrooms: 3,
            area: 1500,
            image: "../images/r1.jpg"
        },

        {
            id: 2,
            title: "Luxury Villa",
            city: "Bangalore",
            type: "Villa",
            price: 9500000,
            bedrooms: 4,
            area: 2400,
            image: "../images/r2.webp"
        },

        {
            id: 3,
            title: "Family House",
            city: "Coimbatore",
            type: "Independent House",
            price: 6000000,
            bedrooms: 3,
            area: 1800,
            image: "../images/r3.webp"
        },

        {
            id: 4,
            title: "City Apartment",
            city: "Hyderabad",
            type: "Apartment",
            price: 3500000,
            bedrooms: 2,
            area: 1100,
            image: "../images/r4.jpg"
        },

        {
            id: 5,
            title: "Premium Villa",
            city: "Chennai",
            type: "Villa",
            price: 15000000,
            bedrooms: 4,
            area: 3200,
            image: "../images/r5.jpg"
        },

        {
            id: 6,
            title: "Affordable Apartment",
            city: "Madurai",
            type: "Apartment",
            price: 2200000,
            bedrooms: 2,
            area: 900,
            image: "../images/r6.jpg"
        },

        {
            id: 7,
            title: "Spacious Family Home",
            city: "Bangalore",
            type: "Independent House",
            price: 8500000,
            bedrooms: 3,
            area: 2100,
            image: "../images/r7.webp"
        },

        {
            id: 8,
            title: "Compact Apartment",
            city: "Coimbatore",
            type: "Apartment",
            price: 1800000,
            bedrooms: 1,
            area: 650,
            image: "../images/r8.jpg"
        },

        {
            id: 9,
            title: "Luxury Garden Villa",
            city: "Hyderabad",
            type: "Villa",
            price: 12000000,
            bedrooms: 4,
            area: 2800,
            image: "../images/r9.webp"
        }

    ];


    let currentResults = [];


    /* =====================================================
       FORMAT PRICE
    ===================================================== */

    function formatPrice(price) {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(price);

    }


    /* =====================================================
       CALCULATE MATCH SCORE
    ===================================================== */

    function calculateMatch(property, filters) {

        let score = 0;
        let totalCriteria = 0;


        if (filters.city) {

            totalCriteria++;

            if (property.city === filters.city) {
                score++;
            }

        }


        if (filters.type) {

            totalCriteria++;

            if (property.type === filters.type) {
                score++;
            }

        }


        if (filters.budget) {

            totalCriteria++;

            if (property.price <= filters.budget) {
                score++;
            }

        }


        if (filters.bedrooms) {

            totalCriteria++;

            if (property.bedrooms >= filters.bedrooms) {
                score++;
            }

        }


        if (totalCriteria === 0) {
            return 100;
        }


        return Math.round(
            (score / totalCriteria) * 100
        );

    }


    /* =====================================================
       DISPLAY PROPERTIES
    ===================================================== */

    function displayProperties(list) {

        recommendationGrid.innerHTML = "";


        if (list.length === 0) {

            recommendationEmpty.hidden = false;

            recommendationCount.textContent =
                "No properties match your preferences.";

            return;
        }


        recommendationEmpty.hidden = true;


        recommendationCount.textContent =
            list.length +
            (list.length === 1
                ? " property found"
                : " properties found");


        list.forEach(function (property) {

            const card =
                document.createElement("article");


            card.className =
                "recommendation-card";


            card.innerHTML = `

                <div class="recommendation-card-image">

                    <img
                        src="${property.image}"
                        alt="${property.title}"
                        onerror="this.src='../images/home1.jpg'"
                    >

                    <span class="recommendation-match">
                        ${property.matchScore}% Match
                    </span>

                </div>


                <div class="recommendation-card-content">

                    <h3>
                        ${property.title}
                    </h3>


                    <p class="recommendation-location">
                        📍 ${property.city}
                    </p>


                    <p class="recommendation-price">
                        ${formatPrice(property.price)}
                    </p>


                    <div class="recommendation-details">

                        <span>
                            🏠 ${property.type}
                        </span>

                        <span>
                            🛏 ${property.bedrooms} BHK
                        </span>

                        <span>
                            📐 ${property.area} Sq.ft
                        </span>

                    </div>


                    <button
                        type="button"
                        class="recommendation-view-button"
                        data-id="${property.id}"
                    >
                        View Property
                    </button>

                </div>

            `;


            recommendationGrid.appendChild(card);

        });


        /* =====================================================
           VIEW PROPERTY BUTTON
        ===================================================== */

        document
            .querySelectorAll(".recommendation-view-button")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(this.dataset.id);


                        const property =
                            properties.find(
                                function (item) {
                                    return item.id === id;
                                }
                            );


                        if (property) {

                            /* Save selected property */
                            localStorage.setItem(
                                "selectedProperty",
                                JSON.stringify(property)
                            );


                            /*
                               IMPORTANT:
                               The actual file is:
                               pages/property-details.html

                               Therefore use hyphen (-)
                               NOT underscore (_)
                            */

                            window.location.href =
                                "property-details.html";

                        }

                    }
                );

            });

    }


    /* =====================================================
       APPLY FILTERS
    ===================================================== */

    function applyFilters() {

        const city =
            document.getElementById("recCity").value;


        const type =
            document.getElementById("recType").value;


        const budgetValue =
            document.getElementById("recBudget").value;


        const bedroomsValue =
            document.getElementById("recBedrooms").value;


        const filters = {

            city: city,

            type: type,

            budget:
                budgetValue
                    ? Number(budgetValue)
                    : null,

            bedrooms:
                bedroomsValue
                    ? Number(bedroomsValue)
                    : null

        };


        currentResults =
            properties

                .map(function (property) {

                    return {

                        ...property,

                        matchScore:
                            calculateMatch(
                                property,
                                filters
                            )

                    };

                })


                .filter(function (property) {


                    if (
                        filters.city &&
                        property.city !== filters.city
                    ) {

                        return false;

                    }


                    if (
                        filters.type &&
                        property.type !== filters.type
                    ) {

                        return false;

                    }


                    if (
                        filters.budget &&
                        property.price > filters.budget
                    ) {

                        return false;

                    }


                    if (
                        filters.bedrooms &&
                        property.bedrooms < filters.bedrooms
                    ) {

                        return false;

                    }


                    return true;

                });


        sortResults();

    }


    /* =====================================================
       SORT RESULTS
    ===================================================== */

    function sortResults() {

        const sortType =
            recommendationSort.value;


        if (sortType === "price-low") {

            currentResults.sort(
                function (a, b) {
                    return a.price - b.price;
                }
            );

        }


        else if (sortType === "price-high") {

            currentResults.sort(
                function (a, b) {
                    return b.price - a.price;
                }
            );

        }


        else if (sortType === "area") {

            currentResults.sort(
                function (a, b) {
                    return b.area - a.area;
                }
            );

        }


        else {

            currentResults.sort(
                function (a, b) {
                    return b.matchScore - a.matchScore;
                }
            );

        }


        displayProperties(currentResults);

    }


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    recommendationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            applyFilters();

        }
    );


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    recommendationForm.addEventListener(
        "reset",
        function () {

            setTimeout(function () {

                currentResults =
                    properties.map(function (property) {

                        return {
                            ...property,
                            matchScore: 100
                        };

                    });


                recommendationSort.value = "match";


                displayProperties([]);


                recommendationCount.textContent =
                    "Choose your preferences to begin.";

            }, 0);

        }
    );


    /* =====================================================
       SORT CHANGE
    ===================================================== */

    recommendationSort.addEventListener(
        "change",
        function () {

            if (currentResults.length > 0) {
                sortResults();
            }

        }
    );

});