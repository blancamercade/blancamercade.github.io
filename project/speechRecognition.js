var questionlist = [
  "Reading games are great",
  "cats and dogs",
  "bananas",
  "year",
  "list of words",
  "hat",
  "potatoes",
  "test",
  "This is yet another test"
];
var randomNumber = Math.floor(Math.random() * questionlist.length);
document.getElementById("questionbox").innerHTML = questionlist[randomNumber];

if ("webkitSpeechRecognition" in window) {
    let question = document.querySelector("#questionbox").innerHTML.toLocaleLowerCase();
    console.log (question);
    let speechRecognition = new webkitSpeechRecognition();
    let final_transcript = "";
    document.querySelector("#final").innerHTML = "";
  
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'en-GB';
  
    speechRecognition.onstart = () => {
      let final_transcript = "";
      document.querySelector("#status").style.display = "block";
    };
    speechRecognition.onerror = () => {
      document.querySelector("#status").style.display = "none";
      console.log("Speech Recognition Error");
    };
    speechRecognition.onend = () => {
      document.querySelector("#status").style.display = "none";
      console.log("Speech Recognition Ended");
      if (final_transcript===question) {
        document.querySelector("#answer").innerHTML = "CORRECT!";
        document.querySelector("#answer").style.color = "green";
      } else {
        document.querySelector("#answer").innerHTML = "TRY AGAIN";
        document.querySelector("#answer").style.color = "red";
      }
    };
  
    speechRecognition.onresult = (event) => {
      let interim_transcript = "";
  
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      document.querySelector("#final").innerHTML = final_transcript;
      document.querySelector("#interim").innerHTML = interim_transcript;
    };
  
    document.querySelector("#start").onclick = () => {
      speechRecognition.start();
      final_transcript = "";
      document.querySelector("#answer").innerHTML = "";
    };
    document.querySelector("#stop").onclick = () => {
      speechRecognition.stop();
    };
  } else {
    console.log("Speech Recognition Not Available");
  }