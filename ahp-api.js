// API para integração com n8n
// Use este código em um servidor Node.js ou como função serverless

const express = require('express');
const app = express();
app.use(express.json());

// Função principal de análise AHP
function analisarPropostas(dados) {
    const { empresas, perfil = 'equilibrado' } = dados;
    
    // Pesos por perfil de decisão
    const pesos = {
        conservador: {
            valor: 0.35,
            geracao: 0.10,
            payback: 0.30,
            eficiencia: 0.10,
            garantia_painel: 0.08,
            garantia_inversor: 0.07
        },
        equilibrado: {
            valor: 0.25,
            geracao: 0.20,
            payback: 0.20,
            eficiencia: 0.15,
            garantia_painel: 0.12,
            garantia_inversor: 0.08
        },
        performance: {
            valor: 0.15,
            geracao: 0.30,
            payback: 0.15,
            eficiencia: 0.25,
            garantia_painel: 0.10,
            garantia_inversor: 0.05
        }
    };
    
    const pesoEscolhido = pesos[perfil];
    const criterios = ['valor', 'geracao', 'payback', 'eficiencia', 'garantia_painel', 'garantia_inversor'];
    const criteriosCusto = ['valor', 'payback']; // Menor é melhor
    
    // Normalização e cálculo de scores
    empresas.forEach(empresa => {
        empresa.score = 0;
        empresa.detalhes = {};
        
        criterios.forEach(criterio => {
            const valores = empresas.map(e => e[criterio]).filter(v => v !== undefined);
            const min = Math.min(...valores);
            const max = Math.max(...valores);
            
            let scoreNormalizado;
            if (criteriosCusto.includes(criterio)) {
                // Para custos: menor valor = maior score
                scoreNormalizado = max === min ? 5 : 5 - ((empresa[criterio] - min) / (max - min)) * 4;
            } else {
                // Para benefícios: maior valor = maior score
                scoreNormalizado = max === min ? 5 : 1 + ((empresa[criterio] - min) / (max - min)) * 4;
            }
            
            empresa.detalhes[criterio] = {
                valor_original: empresa[criterio],
                score_normalizado: scoreNormalizado,
                peso: pesoEscolhido[criterio],
                contribuicao: scoreNormalizado * pesoEscolhido[criterio]
            };
            
            empresa.score += scoreNormalizado * pesoEscolhido[criterio];
        });
    });
    
    // Ordena por score
    empresas.sort((a, b) => b.score - a.score);
    
    // Adiciona posições
    empresas.forEach((empresa, index) => {
        empresa.posicao = index + 1;
        empresa.percentual = (empresa.score / 5) * 100;
    });
    
    return {
        ranking: empresas,
        perfil_usado: perfil,
        pesos_aplicados: pesoEscolhido,
        vencedor: empresas[0],
        timestamp: new Date().toISOString()
    };
}

// Endpoint para análise
app.post('/analisar', (req, res) => {
    try {
        const resultado = analisarPropostas(req.body);
        res.json({
            sucesso: true,
            dados: resultado
        });
    } catch (error) {
        res.status(400).json({
            sucesso: false,
            erro: error.message
        });
    }
});

// Endpoint de teste
app.get('/teste', (req, res) => {
    const dadosTeste = {
        empresas: [
            {
                nome: "Empresa A",
                valor: 45000,
                geracao: 850,
                payback: 5.2,
                eficiencia: 22.1,
                garantia_painel: 25,
                garantia_inversor: 12
            },
            {
                nome: "Empresa B", 
                valor: 52000,
                geracao: 920,
                payback: 4.8,
                eficiencia: 23.5,
                garantia_painel: 20,
                garantia_inversor: 10
            }
        ],
        perfil: "equilibrado"
    };
    
    const resultado = analisarPropostas(dadosTeste);
    res.json(resultado);
});

// Documentação da API
app.get('/', (req, res) => {
    res.json({
        api: "AHP Comparador de Propostas",
        versao: "1.0",
        endpoints: {
            "POST /analisar": "Analisa propostas usando AHP",
            "GET /teste": "Executa análise com dados de exemplo",
            "GET /": "Esta documentação"
        },
        exemplo_payload: {
            empresas: [
                {
                    nome: "Empresa A",
                    valor: 45000,
                    geracao: 850,
                    payback: 5.2,
                    eficiencia: 22.1,
                    garantia_painel: 25,
                    garantia_inversor: 12
                }
            ],
            perfil: "equilibrado" // conservador, equilibrado, performance
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API AHP rodando na porta ${PORT}`);
});

module.exports = { analisarPropostas };