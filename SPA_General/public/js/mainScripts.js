

function checkToken() {
    const token = localStorage.getItem('token');

    if (!token) { //Se não existe token, vai para o login
        window.location.href = `../login`;
    }

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    const url = "http://localhost:3000/";

    // Fazer uma solicitação POST para criar o usuario
    axios.get(`${url}api/checkUser/`, config)
        .then(response => {
            console.log(response.data);
            if (response.status != 200){
                window.location.href = `../login`;
            }
        })
        .catch(error => {
            console.error(error);
            window.location.href = `../login`;
        });
}

  