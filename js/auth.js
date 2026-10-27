document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LOGIN PAGE
    ===================================================== */

    const loginForm = document.getElementById("loginForm");

    // Only run login code if login form exists
    if (loginForm) {

        const emailInput =
            document.getElementById("email");

        const passwordInput =
            document.getElementById("password");

        const togglePassword =
            document.getElementById("togglePassword");

        const loginMessage =
            document.getElementById("loginMessage");


        /* SHOW / HIDE LOGIN PASSWORD */

        if (togglePassword && passwordInput) {

            togglePassword.addEventListener(
                "click",
                function () {

                    if (passwordInput.type === "password") {

                        passwordInput.type = "text";
                        togglePassword.textContent = "Hide";

                        togglePassword.setAttribute(
                            "aria-label",
                            "Hide password"
                        );

                    } else {

                        passwordInput.type = "password";
                        togglePassword.textContent = "Show";

                        togglePassword.setAttribute(
                            "aria-label",
                            "Show password"
                        );
                    }

                }
            );
        }


        /* LOGIN FORM VALIDATION */

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const email =
                    emailInput.value.trim();

                const password =
                    passwordInput.value;

                loginMessage.className =
                    "login-message";

                loginMessage.textContent = "";


                if (email === "") {

                    showLoginError(
                        "Please enter your email."
                    );

                    return;
                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    showLoginError(
                        "Please enter a valid email."
                    );

                    return;
                }


                if (password === "") {

                    showLoginError(
                        "Please enter your password."
                    );

                    return;
                }


                if (password.length < 8) {

                    showLoginError(
                        "Password must contain at least 8 characters."
                    );

                    return;
                }


                loginMessage.className =
                    "login-message success";

                loginMessage.textContent =
                    "Form validated. Backend login is not connected yet.";

            }
        );


        function showLoginError(message) {

            loginMessage.className =
                "login-message error";

            loginMessage.textContent =
                message;
        }
    }


    /* =====================================================
       REGISTRATION PAGE
    ===================================================== */

    const registerForm =
        document.getElementById("registerForm");


    // Only run registration code if register form exists
    if (!registerForm) {
        return;
    }


    const fullName =
        document.getElementById("fullName");

    const email =
        document.getElementById("registerEmail");

    const phone =
        document.getElementById("phone");

    const password =
        document.getElementById("registerPassword");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const agreeTerms =
        document.getElementById("agreeTerms");

    const message =
        document.getElementById("registerMessage");


    /* SHOW / HIDE REGISTRATION PASSWORDS */

    document.querySelectorAll(
        ".register-page .toggle-password"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const input =
                    document.getElementById(
                        button.dataset.target
                    );

                if (!input) {
                    return;
                }


                if (input.type === "password") {

                    input.type = "text";
                    button.textContent = "Hide";

                } else {

                    input.type = "password";
                    button.textContent = "Show";
                }

            }
        );

    });


    /* REGISTRATION FORM VALIDATION */

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nameValue =
                fullName.value.trim();

            const emailValue =
                email.value.trim();

            const phoneValue =
                phone.value.trim();

            const passwordValue =
                password.value;

            const confirmValue =
                confirmPassword.value;


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            const phonePattern =
                /^[0-9]{10}$/;


            /* FULL NAME */

            if (nameValue.length < 2) {

                showRegisterError(
                    "Enter your full name."
                );

                return;
            }


            /* EMAIL */

            if (!emailPattern.test(emailValue)) {

                showRegisterError(
                    "Enter a valid email address."
                );

                return;
            }


            /* PHONE */

            if (!phonePattern.test(phoneValue)) {

                showRegisterError(
                    "Enter a valid 10-digit phone number."
                );

                return;
            }


            /* PASSWORD */

            if (passwordValue.length < 8) {

                showRegisterError(
                    "Password must contain at least 8 characters."
                );

                return;
            }


            /* CONFIRM PASSWORD */

            if (passwordValue !== confirmValue) {

                showRegisterError(
                    "Passwords do not match."
                );

                return;
            }


            /* TERMS */

            if (!agreeTerms.checked) {

                showRegisterError(
                    "Please accept the Terms and Conditions."
                );

                return;
            }


            /* SUCCESS */

            message.className =
                "login-message success";

            message.textContent =
                "Form validated! Account creation will be available after backend integration.";

        }
    );


    function showRegisterError(text) {

        message.className =
            "login-message error";

        message.textContent =
            text;
    }

});