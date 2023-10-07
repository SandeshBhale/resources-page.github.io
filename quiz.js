const quizData = [
    {
      question: 'Have you ever had a period of time when you felt like you were on top of the world, had a lot of energy, and felt like you could do anything?',
      options: ['Not at all', 'A little', 'Sometimes', 'Often ','Quite a lot'],
      answer: 'Paris',
    },
    {
      question: ' Have you ever had a period of time when you felt very down, sad, and hopeless?',
      options: ['Not at all', 'A little', 'Sometimes', 'Often ','Quite a lot'],
      answer: 'Jupiter',
    },
    {
      question: 'Have you ever had a period of time when you felt like you were thinking very fast and couldnot slow down your thoughts?',
      options: ['Not at all', 'A little', 'Sometimes', 'Often ','Quite a lot'],
      answer: 'France',
    },
    {
      question: 'Have you ever had a period of time when you felt very irritable and easily angered?',
      options: ['Not at all', 'A little', 'Sometimes', 'Often ','Quite a lot'],
      answer: 'Mount Everest',
    },
    {
      question: 'Have you ever had a period of time when you needed much less sleep than usual?',
      options: ['Not at all', 'A little', 'Sometimes', 'Often ','Quite a lot'],
      answer: 'Pacific Ocean',
    },
    {
      question: 'Have you ever had a period of time when you talked so much that it was hard for others to get a word in edgewise?',
      options: ['Not at all', 'A little', 'Sometimes', 'Often ','Quite a lot'],
      answer: 'Au',
    },
    {
      question: 'Have you ever had a period of time when you felt like you were on a mission and had to get things done, no matter what?',
      options: ['Not at all', 'A little', 'Sometimes', 'Often ','Quite a lot'],
      answer: 'Leonardo da Vinci',
    },
    {
      question: 'Have you ever had a period of time when you spent a lot of money or made other impulsive decisions?',
      options: ['Not at all', 'A little', 'Sometimes', 'Often ','Quite a lot'],
      answer: 'Mars',
    },
    {
      question: 'Have you ever had a period of time when you felt like you were better than everyone else?',
      options: ['Not at all', 'A little', 'Sometimes', 'Often ','Quite a lot'],
      answer: 'Whale Shark',
    },
    {
      question: 'Have you ever had a period of time when you felt like you were going crazy??',
      options: ['Not at all', 'A little', 'Sometimes', 'Often ','Quite a lot'],
      answer: 'Lion',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];

    // for shuffling answers
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }

  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer ==="Not at all") {
        score+=1;
      } 
      else if (answer ==="A little") {
        score+=2;
      }
      else if (answer ==="Sometimes") {
        score+=3;
      }
      else if (answer ==="Often") {
        score+=4;
      }
      else  {
        score+=5;
      }
   
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    let resultShow="";
    if(score<=10) resultShow="You are safe !!";
    else if(score>10 && score <=20) resultShow="Mental health in begining stage";
    else if(score>20 && score<=30) resultShow="Mental health at intermediate stage ";
    else resultShow="Mental health at advance level";
    resultContainer.innerHTML = `You Mental health  ` +resultShow;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Showing Pie chart:</p>
      <p> work under construction </p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();