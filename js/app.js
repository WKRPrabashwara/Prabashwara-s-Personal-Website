/* --------------- Grab elements from DOM --------------- */
const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

const links = document.querySelectorAll(".nav-link");

const humburger = document.querySelector(".humburger");

window.addEventListener("scroll", () => {
    activeLink();
    if (!skillsPlayed) skillsCounter();
});


/* --------------- Sticky Navbar --------------- */

function StickyNavbar() {
    header.classList.toggle("scrolled", window.pageYOffset > 0);
};

// StickyNavbar();

window.addEventListener("scroll", StickyNavbar);

/* --------------- Reveal Animation --------------- */

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".square", { delay: 600 });
sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });

/* --------------- Skills Progress Bar Animation --------------- */

function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;

    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;

    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}

let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(first_skill)) return;

    skillsPlayed = true;

    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue);

        setTimeout(() => {
            updateCount(counter, target);
        }, 400);
    });

    progress_bars.forEach(
        (p) => (p.style.animation = "progress 2s ease-in-out forwards")
    );
}


/* --------------- Timeline Animation --------------- */

sr.reveal(".timeline-item", { delay: 600 });

/* --------------- Modal Pop Up Animation Animation --------------- */

const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 500,
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/* --------------- Change Active Link On Scroll --------------- */

function activeLink() {
    let sections = document.querySelectorAll("section[id]");
    let passSelections = Array.from(sections)
        .map((sct, i) => {
            return {
                y: sct.getBoundingClientRect().top - header.offsetHeight,
                id: i,
            };
        })
        .filter((sct) => sct.y <= 0);

    let currSectionID = passSelections.at(-1).id;

    links.forEach((l) => l.classList.remove("active"));
    links[currSectionID].classList.add("active");
}

activeLink();

/* --------------- Change Page Theme --------------- */

/* --------------- Open & Close Navbar Menu --------------- */

humburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
});
