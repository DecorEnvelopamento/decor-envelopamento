const carousel = document.getElementById("catalogo-carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("catalogo-dots");

let cardWidth = 0;
let visibleItems = 1;
let totalItems = 0;
let totalDots = 0;

function updateCardWidth() {
    const firstCard = carousel.querySelector("div");
    if (firstCard) {
        cardWidth = firstCard.offsetWidth + 24; // margem horizontal
    }
}

function generateDots() {
    dotsContainer.innerHTML = ""; // limpar dots antigos
    totalItems = carousel.children.length;
    visibleItems = Math.floor(carousel.offsetWidth / cardWidth) || 1;
    totalDots = Math.ceil(totalItems / visibleItems);

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("span");
        dot.classList.add("catalogo-dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            carousel.scrollTo({
                left: i * cardWidth * visibleItems,
                behavior: "smooth",
            });
            updateActiveDot(i);
        });
        dotsContainer.appendChild(dot);
    }
}

function updateActiveDot(index) {
    document.querySelectorAll(".catalogo-dot").forEach((d, i) => {
        d.classList.toggle("active", i === index);
    });
}

function handleScroll() {
    updateCardWidth();

    const scrollPos = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
    const itemWidth = cardWidth * visibleItems;

    // Se o scroll estiver quase no máximo, marque a última dot
    if (scrollPos >= maxScroll - 5) { // 5px de margem para erro
        updateActiveDot(totalDots - 1);
        return;
    }

    let index = Math.round(scrollPos / itemWidth);

    if (index >= totalDots) index = totalDots - 1;
    if (index < 0) index = 0;

    updateActiveDot(index);
}

function initCarousel() {
    updateCardWidth();
    generateDots();

    prevBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: -cardWidth * visibleItems, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: cardWidth * visibleItems, behavior: "smooth" });
    });

    carousel.addEventListener("scroll", handleScroll);
}

window.addEventListener("load", initCarousel);
window.addEventListener("resize", () => {
    updateCardWidth();
    generateDots();
});