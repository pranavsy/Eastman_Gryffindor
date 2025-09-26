let selectedRole = 'user'; // Default role

const userBtn = document.querySelector("#user-btn");
const adminBtn = document.querySelector("#admin-btn");
const form = document.querySelector("#role-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorBox = document.querySelector("#error-box");

userBtn.addEventListener("click", () => {
    selectedRole = "user";
    userBtn.classList.add("active-role");
    adminBtn.classList.remove("active-role");
    console.log("User role selected");
});

adminBtn.addEventListener("click", () => {
    selectedRole = "admin";
    adminBtn.classList.add("active-role");
    userBtn.classList.remove("active-role");
    console.log("Admin role selected");
});

// Form validation
form.addEventListener("submit", (e) => {
    let errors = [];

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (!emailValue) {
        errors.push("Email is required.");
    } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
        errors.push("Enter a valid email address.");
    }

    if (!passwordValue) {
        errors.push("Password is required.");
    } else if (passwordValue.length < 6) {
        errors.push("Password must be at least 6 characters.");
    }

    if (errors.length > 0) {
        e.preventDefault(); // Prevent form from submitting
        errorBox.innerHTML = errors.map(err => `<p>${err}</p>`).join('');
        errorBox.style.display = "block";
    } else {
        errorBox.style.display = "none";
        console.log(`Form submitted with role: ${selectedRole}`);
        // You can also add: form.submit(); if needed
    }
});
