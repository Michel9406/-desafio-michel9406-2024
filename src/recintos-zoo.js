class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
        GAZELA: { tamanho: 2, bioma: ['savana'] },
        HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
      };
    }
  
    analisaRecintos(animal, quantidade) {
      if (!this.animais[animal]) {
        return { erro: "Animal inválido" };
      }
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: "Quantidade inválida" };
      }
  
      const recintosViaveis = this.recintos
        .filter(recinto => this.verificaRecinto(recinto, animal, quantidade))
        .map(recinto => {
          const espacoLivre = this.calculaEspacoLivre(recinto, animal, quantidade);
          return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
        });
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis };
    }
  
    verificaRecinto(recinto, animal, quantidade) {
      const animalInfo = this.animais[animal];
      const espacoDisponivel = this.calculaEspacoLivre(recinto, animal, quantidade);
  
   
      if (!animalInfo.bioma.some(b => recinto.bioma.includes(b))) {
        return false;
      }
  
    
      if (espacoDisponivel < 0) {
        return false;
      }
  
      
      if (animalInfo.carnivoro && recinto.animais.length > 0 && recinto.animais[0].especie !== animal) {
        return false;
      }
  
     
      if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) {
        return false;
      }
  
      
      if (animal === 'MACACO') {
        
        if (recinto.animais.length === 0 && quantidade === 1) {
          return false;
        }
       
        if (recinto.animais.some(a => this.animais[a.especie].carnivoro)) {
          return false;
        }
      }
  
      return true;
    }
  
    calculaEspacoLivre(recinto, novoAnimal, quantidade) {
      let espacoOcupado = recinto.animais.reduce((total, animal) => 
        total + this.animais[animal.especie].tamanho * animal.quantidade, 0);
  
      espacoOcupado += this.animais[novoAnimal].tamanho * quantidade;
  
     
      if (recinto.animais.length > 0 && recinto.animais[0].especie !== novoAnimal) {
        espacoOcupado += 1;
      }
  
      return recinto.tamanho - espacoOcupado;
    }
  }
  
  export { RecintosZoo as RecintosZoo };