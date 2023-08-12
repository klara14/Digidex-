
const listaDigimonElement = document.getElementById('lista-digimon');
const detallesDigimonElement = document.getElementById('detalles-digimon');
const filtroNivelElement = document.getElementById('filtro-nivel');
const inputBusquedaElement = document.getElementById('input-busqueda');

//  obtener datos de la API de Digimon
async function obtenerDigimon() {
  try {
    const response = await fetch('https://digimon-api.vercel.app/api/digimon');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos de Digimon API:', error);
  }
}

//  mostrar los datos de Digimon 
function mostrarDigimon(digimon) {
  listaDigimonElement.innerHTML = '';
  detallesDigimonElement.innerHTML = '';

  digimon.forEach(d => {
    
    const liElement = document.createElement('li');
    liElement.textContent = d.name;
    liElement.addEventListener('click', () => mostrarDetallesDigimon(d));

    listaDigimonElement.appendChild(liElement);
  });
}

//  mostrar los detalles de un Digimon específico
function mostrarDetallesDigimon(digimon) {
  detallesDigimonElement.innerHTML = '';

  const imagenElement = document.createElement('img');
  imagenElement.src = digimon.img;

  const nombreElement = document.createElement('h2');
  nombreElement.textContent = digimon.name;

  const nivelElement = document.createElement('p');
  nivelElement.textContent = 'Nivel: ' + digimon.level;

  detallesDigimonElement.appendChild(imagenElement);
  detallesDigimonElement.appendChild(nombreElement);
  detallesDigimonElement.appendChild(nivelElement);
}

// filtrar por niveles 
function filtrarPorNivel(nivel) {
  const digimonFiltrados = digimonData.filter(d => d.level === nivel);
  mostrarDigimon(digimonFiltrados);
}

// buscador por nombre
function buscarPorNombre(nombre) {
  const digimonFiltrados = digimonData.filter(d => d.name.toLowerCase().includes(nombre.toLowerCase()));
  mostrarDigimon(digimonFiltrados);
}

// cambio en el filtro de nivel
filtroNivelElement.addEventListener('change', (event) => {
  const nivelSeleccionado = event.target.value;
  if (nivelSeleccionado === 'todos') {
    mostrarDigimon(digimonData);
  } else {
    filtrarPorNivel(nivelSeleccionado);
  }
});

//  cambio en el input de búsqueda
inputBusquedaElement.addEventListener('input', (event) => {
  const nombreBusqueda = event.target.value;
  buscarPorNombre(nombreBusqueda);
});

// iniciar
let digimonData = [];
obtenerDigimon()
  .then(data => {
    digimonData = data;
    mostrarDigimon(digimonData);
  })
  .catch(error => console.error(error));
