/* ========== Last Modified Section ========== */
const lastModifiedSpan = document.getElementById('last-modified');

const lastModifiedDate = new Date(document.lastModified);
const formattedDate = lastModifiedDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});


lastModifiedSpan.textContent = `${formattedDate}`;

/* ========== Work items Click Event to Show works__data (for smartphones) ========== */
const workItems = document.querySelectorAll('.works__item');

workItems.forEach(item => {
    item.addEventListener('click', () => {
        const data = item.querySelector('.works__data');

        if (data.style.opacity === "1") {
            data.style.opacity = "0";
            data.style.pointerEvents = "none";
            data.style.bottom = "-30%";
        } else {
            data.style.opacity = "1";
            data.style.pointerEvents = "auto";
            data.style.bottom = "0";
        }
    });
});

/* ========== SHOW MENU ========== */
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId)
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // to add the show-menu class to the div tag with the nav_menu class
            nav.classList.toggle('show-menu');
        })
    };
}
showMenu('nav-toggle', 'nav-menu');

/* ========== REMOVE MENU MOBILE ========== */
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    //when we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ========== SCROLL SECTIONS ACTIVE LINK ========== */
const sections = document.querySelectorAll('section[id]');
function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
}
window.addEventListener('scroll', scrollActive);

/* ========== SHOW SCROLL TOP ========== */
window.addEventListener('scroll', scrollTop);

function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');

    if (this.scrollY >= 200) {
        //when the scroll is higher than 200 viewprot height, add the show-scroll class
        scrollTop.classList.add('show-scroll')
    } else {
        scrollTop.classList.remove('show-scroll')
    }
}

/* ========== DARK LIGHT THEME ========== */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

//Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

//We obtain the current theme that the interface has by validationg the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

//We validate if the suser previously chose a topic
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

//Activate/deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    //Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    //We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
})

/* ========== REDUCE THE SIZE AND PRINT ON A4 SHEET ========== */
function scaleCv() {
    document.body.classList.add('scale-cv')
}

/* ========== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ========== */
function removeScale() {
    document.body.classList.remove('scale-cv')
}

/* ========== GENERATE PDF ========== */

//PDF generated area
let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button');

//html2pdf options
let opt = {
    margin: 0.1,
    filename: 'YavorHristozov_CV',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, scrollX: 0, scrollY: 0 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    pagebreak: {
        // mode: "avoid-all",
        mode: ["css", "legacy"],
        // before: ".pageInPDF",
        // after: ".stepInPDF",
    }
};


//Function to call areaCv and html2Pdf options
function generateResume() {
    html2pdf(areaCv, opt)
}

// When the button is clicked, it executes the three functions
resumeButton.addEventListener('click', () => {
    // 1. The class .scale-cv is added to the body, where it reduces the size of the
    scaleCv();
    // 2. The PDF is generated
    generateResume();
    // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal
    setTimeout(removeScale, 5000);

});
