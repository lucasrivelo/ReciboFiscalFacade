//Sistema de Apoio: Produto
class Produto{
    public nome: string;
    public valor: number;

    constructor(nome: string, valor: number){
        this.nome = nome;
        this.valor = valor;
    }
}

const Catalogo: Produto[] = [
    new Produto(`Vela Aromática Lavanda`, 35.90), 
    new Produto(`Vela Aromática Cardamomo`, 35.90), 
    new Produto(`Vela Aromática Baunilha e Canela`, 35.90),
    new Produto(`Vela Aromática Cítrica`, 35.90), 
    new Produto(`Vela Aromática Especial Flor de Cerejeira`, 62.00), 
    new Produto(`Vela Aromática Especial Jasmin Indiano`, 65.90), 
    new Produto(`Vela Aromática Especial Ameixa Negra`, 60.00), 
    new Produto(`Vela Aromática Especial Mistério`, 75.00)
];

//Subsistema 1: Comanda (Lista de Itens)
class Comanda{
    private itens: Produto[] = [];

    adicionarItem(item: string): void{
        let flag = 0;
        let i = 0;
        let produtoEncontrado: Produto | undefined = undefined;

        while(flag === 0 && i < Catalogo.length){
            const produtoAtual = Catalogo[i];

            if (produtoAtual){
                if(item === produtoAtual.nome){
                    produtoEncontrado = produtoAtual;
                    flag = 1;
                }
            }
            i++;
        }

        if(produtoEncontrado){
            this.itens.push(produtoEncontrado)
            console.log(`${item} adicioana a comanda.`);
        } else{
            console.log(`Produto ${item } não encontrado.`);
        }
    }       

    calcularTotalParcial(): number{
        let j = 0;
        let total = 0;

        while(j < this.itens.length){
            const itemAtual = this.itens[j];

            if(itemAtual){
                total = total + itemAtual.valor;
            }
            j++;
        }
        console.log(`Valor sem a adição dos Impostos: R$${total}`);
        return total;
    }

    limparcomanda(): void{
        this.itens = [];
    }

    public getItens(): Produto[]{
        return this.itens;
    }
}

//Subsistema 2: Frete e Alíquotas
class Frete{
    private logradouro: string;
    private cidade: string;
    private UF: string;

    constructor(logradouro: string, cidade: string, UF: string) {
        this.logradouro = logradouro;
        this.cidade = cidade;
        this.UF = UF;
    }
    
    calculoFrete(): number{
        let frete = 0;
        if(this.UF === `MT` && this.cidade === `Rondonópolis`){
            frete = 50;
        } else if (this.UF === `MT` && this.cidade !==  `Rondonópolis`){
            frete = 100;
        } else{
            frete = 150;
        }
        return frete;
    }

    calculoDifal(total: number): number{
        let difal = 0;
        if(this.UF !== `MT`){
            difal = (total * 0.05); //Alíquota Padrão 5%
        }
        return difal;
    }

    public getLogradouro(): string{ 
        return this.logradouro; 
    }

    public getCidade(): string{ 
        return this.cidade; 
    }

    public getUF(): string{
        return this.UF;
    }
}

//Subsistema 3: Impostos
class Impostos{
    calculoICMS(total: number): number{
        return (total * 0.17); // ICMS de 17%
    }
}

//Subsistema 4: Cliente
class Cliente{
    private nome: string;
    private email: string;
    private cpf: string;

    constructor(nome: string, email: string, cpf: string){
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
    }

    enviarConfirmacaoEmail(): void{
        console.log(`E-mail de confirmação enviado para: ${this.email}`);
    }

    public getNome(): string{
        return this.nome;
    }

    public getEmail(): string{
        return this.email;
    }

    public getCPF(): string{
        return this.cpf;
    }
}

//Subsistema 5: Valor Final
class ValorFinal{
    calculoTotalGeral(total: number, ICMS: number, Difal: number, Frete: number): number{
        return total + ICMS + Frete + Difal;
    }
}

//Execução Facade: ReciboFiscalFacade
class ReciboFiscalFacade{
    private comanda: Comanda;
    private impostos: Impostos;
    private valorfinal: ValorFinal;
    private frete: Frete | null = null;      
    private cliente: Cliente | null = null;  

    constructor(){
        this.comanda = new Comanda();
        this.impostos = new Impostos();
        this.valorfinal = new ValorFinal();
    }

    gerarReciboFiscal(
        compras: string[], 
        nome: string, 
        email: string, 
        cpf: string,
        logradouro: string, 
        cidade: string, 
        UF: string): void{
        console.log(`Gerando Recibo Fiscal...`);
        console.log(`\n`);

        this.cliente = new Cliente(nome, email, cpf);
        this.frete = new Frete(logradouro, cidade, UF);

        this.cliente.enviarConfirmacaoEmail();
        this.comanda.limparcomanda(); 

        //Adiciona os itens à comanda
        compras.forEach(item => this.comanda.adicionarItem(item));

        //Calculos
        const total = this.comanda.calcularTotalParcial();
        const icms = this.impostos.calculoICMS(total);
        
        const difal = this.frete!.calculoDifal(total); //(!) Operador não nulo
        const valorFrete = this.frete!.calculoFrete();

        const totalGeral = this.valorfinal.calculoTotalGeral(total, icms, difal, valorFrete);

        //Impressão do recibo fiscal
        console.log("\n");
        console.log(`=========== Recibo Fiscal ===========`);
        console.log(`Cliente: ${this.cliente!.getNome()}`);
        console.log(`CPF: ${this.cliente!.getCPF()}`);
        console.log(`Email: ${this.cliente!.getEmail()}`);
        console.log(`Endereço: ${this.frete!.getLogradouro()}, ${this.frete!.getCidade()}/${this.frete!.getUF()}`);
        console.log(`-------------------------------------`);
        
        this.comanda.getItens().forEach(item =>{
            console.log(`${item.nome} ...........R$ ${item.valor}`);
        });

        console.log(`-------------------------------------`);
        console.log(`Subtotal............... R$ ${total}`);
        console.log(`ICMS (17%)............. R$ ${icms}`);
        console.log(`DIFAL.................. R$ ${difal}`);
        console.log(`Frete.................. R$ ${valorFrete}`);
        console.log(`-------------------------------------`);
        console.log(`TOTAL A PAGAR.......... R$ ${totalGeral}`);
        console.log(`=====================================\n`); 
    }
}

//Exemplo de cliente/execução
const fachada = new ReciboFiscalFacade();

fachada.gerarReciboFiscal(
    [`Vela Aromática Lavanda`, 
    `Vela Aromática Especial Mistério`,
    `Vela Aromática Cítrica`,
    `Vela Não Existe`],
    `Pedro Rocha`, 
    `pedro.rocha@exemplo.com`, 
    `123.456.789-00`, 
    `Rua das Acácias, 45`, 
    `Cuiabá`, 
    `MT` 
);