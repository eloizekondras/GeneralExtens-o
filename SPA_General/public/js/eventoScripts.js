const url = "http://localhost:3000/";


// Função para confirmar a exclusão do evento
function confirmDeleteEvento(id) {
    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };
    // Fazer a requisição de exclusão usando Axios
    axios.delete(`${url}api/eventos/${id}`, config)
        .then(response => {
            //console.log(response.data);

            // Fechar o modal após a exclusão
            $(`#confirmDeleteModal${id}`).modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'Evento excluído com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                // Após o tempo definido (1500 ms), redirecione para a página desejada
                window.location.href = `../eventos/`;
            });
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
}

// Função de validação do formulário
function validateForm(formData) {
    const titulo = formData.get('titulo');
    const resumo = formData.get('resumo');
    const conteudo = formData.get('conteudo');
    const data_evento = formData.get('data_evento');
    const local = formData.get('local');
    const hora_evento = formData.get('hora_evento');

    if (!titulo || !resumo || !conteudo || !data_evento || !local || !hora_evento) {
        // Exibir mensagem de erro para o usuário
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false; // Impede o envio do formulário
    }

    return true; // Todos os campos estão preenchidos corretamente
}


// Evento quando o botão "Salvar" do formulário de edição é clicado
function UpdateEventoClick(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter os dados do formulário de edição
    const formData = new FormData(document.querySelector('#editEventoForm'));

    // Obter o ID do evento a ser editado
    const eventoId = document.querySelector('#editEventoId').value;

    // Chama a função de validação antes de enviar a solicitação PUT
    if (validateForm(formData)) {
        //busca o token armazenado no login
        const token = localStorage.getItem('token');

        // Configurar o cabeçalho com a autorizção do token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };
        // Fazer uma solicitação PUT para atualizar o evento
        axios.put(`${url}api/eventos/${eventoId}`, formData, config)
            .then(response => {
                //console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Evento alterado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // Após o tempo definido (1500 ms), redirecione para a página desejada
                    window.location.href = `../eventos/`;
                });
            })
            .catch(error => {
                console.error(error);
                // Lida com erros, se necessário
            });
    }
}

// Evento quando o botão "Salvar" do formulário de criação é clicado
function CreateEventoClick(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter os dados do formulário de criação
    const formData = new FormData(document.querySelector('#createEventoForm'));

    // Chama a função de validação antes de enviar a solicitação POST
    if (validateForm(formData)) {
        //busca o token armazenado no login
        const token = localStorage.getItem('token');

        // Configurar o cabeçalho com a autorizção do token
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };
        // Fazer uma solicitação POST para criar o evento
        axios.post(`${url}api/eventos/`, formData, config)
            .then(response => {
                //console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Evento criado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // Após o tempo definido (1500 ms), redirecione para a página eventos
                    window.location.href = `../eventos/`;
                });
            })
            .catch(error => {
                console.error(error);
                // Lida com erros, se necessário
            });
    }
}
