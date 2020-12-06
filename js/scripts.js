$(document).ready(function() {
    $("#userInput").hide();
    pegaDados();
});

function cadastrar() {
    $("#cadastro").hide();
    $("#altera").hide();
    $("#deleta").hide();
    $("#userInput").show();
    $("#enviarDados").show();
    $("#enviarPUT").hide();
}

var campoAlteracoes =
    '<div id="divNova">' +
    '<p>Digite o id do usuário que deseja alterar informações</p>' +
    '<input id="idAlteracao" type="number" placeholder="id"><br>' +
    '<input type="button" value="Conferir ID" id="enviarAlterar" onclick="alteraInfo()">' +
    '<button onclick="show()">Voltar</button>' +
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
    '<input type="button" value="Deletar ID" id="enviarDelete" onclick="deletaInfo()">' +
    '<button onclick="show()">Voltar</button>' +
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
    $("#login").val("");
    $("#senha").val("");
    $("#nomeCompleto").val("");
    $("#cpf").val("");
    $("#dataNascimento").val("");
    $("#sexo").val("");
    $("#estadoCivil").val("");
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
                    '<th>ID</th>' +
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
                        "<td>" + informacoes.id + "</td>" +
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

    if (login == "" || senha == "" || nomeCompleto == "" || cpf == NaN || dataNascimento == "" ||
        sexo == "" || estadoCivil == "") {
        alert("Pelo menos um dos campos não está preenchido!")
    } else {
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
    }
}

/* Função PUT*/
var idAlteracao = -1;

function alteraInfo() {
    $("#enviarDados").hide();
    $("#enviarPUT").show();
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
            $("#dataNascimento").val(informacoes.nascimento);
            $("#sexo").val(informacoes.sexo);
            $("#estadoCivil").val(informacoes.estadoCivil);
            $("#userInput").show();
        },
        error: function(jqXHR, textStatus, errorThrown){
            if(jqXHR.status == 404) {
                alert("Não foi encontrado o ID!")
            }
            console.log(textStatus + ": " + jqXHR.status + " errorThrown: " + errorThrown);
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