class GithubInfos extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() { return ["repository"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "repository" && oldValue != newValue) {
			fetch(`https://api.github.com/repos/${newValue}`)
			.then(response => response.json())
      .then(data => this.render(data));
    }
  }

  connectedCallback() { }
  adoptedCallback() { }
  disconnectedCallback() { }

  render(data) {
    const content = `
      <header>
        <a href="${data.html_url || '#'}" target="_blank">${data.name || ''}</a>
        <a href="${data.owner.html_url || '#'}" target="_blank">@${data.owner.login || ''}</a>
      </header>
      <p>${data.description || ''}</p>
      <hr>
      <div>
        <span>${data.subscribers_count} watchers</span>
        <span>${data.watchers} stars</span>
        <span>${data.forks} forks</span>
      </div>
    `;

    this.innerHTML = content;
  }

}

customElements.define('github-infos', GithubInfos);
