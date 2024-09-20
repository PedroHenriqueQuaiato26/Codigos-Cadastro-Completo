class CapturaDadosCadastroUser {
    constructor() {
        this.dados = {}; // Objeto para armazenar os dados do usuário

        document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('cadastroform');
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                // Captura os dados do formulário
                this.dados.email = document.getElementById('email').value;
                this.dados.senha = document.getElementById('senha').value;
                this.dados.nome = document.getElementById('nome').value;
                this.dados.setor = document.getElementById('setor').value;
                this.dados.carteira = document.getElementById('carteira').value;

                console.log('Dados capturados:', this.dados); // Para verificar se os dados estão corretos

                // Envia os dados para o backend
                this.EnviarDadosParaCadastro(this.dados);
            });
        });
    }

    async EnviarDadosParaCadastro(data) {
        try {
            const response = await fetch('http://127.0.0.1:3000/api/cadastro/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }

            const responseData = await response.json();
            console.log('Sucesso:', responseData);
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    }
}

// Inicia a captura dos dados
const CapturaDadosForm = new CapturaDadosCadastroUser();
