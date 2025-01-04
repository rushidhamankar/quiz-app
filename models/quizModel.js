let quizzes = []

const createQuiz = (quiz) => {
    quizzes.push(quiz)
    return quiz
};

const getQuizById = (quiz_id) => quizzes.find(quiz => quiz.quiz_id == quiz_id)   

const getAllQuizes = () => {
    return quizzes
}

module.exports = { createQuiz, getQuizById, getAllQuizes, quizzes }