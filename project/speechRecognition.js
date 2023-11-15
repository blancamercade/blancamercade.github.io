var queryDict = {};
location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
console.log(queryDict.set);

var set0 = [
  "Kit had a dog",
  "It was fat and red",
  "Can I pet the red dog?",
  "You can pet the dog",
  "Ben got on top of a log",
  "The log was wet",
  "Ben fell from the log",
  "A leg hit the big log",
  "Ben cannot hop or jog",
  "He can sit on the bed"
];

var set1 = [
  "I",
  "can",
  "the",
  "we",
  "see",
  "a",
  "like",
  "to",
  "and",
  "go",
  "you",
  "do",
  "my",
  "are",
  "with",
  "he",
  "is",
  "little",
  "she",
  "was",
  "for",
  "have",
  "they",
  "of",
  "said",
  "want",
  "here",
  "me",
  "this",
  "what",
  "help",
  "too",
  "has",
  "play",
  "where",
  "look",
  "good",
  "who",
  "come",
  "does"
]

var set2 = [
  "sat",
  "sit",
  "tap",
  "pat",
  "pin",
  "pan",
  "tip",
  "pit",
  "pot",
  "pad",
  "sad",
  "mad",
  "mat",
  "cat",
  "can",
  "mop",
  "cop",
  "cap",
  "peg",
  "rat",
  "leg",
  "hat",
  "run",
  "sun",
  "ant",
  "pig"
]

var set3 = [
  "play",
  "day",
  "may",
  "way",
  "say",
  "spray",
  "see",
  "been",
  "seen",
  "green",
  "three",
  "sleep",
  "sheep",
  "high",
  "night",
  "light",
  "fright",
  "bright",
  "fight",
  "hay",
  "teen",
  "tight",
]

var set4 = [
  "toy",
  "skirt",
  "house",
  "boy",
  "mouse",
  "shirt",
  "joy",
  "first",
  "pound",
  "dirt",
  "enjoy",
  "south",
  "mouth",
  "loyal",
  "bird",
  "count",
  "mountain",
  "thirst",
  "royal",
  "crouch",
  "thirsty",
  "deploy",
  "employ",
]

var set5 = [
  "blow",
  "snow",
  "too",
  "took",
  "grow",
  "book",
  "zoo",
  "mow",
  "food",
  "low",
  "cook",
  "soon",
  "moon",
  "shook",
  "show",
  "tow",
  "boom",
  "slow",
  "spoon",
  "foot",
  "loon",
  "crow",
  "mood",
]

var setMap = {
  "set1": set1,
  "set2": set2,
  "set3": set3,
  "set4": set4,
  "set5": set5,
};

var querySet = queryDict.set;

if (querySet in setMap) {
  questionlist = setMap[querySet];
} else {
  // Default to set0 or handle the case where set is not recognized
  questionlist = set0;
}

console.log(questionlist);

var randomNumber = Math.floor(Math.random() * questionlist.length);
document.getElementById("questionbox").innerHTML = questionlist[randomNumber];

const imageContainer = document.querySelector(".image-container");

// Function to start the animation
function startAnimation() {
  imageContainer.classList.add("animate");
  setTimeout(stopAnimation, 3000); // 3000ms = 3 seconds
}

// Function to stop the animation
function stopAnimation() {
    imageContainer.classList.remove("animate");
}



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
      if (final_transcript.toLowerCase()===question) {
        document.querySelector("#answer").innerHTML = "CORRECT!";
        document.querySelector("#answer").style.color = "green";
        // Start the animation when the answer is correct
        setTimeout(() => {
          startAnimation();
        }, 1000);
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
      console.log(final_transcript);
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