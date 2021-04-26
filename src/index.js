import Peticion from './utils/Peticion.js';

const API = 'https://rickandmortyapi.com/api/character/';

const solicitarData = async () => {
    try {
        const response = await Peticion(API, 'GET');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

solicitarData();
