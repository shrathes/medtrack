// ================================
// MEDTRACK AUTHENTICATION DEMO
// ================================


// Toggle password visibility
function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    if (!input) return;

    if (input.type === "password") {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁";

    }

}


// ================================
// REGISTER
// ================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const firstName =
            document.getElementById("firstName").value.trim();

        const lastName =
            document.getElementById("lastName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const role =
            document.getElementById("userRole").value;

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check password
        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }


        // Check password length
        if (password.length < 6) {

            alert("Password must contain at least 6 characters.");

            return;

        }


        // Get existing users
        const users =
            JSON.parse(localStorage.getItem("medtrackUsers")) || [];


        // Check existing email
        const existingUser =
            users.find(user => user.email === email);


        if (existingUser) {

            alert("An account with this email already exists.");

            return;

        }


        // Create user
        const newUser = {

            firstName: firstName,

            lastName: lastName,

            email: email,

            phone: phone,

            role: role,

            password: password

        };


        users.push(newUser);


        localStorage.setItem(
            "medtrackUsers",
            JSON.stringify(users)
        );


        alert(
            "Account created successfully! You can now login."
        );


        window.location.href = "login.html";

    });

}


// ================================
// LOGIN
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        const users =
            JSON.parse(localStorage.getItem("medtrackUsers")) || [];


        const user =
            users.find(
                item =>
                    item.email === email &&
                    item.password === password
            );


        if (!user) {

            alert(
                "Invalid email or password."
            );

            return;

        }


        // Save logged-in user
        localStorage.setItem(
            "medtrackCurrentUser",
            JSON.stringify(user)
        );


        alert(
            `Welcome back, ${user.firstName}!`
        );


        // Redirect based on account type
        if (user.role === "hospital") {

            window.location.href =
                "hospital-dashboard.html";

        } else {

            window.location.href =
                "index.html";

        }

    });

}


// ================================
// GOOGLE BUTTON DEMO
// ================================

const googleLogin =
    document.getElementById("googleLogin");

if (googleLogin) {

    googleLogin.addEventListener("click", function () {

        alert(
            "Google authentication requires Firebase or Google OAuth configuration."
        );

    });

}


const googleRegister =
    document.getElementById("googleRegister");

if (googleRegister) {

    googleRegister.addEventListener("click", function () {

        alert(
            "Google registration requires Firebase or Google OAuth configuration."
        );

    });

}


// ================================
// FORGOT PASSWORD
// ================================

const forgotPassword =
    document.getElementById("forgotPassword");

if (forgotPassword) {

    forgotPassword.addEventListener("click", function (event) {

        event.preventDefault();

        const email =
            prompt(
                "Enter your registered email address:"
            );


        if (!email) return;


        const users =
            JSON.parse(localStorage.getItem("medtrackUsers")) || [];


        const user =
            users.find(item => item.email === email);


        if (user) {

            alert(
                "For this demo, password recovery would normally send a secure reset link to your email."
            );

        } else {

            alert(
                "No account was found with that email."
            );

        }

    });

}