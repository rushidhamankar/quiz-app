const express = require('express')
const { submitAnswer , getCorrectOption } = require('../models/answerModel')
const router = express.Router()

// Submit an answer for a question
router.post('/submit', (req, res) => {
    const { user_id, quiz_id, questionId, selectedOption } = req.body
    const correctOption = getCorrectOption(quiz_id, questionId)
    if(correctOption[0] == 1){
        const isCorrect = selectedOption === correctOption[1]
        const answer = {  user_id, quiz_id, questionId, selectedOption, is_correct: isCorrect }
        submitAnswer(answer)
        res.status(201).json({
            message: isCorrect ? 'Correct!' : 'Incorrect',
            correct_answer: correctOption[1]
        })
    } else {
        res.status(201).json({
            message: correctOption[1],
        })
    }
})

module.exports = router
