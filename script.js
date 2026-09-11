const CATEGORY = 15; // Entertainment: Video Games
const BATCH_SIZE = 50; // OpenTDB's max per request
const NUM_BATCHES = 5; // fetch NUM_BATCHES batches = up to 50 * NUM_BATCHES questions total
const DELAY_MS = 5500; // stay above OpenTDB's 5-second rate limit

const questionsSection = document.querySelector('#question-container');
const resultSection = document.getElementById('result-container');
const loadWarning = document.querySelector('.loading-warning');
const correctText = document.getElementById('correct-answers');
const totalQuestions = document.getElementById('total-questions');

let zeldaQuestionObjs = [];
let zeldaQuestions = [];
let currentQuestion = 0;
let correctAnswers = 0;

function shuffle(array) {
  const shuffled = [...array]; // copy it doesn't mutate the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
  }
  return shuffled;
}

function createQuestion(questionObj, questionNum) {
    const newQuestionSection = document.createElement('section');
    newQuestionSection.classList.add('hidden','question');

    const questionText = document.createElement('p');
    questionText.textContent = `${questionNum}. ${decodeHTML(questionObj.question)}`;

    let possibleAnswers = [questionObj.correct_answer, ...questionObj.incorrect_answers];
    shuffledAnswers = shuffle(possibleAnswers);

    const answersList = document.createElement('ul');
    answersList.classList.add('answers-list');

    let labels = ['A', 'B', 'C', 'D']
    shuffledAnswers.forEach((answer, index, shuffledAnswers)  => {
        const li = document.createElement('li');
        
        const button = document.createElement('button');
        button.classList.add('answer-button');
        button.dataset.isCorrect = (answer === questionObj.correct_answer);

        button.append(`${labels[index]}`);

        const answerSpan = document.createElement('span');
        answerSpan.classList.add('answer-text');
        answerSpan.textContent = decodeHTML(answer);
        button.addEventListener('click', handleAnswerClick);

        li.appendChild(button);
        li.appendChild(answerSpan);
        answersList.appendChild(li);
    });

    newQuestionSection.appendChild(questionText);
    newQuestionSection.appendChild(answersList);
    zeldaQuestions.push(newQuestionSection);
    questionsSection.appendChild(newQuestionSection);
}

function handleAnswerClick(event) {
    const clickedButton = event.currentTarget;
    const answerLists = document.querySelectorAll('.answers-list');
    if (clickedButton.dataset.isCorrect === "true") {
        correctAnswers++;
    }
    nextQuestion();
}

function showResults() {
    correctText.textContent = correctAnswers;
    totalQuestions.textContent = zeldaQuestions.length;
    resultSection.classList.remove('hidden');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function decodeHTML(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

async function fetchBatch() {
  const url = `https://opentdb.com/api.php?amount=${BATCH_SIZE}&category=${CATEGORY}&type=multiple`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error(`API returned response_code ${data.response_code}`);
  }

  return data.results;
}

async function fetchAllQuestions() {
  let allQuestions = [];

  for (let i = 0; i < NUM_BATCHES; i++) {
    console.log(`Fetching batch ${i + 1} of ${NUM_BATCHES}...`);
    const batch = await fetchBatch();
    allQuestions = allQuestions.concat(batch);

    if (i < NUM_BATCHES - 1) {
      await delay(DELAY_MS);
    }
  }

  return allQuestions;
}

async function loadZeldaQuestions() {

    loadWarning.textContent = 'Loading questions...';

    try {
        const allQuestions = await fetchAllQuestions();

        zeldaQuestionObjs = allQuestions.filter((questionObj) =>
        questionObj.question.toLowerCase().includes('zelda') && !(questionObj.question.toLowerCase().includes('aunts'));
        );

        console.log(`Found ${zeldaQuestionObjs.length} Zelda questions out of ${allQuestions.length} total`);

        if (zeldaQuestionObjs.length === 0) {
        loadWarning.textContent = 'No Zelda questions found this time — try refreshing.';
        questionsSection.appendChild(p);
        return;
        }

        shuffledQuestions = shuffle(zeldaQuestionObjs)

        shuffledQuestions.forEach((questionObj, index, shuffledQuestions) => {
            createQuestion(questionObj, index + 1);
        });

        showQuestion(currentQuestion);

    } catch (error) {
        console.error('Fetch failed:', error);
        const errorP = document.createElement('p');
        errorP.textContent = `Error fetching questions: ${error.message}`;
        questionsSection.appendChild(errorP);
    }

    if (zeldaQuestionObjs.length == 1) {
      loadWarning.textContent = `1 question found from opentdb.com`;
    } else {
      loadWarning.textContent = `${zeldaQuestionObjs.length} questions found from opentdb.com`;
    }
}

function showQuestion(index) {
    zeldaQuestions[index].classList.remove('hidden');
}

function hideQuestion(index) {
    zeldaQuestions[index].classList.add('hidden');
}

function nextQuestion() {
    hideQuestion(currentQuestion);
    currentQuestion++;
    if (currentQuestion < zeldaQuestions.length) {
        showQuestion(currentQuestion);
    } else {
        showResults();
    }
}

document.addEventListener('DOMContentLoaded', loadZeldaQuestions);