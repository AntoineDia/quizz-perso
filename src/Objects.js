
const defaultLang = ['fr', 'en']

function Answer(){
  this.src = '',
  this.tags = []
  this.next = -1
}

function Question(){
  this.question = ''
  this.id = 'q' + Date.now()
  this.next = -1
  this.max = 1
  this.min = 1
  this.col = 2
  this.row = 1
  this.options = [new Answer(), new Answer()]
}

function Questionary(){
  this.name = ''
  this.langs = defaultLang
  this.questions = {}
  this.langs.forEach(lang => {
    this.questions[lang] = [new Question()]
  })
}

Questionary.prototype.addLang = function(lang){
  if(~this.langs.indexOf(lang))
    throw new Error('This language already exist')

  this.langs.push(lang)

  // this.questions[lang] = [].push(new Question)
}

// Questionary.prototype.syncLangs = function(){
//   this.langs.forEach(lang => {
//     this.questions[lang] = JSON.parse(JSON.stringify(this.questions[defaultLang]))
//   })
// }

export {
  Answer, Question, Questionary
}