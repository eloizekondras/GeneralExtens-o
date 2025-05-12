const url = "http://localhost:3000/";


// Função para confirmar a exclusão do usuario
function confirmDeleteUsuario(id) {
    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho Content-Type
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    // Fazer a requisição de exclusão usando Axios
    axios.delete(`${url}api/usuarios/${id}`, config)
        .then(response => {
            //console.log(response.data);

            // Fechar o modal após a exclusão
            $(`#confirmDeleteModal${id}`).modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'Usuario excluído com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                // Após o tempo definido (1500 ms), redirecione para a página desejada
                window.location.href = `../usuarios/`;
            });
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
}

// Função de validação do formulário
function validateForm(formData) {
    const nome = formData.get('nome');
    const email = formData.get('email');
    const senha = formData.get('senha');
    const confirmarsenha = formData.get('confirmarsenha');


    if (!nome || !email || !senha || !confirmarsenha) {
        // Exibir mensagem de erro para o usuário
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false; // Impede o envio do formulário
    }

    if (senha !== confirmarsenha) {
        // Exibir mensagem de erro para o usuário
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'O campos Senha e Confirmar Senha estão diferentes!',
        });
        return false; // Impede o envio do formulário
    }

    if (senha.length < 6) {
        // Exibir mensagem de erro para o usuário
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Senha precisa ter pelo menos 6 caracteres!',
        });
        return false; // Impede o envio do formulário      
    }


    return true; // Todos os campos estão preenchidos corretamente
}


// Usuario quando o botão "Salvar" do formulário de edição é clicado
function UpdateUsuarioClick(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter os dados do formulário de edição
    const formData = new FormData(document.querySelector('#editUsuarioForm'));

    // Obter o ID do usuario a ser editado
    const usuarioId = document.querySelector('#editUsuarioId').value;

    // Chama a função de validação antes de enviar a solicitação PUT
    if (validateForm(formData)) {
        // Serializar os dados do formulário para formato URL encoded
        const serializedData = new URLSearchParams(formData).toString();

        //busca o token armazenado no login
        const token = localStorage.getItem('token');

        // Configurar o cabeçalho Content-Type
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
        };

        // Fazer uma solicitação PUT para atualizar o usuario
        axios.put(`${url}api/usuarios/${usuarioId}`, serializedData, config)
            .then(response => {
                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Usuario alterado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // Após o tempo definido (1500 ms), redirecione para a página desejada
                    window.location.href = `../usuarios/`;
                });
            })
            .catch(error => {
                // Lida com erros
                const mensagem = error.response.data.error;
                Swal.fire({
                    icon: 'error',
                    title: mensagem,
                    showConfirmButton: true,
                });
                console.error(error);
            });
    }
}

// Usuario quando o botão "Salvar" do formulário de criação é clicado
function CreateUsuarioClick(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter os dados do formulário de criação
    const formData = new FormData(document.querySelector('#createUsuarioForm'));

    // Chama a função de validação antes de enviar a solicitação POST
    if (validateForm(formData)) {
        // Serializar os dados do formulário para formato URL encoded
        const serializedData = new URLSearchParams(formData).toString();
        //busca o token armazenado no login
        const token = localStorage.getItem('token');

        // Configurar o cabeçalho Content-Type
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
        };

        // Fazer uma solicitação POST para criar o usuario
        axios.post(`${url}api/usuarios/`, serializedData, config)
            .then(response => {
                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Usuario criado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // Após o tempo definido (1500 ms), redirecione para a página desejada
                    window.location.href = `../usuarios/`;
                });
            })
            .catch(error => {
                // Lida com erros
                const mensagem = error.response.data.error;
                Swal.fire({
                    icon: 'error',
                    title: mensagem,
                    showConfirmButton: true,
                });
                console.error(error);
            });
    }
}
