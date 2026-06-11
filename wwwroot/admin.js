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
        fetchSiteContent();
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

    async function fetchSiteContent() {
        try {
            const response = await fetch('/api/sitecontent');
            if (response.ok) {
                const data = await response.json();
                document.getElementById("aboutUsText").value = data.aboutUsText || '';
                document.getElementById("contactEmail").value = data.contactEmail || '';
                document.getElementById("contactLocation").value = data.contactLocation || '';
            }
        } catch (error) {
            console.error("Fetch Site Content Error:", error);
        }
    }

    const siteContentForm = document.getElementById("siteContentForm");
    if (siteContentForm) {
        siteContentForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const msgDiv = document.getElementById("contentUpdateMsg");
            msgDiv.classList.add("hidden");

            const payload = {
                id: 1, // Add ID just in case
                aboutUsText: document.getElementById("aboutUsText").value,
                contactEmail: document.getElementById("contactEmail").value,
                contactLocation: document.getElementById("contactLocation").value
            };

            try {
                const response = await fetch('/api/sitecontent', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    msgDiv.innerText = "Content updated successfully!";
                    msgDiv.style.color = "var(--accent)";
                    msgDiv.classList.remove("hidden");
                } else if (response.status === 401 || response.status === 403) {
                    window.location.href = '/admin.html';
                } else {
                    msgDiv.innerText = "Failed to update content.";
                    msgDiv.style.color = "red";
                    msgDiv.classList.remove("hidden");
                }
            } catch (error) {
                console.error("Update Site Content Error:", error);
                msgDiv.innerText = "Connection error.";
                msgDiv.style.color = "red";
                msgDiv.classList.remove("hidden");
            }
        });
    }

    const galleryUploadForm = document.getElementById("galleryUploadForm");
    if (galleryUploadForm) {
        galleryUploadForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const msgDiv = document.getElementById("uploadMsg");
            msgDiv.classList.add("hidden");

            const imageInput = document.getElementById("galleryImage");
            if (!imageInput.files || imageInput.files.length === 0) return;

            const formData = new FormData();
            formData.append("image", imageInput.files[0]);

            try {
                const response = await fetch('/api/gallery/upload', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    msgDiv.innerText = "Image uploaded successfully!";
                    msgDiv.style.color = "green";
                    msgDiv.classList.remove("hidden");
                    galleryUploadForm.reset();
                } else if (response.status === 401 || response.status === 403) {
                    window.location.href = '/admin.html';
                } else {
                    const data = await response.json();
                    msgDiv.innerText = data.message || "Failed to upload image.";
                    msgDiv.style.color = "red";
                    msgDiv.classList.remove("hidden");
                }
            } catch (error) {
                console.error("Upload Error:", error);
                msgDiv.innerText = "Connection error.";
                msgDiv.style.color = "red";
                msgDiv.classList.remove("hidden");
            }
        });
    }
});
