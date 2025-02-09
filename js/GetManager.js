import userMessages from '../clientlang/en/en.js';


class GetManager {

    constructor() {
    }

    setListeners() {

        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById('search-btn').addEventListener("click", () => 
                this.get('add-input', 'word-def'));
        });
    }

    get(input, output) {

        document.getElementById('valid-word').innerHTML = "";
        
        let inputText = document.getElementById(input).value;
    
        inputText = inputText.trim();
        let valid = this.validateInput(inputText);
        if(!valid) {
            document.getElementById('valid-word').innerHTML = userMessages.invalidWord;
            return;
        }
    
        let xhttp = new XMLHttpRequest();
    
        xhttp.open("GET", "https://young-peak-97976-264468836b6f.herokuapp.com/api/definitions/?word="+inputText, true);
        // xhttp.open("GET", "http://localhost:8888/api/definitions/?word="+inputText, true);
    
        xhttp.send(inputText);
    
        xhttp.onload = function() {
            let response = xhttp.responseText;
            document.getElementById(output).innerHTML = response;
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

export const requestMan = new GetManager();
requestMan.setListeners();