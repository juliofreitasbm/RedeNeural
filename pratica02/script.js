var taxaDeAprendizagem = 1;

/* GRIPE: 1, RESFRIADO 0 */
const tabelaPratica2 = [
	{ id:'Pessoa1', bias: 1, virus: 1, bacteria: 0, dorCabeca: 1, corisa: 1, saida: 1 },
	{ id:'Pessoa2', bias: 1, virus: 0, bacteria: 1, dorCabeca: 0, corisa: 1, saida: 0 },
	{ id:'Pessoa3', bias: 1, virus: 1, bacteria: 0, dorCabeca: 1, corisa: 0, saida: 1 },
	{ id:'Pessoa4', bias: 1, virus: 0, bacteria: 1, dorCabeca: 1, corisa: 1, saida: 0 },
	{ id:'Pessoa5', bias: 1, virus: 0, bacteria: 0, dorCabeca: 1, corisa: 1, saida: 1 },
	{ id:'Pessoa6', bias: 1, virus: 0, bacteria: 0, dorCabeca: 0, corisa: 1, saida: 0 }
];

const tabelaPratica2Aplicacao = [
	{ id:'Pessoa1', bias: 1, virus: 1, bacteria: 1, dorCabeca: 1, corisa: 1, saida: null },
	{ id:'Pessoa2', bias: 1, virus: 1, bacteria: 0, dorCabeca: 0, corisa: 0, saida: null },
	{ id:'Pessoa3', bias: 1, virus: 0, bacteria: 1, dorCabeca: 0, corisa: 0, saida: null },
	{ id:'Pessoa4', bias: 1, virus: 0, bacteria: 1, dorCabeca: 1, corisa: 1, saida: null },
	{ id:'Pessoa5', bias: 1, virus: 1, bacteria: 0, dorCabeca: 0, corisa: 1, saida: null },
	{ id:'Pessoa6', bias: 1, virus: 0, bacteria: 0, dorCabeca: 0, corisa: 0, saida: null }
];

var pesos = [0, 0, 0, 0, 0];

funcaoDeAtivacao = (linha) => {
	ativacao = linha.bias * pesos[0] + linha.virus * pesos[1] + linha.bacteria * pesos[2] + linha.dorCabeca * pesos[3] + linha.corisa * pesos[4];
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
	pesos = [0, 0, 0, 0, 0];

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
		for(cont = 0; cont <= 5; cont++) {
			let linhaAtual = tabela[cont];
			let saidaObtida = funcaoDeAtivacao(linhaAtual, pesos);
			let saidaEsperada = linhaAtual.saida;
			let erro = saidaEsperada - saidaObtida;

			if(erro != 0) {
				pesos[0] = regraDelta(pesos[0], erro, linhaAtual.bias);
				pesos[1] = regraDelta(pesos[1], erro, linhaAtual.virus);
				pesos[2] = regraDelta(pesos[2], erro, linhaAtual.bacteria);
				pesos[3] = regraDelta(pesos[3], erro, linhaAtual.dorCabeca);
				pesos[4] = regraDelta(pesos[4], erro, linhaAtual.corisa);

				erroNaRodada = true;
			}
			console.log(`${linhaAtual.id}    (bias): ${linhaAtual.bias}  |  (virus): ${linhaAtual.virus}  |  (bacteria): ${linhaAtual.bacteria}  |  (dor cabeca): ${linhaAtual.dorCabeca}  |  (corisa): ${linhaAtual.corisa}  |  (erro): ${erro != 0 ? 'SIM' : 'NAO'}`);
		}
		console.log(`PESOS    wb: ${pesos[0]} |  w_virus: ${pesos[1]}  |  w_bacteria: ${pesos[2]}  |  w_cabeca: ${pesos[3]}  |  w_corisa: ${pesos[4]}`)

		if(!erroNaRodada)
			break;
	}
}

aplicaRedeNeural = (tabela) => {
	console.log('\n\n-----TABELA APLICADA-----\n');
	for(contador = 0; contador <= 5 ; contador++){
		let saida = funcaoDeAtivacao(tabela[contador]);
		console.log(`Pessoa${contador + 1}    saida: ${saida}  ${saida == 1 ? 'GRIPADO' : 'RESFRIADO'}`);
	}
}


console.log("\n\n-----ESCOLHENDO LINHAS EM SEQUENCIA-----\n")
treinarRedeNeural(tabelaPratica2, false);

aplicaRedeNeural(tabelaPratica2Aplicacao);

console.log("\n\n-----ESCOLHENDO LINHAS ALEATORIAMENTE-----\n")
treinarRedeNeural(tabelaPratica2, true);

aplicaRedeNeural(tabelaPratica2Aplicacao);