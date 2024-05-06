function mostrarResultados(results) {
  const contenedor = document.querySelector(".container-main");
  const template = document.querySelector("template");

  const resultados = document.querySelector(".resultados");
  resultados.textContent = `Resultado: ${results.length}`;

  while (contenedor.children[1]) {
    contenedor.removeChild(contenedor.children[1]);
  }

  for (const r of results) {
    console.log(r);
    const titleEl = template.content.querySelector(".art-data-title");
    titleEl.textContent = r.title;

    const priceEl = template.content.querySelector(".art-data-price");
    priceEl.textContent = `$${r.price}`;

    const conditionEl = template.content.querySelector(".art-data-state");
    conditionEl.textContent = r.condition;

    const imageEl = template.content.querySelector(".art-img");
    imageEl.src = r.thumbnail;

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
  //
}

async function main() {
  const formulario = document.querySelector(".form");

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const palabraABuscar = e.target.buscar.value;

    const fetchData = fetch(
      "https://api.mercadolibre.com/sites/MLA/search?q=" + palabraABuscar
    );
    const response = await fetchData;
    const jsonData = await response.json();
    const data = mostrarResultados(jsonData.results);
  });
}
main();
