let inp = document.getElementById('input-box');
let btns = document.querySelectorAll('button');

let arr = Array.from(btns); //make an array of all buttons
let s = "";

arr.forEach(button => {
    button.addEventListener('click', (x) => {
        if(x.target.innerHTML == '=') {
            s = eval(s); //use in-built JS function to evaluate the equation on pressing '='
            inp.value = s;
        }
        else if(x.target.innerHTML == 'AC') {
            s = ""; //reset the string to empty string to clear everything
            inp.value = s;
        }
        else if(x.target.innerHTML == 'C') {
            s = s.substring(0, s.length-1); //remove the last character
            inp.value = s;
        }
        else {
            s += x.target.innerHTML;
            inp.value = s;
        }
    })
})