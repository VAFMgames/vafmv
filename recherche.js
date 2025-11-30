  fetch("index.html")
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const articleNodes = doc.querySelectorAll(".article");

      const articles = Array.from(articleNodes).map(node => ({
        title: node.dataset.title,
        content: node.dataset.content,
        html: node.innerHTML
      }));

      const searchInput = document.getElementById("search");
      const resultsDiv = document.getElementById("results");

      searchInput.addEventListener("keyup", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = articles.filter(a =>
          a.title.toLowerCase().includes(query) ||
          a.content.toLowerCase().includes(query)
        );

        resultsDiv.innerHTML = filtered.map(a => `<div class="article">${a.html}</div>`).join("");
      });
    });
