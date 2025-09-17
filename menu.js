
const menuSettimana = {
  "Lunedì": {
    "Colazione": "Tè verde, 4 gallette di riso con marmellata senza zucchero",
    "Pranzo": "Riso basmati con verdure, petto di pollo alla griglia, insalata",
    "Cena": "Zuppa di legumi, carote al vapore"
  },
  "Martedì": {
    "Colazione": "Yogurt greco, noci, miele",
    "Pranzo": "Pasta integrale con zucchine, tonno al naturale, insalata mista",
    "Cena": "Uova strapazzate, spinaci lessi, una fetta di pane integrale"
  },
  "Mercoledì": {
    "Colazione": "Frullato con banana, latte di mandorla e proteine",
    "Pranzo": "Pollo al curry con riso basmati, verdure saltate",
    "Cena": "Passato di verdure, mozzarella light"
  }
};

const regole = `
<ul>
  <li>✅ Bere almeno 2L d'acqua al giorno</li>
  <li>✅ Pasti piccoli e frequenti</li>
  <li>✅ Mangiare a orari regolari, non saltare i pasti</li>
  <li>✅ Masticare lentamente</li>
  <li>🚫 Evitare fritti, cibi piccanti, bevande gassate</li>
  <li>🚫 Limitare caffè e alcol</li>
</ul>
`;

function salvaNota() {
  const giorno = document.getElementById("giorno").value;
  const nota = document.getElementById("nota").value;
  const umore = document.getElementById("umore").value;
  const storageKey = `nota-${giorno}`;
  localStorage.setItem(storageKey, `${nota} 😎 ${umore}`);
  mostraNote();
}

function mostraNote() {
  const container = document.getElementById("note-container");
  container.innerHTML = "";
  for (let giorno of Object.keys(menuSettimana)) {
    const nota = localStorage.getItem(`nota-${giorno}`);
    if (nota) {
      container.innerHTML += `<div class="note"><strong>${giorno}:</strong> ${nota}</div>`;
    }
  }
}

function cambiaTab(tab) {
  document.querySelectorAll(".tab-content").forEach(div => div.classList.remove("active"));
  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(tab).classList.add("active");
  document.querySelector(`.tab-button[onclick="cambiaTab('${tab}')"]`).classList.add("active");

  if (tab === "menu") mostraMenu();
  if (tab === "regole") mostraRegole();
}

function mostraMenu() {
  const giorno = document.getElementById("giorno").value;
  const menu = menuSettimana[giorno];
  const container = document.getElementById("menu");
  if (menu) {
    container.innerHTML = `<h3>${giorno}</h3>
      <ul>
        <li>🍽 Colazione: ${menu.Colazione}</li>
        <li>🥗 Pranzo: ${menu.Pranzo}</li>
        <li>🌙 Cena: ${menu.Cena}</li>
      </ul>`;
  } else {
    container.innerHTML = "<p>Nessun menù disponibile per questo giorno.</p>";
  }
}

function mostraRegole() {
  document.getElementById("regole").innerHTML = regole;
}

document.addEventListener("DOMContentLoaded", mostraNote);
