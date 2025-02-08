function post(wordInput, wordDefinition) {

    document.getElementById('valid-word').innerHTML = "";
    document.getElementById('valid-definition').innerHTML = ""

    let word = document.getElementById(wordInput).value;
    word = word.trim();
    let definition = document.getElementById(wordDefinition).value;
    definition = definition.trim();

    let valid = validateInput(word);
    if(!valid) {
        document.getElementById('valid-word').innerHTML = "Invalid word"
        return;
    }

    valid = validateInput(definition);
    if(!valid) {
        document.getElementById('valid-definition').innerHTML = "Invalid definintion"
        return;
    }

    let wordObject = {word: word, definition: definition};

    console.log(wordObject);

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://young-peak-97976-264468836b6f.herokuapp.com/api/definitions/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(wordObject));

    xhttp.onload = function () {
        let response = xhttp.responseText;
        console.log("response: " + response);
        document.getElementById("success").innerHTML = response;
    }

}

function get(input, output) {

    document.getElementById('valid-word').innerHTML = "";
    
    let inputText = document.getElementById(input).value;

    inputText = inputText.trim();
    let valid = validateInput(inputText);
    if(!valid) {
        document.getElementById('valid-word').innerHTML = "Invalid word"
        return;
    }

    let xhttp = new XMLHttpRequest();
    xhttp.responseText = "response";

    xhttp.open("GET", "https://young-peak-97976-264468836b6f.herokuapp.com/api/definitions/?word="+inputText, true);

    xhttp.send(inputText);

    xhttp.onload = function() {
        let response = xhttp.responseText;
        document.getElementById(output).innerHTML = response;
    }
}

let validateInput = (str) => {
    let numbers = "0123456789";

    if(str.length === 0) {
        return false;
    }
    
    if(str.trim().length === 0) {
        return false;
    }

    for(let i = 0; i < str.length; i++) {
        if(numbers.indexOf(str[i]) !== -1) {
            return false;
        }
    }

    return true;
}