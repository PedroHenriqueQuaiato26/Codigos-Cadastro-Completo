import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';

class ConfigPadrao {
    app: Express;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use('/style', express.static(path.join(__dirname, '../Interface/style')));
        this.app.use('/scripts', express.static(path.join(__dirname, '../Interface/scripts')));
        this.app.use('/Interface', express.static(path.join(__dirname, '../Interface')));
    }
}

class RotasAcessoLogin {
    constructor(app: Express) {
        app.get('/', (req: Request, res: Response) => {
            const filePath = path.join(__dirname, '../Interface', 'login.html');
            res.sendFile(filePath);
        });

        // rota para acessar a tela de login e por sua vez trazer os dados de credenciais de login colocados pelo usuario
        app.post('/api/endpoint', (req: Request, res: Response) => {
            const { email, senha } = req.body;
            console.log('Email recebido:', email);
            console.log('Senha recebida:', senha);
            res.status(200).json({ message: 'Dados recebidos com sucesso!' });
        });
    }
}

class RotasAcessoCadastro {
    constructor(app: Express){
        app.get('/cadastro', (req: Request, res: Response) => {
            const filePath = path.join(__dirname, '../Interface', 'cadastro.html');
            res.sendFile(filePath);
        });

        app.post('/api/cadastro/endpoint', (req: Request, res: Response) => {
            
            const { email, senha, nome, setor, carteira } = req.body;

            console.log('email: ', email)
            console.log('senha: ', senha)
            console.log('nome: ', nome)
            console.log('setor: ', setor)
            console.log('carteira: ', carteira)
    
            res.status(200).json({ message: 'Dados recebidos com sucesso!' });
        });
    }
}

class Server {
    private app: Express;

    constructor() {
        this.app = new ConfigPadrao().app;
        
        new RotasAcessoLogin(this.app);

        new RotasAcessoCadastro(this.app);
    }

    start(port: number) {
        this.app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    }
}

const server = new Server();
server.start(3000);
