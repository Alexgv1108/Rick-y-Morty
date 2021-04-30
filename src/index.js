import Peticion from './utils/Peticion.js';

const API = 'https://rickandmortyapi.com/api/character/';
const PAGES = 'view/pages/';

const solicitarData = async () => {
    try {
        const response = await Peticion(API, 'GET');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
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
