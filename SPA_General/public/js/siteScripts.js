const url = "http://localhost:3000/";


// Função auxiliar para validar o formato de e-mail
function isValidEmail(email) {
    // Use uma expressão regular simples para validar o formato do e-mail
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}
// Diretores
const list = document.querySelector('.list-diretores');
  list.innerHTML += list.innerHTML; // duplica os itens

// Função para exibir mensagens de erro usando SweetAlert
function showErrorAlert(message) {
    const divResposta = document.getElementById('resposta');
    divResposta.textContent = '! ' + message;

    // Define um temporizador para apagar a mensagem após 4 segundos
    setTimeout(function () {
        divResposta.innerHTML = ''; // Limpa o conteúdo da div
    }, 4000); // 4000 milissegundos = 4 segundos
}


// Função de validação do formulário
function validateForm(formData) {
    const nome = formData.get('nome');
    const email = formData.get('email');
    const mensagem = formData.get('mensagem');

    if (!nome || !email || !mensagem) {
        // Exibir mensagem de erro para o usuário
        showErrorAlert('Por favor, preencha todos os campos obrigatórios!');
        return false; // Impede o envio do formulário
    } else
        if (!isValidEmail(email)) {
            showErrorAlert('Por favor, insira um endereço de e-mail válido.');
            return false; // Impede o envio do formulário
        }

    return true; // Todos os campos estão preenchidos corretamente
}


// Evento quando o botão "Enviar" do formulário é clicado
document.querySelector('#sendMessage').addEventListener('click', function () {
    // Obter os dados do formulário
    const formData = new FormData(document.querySelector('#formSendMessage'));

    // Chama a função de validação antes de enviar a solicitação POST
    if (validateForm(formData)) {
        // Serializa os dados do formulário para formato URL encoded
        const serializedData = new URLSearchParams(formData).toString();

        // Configura o cabeçalho Content-Type
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        // Faz uma solicitação POST para fazer o login do usuário
        axios.post(`${url}api/contato/enviar/`, serializedData, config)
            .then(response => {
                showErrorAlert(response.data.message);
            })
            .catch(error => {
                // Caso a API retorne algum erro, mostra a mensagem para o usuário.
                const mensagem = error.response.data.error;
                showErrorAlert(mensagem);
            });
    }
});