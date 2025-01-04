const { answers } = require('../models/answerModel')

const calculateResult = (quizId, userId) => {
    let result = answers.filter(response =>
        response.user_id == userId && response.quiz_id == quizId
    );

    const correctAnswers = result.filter(response => response.is_correct == true);

    result = result.map(({ user_id, quiz_id, questionId, ...rest }) => rest);

    return { user_id: userId, quiz_id: quizId, score: correctAnswers.length, answers: result }
};
module.exports = { calculateResult }