const express = require('express')
const { createQuiz, getQuizById, getAllQuizes } = require('../models/quizModel')
const { generateQuestion } = require('../models/questionModel')
var quizCounter = 1;
const router = express.Router()

// Create a new quiz with questions
router.post('/create', (req, res) => {
    const { title, questions } = req.body
    if (!title || !Array.isArray(questions)) {
        return res.status(400).send('Invalid request body');
    }
    const quizId = quizCounter++;
    const newQuiz = { quiz_id: quizId.toString(), title, questions: [] }

    questions.forEach((question, index) => {
        const { text, options, correctOption } = question
        newQuiz.questions.push(generateQuestion(index.toString(), text, options, correctOption))
    })

    const createdQuiz = createQuiz(newQuiz)
    res.status(201).json(createdQuiz)
})

// Get a quiz by ID (without correct answers)
router.get('/:quizId', (req, res) => {
    const { quizId } = req.params
    const quiz = getQuizById(quizId)
    
    if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' })
    }

    const quizWithoutAnswers = {
        ...quiz,
        questions: quiz.questions.map(({ correctOption, ...rest }) => rest),
    }

    res.status(200).json(quizWithoutAnswers)
})

// Get list of quizes (without correct answers)
router.get('/', (req, res) => {
    let quiz = getAllQuizes()
    
    if (quiz.length == 0) {
        return res.status(200).json({ sucess: 'No quiz found PLease create new quiz' })
    }
    
    quiz = JSON.stringify(quiz)
    quiz = JSON.parse(quiz)
    console.log(quiz);
    
    const quizWithoutAnswers = quiz.map(quizItem => ({
        ...quizItem,
        questions: quizItem.questions.map(({ correctOption, ...rest }) => rest)
    }));

    res.status(200).json(quizWithoutAnswers)
})

module.exports = router
