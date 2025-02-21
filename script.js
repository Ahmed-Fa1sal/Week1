document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const companyName = document.getElementById("company-name").value.trim();
        const crNumber = document.getElementById("cr-number").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const city = document.getElementById("city").value.trim();
        const region = document.getElementById("region").value.trim();
        const zip = document.getElementById("zip").value.trim();
        const businessType = document.getElementById("business-type").value;
        const terms = document.getElementById("terms").checked;

        let errors = [];

        if (!companyName || !crNumber || !email || !phone || !password || !confirmPassword || !city || !region || !zip || !businessType) {
            errors.push("All fields must be filled.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("Invalid email format.");
        }

        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }

        if (password !== confirmPassword) {
            errors.push("Passwords do not match.");
        }

        if (!terms) {
            errors.push("You must agree to the Terms & Conditions.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        const formData = {
            companyName, crNumber, email, phone, password, city, region, zip, businessType
        };

        try {
            const response = await fetch("https://example.com/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Registration failed.");

            alert("Registration successful!");
            form.reset();
        } catch (error) {
            alert(error.message);
        }
    });
});
