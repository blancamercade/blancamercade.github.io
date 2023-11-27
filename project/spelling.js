function spellingquestions(array){  
  document.querySelector("#questionarea").style = "display:none";
  document.querySelector("#questionbox").value = '';
  spellinglist = array.split(",").map(function (value) {
    return value.trim();
  });
  console.log(spellinglist);
  let numberofspellings=spellinglist.length;
  console.log(numberofspellings);
  document.getElementById("answerstitle").innerHTML = 'Listen and spell:';
  
  // Clear previous questions
  document.getElementById("questionscontainer").innerHTML = '';

  // Generate input fields for each word
  for (var i = 1; i <= numberofspellings; i++) {
    var questionDiv = document.createElement("div");
    questionDiv.className = "question";

    var listenbutton = document.createElement("button");
    listenbutton.className="btn btn-success";
    listenbutton.id="start";
    listenbutton.innerHTML ='<i class="fa-solid fa-ear-listen"></i>';
    listenbutton.onclick = (function (index) {
      return function () {
        readword(index);
      };
    })(i);
    questionDiv.appendChild(listenbutton);


//This shows the word names but not showing for now     
//    var label = document.createElement("label");
//    label.textContent = spellinglist[i-1]+"  ";
//    questionDiv.appendChild(label);

    var input = document.createElement("input");
    input.type = "text";
    input.name = "word" + [i-1];
    questionDiv.appendChild(input);

    var checkbutton = document.createElement("button");
    checkbutton.textContent = "Check";
    questionDiv.appendChild(checkbutton);

    var resultSpan = document.createElement("span");
    resultSpan.name = "wordcheck" + [i-1];
    checkbutton.onclick = (function (index, span) { 
      return function () {
        checkword(index, span);
      };
    })(i, resultSpan);
    questionDiv.appendChild(resultSpan);

    document.getElementById("questionscontainer").appendChild(questionDiv);
  }

  //read spelling words out loud
  function readword(index) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = spellinglist[index-1];
    window.speechSynthesis.speak(msg);
  }

  //check words have been spelled correctly
  function checkword(index, resultSpan) {
    var userAnswer = document.querySelector('input[name="word' + (index - 1) + '"]').value.toLowerCase();
    var correctAnswer = spellinglist[index - 1];
    if (userAnswer === correctAnswer) {
      resultSpan.textContent = "Correct!";
      resultSpan.style.color = "green";
    } else {
      resultSpan.textContent = "Incorrect.";
      resultSpan.style.color = "red";
    }
  }
};

document.querySelector("#start").onclick = () => {
  array = document.querySelector("#questionbox").value.toLocaleLowerCase();
  spellingquestions(array);
}

document.querySelector("#emma").onclick = () => {
  array = "cry, fly, dry, try, reply, sly, shy, terrify, sky, multiply";
  spellingquestions(array);
}

document.querySelector("#neil").onclick = () => {
  array = "tap, top, lap, pet, hat, cat";
  spellingquestions(array);
}

window.addEventListener('resize', function () {
  if (window.innerWidth < window.innerHeight) {
      // Portrait orientation, keyboard might be active
      // Move UI elements to a better position
      document.querySelector("#questionarea").style.display = "none"; // For example, hide the question area
  } else {
      // Landscape orientation, adjust UI elements accordingly
      document.querySelector("#questionarea").style.display = "block"; // Show the question area
  }
});