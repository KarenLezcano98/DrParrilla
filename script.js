document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("productsSlider");
  const prevBtn = document.querySelector(".product-prev");
  const nextBtn = document.querySelector(".product-next");

  if (slider && prevBtn && nextBtn) {
    function getScrollAmount() {
      const firstCard = slider.querySelector(".product-card");
      if (!firstCard) return 0;

      const sliderStyles = window.getComputedStyle(slider);
      const gap = parseFloat(sliderStyles.gap) || 0;
      const cardWidth = firstCard.getBoundingClientRect().width;

      return cardWidth + gap;
    }

    prevBtn.addEventListener("click", () => {
      slider.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    });

    nextBtn.addEventListener("click", () => {
      slider.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    });
  }

  const whatsappPopup = document.getElementById("whatsappPopup");
  const whatsappClose = document.getElementById("whatsappClose");
  const whatsappTeaser = document.getElementById("whatsappTeaser");
  const whatsappWidget = document.getElementById("whatsappWidget");
  const whatsappButton = document.getElementById("whatsappButton");

  if (whatsappPopup && whatsappClose && whatsappTeaser && whatsappWidget && whatsappButton) {
    whatsappButton.addEventListener("click", (event) => {
      event.preventDefault();
      whatsappPopup.classList.toggle("is-open");
      whatsappWidget.classList.add("hide-teaser");
    });

    whatsappTeaser.addEventListener("click", () => {
      whatsappPopup.classList.add("is-open");
      whatsappWidget.classList.add("hide-teaser");
    });

    whatsappClose.addEventListener("click", () => {
      whatsappPopup.classList.remove("is-open");
    });

    document.addEventListener("click", (event) => {
      const clickedInsideWidget = whatsappWidget.contains(event.target);
      if (!clickedInsideWidget) {
        whatsappPopup.classList.remove("is-open");
      }
    });
  }
});