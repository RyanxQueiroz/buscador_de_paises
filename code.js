var todosPaises = []; 
var todosPaisesDiv = document.querySelector(".todosPaises");
var qtPaisesSpan = document.getElementById("qtPaises");

async function consultarPaises() {
  try {
    var resposta = await fetch("https://restcountries.com/v3.1/all");
    var dados = await resposta.json();

    todosPaises = dados;
    mostrarPaises(todosPaises);
    qtPaisesSpan.textContent = todosPaises.length;
  } catch (error) {
    console.error("Erro ao buscar os países:", error);
    qtPaisesSpan.textContent = "Erro";
  }
}

function mostrarPaises(paises) {
  todosPaisesDiv.innerHTML = "";
  
  paises.forEach(pais => {
    var paisDiv = document.createElement("div");
    paisDiv.classList.add("pais");

    paisDiv.innerHTML = `
      <img
          src="${pais.flags.png}"
          alt="Bandeira de ${pais.name.common}"
      />
      <p>${pais.name.common}</p>
    `;

    paisDiv.id = pais.cca2;

    paisDiv.addEventListener("click", abrirPaginaDetalhes);

    todosPaisesDiv.appendChild(paisDiv);
  });
}

function buscarPaises(valor) {
  var valorLower = valor.toLowerCase();
  var paisBuscados = todosPaises.filter(pais => pais.name.common.toLowerCase().includes(valorLower));
  
  mostrarPaises(paisBuscados);
  qtPaisesSpan.textContent = paisBuscados.length;
}

function filtrarContinente(continente) {
  if (continente === "Todos") {
    mostrarPaises(todosPaises);
    qtPaisesSpan.textContent = todosPaises.length;
  } else {
    var paisesFiltrados = todosPaises.filter(pais => pais.region === continente);
    mostrarPaises(paisesFiltrados);
    qtPaisesSpan.textContent = paisesFiltrados.length;
  }
}

document.querySelectorAll("input[name='filtros']").forEach(radio => {
  radio.addEventListener("change", function () {
    if (this.checked) {
      filtrarContinente(this.value);
    }
  });
});

function abrirPaginaDetalhes(event){
  var paisId;

  if (event.target.className !== "pais") {
    paisId = event.target.parentElement.id;
  } else {
    paisId = event.target.id;
  }

  window.location.href = `./detalhes.html?id=${paisId}`;
}

consultarPaises();
