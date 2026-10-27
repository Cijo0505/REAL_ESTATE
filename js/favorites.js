document.addEventListener("DOMContentLoaded", function () {

    const favoritesGrid = document.getElementById("favoritesGrid");
    const emptyFavorites = document.getElementById("emptyFavorites");
    const favoritesCount = document.getElementById("favoritesCount");
    const clearFavorites = document.getElementById("clearFavorites");

    // =========================================
    // LOAD FAVORITES
    // =========================================

    let favorites = JSON.parse(
        localStorage.getItem("favorites")
    ) || [];


    // =========================================
    // FORMAT PRICE
    // =========================================

    function formatPrice(price) {

        if (typeof price === "string") {
            price = price.replace(/[₹,]/g, "");
        }

        const number = Number(price) || 0;

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(number);
    }


    // =========================================
    // DISPLAY FAVORITES
    // =========================================

    function displayFavorites() {

        favoritesGrid.innerHTML = "";

        // No favorites
        if (favorites.length === 0) {

            emptyFavorites.style.display = "block";
            favoritesGrid.style.display = "none";

            favoritesCount.textContent =
                "0 properties saved";

            return;
        }


        // Favorites exist
        emptyFavorites.style.display = "none";
        favoritesGrid.style.display = "grid";


        favoritesCount.textContent =
            favorites.length +
            (
                favorites.length === 1
                    ? " property saved"
                    : " properties saved"
            );


        // Create each property card
        favorites.forEach(function (property) {

            const card = document.createElement("div");

            card.className = "favorite-card";


            card.innerHTML = `

                <img
                    src="${property.image || "../images/mod apmt.jpg"}"
                    alt="${property.title || "Favorite Property"}"
                    class="favorite-card-image"
                    onerror="this.src='../images/home1.avif'"
                >

                <div class="favorite-card-content">

                    <h3>
                        ${property.title || "Property"}
                    </h3>


                    <p class="favorite-location">
                        📍
                        ${property.city ||
                          property.location ||
                          "Location not available"}
                    </p>


                    <p class="favorite-price">
                        ${formatPrice(property.price)}
                    </p>


                    <p class="favorite-details">

                        ${property.bedrooms || 0}
                        BHK

                        &nbsp; | &nbsp;

                        ${property.area || 0}
                        Sq.ft

                    </p>


                    <div class="favorite-card-actions">

                        <button
                            type="button"
                            class="favorite-view-button"
                            data-id="${property.id}"
                        >
                            View
                        </button>


                        <button
                            type="button"
                            class="favorite-remove-button"
                            data-id="${property.id}"
                        >
                            Remove
                        </button>

                    </div>

                </div>
            `;


            favoritesGrid.appendChild(card);

        });


        // =========================================
        // VIEW BUTTON
        // =========================================

        const viewButtons =
            document.querySelectorAll(
                ".favorite-view-button"
            );


        viewButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        this.getAttribute("data-id");


                    const property =
                        favorites.find(function (item) {

                            return String(item.id) ===
                                   String(id);

                        });


                    if (property) {

                        // Save selected property
                        localStorage.setItem(
                            "selectedProperty",
                            JSON.stringify(property)
                        );


                        // IMPORTANT:
                        // Your actual file uses underscore
                        window.location.href =
                            "property_details.html";
                    }

                }
            );

        });


        // =========================================
        // REMOVE BUTTON
        // =========================================

        const removeButtons =
            document.querySelectorAll(
                ".favorite-remove-button"
            );


        removeButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        this.getAttribute("data-id");


                    favorites =
                        favorites.filter(function (item) {

                            return String(item.id) !==
                                   String(id);

                        });


                    localStorage.setItem(
                        "favorites",
                        JSON.stringify(favorites)
                    );


                    displayFavorites();

                }
            );

        });

    }


    // =========================================
    // CLEAR ALL FAVORITES
    // =========================================

    clearFavorites.addEventListener(
        "click",
        function () {

            if (favorites.length === 0) {
                return;
            }


            const confirmed =
                confirm(
                    "Are you sure you want to remove all favorite properties?"
                );


            if (confirmed) {

                favorites = [];

                localStorage.removeItem(
                    "favorites"
                );

                displayFavorites();

            }

        }
    );


    // =========================================
    // START PAGE
    // =========================================

    displayFavorites();

});