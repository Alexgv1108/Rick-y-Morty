import Peticion from './utils/Peticion.js';

const API = 'https://rickandmortyapi.com/api/character/';

const DISPOSITIVO_MOVIL = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const NUMERO_COLUMNAS = DISPOSITIVO_MOVIL || screen.width < 1000 ? 6 : 3;
const RESPONSIVE = DISPOSITIVO_MOVIL ? 'md' : 'lg';

const RANGO_PAGINACION = DISPOSITIVO_MOVIL ? 3 : 4;
const ANTERIOR = DISPOSITIVO_MOVIL ? ' < ' : 'Anterior';
const SIGUIENTE = DISPOSITIVO_MOVIL ? ' > ' : 'Siguiente';

const solicitarData = async (index) => {
    try {
        const response = await Peticion(API, index, 'GET');
        personajes(response.results, index);
        paginacion(response.info.pages);
    } catch (error) {
        console.error(error);
    }
}

const personajes = (personajes, pagina) => {
    if (localStorage.getItem('pagina') == pagina) {
        $('.contenido-pag-principal').html('');
        window.scroll({
            top: 0
          });
        personajes.forEach(personaje => {
            $('.contenido-pag-principal').append(`
            <div class="col-${RESPONSIVE}-${NUMERO_COLUMNAS} item"><div class='contenido-item'>
            <img src='${personaje.image}'><h1>${personaje.name}</h1>
            <p>${personaje.status}</p><p>${personaje.species}</p><p>${personaje.gender}</p>
            </div></div>`);
        });
    }
}

const paginacion = (cantidad) => {
    if (localStorage.getItem('pagina') != 1) $('.paginacion-item').html(`<li class="item-pagina paginacion-item-anterior">${ANTERIOR}</li>`);
    else $('.paginacion-item').html('');
    for (let i = 1; i < cantidad+1; i++) {
        if (localStorage.getItem('pagina') > (i - RANGO_PAGINACION) && localStorage.getItem('pagina') < (i + RANGO_PAGINACION)) {
            if (i == localStorage.getItem('pagina')) {
                $('.paginacion-item').append(`<li class="item-pagina active paginacion-item-${i}">${i}</li>`);
            } else {
                $('.paginacion-item').append(`<li class="item-pagina paginacion-item-${i}">${i}</li>`);
            }
        }

        if (i == (localStorage.getItem('pagina') + RANGO_PAGINACION - 1)) {
            break;
        }

        $(`.paginacion-item-${i}`).on('click', () => {
            localStorage.setItem('pagina', i);
            solicitarData(i);
        });
    }
    if (localStorage.getItem('pagina') != cantidad) $('.paginacion-item').append(`<li class="item-pagina paginacion-item-siguiente">${SIGUIENTE}</li>`);

    $('.paginacion-item-anterior').on('click', () => {
        localStorage.setItem('pagina', localStorage.getItem('pagina') - 1);
        solicitarData(localStorage.getItem('pagina'));
    });

    $('.paginacion-item-siguiente').on('click', () => {
        localStorage.setItem('pagina', localStorage.getItem('pagina') - 1 + 2);
        solicitarData(localStorage.getItem('pagina'));
    });
}

const btnPageMain = () => {
    $('.abrirMain').on('click', () => {
        $('.main').removeClass('oculto');
        $('.pag-principal').removeClass('oculto');
        $('header').addClass('oculto');
    });
}

const iniciar = () => {
    localStorage.setItem('pagina', 1);
    btnPageMain();
    solicitarData(1);
}

iniciar();