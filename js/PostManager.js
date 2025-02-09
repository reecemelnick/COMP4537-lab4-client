import userMessages from '../clientlang/en/en.js';


class PostManager {

    constructor() {
    }

    setListeners() {

        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById('post-btn').addEventListener("click", () => 
                this.post('add-input', 'word-def'));
        });
    }

    post(wordInput, wordDefinition) {

        document.getElementById('valid-word').innerHTML = "";
        document.getElementById('valid-definition').innerHTML = ""
    
        let word = document.getElementById(wordInput).value;
        word = word.trim();
        let definition = document.getElementById(wordDefinition).value;
        definition = definition.trim();
    
        let valid = this.validateInput(word);
        if(!valid) {
            document.getElementById('valid-word').innerHTML = userMessages.invalidWord;
            return;
        }
    
        valid = this.validateInput(definition);
        if(!valid) {
            document.getElementById('valid-definition').innerHTML = userMessages.invalidDef;
            return;
        }
    
        let wordObject = {word: word, definition: definition};
    
        console.log(wordObject);
    
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://young-peak-97976-264468836b6f.herokuapp.com/api/definitions/", true);
        // xhttp.open("POST", "http://localhost:8888/api/definitions/", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(wordObject));
    
        xhttp.onload = function () {
            let response = xhttp.responseText;
            console.log("response: " + response);
            document.getElementById("success").innerHTML = response;
        }
    
    }

    validateInput(str) {
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

}

export const requestMan = new PostManager();
requestMan.setListeners();