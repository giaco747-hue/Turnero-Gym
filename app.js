const contenedor = document.getElementById("contenedorTurnos");
let turnos = [];

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    turnos = data;
    renderTurnos();
  });

function renderTurnos() {
  contenedor.innerHTML = "";

  turnos.map(turno => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${turno.area}</h3>
      <p>Cupos disponibles: ${turno.cupos}</p>
      <button 
        onclick="reservarTurno(${turno.id})"
        ${turno.cupos === 0 ? "disabled" : ""}
      >
        ${turno.cupos === 0 ? "Sin cupos" : "Reservar"}
      </button>
    `;

    contenedor.appendChild(div);
  });
}

function reservarTurno(id) {
  const turno = turnos.find(t => t.id === id);

  if (turno.cupos > 0) {
    turno.cupos--;

    Swal.fire({
      icon: "success",
      title: "Reserva confirmada",
      text: `Has reservado en ${turno.area}`,
      timer: 2000,
      showConfirmButton: false
    });

  } else {

    Swal.fire({
      icon: "error",
      title: "Sin cupos",
      text: `No hay cupos disponibles en ${turno.area}`,
      timer: 2000,
      showConfirmButton: false
    });

    return;
  }

  renderTurnos();
}