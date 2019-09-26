const express = require('express')
const app = express()

app.set('view engine', 'ejs')

// app.get('/quizz-perso-dev', (res, req) => {
//   res.render('src/main', defaultQuestionary)
// })



app.use(express.static('./dist'))

app.listen( 3000, () => console.log('Started on port: 3000'))

/*
https://img.icons8.com/metro/50/2266EE/translation.png
https://img.icons8.com/metro/50/0B0C0C/resize-diagonal.png
https://img.icons8.com/metro/50/0B0C0C/compress.png
https://img.icons8.com/metro/50/0B0C0C/trash.png
*/