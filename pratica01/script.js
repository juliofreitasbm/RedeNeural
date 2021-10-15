var taxaDeAprendizagem = 1;
const tabelaPratica1 = [
	{ id:'Bach', bias: 1, n1: 0, n2: 0, saida: 0 },
	{ id:'Beethoven', bias: 1, n1: 0, n2: 1, saida: 0},
	{ id:'Einstein', bias: 1, n1: 1, n2: 0, saida: 1 },
	{ id:'Kepler', bias: 1, n1: 1, n2: 1, saida: 1 },
];

var pesos = [0, 0, 0];


funcaoDeAtivacao = (linha) => {
	ativacao = linha.bias * pesos[0] + linha.n1 * pesos[1] + linha.n2 * pesos[2];
	if(ativacao > 0)
		return 1;
	else
		return 0;
}

//Recalcula os Pesos
regraDelta = (pesoAnterior, erro, entrada) => {
	novoPeso = pesoAnterior + (erro * taxaDeAprendizagem * entrada)
	return novoPeso;
}

treinarRedeNeural = (tabela, embaralharTabela) => {
	//zera os pesos
	pesos = [0, 0, 0];

	for(let rodada = 1; ; rodada++) {
		console.log(`\nÉPOCA ${rodada}:`);

		if(embaralharTabela) {
			tabela.sort(() => {
				if(Math.random() > 0.5)
					return 1;
				else
					return -1;
			});
		}
		
		let erroNaRodada = false;
		for(cont = 0; cont <= 3; cont++) {
			let linhaAtual = tabela[cont];
			let saidaObtida = funcaoDeAtivacao(linhaAtual, pesos);
			let saidaEsperada = linhaAtual.saida;
			let erro = saidaEsperada - saidaObtida;

			if(erro != 0) {
				pesos[0] = regraDelta(pesos[0], erro, linhaAtual.bias);
				pesos[1] = regraDelta(pesos[1], erro, linhaAtual.n1);
				pesos[2] = regraDelta(pesos[2], erro, linhaAtual.n2);

				erroNaRodada = true;
			}
			console.log(`${linhaAtual.id}    (bias): ${linhaAtual.bias}  |  (n1): ${linhaAtual.n1}  |  (n2): ${linhaAtual.n2}  |  (erro): ${erro != 0 ? 'SIM' : 'NAO'}`);
		}
		console.log(`PESOS    wb: ${pesos[0]} |  w1: ${pesos[1]}  |  w2: ${pesos[2]}`)

		if(!erroNaRodada)
			break;
	}


}


console.log("\n\n-----ESCOLHENDO LINHAS EM SEQUENCIA-----\n")
treinarRedeNeural(tabelaPratica1, false);

console.log("\n\n-----ESCOLHENDO LINHAS ALEATORIAMENTE-----\n")
treinarRedeNeural(tabelaPratica1, true);

