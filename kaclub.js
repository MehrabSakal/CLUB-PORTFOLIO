document.addEventListener("DOMContentLoaded", () => {

    // 1. Sticky Navigation
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    });

    // 2. Activity Filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const activityCards = document.querySelectorAll(".activities .card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            // Add active class to clicked button
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            // Filter the cards
            activityCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    // 3. Interactive Image Gallery (Lightbox)
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

    // Close Lightbox on 'X' click
    closeLightbox.addEventListener("click", () => {
        lightbox.classList.add("hidden");
    });

    // Close Lightbox on clicking outside the image
    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.add("hidden");
        }
    });

    // 4. Form Validation & "Thank You" Message
    const regForm = document.getElementById("regForm");
    const formSuccess = document.getElementById("formSuccess");

    if (regForm) {
        regForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page reload

            // Basic custom validation can be added here if needed, 
            // but HTML5 'required' attributes handle most of it.
            
            // Hide the form and show success message
            regForm.style.display = "none";
            formSuccess.classList.remove("hidden");

            // Optionally, reset the form for future use
            regForm.reset();
        });
    }

});
