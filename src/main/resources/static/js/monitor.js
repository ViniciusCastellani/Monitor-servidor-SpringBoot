/** JavaScripts utilizados */
function buscarMonitores() {
	//Através de AJAX será montada uma tabela com os Instrumentos.
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var resp = JSON.parse(this.responseText);
			if (resp.status != 'OK') {
				alert(resp.mensagemErro);
				return;
			}
			atualizarTabela(resp.object);
		}
	};
	xhttp.open("GET", "/api/monitor", true);
	xhttp.send();
}

function atualizarTabela(monitorList) {
	var tabela = "<table>";
	for (var i = 0; i < monitorList.length; i++) {
		var monitor = monitorList[i];
		var linha = "<tr>" +
			           "<td>"+ monitor.id + "</td>" +
					   "<td>" + monitor.nome + "</td>" +
					   "<td>" + monitor.tipo + "</td>" +
					   "<td>" + monitor.tamanho + "</td>" +
					   "<td>" + monitor.preco + "</td>" +
				       '<td><a href="MonitorVisualizar.html?id='+ monitor.id + '">Detalhes</a></td>' +
			           '<td><button onclick="excluirMonitor(' + monitor.id + ')">Excluir</button></td>' +
					"<tr>";

		tabela += linha;
	}
	tabela +="</table>";
	document.getElementById("divPrincipal").innerHTML = tabela;
}


function buscarMonitor() {
	//Recuperar o ID do Monitor
	var url = new URL(window.location.href);
	var id = url.searchParams.get("id");
	if (id == null) {
		alert("ID não encontrado.");
		return;
	}

	//Através de AJAX será monstada a tela.
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var resp = JSON.parse(this.responseText);
			if (resp.status != 'OK') {
				alert(resp.mensagemErro);
				return;
			}
			exibirMonitor(resp.object);
		}
	};
	xhttp.open("GET", "api/monitor/" + id, true);
	xhttp.send();
}

function exibirMonitor(monitor) {
    document.getElementById("id").value = monitor.id;
	document.getElementById("nome").value = monitor.nome;
	document.getElementById("tipo").value = monitor.tipo;
	document.getElementById("tamanho").value = monitor.tamanho;
	document.getElementById("preco").value = monitor.preco;

}


function incluirMonitor() {
	var monitor = {
	    nome: nome.value,
	    tipo: tipo.value,
	    tamanho: tamanho.value,
	    preco: preco.value
	};

	let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            mode: 'no-cors'
        };
        fetch("api/monitor", {
            headers: headers,
            method: "POST",
            body: JSON.stringify(equipe)
        })
        .then(res => res.json())
        .then(res =>  alert("Inserido com id" + res.id))
        .catch(err => alert("Erro ao inserir no servidor" + err.message))
}


function excluirMonitor(id) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//Voltar a página inicial.
			window.location.replace("MonitorListar.html");
		}
	};
	xhttp.open("DELETE", "api/monitor/" + id, true);
	xhttp.send();
}