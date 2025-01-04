const generateQuestion = (id, question, options, correctOption) => ({
    question_id : id, question, options, correctOption
})

module.exports = { generateQuestion }