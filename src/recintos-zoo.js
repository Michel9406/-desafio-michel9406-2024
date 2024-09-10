export class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: { MACACO: 3 } },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: { GAZELA: 1 } },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: { LEAO: 1 } }
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: 'savana' },
            LEOPARDO: { tamanho: 2, bioma: 'savana' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: 'savana ou floresta' },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: 'savana ou rio' }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido", recintosViaveis: [] };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida", recintosViaveis: [] };
        }

        const recintosViaveis = [];
        const animalInfo = this.animais[animal];
        const tamanhoNecessario = quantidade * animalInfo.tamanho;

        for (const recinto of this.recintos) {
            const { numero, bioma, tamanhoTotal, animais } = recinto;
            const espacoOcupadoExistente = this.calculaEspacoOcupado(animais);
            const espacoLivre = tamanhoTotal - espacoOcupadoExistente;

           
            const biomasAceitos = animalInfo.bioma.split(' ou ').map(b => b.trim());
            if (!biomasAceitos.some(b => bioma.includes(b))) {
                continue;
            }

           
            const espacoNecessarioComExtra = tamanhoNecessario + this.calculaEspacoExtra({...animais, [animal]: quantidade});

            if (espacoLivre >= espacoNecessarioComExtra) {
                recintosViaveis.push(`Recinto ${numero} (espaço livre: ${espacoLivre - espacoNecessarioComExtra} total: ${tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: [] };
        }

        return { recintosViaveis };
    }

    calculaEspacoOcupado(animais) {
        let espacoOcupado = 0;

        for (const [animal, quantidadeExistente] of Object.entries(animais)) {
            espacoOcupado += this.animais[animal].tamanho * quantidadeExistente;
        }

        return espacoOcupado;
    }

    calculaEspacoExtra(animais) {
        let espacoExtra = 0;
        const especies = Object.keys(animais);

        
        if (especies.length > 1) {
            espacoExtra = 1; 
        }

        return espacoExtra;
    }
}