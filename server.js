const express = require('express')
const bodyParser = require('body-parser')
const quizRoutes = require('./routes/quizRoutes')
const answerRoutes = require('./routes/answerRoutes')
const resultRoutes = require('./routes/resultRoutes')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.use('/quiz', quizRoutes)
app.use('/answer', answerRoutes)
app.use('/result', resultRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
