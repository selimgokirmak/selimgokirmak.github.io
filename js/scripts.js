/*!
 * Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
 */
//
// Scripts
// 


let portfolio_db;

document.addEventListener("DOMContentLoaded", () => {
    fetch("../portfolioDB.json")
    .then(response => response.json())
    .then((data) => {
        portfolio_db = data;
        // console.log(portfolio_db);

        loadPortfolio();
        buttonListener();
        // placeHolderAnimation();
    })
})


function addPortfolio(portfolio, portfolio_wrapper) {
    const div1 = document.createElement('div');
    div1.className = "col-md-6 col-lg-4 mb-5";
    
    const div2 = document.createElement('div');
    div2.className = "portfolio-item mx-auto";
    div2.setAttribute('data-bs-toggle', 'modal');
    div2.setAttribute('data-bs-target', portfolio.portfolioModal);
    div2.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.5)";

    const div3 = document.createElement('div');
    div3.className = "portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100";

    const div4 = document.createElement('div');
    div4.className = "portfolio-item-caption-content text-center text-white";

    const i = document.createElement('i');
    i.className = "fas fa-plus fa-3x";

    const img = document.createElement('img');
    img.className = "img-fluid";
    img.src = portfolio.image1;
    img.alt = "...";

    const div5 = document.createElement('div');
    div5.className = "mx-3"

    const h6_1 = document.createElement('h6');
    h6_1.className = "mt-2";
    h6_1.textContent = portfolio.title;

    const h6_2 = document.createElement('h6');
    h6_2.className = "mt-2";
    h6_2.textContent = "#" + portfolio.category.replace(" ", "");

    div4.appendChild(i);

    div3.appendChild(div4);

    div5.appendChild(h6_1);
    div5.appendChild(h6_2);

    div2.appendChild(div3);
    div2.appendChild(img);
    div2.appendChild(div5);

    div1.appendChild(div2);

    portfolio_wrapper.appendChild(div1);
}


function loadPortfolio(input_value=null) {
    const portfolio_wrapper = document.querySelector('.portfolio-wrapper');

    portfolio_wrapper.innerHTML = "";

    for (const portfolio of portfolio_db) {
        if (input_value === null) {
            addPortfolio(portfolio, portfolio_wrapper);
        } else {
            if (portfolio.title.toLowerCase().includes(input_value) || portfolio.category.toLowerCase().includes(input_value)) {
                addPortfolio(portfolio, portfolio_wrapper);
            } 
        }
    }
    listenClick()
}


function listenClick() {
    document.querySelectorAll(".portfolio-wrapper div.portfolio-item.mx-auto").forEach(item => {
        item.addEventListener("click", (e) => {
            // console.log(e.target.parentElement.getAttribute('data-bs-target'));
            const modal = e.target.parentElement.getAttribute('data-bs-target');

            const modalDiv = document.querySelector(".portfolio-modal.modal.fade");

            modalDiv.setAttribute("id", modal.replace("#", ""));
            modalDiv.setAttribute("aria-labelledby", modal.replace("#", ""));

            // console.log(modalDiv.getAttribute("id"));

            const modalTitle = document.querySelector(".portfolio-modal-title.text-secondary");

            modalTitle.textContent = portfolio_db.find(portfolio => portfolio.portfolioModal === modal).title;

            const modalImages = document.querySelectorAll(".img-fluid.rounded.mb-4.mt-4");

            modalImages[0].src = portfolio_db.find(portfolio => portfolio.portfolioModal === modal).image1;
            modalImages[0].parentElement.href = modalImages[0].src;
            modalImages[1].src = portfolio_db.find(portfolio => portfolio.portfolioModal === modal).image2;
            modalImages[1].parentElement.href = modalImages[1].src;
            modalImages[2].src = portfolio_db.find(portfolio => portfolio.portfolioModal === modal).image3;
            modalImages[2].parentElement.href = modalImages[2].src;

            if (document.querySelectorAll(".img-fluid.rounded.mb-4.mt-4")[1].src === modalImages[1].src) {
                e.target.click();
            }
        })
    })
}


document.querySelector("input.form-control").addEventListener("input", (e) => {
    loadPortfolio(e.target.value.toLowerCase());
})


document.querySelector("button.btn.btn-primary").addEventListener("click", () => {
    document.querySelector("input.form-control").value = "";
    loadPortfolio();
})


// function placeHolderAnimation() {
//     const input = document.querySelector("input.form-control");
//     const placeholderTexts = ["Real Estate", "Job Portal", "E-commerce", "Social Media", "Healthcare", "Education", "Finance", "Travel", "Food", "Entertainment"];
    
//     let currentIndex = 0;
//     let animationInterval;
    
//     function updatePlaceholder() {
//         const text = placeholderTexts[currentIndex];
//         for (let i = 0; i < text.length; i++) {
//             setTimeout(() => {
//                 input.placeholder = text.substring(0, i + 1);
//             }, 200 * (i + 1));
//         }
    
//         currentIndex++;
//         if (currentIndex === placeholderTexts.length) {
//             currentIndex = 0; // Reset to the beginning after reaching the last text
//         }
    
//         animationInterval = setTimeout(updatePlaceholder, 200 * text.length + 500); // Delay before starting the next text
//     }
    
//     function startAnimation() {
//         animationInterval = setTimeout(updatePlaceholder, 5000); // Delay before starting the animation
//     }
    
//     // Start the initial animation
//     startAnimation();
    
//     // Pause animation when input is focused
//     input.addEventListener("focus", () => {
//         clearTimeout(animationInterval);
//     });
    
//     input.addEventListener("input", () => {
//         if (input.value === "") {
//             // Resume animation when input loses focus
//             input.addEventListener("blur", () => {
//                 input.placeholder = "";
        
//                 setTimeout(() => {
//                     startAnimation();
//                 }, 5000);
//             });
//         }
//     })
// }


function buttonListener() {
    const buttons = document.querySelectorAll("button.filter-button");
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            buttons.forEach(btn => {
                btn.className = "btn btn-primary filter-button";
            })
            // console.log(e.target.textContent);
            const text = e.target.textContent.toLowerCase();
            if (text === "all") {
                loadPortfolio();
            } else {
                e.target.className = "btn btn-outline-secondary filter-button";
                loadPortfolio(text);
            }
        })
    })
}


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

