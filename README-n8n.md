# 🏆 Comparador AHP para n8n - HTML5 Moderno

## 📋 Visão Geral

Ferramenta avançada de **Análise Hierárquica de Processos (AHP)** otimizada para uso no n8n, utilizando recursos modernos do HTML5.

## ✨ Recursos HTML5 Implementados

### 🎨 **Interface Moderna**
- **CSS Grid & Flexbox** - Layout responsivo e flexível
- **CSS Custom Properties** - Variáveis CSS para temas
- **Animações CSS** - Transições suaves e feedback visual
- **Media Queries** - Responsividade completa

### 📱 **PWA (Progressive Web App)**
- **Service Worker** - Cache offline e performance
- **Web App Manifest** - Instalação como app nativo
- **Responsive Design** - Funciona em qualquer dispositivo

### 🔧 **Validação HTML5**
- **Input Types** - number, email, tel com validação nativa
- **Attributes** - required, min, max, step, pattern
- **Custom Validation** - Validação personalizada em JavaScript
- **Real-time Feedback** - Validação durante digitação

### 🚀 **JavaScript Moderno**
- **ES6+ Classes** - Código organizado e modular
- **Async/Await** - Processamento assíncrono
- **FormData API** - Coleta de dados moderna
- **Fetch API** - Requisições HTTP modernas

## 🛠️ Como Usar no n8n

### **Método 1: Webhook Simples**

1. **Criar Webhook Node**
   ```
   HTTP Method: GET
   Path: ahp-form
   Response Mode: Respond to Webhook
   ```

2. **Responder com HTML**
   ```
   Response Body: [Cole o conteúdo do comparador-ahp-n8n.html]
   ```

3. **Processar Formulário**
   ```
   HTTP Method: POST
   Path: ahp-process
   ```

### **Método 2: Workflow Completo**

1. **Importe o workflow** `n8n-workflow-exemplo.json`
2. **Ative o workflow**
3. **Acesse via URL** do webhook

### **Método 3: API Externa**

1. **Deploy da API** `ahp-api.js` em servidor Node.js
2. **Configure HTTP Request** no n8n
3. **Processe resposta** com Code Node

## 📊 Funcionalidades AHP

### **Critérios de Análise**
- 💰 **Valor Total** - Custo do investimento
- ⚡ **Geração Prevista** - kWh/mês esperado
- 📈 **Payback** - Tempo de retorno
- 🔋 **Eficiência** - Performance dos painéis
- 🛡️ **Garantias** - Painel e inversor

### **Perfis de Decisão**
- 💰 **Conservador** - Foco em custo (35% valor + 30% payback)
- ⚖️ **Equilibrado** - Balance entre critérios
- 🚀 **Performance** - Foco em eficiência (30% geração + 25% eficiência)

### **Algoritmo AHP**
1. **Normalização** - Scores de 1-5 por critério
2. **Ponderação** - Aplicação dos pesos por perfil
3. **Agregação** - Score final ponderado
4. **Ranking** - Ordenação por performance

## 🎯 Recursos Avançados

### **Validação Inteligente**
```javascript
// Validação em tempo real
input.addEventListener('input', this.validateInput.bind(this));

// Validação customizada
if (input.name.includes('valor') && value < 1000) {
    input.setCustomValidity('Valor deve ser maior que R$ 1.000');
}
```

### **Formatação Automática**
```javascript
// Formatação de moeda
const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});
```

### **Animações CSS**
```css
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.result-section.show {
    animation: fadeIn 0.5s ease-in;
}
```

### **Acessibilidade**
```css
/* Respeita preferências do usuário */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

## 📱 PWA Features

### **Instalação**
- Pode ser instalado como app nativo
- Funciona offline com Service Worker
- Ícones e splash screens personalizados

### **Performance**
- Cache inteligente de recursos
- Carregamento instantâneo após primeira visita
- Otimizado para dispositivos móveis

## 🔧 Configuração no n8n

### **Variáveis de Ambiente**
```json
{
  "AHP_CACHE_DURATION": "3600",
  "AHP_MAX_COMPANIES": "5",
  "AHP_DEFAULT_PROFILE": "equilibrado"
}
```

### **Headers Recomendados**
```json
{
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "public, max-age=3600",
  "X-Content-Type-Options": "nosniff"
}
```

## 🚀 Deploy e Hospedagem

### **Opções de Deploy**
1. **n8n Interno** - Webhook nodes
2. **Vercel/Netlify** - Deploy estático
3. **Docker** - Container completo
4. **Node.js** - Servidor dedicado

### **Arquivos Necessários**
- `comparador-ahp-n8n.html` - Interface principal
- `manifest.json` - PWA manifest
- `sw.js` - Service Worker
- `ahp-api.js` - API opcional

## 📈 Melhorias Futuras

### **Recursos Planejados**
- 🔄 **Comparação múltipla** - Mais de 3 empresas
- 📊 **Gráficos interativos** - Visualização de dados
- 💾 **Persistência local** - LocalStorage/IndexedDB
- 🔗 **Integração APIs** - Dados externos
- 📧 **Relatórios por email** - Envio automático

### **Otimizações**
- ⚡ **Lazy loading** - Carregamento sob demanda
- 🗜️ **Compressão** - Minificação de assets
- 🎯 **Analytics** - Métricas de uso
- 🔒 **Segurança** - CSP headers

## 🤝 Suporte

Para dúvidas ou problemas:
1. Verifique a validação HTML5 no navegador
2. Teste em modo desenvolvedor (F12)
3. Confirme compatibilidade do n8n
4. Consulte logs do Service Worker

---

**Desenvolvido para o Condomínio Morada Nobre - 2025**  
*Utilizando as melhores práticas de HTML5 e PWA*