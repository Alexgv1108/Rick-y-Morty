import Peticion from './utils/Peticion.js';

const API = 'https://rickandmortyapi.com/api/character/';
const PAGES = 'view/pages/';
const NUMERO_COLUMNAS = 3

const solicitarData = async () => {
    try {
        const response = await Peticion(API, 'GET');
        console.log(response.results)
        personajes(response.results);
    } catch (error) {
        console.error(error);
    }
}

const personajes = (personajes) => {
    personajes.forEach(personaje => {
        $('.contenido-pag-principal').append(`
        <div class="col-md-${NUMERO_COLUMNAS} item"><div class='contenido-item'>
        <img src='${personaje.image}'><h1>${personaje.name}</h1>
        <p>${personaje.status}</p><p>${personaje.species}</p><p>${personaje.gender}</p>
        </div></div>`);
    });
}

const btnPageMain = () => {
    $('.abrirMain').on('click', () => {
        $('.main').removeClass('oculto');
        $('.pag-principal').removeClass('oculto');
        $('header').addClass('oculto');
    });
}

btnPageMain();
solicitarData();
