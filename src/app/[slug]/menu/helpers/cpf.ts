export const checkCPF = (cpf:string) => {
    // Remove caracteres não numericos
    cpf = cpf.replace(/\D/g, "");

    // Remove CPF´s diferentes de 11 carateres
    if(cpf.length != 11){
        return false;
    }

    // Remove CPF´s com 11 caracteres identicos
    if(/^(\d)\1+$/.test(cpf)){
        return false
    }


    //Verifica o primeiro digito validador
    let sum = 0;
    for (let i = 0; i < 9;i ++){
        sum += parseInt(cpf.charAt(i)) * (10-i);
    }
    let firstChecker = (sum * 10) % 11;
    firstChecker = firstChecker === 10 ? 0 : firstChecker;
    // Verifica se o primeiro digito validador calculado é realmente o que consta no documento
    if(firstChecker != parseInt(cpf.charAt(9))){
        return false;
    }

    //Cria o segundo digito validador
    sum = 0;
    for (let i = 0; i< 10; i++){
        sum += parseInt(cpf.charAt(i)) * (11-i);
    }
    let secondChecker = (sum * 10) % 11;
    secondChecker = secondChecker === 10 ? 0: secondChecker;
    //Retorna se o segundo digito validador tambem consta igual no documento, sendo o utlimo retorno possivel.
    return secondChecker === parseInt(cpf.charAt(10));
}   