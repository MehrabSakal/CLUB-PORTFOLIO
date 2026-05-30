document.addEventListener("DOMContentLoaded", () => {
    
    // Login Form Logic
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const rememberMe = document.getElementById("rememberMe").checked;
            const errorMsg = document.getElementById("loginError");

            try {
                const response = await fetch('/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, rememberMe })
                });

                if (response.ok) {
                    window.location.href = '/dashboard.html';
                } else {
                    errorMsg.classList.remove("hidden");
                }
            } catch (error) {
                console.error("Login Error:", error);
                errorMsg.innerText = "Connection error. Please try again.";
                errorMsg.classList.remove("hidden");
            }
        });
    }

    // Dashboard Logic
    const dataTable = document.getElementById("dataTable");
    if (dataTable) {
        fetchRegistrationData();
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            await fetch('/api/admin/logout', { method: 'POST' });
            window.location.href = '/admin.html';
        });
    }

    async function fetchRegistrationData() {
        const errorMsg = document.getElementById("dashboardError");
        const tableBody = document.getElementById("tableBody");

        try {
            const response = await fetch('/api/registration');
            
            if (response.ok) {
                const data = await response.json();
                tableBody.innerHTML = '';
                
                data.forEach(reg => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${reg.id}</td>
                        <td>${reg.fullName}</td>
                        <td>${reg.studentId}</td>
                        <td>${reg.department}</td>
                        <td>${reg.email}</td>
                        <td>${reg.phone}</td>
                        <td>${reg.interest}</td>
                        <td>${reg.message || ''}</td>
                    `;
                    tableBody.appendChild(tr);
                });
            } else if (response.status === 401 || response.status === 403) {
                // Unauthorized, redirect to login
                window.location.href = '/admin.html';
            } else {
                errorMsg.classList.remove("hidden");
            }
        } catch (error) {
            console.error("Fetch Data Error:", error);
            errorMsg.classList.remove("hidden");
        }
    }
});
