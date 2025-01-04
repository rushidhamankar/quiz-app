const request = require('supertest');
const express = require('express');
const { submitAnswer, getCorrectOption, answers } = require('../models/answerModel');
const { quizzes } = require('../models/quizModel');
const router = require('../routes/answerRoutes'); 


const app = express();
app.use(express.json());
app.use('/answers', router);

describe('Answer API', () => {

  beforeEach(() => {
    quizzes.length = 0;
    answers.length = 0;

    //mock quiz data for testing
    quizzes.push({
      quiz_id: '1',
      title: 'Test Quiz',
      questions: [
        { question_id: '1', text: 'What is the capital of France?', options: ['Paris', 'Berlin', 'Madrid'], correctOption: 'Paris' },
        { question_id: '2', text: 'What is 2 + 2?', options: ['3', '4', '5'], correctOption: '4' }
      ]
    });
  });

  // Test for `getCorrectOption`
  describe('getCorrectOption function', () => {
    it('should return the correct option for a valid quiz and question ID', () => {
      const quizId = '1';
      const questionId = '1';

      const correctOption = getCorrectOption(quizId, questionId);

      expect(correctOption).toEqual([1, 'Paris']);
    });

    it('should return "Question not found" for an invalid question ID', () => {
      const quizId = '1';
      const questionId = '999'; 

      const correctOption = getCorrectOption(quizId, questionId);

      expect(correctOption).toEqual([0, 'Question not found']);
    });

    it('should return "Quiz not found" for an invalid quiz ID', () => {
      const quizId = '999'; 
      const questionId = '1';

      const correctOption = getCorrectOption(quizId, questionId);

      expect(correctOption).toEqual([0, 'Quiz not found']);
    });
  });

  // Test for `submitAnswer`
  describe('submitAnswer function', () => {
    beforeEach(() => {
      answers.length = 0;
    });

    it('should add a new answer if it does not already exist', () => {
      const answer = {
        user_id: 1,
        quiz_id: 1,
        questionId: 1,
        selectedOption: 'Paris',
        is_correct: true
      };

      submitAnswer(answer);

      expect(answers).toHaveLength(1);
      expect(answers[0]).toEqual(answer);
    });
  });

  // Test for the `/submit` route
  describe('POST /answers/submit', () => {
    it('should return Correct! and add the answer when the answer is correct', async () => {
      const response = await request(app)
        .post('/answers/submit')
        .send({
          user_id: 1,
          quiz_id: '1',
          questionId: '1',
          selectedOption: 'Paris'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Correct!');
      expect(response.body.correct_answer).toBe('Paris');

      
      expect(answers).toHaveLength(1);
      expect(answers[0].is_correct).toBe(true);
    });
  });
});
