Engenharia de Software - UFR
Arquitetura de Software - Prof. Maikon

Adriana de Oliveira Lopes - 202426610029
Lucas Rivelo Campos Almeida - 202426610020

- Padrão de Projeto: Facade (Fachada)

- Explicação do Programa
Implementamos um programa que gera o recebo fiscal das compras de
uma loja de velas aromáticas. Tivemos como base o exemplo dos slides 
"Aula 2 - Padrões de Projeto", onde nele é exemplificado a um sistema 
de compra online. As diferenças foram que, no exemplo os itens a serem 
comprados eram adicionados pelo própio cliente e todos os itens tinham 
preço fixo, já no nosso programa os produtos eram declarados na classe 
Produto e alocados na constante Catálogo que posteriormente iria ser registrado
na classe Comanda para dessa forma ser calculado o custo da compra.
A seguir temos a classe frete que obtem o endereço do cliente e realiza
o cálculo do custo do frete (que se for para fora do MT tem um custo a 
mais) e Impostos (ICMS), logo depois a classe Cliente para obter os 
dados do cliente (nome, email e cpf), além de incluir o método de 
confirmação por email, e por fim temos a classe ValorFinal onde é feito 
o calculo do total a pagar somando o valor da Comanda, Frete (e Difal 
se houver) e os Impostos. Chegando diretamente onde é executado o Facade, 
temos a classe ReciboFiscalFacade, nela temos o processo comum do Facade, 
as classes são iniciadas e o método gerarReciboFiscal recebe os dados de
uma só vez, inicializa Cliente e Frete (que possui valores a serem lidos),
adiciona os itens a comanda e realiza os demais cáculos que serão
demonstrados na impressão do recibo.

- Benefícios do Padrão de Projeto Facade
O uso do Padrão de Projeto Facade é benéfico em códigos cujo objetivo seja 
que o cliente tenha o menor contato com as classes e funções empregadas, de uma
maneira em que ele somente inclua seus dados (como demonstrado na função 
"gerarReciboFiscal") e retorne a intenção do programa. 

- Execução do Programa
No terminal:
> npx ts.node ReciboFiscalFacade.ts
