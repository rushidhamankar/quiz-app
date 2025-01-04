const { quizzes } = require('../models/quizModel')

let answers = []

const submitAnswer = (answer) => {
    const result = answers.find(
      response => response.user_id == answer.user_id && 
      response.quiz_id == answer.quiz_id && 
      response.questionId == answer.questionId
    );


    if (result) {
      result.selectedOption = answer.selectedOption;
      result.is_correct = answer.is_correct;
    } else {
      answers.push(answer)
    }
}

function getCorrectOption(quiz_id, question_id) { 
    const quiz = quizzes.find(q => q.quiz_id == quiz_id);
    let flag = 0;
    if (quiz) {
      const question = quiz.questions.find(q => q.question_id == question_id);
      
      if (question) {
        flag = 1;
        return [flag ,question.correctOption];
      } else {
        return [flag,"Question not found"];
      }
    } else {
      return [flag,"Quiz not found"];
    }
  }

module.exports = { submitAnswer, getCorrectOption, answers};