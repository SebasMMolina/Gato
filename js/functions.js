// Combinaciones ganadoras (posiciones 0 a 8 del tablero)
const LINEAS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],   // horizontales
    [0, 3, 6], [1, 4, 7], [2, 5, 8],   // verticales
    [0, 4, 8], [2, 4, 6]               // diagonales
];

// O = Chivas, X = América
const EQUIPOS = {
    O: { nombre: "Chivas",  imagen: "./img/chivas.png",  clase: "chivas" },
    X: { nombre: "América", imagen: "./img/america.png", clase: "america" }
};

let turno, tablero, terminado;

function reiniciar() {
    turno = "O";                       // empiezan las Chivas
    tablero = Array(9).fill(null);
    terminado = false;

    document.querySelectorAll(".casilla").forEach(casilla => {
        casilla.disabled = false;
        casilla.style.backgroundImage = "";
        casilla.classList.remove("ganadora");
    });

    mostrar("Turno: " + EQUIPOS[turno].nombre, EQUIPOS[turno].clase);
}

function activo(i) {
    if (terminado || tablero[i]) return;

    tablero[i] = turno;
    const casilla = document.querySelectorAll(".casilla")[i];
    casilla.style.backgroundImage = `url('${EQUIPOS[turno].imagen}')`;
    casilla.disabled = true;

    verificar();
}

function verificar() {
    const casillas = document.querySelectorAll(".casilla");
    const linea = LINEAS.find(([a, b, c]) =>
        tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]
    );

    if (linea) {
        linea.forEach(i => casillas[i].classList.add("ganadora"));
        mostrar(`¡Gana ${EQUIPOS[turno].nombre}!`, EQUIPOS[turno].clase);
        bloquear();
    } else if (tablero.every(Boolean)) {
        mostrar("¡Empate! Gana el gato", "");
        terminado = true;
    } else {
        turno = turno === "O" ? "X" : "O";
        mostrar("Turno: " + EQUIPOS[turno].nombre, EQUIPOS[turno].clase);
    }
}

function bloquear() {
    terminado = true;
    document.querySelectorAll(".casilla").forEach(casilla => casilla.disabled = true);
}

function mostrar(texto, clase) {
    const estado = document.getElementById("estado");
    estado.textContent = texto;
    estado.className = clase;
}

reiniciar();
