/** JavaScripts utilizados */
function buscarMonitores() {
    fetch("http://localhost:8081/api/monitor", {
       method: "GET"
    })
        .then(res => res.json())
        .then(res => atualizarTabela(res))
        .catch(err => alert(err.message))
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

	fetch("http://localhost:8081/api/monitor/" + id, {
	    method: "GET",
	})
        .then(res => res.json())
        .then(res => exibirMonitor(res))
        .catch(err => alert(err.message))
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
        };
        fetch("http://localhost:8081/api/monitor", {
            headers: headers,
            method: "POST",
            body: JSON.stringify(monitor)
        })
        .then(res => res.json())
        .then(res =>  alert("Inserido com id: " + res.id))
        .catch(err => alert("Erro ao inserir no servidor" + err.message))
}


function excluirMonitor(id) {
	fetch("http://localhost:8081/api/monitor/" + id,{
        method: "DELETE",
	})
        .then(res => res.text())
        .then(res => window.location.replace("MonitorListar.html"))
        .catch(err => alert(err.message))
}