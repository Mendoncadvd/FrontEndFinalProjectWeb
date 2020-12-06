$(document).ready(function() {
    $("#userInput").hide();
    pegaDados();
});

function cadastrar() {
    $("#cadastro").hide();
    $("#altera").hide();
    $("#deleta").hide();
    $("#userInput").show();
}

var campoAlteracoes =
    '<div id="divNova">' +
    '<p>Digite o id do usuário que deseja alterar informações</p>' +
    '<input id="idAlteracao" type="number" placeholder="id"><br>' +
    '<input type="button" value="enviar" id="enviar" onclick="alteraInfo()">' +
    '<button onclick="show()">Reset</button>' +
    '</div>';

function alterar() {
    $("#cadastro").hide();
    $("#altera").hide();
    $("#deleta").hide();
    $("#criaCampos").prepend(campoAlteracoes);
}

var campoDelecao =
    '<div id="divNova">' +
    '<p>Digite o id do usuário que deseja deletar as informações</p>' +
    '<input id="idDelecao" type="number" placeholder="id"><br>' +
    '<input type="button" value="enviar" id="enviar" onclick="deletaInfo()">' +
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

/* função GET */
function pegaDados() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:9000/datacontrol/getTodos",
        success: function(informacoes) {
            $("#tabela").empty(),
                $("#tabela").append(
                    '<tr>' +
                    '<th>Login</th>' +
                    '<th>Senha</th>' +
                    '<th>Nome Completo</th>' +
                    '<th>CPF</th>' +
                    '<th>Nascimento</th>' +
                    '<th>Sexo</th>' +
                    '<th>Estado Civil</th>' +
                    '</tr>'
                ),
                $.each(informacoes, function(i, informacoes) {
                    $("#tabela").append(
                        "<tr id = '" + informacoes.id + "'>" +
                        "<td>" + informacoes.login + "</td>" +
                        "<td>" + informacoes.senha + "</td>" +
                        "<td>" + informacoes.nomeCompleto + "</td>" +
                        "<td>" + informacoes.cpf + "</td>" +
                        "<td>" + informacoes.nascimento + "</td>" +
                        "<td>" + informacoes.sexo + "</td>" +
                        "<td>" + informacoes.estadoCivil + "</td>" +
                        "</tr>"
                    )
                });
        }
    })
}

/* função POST */
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
        success: function() {
            pegaDados();
        }
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
/* colocar botão enviar que chama url do PUT
quando usuario clicar no botao de cadastro, esconde o botão para o put e vice versa
criar a função do PUT (copiar da função POST) */
var idAlteracao = -1;
function alteraInfo() {
    idAlteracao = $("#idAlteracao").val();
    $.ajax({
        type: 'GET',
        url: "http://localhost:9000/datacontrol/getUser/" + idAlteracao,
        success: function(informacoes) {
            $("#divNova").hide();
            $("#idAlteracao").val("");
            $("#login").val(informacoes.login);
            $("#senha").val(informacoes.senha);
            $("#nomeCompleto").val(informacoes.nomeCompleto);
            $("#cpf").val(informacoes.cpf);
            $("#dataNascimento").val(informacoes.dataNascimento);
            $("#sexo").val(informacoes.sexo);
            $("#estadoCivil").val(informacoes.estadoCivil);
            $("#userInput").show();
            $("#enviar").hide();
            $("#enviarPUT").show();
        }
    })
}

function alteraInfoPUT() {
    var login = $("#login").val();
    var senha = $("#senha").val();
    var nomeCompleto = $("#nomeCompleto").val();
    var cpf = parseInt($("#cpf").val());
    var dataNascimento = $("#dataNascimento").val();
    var sexo = $("#sexo").val();
    var estadoCivil = $("#estadoCivil").val();

    $.ajax({
        type: 'PUT',
        url: "http://localhost:9000/datacontrol/putAlterarPorID/" + idAlteracao,
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
        success: function() {
            pegaDados();
            alert("Cadastro alterado com sucesso!")
        }
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

/* Função DELETE */
function deletaInfo() {
    var idDelecao = $("#idDelecao").val();
    var confirmacao = confirm("Você realmente quer apagar as informações da id-" + idDelecao)
    if (confirmacao == true) {
        $.ajax({
            type: 'DELETE',
            url: "http://localhost:9000/datacontrol/apagar/" + idDelecao,
            success: function() {
                pegaDados();
                alert("Informação da id-" + idDelecao + "deletada com sucesso");
            }

        })
    }
}