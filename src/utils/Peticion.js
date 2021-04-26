const solicitarData = (url, metodo) => {
    const peticion = {
        method: metodo
    }

    return fetch(url, peticion)
        .then(response => { return response.json() })
        .catch(error => { return error });
}

export default solicitarData;