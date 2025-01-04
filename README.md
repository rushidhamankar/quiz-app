quiz-app is a quiz application buit it with NodeJs(ExpressJs framework) which allows us to create quiz , submit answers and get user specific result of the quiz.

To run this app on local , clone it using
git clone
cd quiz-app

This app can be run in two ways either you can do

# to run the app on locally
npm install 

OR

# to run the app in docker container
docker-compose build --up 

And then open http://localhost:3000/quiz/ in postman to start with the application .Also refer to the quiz-app/quiz-app.postman_collection.json file to access the set of REST APIs.

# below are request body sample for all the set of APIs.

# to create the quiz
Request Type : POST
Request URL  : http://localhost:3000/quiz/create
Request Body : {
  "title": "Corporate Quiz",
  "questions": [
    {
      "text": "What is javascript?",
      "options": ["tool", "framework", "language", "method"],
      "correctOption": "language"
    },
    {
      "text": "What is express js?",
      "options": ["tool", "framework", "language", "method"],
      "correctOption": "framework"
    }
  ]
}

# to get all the quizzes
Request Type : GET
Request URL  : http://localhost:3000/quiz/

# to get quiz by ID
Request Type : GET
Request URL  : http://localhost:3000/quiz/1

# to submit the answer of specific quiz & question
Request Type : POST
Request URL  : http://localhost:3000/answer/submit
Request Body : {
    "user_id" : "1",
    "quiz_id" : "1",
    "questionId": "2",
    "selectedOption": "20"
}

# to get the result of specific user & quiz
Request Type : POST
Request URL  : http://localhost:3000/result/results
Request Body : {
  "quiz_id": "1",
  "user_id": "1"
}