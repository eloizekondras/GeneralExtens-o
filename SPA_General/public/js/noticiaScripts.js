
const url = "http://localhost:3000/";


///     FUNÇÕES DO CADASTRO DE NOTICIAS  ///
// Função para confirmar a exclusão do noticia
function confirmDeleteNoticia(id) {
    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    // Fazer a requisição de exclusão usando Axios
    axios.delete(`${url}api/noticias/${id}`, config)
        .then(response => {
            console.log(response.data);

            // Fechar o modal após a exclusão
            $(`#confirmDeleteModal${id}`).modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'Notícia excluída com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                // Após o tempo definido (1500 ms), redirecione para a página desejada
                window.location.href = `../noticias/`;
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
    const imagem_principal = formData.get('imagem_principal');

    if (!titulo || !resumo || !imagem_principal || !conteudo) {
        // Exibir mensagem de erro para o usuário
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false; // Impede o envio do formulário
    }

    // Validar a imagem
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const imageExtension = imagem_principal.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(`.${imageExtension}`)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A imagem deve ser um arquivo de imagem válido (jpg, jpeg, png, gif)!',
        });
        return false;
    }

    return true; // Todos os campos estão preenchidos corretamente
}


// Evento quando o botão "Salvar" do formulário de edição é clicado
function UpdateNoticiaClick(event) {

    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter os dados do formulário de edição
    const formData = new FormData(document.querySelector('#editNoticiaForm'));

    // Obter o ID do noticia a ser editado
    const noticiaId = document.querySelector('#editNoticiaId').value;

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
        // Fazer uma solicitação PUT para atualizar o noticia
        axios.put(`${url}api/noticias/${noticiaId}`, formData, config)
            .then(response => {
                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'Notícia alterada com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // Após o tempo definido (1500 ms), redirecione para a página desejada
                    window.location.href = `../noticias/`;
                });
            })
            .catch(error => {
                console.error(error);
                // Lida com erros, se necessário
            });

    }
};


// Evento quando o botão "Salvar" do formulário de edição é clicado
function CreateNoticiaClick(event) {

    event.preventDefault(); // Evita o envio padrão do formulário

    // Obter os dados do formulário de edição
    const formData = new FormData(document.querySelector('#createNoticiaForm'));


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
        // Fazer uma solicitação POST para criar o noticia
        axios.post(`${url}api/noticias/`, formData, config)
            .then(response => {
                console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Notícia criada com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // Após o tempo definido (1500 ms), redirecione para a página noticias
                    window.location.href = `../noticias/`;
                });
            })
            .catch(error => {
                console.error(error);
                // Lida com erros, se necessário
            });

    }
};

