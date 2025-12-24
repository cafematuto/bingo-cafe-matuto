let numeros = [];
for (let i = 1; i <= 75; i++) numeros.push(i);
let sorteados = JSON.parse(localStorage.getItem("sorteados")) || [];

function sortear() {
  if (numeros.length === 0) return;
  const index = Math.floor(Math.random() * numeros.length);
  const numero = numeros.splice(index, 1)[0];
  sorteados.push(numero);
  localStorage.setItem("sorteados", JSON.stringify(sorteados));
  document.getElementById("numero").innerText = numero;
  document.getElementById("historico").innerText = "Sorteados: " + sorteados.join(", ");
  new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg").play();
}

const cartelaEl = document.getElementById("cartela");
if (cartelaEl) {
  const params = new URLSearchParams(window.location.search);
  const jogador = params.get("j") || "0";
  let cartela = JSON.parse(localStorage.getItem("cartela_"+jogador));
  if (!cartela) {
    cartela = [];
    while (cartela.length < 25) {
      let n = Math.floor(Math.random() * 75) + 1;
      if (!cartela.includes(n)) cartela.push(n);
    }
    localStorage.setItem("cartela_"+jogador, JSON.stringify(cartela));
  }
  for (let i = 0; i < 5; i++) {
    let row = cartelaEl.insertRow();
    for (let j = 0; j < 5; j++) {
      let cell = row.insertCell();
      cell.innerText = cartela[i * 5 + j];
    }
  }
  setInterval(() => {
    let sorteados = JSON.parse(localStorage.getItem("sorteados")) || [];
    document.querySelectorAll("td").forEach(td => {
      if (sorteados.includes(parseInt(td.innerText))) td.classList.add("marcado");
    });
  }, 1000);
}

function bingo() {
  if (document.querySelectorAll(".marcado").length === 25) {
    alert("🎉 BINGO! Parabéns!");
  } else {
    alert("Ainda não completou a cartela 😉");
  }
}
