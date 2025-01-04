const request = require('supertest');
const express = require('express');
const { calculateResult } = require('../models/resultModel');
const { answers } = require('../models/answerModel');
const router = require('../routes/resultRoutes');

const app = express();
app.use(express.json());
app.use('/results', router);

describe('Result API', () => {
  // Mock data for testing
  beforeEach(() => {
    // Reset the answers array before each test
    answers.length = 0;

    // mock answers data for testing
    answers.push(
      { user_id: 1, quiz_id: 1, questionId: 1, selectedOption: 'Paris', is_correct: true },
      { user_id: 1, quiz_id: 1, questionId: 2, selectedOption: '4', is_correct: true },
      { user_id: 1, quiz_id: 1, questionId: 3, selectedOption: 'Berlin', is_correct: false },
      { user_id: 2, quiz_id: 1, questionId: 1, selectedOption: 'Paris', is_correct: true },
      { user_id: 2, quiz_id: 1, questionId: 2, selectedOption: '3', is_correct: false },
    );
  });

  // Unit tests for `calculateResult` function
  describe('calculateResult function', () => {
    it('should return correct result for user with correct answers', () => {
      const result = calculateResult(1, 1);

      expect(result).toEqual({
        user_id: 1,
        quiz_id: 1,
        score: 2,
        answers: [
          { selectedOption: 'Paris', is_correct: true },
          { selectedOption: '4', is_correct: true },
          { selectedOption: 'Berlin', is_correct: false },
        ]
      });
    });


    it('should return empty result if no answers for the user and quiz', () => {
      const result = calculateResult(1, 999); 

      expect(result).toEqual({
        user_id: 999,
        quiz_id: 1,
        score: 0,
        answers: []
      });
    });
  });

});
