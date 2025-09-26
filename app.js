let selectedRole = 'user'; // Default role

const userBtn = document.querySelector("#user-btn");
const adminBtn = document.querySelector("#admin-btn");

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
/// form restrictions based on the password

