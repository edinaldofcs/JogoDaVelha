var voce;
var cpu;
var quem;
var fim;

function escolher(opcao) { // Define quem começa e guarda sua opção

    document.getElementById("opcao").style.display = "none";
    var num = Math.floor(Math.random() * 2 + 1);//Gera número aleatório entre 1 e 2

    if (num == 1) {
        document.getElementById("text").innerHTML = "Você começa!";
        if (opcao == "X") {
            voce = "X";
            cpu = "O";
        } else {
            voce = "O";
            cpu = "X";
        }
        quem = "you";
        document.getElementById("first").style.display = "block";

    } else {
        document.getElementById("text").innerHTML = "CPU começa!"
        if (opcao == "X") {
            voce = "X";
            cpu = "O";
        } else {
            voce = "O";
            cpu = "X";
        }
        quem = "cpu";
        document.getElementById("first").style.display = "block";
    }
}

function Myturn(MyId) {//Sua vez de jogar

    //Trava o jogo, quando finalizado
    if (fim == true) {
        document.getElementById("final").style.display = "block";
        return console.log("jogo finalizado");
    }

    // Impede clique em campos não vazios
    if (MyId.textContent != "") {
        return console.log("Impedir clique em campos não vazios");
    }

    if (quem == "you") {
        //Adiciona jogada
        MyId.innerHTML = voce;
        quem = "cpu";//troca jogador
        var victory = vencedor();
        console.log(victory);
    } else {
        setTimeout(() => {
            vezcpu();//CPU joga
        }, 1000);
    }
    //Verificar se você ganhou
    if (victory == 1) {
        console.log(victory);
        document.getElementById("txtFinal").innerHTML = "Você venceu!";
        document.getElementById("final").style.display = "block";

    } else {
        setTimeout(() => {
            vezcpu();//CPU joga
        }, 1000);
    }
}

function vezcpu() {//Vez do CPU
    //Trava o jogo, quando finalizado
    if (fim == true) {
        return console.log("jogo finalizado");
    }
    var index;
    // Fazer jogada em campo não vazio
    do {
        index = Math.floor(Math.random() * 9 + 1);//número aleatório entre 1 e 9

        // Se o campo for válido, entrará na condição
        if (document.getElementById("bt" + index).textContent == "") {
            document.getElementsByTagName("button")[index - 1].innerHTML = cpu;
            quem = "you";
            index = 0;
            var victory = vencedor();
            if (victory == 0) {
                document.getElementById("txtFinal").innerHTML = "O CPU venceu";
                return document.getElementById("final").style.display = "block";
            }
        }

        let validar = false;

        //valida condição de empate
        for (var i = 0; i < 9; i++) {
            if (document.getElementById("bt" + (i + 1)).textContent == "") {
                validar = true;
            }
        }
        if (validar == false) {
            index = 0;
            setTimeout(() => {
                document.getElementById("txtFinal").innerHTML = "Empate";
                fim = true;
                document.getElementById("final").style.display = "block";
            }, 500);
        }
    } while (index != 0);
}

function vencedor() {//verifica se há um vencedor

    var res = [];
    //criação de matriz 3 x 3
    for (var i = 0; i < 3; i++) {
        res[i] = [];
    }

    var k = 0;
    var j = 0;

    for (var i = 0; i < 9; i++) {
        res[j][k] = document.getElementById("bt" + (i + 1)).textContent;
        k++;

        if (k == 3) {
            j++;
            k = 0;
        }

    }

    //Todas as possibilidades de vitória
    if (res[0][0] == res[0][1] && res[0][0] == res[0][2] || res[0][0] == res[1][0] && res[0][0] == res[2][0] || res[0][0] == res[1][1] && res[0][0] == res[2][2]) {
        var victory = vitoria(res[0][0]);
        return (victory);
    } else if (res[1][0] == res[1][1] && res[1][0] == res[1][2]) {
        var victory = vitoria(res[1][0]);
        return (victory);
    } else if (res[2][0] == res[2][1] && res[2][0] == res[2][2]) {
        var victory = vitoria(res[2][0]);
        return (victory);
    } else if (res[0][1] == res[1][1] && res[0][1] == res[2][1]) {
        var victory = vitoria(res[0][1]);
        return (victory);
    } else if (res[0][2] == res[1][2] && res[0][2] == res[2][2] || res[0][2] == res[1][1] && res[0][2] == res[2][0]) {
        var victory = vitoria(res[0][2]);
        return (victory);
    }
    //console.log(res);
}

function vitoria(val) {
    //Detarmina quem venceu
    if (val == "X" && voce == "X" || val == "O" && voce == "O") {
        fim = true;
        return 1;
    } else if (val != "") {
        fim = true;
        return 0;
    }
}

function fechar(val) {
    document.getElementById(val).style.display = "none";

    if (quem == "cpu") {
        setTimeout(() => {
            vezcpu();
        }, 500);
    }
}
