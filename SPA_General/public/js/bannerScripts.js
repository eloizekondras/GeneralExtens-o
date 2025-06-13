const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://api-projeto-fw9o.onrender.com'
  : 'http://localhost:3000';

// Função para confirmar a exclusão do banner
function confirmDeleteBanner(id) {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    axios.delete(`${baseURL}/api/banners/${id}`, config)
        .then(response => {
            console.log(response.data);

            $(`#confirmDeleteModal${id}`).modal('hide');

            Swal.fire({
                icon: 'success',
                title: 'Banner excluído com sucesso',
                showConfirmButton: false,
                timer: 1500
            });

            const cardToRemove = document.querySelector(`#card${id}`);
            if (cardToRemove) {
                cardToRemove.remove();
            }
        })
        .catch(error => {
            console.error(error);
        });
}

// Evento quando o botão "Editar" do modal é clicado
document.querySelector('#editBannerModal').addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const bannerId = button.getAttribute('data-id');

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    axios.get(`${baseURL}/api/banners/${bannerId}`, config)
        .then(response => {
            const bannerData = response.data;

            document.querySelector('#editTitulo').value = bannerData.titulo;
            document.querySelector('#editDescricao').value = bannerData.descricao;
            document.querySelector('#editLink').value = bannerData.link;
            document.querySelector('#editOrdem').value = bannerData.ordem;
            document.querySelector('#editImagem').value = '';

            document.querySelector('#editBannerId').value = bannerId;
        })
        .catch(error => {
            console.error(error);
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
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos obrigatórios!',
        });
        return false;
    }

    if (ordem < 1) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A ordem deve ser um número maior ou igual a 1!',
        });
        return false;
    }

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

    return true;
}

// Evento quando o botão "Salvar" do modal de edição é clicado
document.querySelector('#saveEditBanner').addEventListener('click', function () {
    const formData = new FormData(document.querySelector('#editBannerForm'));
    const bannerId = document.querySelector('#editBannerId').value;

    if (validateForm(formData)) {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };

        axios.put(`${baseURL}/api/banners/${bannerId}`, formData, config)
            .then(response => {
                console.log(response.data);

                $('#editBannerModal').modal('hide');

                Swal.fire({
                    icon: 'success',
                    title: 'Dados gravados com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                });

                const bannerId = response.data.id;
                const cardElement = document.querySelector(`#card${bannerId}`);

                const tituloElement = cardElement.querySelector('.card-title');
                const descricaoElement = cardElement.querySelector('.card-text');
                const imagemElement = cardElement.querySelector('.card-img-top');

                tituloElement.textContent = response.data.titulo;
                descricaoElement.textContent = response.data.descricao;
                imagemElement.src = `${baseURL}/img/banners/${response.data.imagem}`;
            })
            .catch(error => {
                console.error(error);
            });
    }
});

// Evento quando o botão "Salvar" do modal de criação é clicado
document.querySelector('#saveCreateBanner').addEventListener('click', function () {
    const formData = new FormData(document.querySelector('#createBannerForm'));

    if (validateForm(formData)) {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        };

        axios.post(`${baseURL}/api/banners`, formData, config)
            .then(response => {
                console.log(response.data);

                $('#createBannerModal').modal('hide');

                Swal.fire({
                    icon: 'success',
                    title: 'Dados gravados com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                });

                const newBannerData = response.data;
                createBannerCard(newBannerData);

                document.querySelector('#createBannerForm').reset();
            })
            .catch(error => {
                console.error(error);
            });
    }
});

// Função para criar um novo card de banner com os dados fornecidos
function createBannerCard(bannerData) {
    const colElement = document.createElement('div');
    colElement.classList.add('col-md-3', 'mb-4');
    colElement.id = `card${bannerData.id}`;

    colElement.innerHTML = `
        <div class="card h-100">
            <img src="${baseURL}/img/banners/${bannerData.imagem}" class="card-img-top" alt="${bannerData.titulo}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${bannerData.titulo}</h5>
                <p class="card-text">${bannerData.descricao}</p>
                <div class="d-flex mt-auto justify-content-between">
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editBannerModal" data-id="${bannerData.id}"><i class="bi bi-pencil"></i> Editar</button>
                    <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal${bannerData.id}"><i class="bi bi-trash3"></i> Excluir</button>
                </div>
            </div>
        </div>

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
                        <button type="button" class="btn btn-danger" onclick="confirmDeleteBanner(${bannerData.id})"><i class="bi bi-check-circle"></i> Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const bannerListElement = document.querySelector('#card-list');
    bannerListElement.appendChild(colElement);
}

// Evento quando o formulário de pesquisa é enviado
document.querySelector('#searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const valorPesquisa = document.querySelector('#valorPesquisa').value;
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    };

    axios.get(`${baseURL}/api/banners/search?titulo=${valorPesquisa}`, config)
        .then(response => {
            console.log(response.data);

            const bannerListElement = document.querySelector('#card-list');
            bannerListElement.innerHTML = '';

            response.data.forEach(bannerData => {
                createBannerCard(bannerData);
            });
        })
        .catch(error => {
            console.error(error);
        });
});
