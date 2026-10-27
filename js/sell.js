
document.addEventListener("DOMContentLoaded", function () {

    const STORAGE_KEY = "sellerListings";

    const form = document.getElementById("sellForm");
    const previewButton = document.getElementById(
        "sellPreviewButton"
    );
    const preview = document.getElementById(
        "sellPreview"
    );
    const message = document.getElementById(
        "sellMessage"
    );
    const savedGrid = document.getElementById(
        "sellSavedListings"
    );
    const noListings = document.getElementById(
        "sellNoListings"
    );
    const imageInput = document.getElementById(
        "sellImage"
    );

    let previewImageUrl = null;

    function formatPrice(price) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(price);
    }

    function getListings() {
        try {
            const data = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "[]"
            );

            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    }

    function getFormData() {
        return {
            id: crypto.randomUUID(),
            title: document.getElementById(
                "sellTitle"
            ).value.trim(),
            city: document.getElementById(
                "sellCity"
            ).value,
            type: document.getElementById(
                "sellType"
            ).value,
            price: Number(
                document.getElementById(
                    "sellPrice"
                ).value
            ),
            area: Number(
                document.getElementById(
                    "sellArea"
                ).value
            ),
            bedrooms: Number(
                document.getElementById(
                    "sellBedrooms"
                ).value
            ),
            bathrooms: Number(
                document.getElementById(
                    "sellBathrooms"
                ).value
            ),
            age: Number(
                document.getElementById(
                    "sellAge"
                ).value
            ),
            description: document.getElementById(
                "sellDescription"
            ).value.trim()
        };
    }

    function validateImage() {
        const file = imageInput.files[0];

        if (!file) return true;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            message.style.color = "#dc2626";
            message.textContent =
                "Please upload a JPG, PNG or WebP image.";
            return false;
        }

        if (file.size > 2 * 1024 * 1024) {
            message.style.color = "#dc2626";
            message.textContent =
                "The image must be smaller than 2 MB.";
            return false;
        }

        return true;
    }

    function validateForm() {
        message.textContent = "";

        if (!form.reportValidity()) {
            return false;
        }

        if (!validateImage()) {
            return false;
        }

        return true;
    }

    function addText(parent, tag, text, className = "") {
        const element = document.createElement(tag);

        element.textContent = text;

        if (className) {
            element.className = className;
        }

        parent.appendChild(element);

        return element;
    }

    function showPreview() {
        if (!validateForm()) return;

        const data = getFormData();

        // Release any previous temporary image URL.
        if (previewImageUrl) {
            URL.revokeObjectURL(previewImageUrl);
            previewImageUrl = null;
        }

        preview.replaceChildren();

        const wrapper = document.createElement("div");
        wrapper.className = "sell-preview-details";

        const file = imageInput.files[0];

        if (file) {
            previewImageUrl = URL.createObjectURL(file);

            const image = document.createElement("img");
            image.src = previewImageUrl;
            image.alt = "Property preview";
            image.className = "sell-listing-image";

            wrapper.appendChild(image);
        }

        addText(wrapper, "h3", data.title);

        addText(
            wrapper,
            "p",
            formatPrice(data.price),
            "sell-preview-price"
        );

        addText(
            wrapper,
            "p",
            "📍 " + data.city
        );

        addText(
            wrapper,
            "p",
            "🏠 " + data.type
        );

        addText(
            wrapper,
            "p",
            "🛏 " + data.bedrooms +
            " bedrooms · " +
            data.bathrooms + " bathrooms"
        );

        addText(
            wrapper,
            "p",
            "📐 " + data.area + " sq.ft"
        );

        addText(
            wrapper,
            "p",
            "Property age: " + data.age + " years"
        );

        addText(
            wrapper,
            "p",
            data.description
        );

        preview.appendChild(wrapper);

        message.style.color = "#15803d";
        message.textContent =
            "Preview generated successfully.";
    }

    function renderSavedListings() {
        const listings = getListings();

        savedGrid.replaceChildren();

        noListings.hidden = listings.length > 0;

        listings.forEach(listing => {

            const card = document.createElement("article");
            card.className = "sell-saved-card";

            addText(card, "h3", listing.title);

            addText(
                card,
                "p",
                "📍 " + listing.city
            );

            addText(
                card,
                "p",
                formatPrice(listing.price),
                "sell-saved-price"
            );

            addText(
                card,
                "p",
                listing.type + " · " +
                listing.bedrooms + " BHK"
            );

            addText(
                card,
                "p",
                listing.area + " sq.ft"
            );

            const deleteButton =
                document.createElement("button");

            deleteButton.type = "button";
            deleteButton.className =
                "sell-delete-button";

            deleteButton.textContent =
                "Delete Listing";

            deleteButton.addEventListener(
                "click",
                function () {

                    const confirmed = confirm(
                        "Delete this saved listing?"
                    );

                    if (!confirmed) return;

                    const updated = getListings().filter(
                        item => item.id !== listing.id
                    );

                    localStorage.setItem(
                        STORAGE_KEY,
                        JSON.stringify(updated)
                    );

                    renderSavedListings();
                }
            );

            card.appendChild(deleteButton);
            savedGrid.appendChild(card);
        });
    }

    previewButton.addEventListener(
        "click",
        showPreview
    );

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (!validateForm()) return;

            const data = getFormData();

            const listings = getListings();

            listings.push(data);

            try {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(listings)
                );
            } catch {
                message.style.color = "#dc2626";
                message.textContent =
                    "Unable to save listing in this browser.";
                return;
            }

            message.style.color = "#15803d";
            message.textContent =
                "Listing saved in this browser. " +
                "It has not been published online.";

            renderSavedListings();

            form.reset();

            if (previewImageUrl) {
                URL.revokeObjectURL(previewImageUrl);
                previewImageUrl = null;
            }

            preview.replaceChildren();

            const placeholder =
                document.createElement("div");

            placeholder.className =
                "sell-preview-placeholder";

            addText(
                placeholder,
                "h3",
                "Listing saved!"
            );

            addText(
                placeholder,
                "p",
                "Your saved listing appears below."
            );

            preview.appendChild(placeholder);
        }
    );

    renderSavedListings();

});