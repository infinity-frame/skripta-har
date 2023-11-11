let questionsAndAnswers = new Array();
let currentQuestion = 0;
let correctAnswers = 0;

function SetQuiz(quiz) {
  if (quiz.length == 2) {
    return;
  } else {
    questionsAndAnswers = JSON.parse(quiz);
    updateQuestion(currentQuestion);
  }
}
  
function updateQuestion(index) {
  document.getElementById("question").innerHTML = questionsAndAnswers[index].question;
  const answersCopy = questionsAndAnswers[index].answers
      .slice()
      .sort(() => Math.random() - 0.5);
  document.getElementById("answers").innerHTML = "";
  
    answersCopy.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer;
      button.onclick = () => check(index, answer);
      document.getElementById("answers").appendChild(button);
    });
  
    document.getElementById("questionNum").innerHTML = `Otázka ${index + 1} z ${
      questionsAndAnswers.length
    }`;
  
    document.getElementById("next").style.display = "none";
  }
  
  function next() {
    currentQuestion++;
    if (currentQuestion >= questionsAndAnswers.length) {
      alert(
        `Konec kvízu! Úspěšnost: ${Math.round(
          (correctAnswers / questionsAndAnswers.length) * 100
        )}%`
      );
  
      currentQuestion = 0;
      correctAnswers = 0;
  
      document.getElementById("score").style.display = "none";
      document.getElementById("score").innerHTML = "";
    }
    document.getElementById("next").style.display = "none";
    updateQuestion(currentQuestion);
  }
  
  function check(questionID, answer) {
    const correctAnswer = questionsAndAnswers[questionID].answers[0];
  
    if (answer === correctAnswer) {
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: { x: 0.5, y: 0.35 },
      });
  
      correctAnswers++;
    }
  
    const answerButtons = document
      .getElementById("answers")
      .getElementsByTagName("button");
  
    for (let i = 0; i < answerButtons.length; i++) {
      const button = answerButtons[i];
      if (button.innerHTML === correctAnswer) {
        button.classList.add("correct");
      } else {
        button.classList.add("incorrect");
      }
      button.disabled = true;
  
      if (button.innerHTML === answer) {
        if (answer === correctAnswer) {
          button.classList.add("correct");
        } else {
          button.classList.add("incorrect");
        }
      }
    }
  
    document.getElementById("next").style.display = "flex";
  
    const percentage = Math.round((correctAnswers / (currentQuestion + 1)) * 100);
  
    document.getElementById("score").style.display = "block";
    document.getElementById(
      "score"
    ).innerHTML = `Dosavadní úspěšnost: ${percentage}%`;
  }
  