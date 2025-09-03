// Sistema simples de banco de dados para propostas AHP
class ProposalDatabase {
    constructor() {
        this.proposals = this.loadFromStorage() || [];
    }

    // Salvar nova proposta
    saveProposal(proposalData) {
        const proposal = {
            id: Date.now().toString(),
            name: proposalData.name || `Análise ${new Date().toLocaleDateString()}`,
            companies: proposalData.companies,
            criteria: proposalData.criteria,
            rawData: proposalData.rawData,
            results: proposalData.results,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.proposals.push(proposal);
        this.saveToStorage();
        return proposal.id;
    }

    // Carregar proposta por ID
    loadProposal(id) {
        return this.proposals.find(p => p.id === id);
    }

    // Listar todas as propostas
    listProposals() {
        return this.proposals.map(p => ({
            id: p.id,
            name: p.name,
            createdAt: p.createdAt,
            companiesCount: p.companies.length
        }));
    }

    // Atualizar proposta existente
    updateProposal(id, proposalData) {
        const index = this.proposals.findIndex(p => p.id === id);
        if (index !== -1) {
            this.proposals[index] = {
                ...this.proposals[index],
                ...proposalData,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Deletar proposta
    deleteProposal(id) {
        const index = this.proposals.findIndex(p => p.id === id);
        if (index !== -1) {
            this.proposals.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Exportar todas as propostas
    exportAll() {
        const data = {
            proposals: this.proposals,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todas-propostas-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    }

    // Importar propostas
    importProposals(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.proposals && Array.isArray(data.proposals)) {
                this.proposals = [...this.proposals, ...data.proposals];
                this.saveToStorage();
                return true;
            }
        } catch (error) {
            console.error('Erro ao importar:', error);
        }
        return false;
    }

    // Salvar no localStorage
    saveToStorage() {
        localStorage.setItem('ahp-proposal-database', JSON.stringify(this.proposals));
    }

    // Carregar do localStorage
    loadFromStorage() {
        const data = localStorage.getItem('ahp-proposal-database');
        return data ? JSON.parse(data) : null;
    }
}

// Instância global do banco de dados
const proposalDB = new ProposalDatabase();