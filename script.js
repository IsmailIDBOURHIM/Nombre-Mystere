var tableau = new Array();
var nombreAleatoire, NbrTentatives, nom, messageDiv, proposition, dateDebut, chrono;
function ajoutPersonne(nom, NbrTentatives, temps) {
  var personne = {
    rang: null,
    nom: nom,
    score: NbrTentatives,
    time: temps,
  };
  if (tableau.length < 10) {
    tableau.push(personne);
    tableau.sort(function (a, b) {
      if (a.score == b.score) return a.time - b.time;
      return a.score - b.score;
    });
  } else {
    tableau.push(personne);
    tableau.sort(function (a, b) {
      if (a.score == b.score) return a.time - b.time;
      return a.score - b.score;
    });
    tableau.pop();
  }
  tableau.forEach(function (i, j) {
    i.rang = j + 1;
  });
}
var myTime;
function timeGame () {
  chrono++;
  document.getElementById("chrono").innerHTML = chrono + " s";
}
function guess() {
  console.log("aleatoire : " + nombreAleatoire);
  messageDiv = document.getElementById("message");
  proposition = parseInt(this.value);
  this.value = "";
  NbrTentatives++;
  if (proposition < nombreAleatoire)
    messageDiv.innerText = "votre nombre est trop petit";
  else if (proposition > nombreAleatoire)
    messageDiv.innerText = "votre nombre est trop grand";
  else {
    clearInterval(myTime);
    document.getElementById("intext").removeAttribute("type");
    var dateFin = new Date();
    var temps = Math.round((dateFin.getTime() - dateDebut.getTime()) / 1000);
    var h2 = document.getElementById("réussir");
    h2.innerText = "Bravo Vous avez gagné | nombre de tentitatives est : " + NbrTentatives;
    messageDiv.style.color = "red";
    messageDiv.innerText = "Entrez votre nom SVP";

    document.getElementById("intext").onchange = function (i) {
      document.getElementById("intext").setAttribute("type", "text");
      nom = this.value;
      console.log("nom : " + nom);
      this.value = "";
      h2.innerText = "";
      messageDiv.innerText = "";
      ajoutPersonne(nom, NbrTentatives, temps);
      remplissage(tableau);
      document.getElementById("intext").style.visibility = "hidden";
      document.getElementById("intext").removeAttribute("type");
    }
  }
}
function startGame() {
  clearInterval(myTime);
  myTime = setInterval(function(){ timeGame() }, 1000);
  dateDebut = new Date();
  nombreAleatoire = 1 + Math.floor(Math.random() * 10);
  NbrTentatives = 0;
  chrono = 0;
  document.getElementById("intext").style.visibility = "visible";
  document.getElementById("message").style.color = "black";
  document.getElementById("message").innerHTML = "Entrez un entier entre 0 et 10 ";
  document.getElementById("intext").setAttribute("type", "number");
  document.getElementById("intext").onchange = guess;
}

var tableauMys = new Array(10);
var ndiv, table, ntr, ntd;
function mystere_tableau() {
  const precTable = document.getElementsByTagName("table")[0];
  if (precTable) precTable.remove();
  ndiv = document.getElementById("mystere-tableau");
  table = document.createElement("TABLE");
  ntr = document.createElement("TR");
  ntd = document.createElement("TD");
  ntd.innerHTML = "Rang";
  ntr.append(ntd);
  ntd = document.createElement("TD");
  ntd.innerHTML = "Nom";
  ntr.append(ntd);
  ntd = document.createElement("TD");
  ntd.innerHTML = "NbrTentatives";
  ntr.append(ntd);
  ntd = document.createElement("TD");
  ntd.innerHTML = "Temps";
  ntr.append(ntd);
  table.append(ntr);
  ndiv.append(table);
  for (let i = 0; i < tableauMys.length; i++) {
    ntr = document.createElement("TR");
    for (let j = 0; j < 4; j++) {
      ntd = document.createElement("TD");
      ntd.innerHTML = "...";
      ntr.append(ntd);
    }
    table.append(ntr);
  }
  remplissage(tableau);
}
mystere_tableau();

function remplissage(tableau) {
  const tr = document.querySelectorAll("tr");
  for (let i = 0; i < tableau.length; i++) {
    const td = tr[i + 1].querySelectorAll("td");
    td[0].innerHTML = tableau[i].rang;
    td[1].innerHTML = tableau[i].nom;
    td[2].innerHTML = tableau[i].score;
    td[3].innerHTML = tableau[i].time;
  }
}
