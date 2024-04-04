//this would be the object shape for storing the questions
 //you can change the questions to your own taste or even add more questions..
 const questions = [
    {
        "question": "What is Fake News?",
        "optionA": "News that is not interesting.",
        "optionB": "News that is intentionally false and misleading.",
        "optionC": "News that is outdated.",
        "optionD": "News that does not have any images or videos.",
        "correctOption": "optionB"
    },
    {
        "question": "Which of the following is a common characteristic of fake news?",
        "optionA": "Objective reporting.",
        "optionB": "Verified sources.",
        "optionC": "Sensationalist headlines.",
        "optionD": "In-depth analysis.",
        "correctOption": "optionC"
    },
    {
        "question": "Why do people create fake news?",
        "optionA": "To improve their writing skills.",
        "optionB": "For financial gain or to influence public opinion.",
        "optionC": "Due to lack of knowledge.",
        "optionD": "By accident.",
        "correctOption": "optionB"
    },
    {
        "question": "How can you identify fake news?",
        "optionA": "By checking if it has a lot of likes and shares on social media.",
        "optionB": "If it's the only source reporting a particular news story.",
        "optionC": "Cross-checking the information with reputable sources.",
        "optionD": "If the news is not on television, it’s fake.",
        "correctOption": "optionC"
    },
    {
        "question": "What should you do when you come across a news story that seems suspicious?",
        "optionA": "Share it with friends to get their opinions.",
        "optionB": "Ignore it completely.",
        "optionC": "Research the facts from multiple reliable sources.",
        "optionD": "Accept it as true if it aligns with your beliefs.",
        "correctOption": "optionC"
    },
    {
        "question": "Which type of content is most likely to be used in fake news?",
        "optionA": "Scientific reports.",
        "optionB": "Misleading statistics and unfounded claims.",
        "optionC": "Quotes from well-known figures.",
        "optionD": "Historical facts.",
        "correctOption": "optionB"
    },
    {
        "question": "What role do social media platforms play in the spread of fake news?",
        "optionA": "They automatically filter out all fake news.",
        "optionB": "They can accelerate the spread due to algorithms and sharing features.",
        "optionC": "They have no impact on the spread of fake news.",
        "optionD": "They only spread true news stories.",
        "correctOption": "optionB"
    },
    {
        "question": "What is the potential impact of fake news on society?",
        "optionA": "It has no real impact.",
        "optionB": "It can lead to misinformation and influence public opinion and behavior.",
        "optionC": "It only affects those who do not read the news often.",
        "optionD": "It improves public awareness.",
        "correctOption": "optionB"
    },
    {
        "question": "Who is responsible for stopping the spread of fake news?",
        "optionA": "Only the government.",
        "optionB": "Only news agencies.",
        "optionC": "Everyone, including news creators, sharers, and consumers.",
        "optionD": "Only social media platforms.",
        "correctOption": "optionC"
    },
    {
        "question": "What is a 'fact-checker'?",
        "optionA": "A person who makes fake news.",
        "optionB": "A professional who verifies the accuracy of news and information.",
        "optionC": "A type of software used for writing news articles.",
        "optionD": "A news reporter.",
        "correctOption": "optionB"
    }



]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}

//  The code to create this quiz was taken from : https://dev.to/sulaimonolaniran/building-a-simple-quiz-with-html-css-and-javascript-4elp.
// I decided to use this resource due to the complexity of designing such a feature from scratch,
// while recognising the importance of testing students knowledge after they have interacted with my website.
