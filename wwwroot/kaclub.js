document.addEventListener("DOMContentLoaded", () => {

   
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });


    const filterButtons = document.querySelectorAll(".filter-btn");
    const activityCards = document.querySelectorAll(".activities .card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            activityCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    const galleryImages = document.querySelectorAll(".gallery-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.querySelector(".close-lightbox");

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.classList.remove("hidden");
        });
    });

    closeLightbox.addEventListener("click", () => {
        lightbox.classList.add("hidden");
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.add("hidden");
        }
    });

    const regForm = document.getElementById("regForm");
    const formSuccess = document.getElementById("formSuccess");

    if (regForm) {
        regForm.addEventListener("submit", async (e) => {
            e.preventDefault(); 
            
            const formData = new FormData(regForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/registration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    regForm.style.display = "none";
                    formSuccess.classList.remove("hidden");
                    regForm.reset();
                } else {
                    alert("There was an error submitting the form.");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred while submitting.");
            }
        });
    }

});
