import express from 'express';
import dotenv from 'dotenv';

dotenv.config();   
const PORTA = process.env.PORTA;
const app = express();

app.use(express.json()); // Middleware para analisar o corpo da requisição como JSON

const alunos = [
    {
        matricula: "a93333",
        nome: "João Silva",
        email: "joao.silva@gmail.com"
    },
      {
        matricula: "a94444",
        nome: "Jose antonio ",
        email: "toin@gmail.com"
    },
      {
        matricula: "a95555",
        nome: "Chico Bala",
        email: "chico.bala@gmail.com"
    },
]
//listar todos os alunos
app.get('/listar', (requisição, resposta) => {
    try { 
        if (alunos.length === 0) {
            return resposta.status(200).json({ error: 'Nenhum aluno encontrado' });
        }
         resposta.status(200).json(alunos)
       
    } catch (error) {
        resposta.status(500).json({Erro: 'Erro ao listar alunos', detalhes: error.message});
    }
    
});

//Listar por matrícula
app.get("/listar/:matricula", (requisição, resposta) => {
    try {
        const matricula = requisição.params.matricula;
        const aluno = alunos.find(aluno => aluno.matricula === matricula);
        //e se o aluno não existir?
        if (!aluno) {
            return resposta.status(200).json({ mensagem: 'Aluno não encontrado' });
        }
        resposta.status(200).json(aluno);
    } catch (error) {
        resposta.status(500).json({Erro: 'Erro ao listar aluno por matrícula', detalhes: error.message});
    }
});

app.post('/cadastrar', (requisição, resposta) => {
try {
    // Aqui você pode acessar os dados enviados no corpo da requisição
    const { matricula, nome, email } = requisição.body;
      const dados = {matricula, nome, email};
    if (!matricula || !nome || !email) {
        return resposta.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
 
   alunos.push(dados);
   resposta.status(201).json({ mensagem: 'Aluno cadastrado com sucesso'});
} catch (error) { 
    resposta.status(500).json({Erro: 'Erro ao cadastrar aluno', detalhes: error.message});
    
}});
    
app.listen (PORTA, () => {
console.log ("O Servidor está em execução!")
});