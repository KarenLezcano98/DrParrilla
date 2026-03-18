const images = [
  "img/HERCULES.png",
  "img/HERCULES.png",
  "img/HERCULES.png"
];

let currentIndex = 0;

const mainImage = document.getElementById("mainImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dotsContainer");
const accordionItems = document.querySelectorAll(".accordion-item");

const imageViewer = document.getElementById("imageViewer");
const zoomLens = document.getElementById("zoomLens");

function renderDots() {
  dotsContainer.innerHTML = "";

  images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    if (index === currentIndex) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateImage();
    });

    dotsContainer.appendChild(dot);
  });
}

function updateImage() {
  mainImage.src = images[currentIndex];
  renderDots();
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
});

accordionItems.forEach((item) => {
  const header = item.querySelector(".accordion-header");
  const arrow = item.querySelector(".accordion-arrow");

  header.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    accordionItems.forEach((accItem) => {
      accItem.classList.remove("active");
      accItem.querySelector(".accordion-arrow").textContent = "⌄";
    });

    if (!isActive) {
      item.classList.add("active");
      arrow.textContent = "⌃";
    }
  });
});

imageViewer.addEventListener("mousemove", (e) => {
  const rect = imageViewer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  mainImage.style.transform = "scale(2)";
  mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;

  zoomLens.style.display = "block";
  zoomLens.style.left = `${x - zoomLens.offsetWidth / 2}px`;
  zoomLens.style.top = `${y - zoomLens.offsetHeight / 2}px`;
});

imageViewer.addEventListener("mouseenter", () => {
  zoomLens.style.display = "block";
});

imageViewer.addEventListener("mouseleave", () => {
  mainImage.style.transform = "scale(1)";
  mainImage.style.transformOrigin = "center center";
  zoomLens.style.display = "none";
});

updateImage();