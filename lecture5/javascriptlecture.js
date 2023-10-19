if (!localStorage.getItem('counter')) {
    localStorage.setItem('counter',0);
}

function count(){ 
    let counter=localStorage.getItem('counter');
    counter++;
    document.querySelector('#manualcounter').innerHTML=counter;
    localStorage.setItem('counter',counter);
    if (counter % 10 === 0) {
        alert(`Count is now ${counter}`);
    }
}

function reset(){ 
    localStorage.setItem('counter',0);
    document.querySelector('#manualcounter').innerHTML=counter;
}

let autocounter=0;
function autocount(){ 
    autocounter=autocounter+1;
    document.querySelector('#timedcounter').innerHTML=autocounter;
}

function hello(){
    alert('Hello, world');
}
function hellogoodbye(){
    const h3= document.querySelector('h3');
    if (h3.innerHTML==='Goodbye!') {
        h3.innerHTML='Hello!';
    } else {h3.innerHTML='Goodbye!'};
}

// The below code represents event listeners
document.addEventListener('DOMContentLoaded', function () {

    //by default the submit button is disabled
    document.querySelector('#submit').disabled = true;

    document.querySelector('#task').onkeyup = function () {
        if (document.querySelector('#task').value.length > 0) {
            document.querySelector('#submit').disabled = false;
        } else {
            document.querySelector('#submit').disabled = true;
        }
    };

    document.querySelector('#taskform').onsubmit = function () {
        const task = document.querySelector('#task').value;
        //you could add it to the condole log wtih this command-> console.log(task);
        const li = document.createElement('li');
        li.innerHTML = task;
        document.querySelector('#tasks').append(li);
        document.querySelector('#task').value = '';

        //stop form from submitting
        return false;
    };
    document.querySelector('#hellobutton').onclick = hello;


    document.querySelector('#countbutton').onclick = count;
    document.querySelector('#resetbutton').onclick = reset;

    setInterval(autocount, 1000);


    document.querySelector('#hellogoodbyebutton').onclick = hellogoodbye;
    document.querySelector('#nameform').onsubmit = function () {
        const name = document.querySelector('#name').value;
        alert(`Hello, ${name}!`);
    };

    document.querySelectorAll('.colorbuttons').forEach(function (button) {
        button.onclick = function () {
            document.querySelector('#colorstitle').style.color = button.dataset.color;
        };
    });

    document.querySelector('select').onchange = function () {
        document.querySelector('#colorstitle2').style.color = this.value;
    };

    //change title button color one by one
    //document.querySelector('#red').onclick = function(){
    //    document.querySelector('#colorstitle').style.color='red';
    //}
    //document.querySelector('#blue').onclick = function(){
    //    document.querySelector('#colorstitle').style.color='blue';
    //}
    //document.querySelector('#green').onclick = function(){
    //    document.querySelector('#colorstitle').style.color='green';
    //}
});
