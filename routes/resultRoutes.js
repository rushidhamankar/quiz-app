const express = require('express')
const { calculateResult } = require('../models/resultModel')

const router = express.Router()

// Get user's results for a specific quiz
router.post('/results', (req, res) => {
    const { quiz_id, user_id } = req.body
    const result = calculateResult( quiz_id, user_id)
    res.status(200).json(result)
})

module.exports = router
