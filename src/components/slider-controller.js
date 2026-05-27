class ProjectCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex items-center justify-center gap-3 mt-7">
        <button
          id="prev"
          disabled
          aria-label="Anterior"
          class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          &#8592;
        </button>
        <div id="dots" class="flex gap-2"></div>
        <button
          id="next"
          aria-label="Próximo"
          class="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          &#8594;
        </button>
      </div>
    `;
  }
}

customElements.define("slider-controller", ProjectCard);
