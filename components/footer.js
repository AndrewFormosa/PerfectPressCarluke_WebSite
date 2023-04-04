class Footer extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="footer">
        <div class="footer_text">
         Perfect Press | Tel: 01555 770992 | email: info@perfectpresscarluke.co.uk | Website by AJF
        </div>
      </div>
        `;
      }



  }

  customElements.define('footer-component', Footer);