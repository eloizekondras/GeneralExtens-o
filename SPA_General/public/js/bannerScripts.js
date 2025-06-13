
const url = window.location.origin + '/';


///     FUNÇÕES DO CADASTRO DE BANNER  ///
// Função para confirmar a exclusão do banner
function confirmDeleteBanner(id) {

    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    // Fazer a requisição de exclusão usando Axios
    axios.delete(`${url}api/banners/${id}`,config)
        .then(response => {
            console.log(response.data);

            // Fechar o modal após a exclusão
            $(`#confirmDeleteModal${id}`).modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'Banner excluído com sucesso',
                showConfirmButton: false,
                timer: 1500
              });

            // Remover o card da lista após a exclusão
            const cardToRemove = document.querySelector(`#card${id}`);
            if (cardToRemove) {
                cardToRemove.remove();
            }
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
}


// Evento quando o botão "Editar" do modal é clicado
document.querySelector('#editBannerModal').addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget; // Botão que acionou o modal
    const bannerId = button.getAttribute('data-id'); // ID do banner a ser editado

    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    // Fazer uma solicitação GET para obter os dados do banner
    axios.get(`${url}api/banners/${bannerId}`,config)
        .then(response => {
            const bannerData = response.data; // Dados do banner

            // Preencher o formulário com os dados do banner
            document.querySelector('#editTitulo').value = bannerData.titulo;
            document.querySelector('#editDescricao').value = bannerData.descricao;
            document.querySelector('#editLink').value = bannerData.link;
            document.querySelector('#editOrdem').value = bannerData.ordem;
            document.querySelector('#editImagem').value = '';
            // Preencha os outros campos do banner conforme necessário

            // Armazenar o ID do banner no campo oculto
            document.querySelector('#editBannerId').value = bannerId;
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
});


    // Função de validação do formulário
    function validateForm(formData) {
        const titulo = formData.get('titulo');
        const descricao = formData.get('descricao');
        const imagem = formData.get('imagem');
        const link = formData.get('link');
        const ordem = formData.get('ordem');

        if (!titulo || !descricao || !imagem || !link || !ordem) {
            // Exibir mensagem de erro para o usuário
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, preencha todos os campos obrigatórios!',
              });
            return false; // Impede o envio do formulário
        }

        if (ordem < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'A ordem deve ser um número maior ou igual a 1!',
              });
            return false;
        }

        // Validar a imagem
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const imageExtension = imagem.name.split('.').pop().toLowerCase();
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

// Evento quando o botão "Salvar" do modal de edição é clicado
document.querySelector('#saveEditBanner').addEventListener('click', function () {
    // Obter os dados do formulário de edição
    const formData = new FormData(document.querySelector('#editBannerForm'));

    // Obter o ID do banner a ser editado
    const bannerId = document.querySelector('#editBannerId').value;



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
        // Fazer uma solicitação PUT para atualizar o banner
        axios.put(`${url}api/banners/${bannerId}`, formData, config)
        .then(response => {
            console.log(response.data);

            // Fechar o modal após a edição
            $('#editBannerModal').modal('hide'); // Fecha o modal

            Swal.fire({
                icon: 'success',
                title: 'Dados gravados com sucesso',
                showConfirmButton: false,
                timer: 1500
              });

            // Atualizar o card correspondente na lista de banners
            const bannerId = response.data.id; // Supondo que a resposta contenha o ID atualizado
            const cardElement = document.querySelector(`#card${bannerId}`); // Use um seletor único para localizar o card

            // Atualize os elementos HTML dentro do card com os novos dados
            const tituloElement = cardElement.querySelector('.card-title');
            const descricaoElement = cardElement.querySelector('.card-text');
            const imagemElement = cardElement.querySelector('.card-img-top');

            tituloElement.textContent = response.data.titulo;
            descricaoElement.textContent = response.data.descricao;
            imagemElement.src = `${url}img/banners/${response.data.imagem}`;

        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });

    }
});


// Evento quando o botão "Salvar" do modal de criação é clicado
document.querySelector('#saveCreateBanner').addEventListener('click', function () {
    // Obter os dados do formulário de criação
    const formData = new FormData(document.querySelector('#createBannerForm'));

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

    // Fazer uma solicitação POST para criar um novo banner
    axios.post(`${url}api/banners`, formData, config)
        .then(response => {
            console.log(response.data);
            
            // Fechar o modal após a edição
            $('#createBannerModal').modal('hide'); // Fecha o modal
            
            Swal.fire({
                icon: 'success',
                title: 'Dados gravados com sucesso',
                showConfirmButton: false,
                timer: 1500
              });

            // Criar um novo card com os dados recebidos da API
            const newBannerData = response.data;
            createBannerCard(newBannerData);

            // Limpar os campos do formulário de criação para o próximo uso
            document.querySelector('#createBannerForm').reset();
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
    }
});

// Função para criar um novo card de banner com os dados fornecidos
function createBannerCard(bannerData) {
    // Crie um elemento de coluna do Bootstrap
    const colElement = document.createElement('div');
    colElement.classList.add('col-md-3', 'mb-4');
    colElement.id = `card${bannerData.id}`;

    // Crie um card com base nos dados do banner
    colElement.innerHTML = `
        <div class="card h-100">
            <img src="${url}img/banners/${bannerData.imagem}" class="card-img-top" alt="${bannerData.titulo}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${bannerData.titulo}</h5>
                <p class="card-text">${bannerData.descricao}</p>
                <div class="d-flex mt-auto justify-content-between">
                    <!-- Link de Edição -->
                    <button class="btn btn-secondary"  data-bs-toggle="modal" data-bs-target="#editBannerModal" data-id="${bannerData.id}"><i class="bi bi-pencil"></i> Editar</button>

                    <!-- Link de Exclusão - Botão para acionar o modal -->
                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal${bannerData.id}"><i class="bi bi-trash3"></i> Excluir</button>

                </div>
            </div>
        </div>
        <!-- Modal de Confirmação de Exclusão -->

        <div class="modal fade" id="confirmDeleteModal${bannerData.id}" tabindex="-1"
            aria-labelledby="confirmDeleteModalLabel${bannerData.id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="confirmDeleteModalLabel${bannerData.id}">Exclusão</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Tem certeza que deseja excluir o banner: <strong>${bannerData.titulo}</strong>?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-x-circle"></i> Cancelar</button>
                        <!-- Botão de Confirmação - Chama a função JavaScript para excluir -->
                        <button type="button" class="btn btn-danger" onclick="confirmDeleteBanner(${bannerData.id})"><i class="bi bi-check-circle"></i> Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Adicione o novo card à lista de banners
    const bannerListElement = document.querySelector('#card-list');
    bannerListElement.appendChild(colElement);
}


// Evento quando o formulário de pesquisa é enviado
document.querySelector('#searchForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Obter o valor inserido no campo de pesquisa
    const valorPesquisa = document.querySelector('#valorPesquisa').value;

    //busca o token armazenado no login
    const token = localStorage.getItem('token');

    // Configurar o cabeçalho com a autorizção do token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };    

    // Fazer uma solicitação GET para buscar banners com base no título
    axios.get(`${url}api/banners/search?titulo=${valorPesquisa}`,config)
        .then(response => {
            console.log(response.data);
            
            // Limpar a lista de banners existente
            const bannerListElement = document.querySelector('#card-list');
            bannerListElement.innerHTML = '';

            // Criar novos cards de banner com os dados recebidos da API
            response.data.forEach(bannerData => {
                createBannerCard(bannerData);
            });
        })
        .catch(error => {
            console.error(error);
            // Lida com erros, se necessário
        });
});
