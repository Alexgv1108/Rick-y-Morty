const solicitarData = (url, pagina, metodo) => {
    const peticion = {
        method: metodo
    }

    return fetch(`${url}?page=${pagina}`, peticion)
        .then(response => { return response.json() })
        .catch(error => { return error });
}

export default solicitarData;