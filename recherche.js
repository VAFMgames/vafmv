    // Charger index.html et extraire les blocs
    fetch("index.html")
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Sélectionner les titres existants
        const articles = [];
        doc.querySelectorAll(".titre-fixe, .titre-overlay h4").forEach(el => {
          const bloc = el.closest(".vignette, .vignette-actu, a"); // récupère le bloc parent
          if (bloc) {
            articles.push({
              title: el.textContent.trim(),
              html: bloc.outerHTML
            });
          }
        });

        const searchInput = document.getElementById("search");
        const resultsDiv = document.getElementById("results");

        searchInput.addEventListener("keyup", () => {
          const query = searchInput.value.toLowerCase();
          const filtered = articles.filter(a =>
            a.title.toLowerCase().includes(query)
          );

          resultsDiv.innerHTML = filtered.map(a => `<div class="result">${a.html}</div>`).join("");
        });
      });
