
/* var camposCadastro =
    '<div id="divNova">' +
    '<input name="login" type="text" placeholder="Login"><br>' +
    '<input name="senha" type="text" placeholder="Senha"><br>' +
    '<input name="nomeCompleto" type="text" placeholder="Nome Completo"><br>' +
    '<input name="cpf" type="number" placeholder="CPF"><br>' +
    '<input name="nascimento" type="date" placeholder="Nascimento"><br>' +
    '<input name="sexo" type="text" placeholder="Sexo"><br>' +
    '<input name="estadoCivil" type="text" placeholder="Estado Civil"><br>' +
    '<input type="submit" value="Enviar" id="enviar" onclick="show()">' +
    '<button onclick="show()">Reset</button>' +
    '</div>'; */



$(document).ready(function() {
    $("#userInput").hide();
    pegaDados();
})


function cadastrar() {
    $("#cadastro").hide();
    $("#altera").hide();
    $("#deleta").hide();
    $("#userInput").show();

}

var campoAlteracoes =
    '<div id="divNova">' +
    '<p>Digite o id do usuário que deseja alterar informações</p>' +
    '<input name="id" type="number" placeholder="id"><br>' +
    '<input type="button" value="enviar" id="enviar" onclick="show()">' +
    '<button onclick="show()">Reset</button>' +
    '</div>';

function alterar() {
    $("#criaCampos").prepend(campoAlteracoes);
    $("#cadastro").hide();
    $("#altera").hide();
    $("#deleta").hide();
}

var campoDelecao =
    '<div id="divNova">' +
    '<p>Digite o id do usuário que deseja deletar as informações</p>' +
    '<input name="id" type="number" placeholder="id"><br>' +
    '<input type="button" value="enviar" id="enviar" onclick="show()">' +
    '<button onclick="show()">Reset</button>' +
    '</div>';

function deletar() {
    $("#cadastro").hide();
    $("#altera").hide();
    $("#deleta").hide();
    $("#criaCampos").prepend(campoDelecao);
}

function show() {
    $("#cadastro").show();
    $("#altera").show();
    $("#deleta").show();
    $("#userInput").hide();
    $("#divNova").hide()
}

/* função GET adicionar document.ready*/
function pegaDados() {

    $.ajax({
        type: 'GET',
        url: "",
        contentType: "?",
        dataType: "?",
        


    })
}

/* função POST */
/* tratar caso o usuario digite um campo vazio */
function enviarDados() {
    var login = $("#login").val();
    var senha = $("#senha").val();
    var nomeCompleto = $("#nomeCompleto").val();
    var cpf = parseInt($("#cpf").val());
    var dataNascimento = $("#dataNascimento").val();
    var sexo = $("#sexo").val();
    var estadoCivil = $("#estadoCivil").val();
    
    $.ajax({
        type: 'POST',
        url: "http://localhost:9000/datacontrol/postAddUser",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            "login": login,
            "senha": senha,
            "nomeCompleto": nomeCompleto,
            "cpf": cpf,
            "nascimento": dataNascimento,
            "sexo": sexo,
            "estadoCivil": estadoCivil
        }),
        success: function () { alert("sucesso!") }
    })
    show();
    $("#login").val("");
    $("#senha").val("");
    $("#nomeCompleto").val("");
    $("#cpf").val("");
    $("#dataNascimento").val("");
    $("#sexo").val("");
    $("#estadoCivil").val("");
}
