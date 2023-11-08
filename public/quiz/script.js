const questionsAndAnswers = [
  {
    question: "Kdo vytvořil tento web?",
    answers: ["Vojtěch Habeš a Kryštof Bruthans", "Bill Gates", "Steve Jobs"],
  },
  {
    question: "Jakou metodu tisku využívá FDM tiskárna?",
    answers: ["Additivní", "Subtraktivní", "Kombinovanou"],
  },
  {
    question: "Jakou metodu tištění využívá SL tiskárna?",
    answers: ["Subtraktivní", "Additivní", "Kombinovanou"],
  },
  {
    question: "Co to je kartézská soustava?",
    answers: [
      "Souřadnicová soustava",
      "Soustava pro zápis čísel",
      "Soustava pro zápis písmen",
    ],
  },
  {
    question: "Jak vypadá delta tiskárna?",
    answers: [
      "Má 3 ramena a trysku uprostřed",
      "Má 3 ramena a trysku na jednom z nich",
      "Má 3 ramena a trysku na každém z nich",
    ],
  },
  {
    question: "Na které modely se nám bude hodit Scara tiskárna?",
    answers: [
      "Dělání vázovitých modelů",
      "Dělání čtvercových modelů",
      "Dělání hladkých precizních modelů",
    ],
  },
  {
    question: "Kolik os má polar tiskárna?",
    answers: ["Má 2 osy", "Má 1 osu", "Má 3 osy", "Má 4 osy"],
  },
];

let currentQuestion = 0;

function updateQuestion(index) {
  document.getElementById("question").innerHTML =
    questionsAndAnswers[index].question;

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
}

updateQuestion(currentQuestion);

function next() {
  currentQuestion++;
  if (currentQuestion >= questionsAndAnswers.length) {
    currentQuestion = 0;
  }
  updateQuestion(currentQuestion);
}

function prev() {
  currentQuestion--;
  if (currentQuestion < 0) {
    currentQuestion = questionsAndAnswers.length - 1;
  }
  updateQuestion(currentQuestion);
}

function check(questionID, answer) {
  if (answer === questionsAndAnswers[questionID].answers[0]) {
    alert("Správně!");
    next();
  } else {
    alert("Špatně!");
  }
}
