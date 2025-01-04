const request = require('supertest');
const express = require('express');
const router = require('../routes/quizRoutes'); 

const app = express();
app.use(express.json());
app.use('/quizzes', router);

describe('Quiz Routes', () => {
  let createdQuizId;

  // Test case for creating a quiz
  it('should create a new quiz', async () => {
    const response = await request(app)
      .post('/quizzes/create')
      .send({
        title: 'Math Quiz',
        questions: [
          { text: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctOption: '4' },
        ]
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('quiz_id');
    expect(response.body.title).toBe('Math Quiz');
    expect(response.body.questions.length).toBe(1);

    createdQuizId = response.body.quiz_id; 
  });

  // Test case for retrieving a quiz by ID
  it('should get quiz by ID without correctOption', async () => {
    const response = await request(app)
      .get(`/quizzes/${createdQuizId}`);

    expect(response.status).toBe(200);
    expect(response.body.questions[0]).not.toHaveProperty('correctOption');
  });

  // Test case for getting all quizzes
  it('should get all quizzes without correctOption', async () => {
    const response = await request(app)
      .get('/quizzes');

    expect(response.status).toBe(200);
    expect(response.body[0].questions[0]).not.toHaveProperty('correctOption');
  });
});
