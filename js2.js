
function Answer(){
  this.src = '',
  this.tags = []
  this
  .next = 'null'
}

function Question(){
  this.question = ''
  this.id = 'q' + Date.now()
  this.next = 'null'
  this.max = 1
  this.col = 2
  this.row = 1
  this.options = [new Answer,new Answer]
}

function Questionary(name){
  this.name = name
  this.languages = []
  this.questions = {
    fr: [new Question]
  }
}
Questionary.prototype.addLang = function(lang){
  if(~this.languages.indexOf(lang))
    throw new Error('This language already exist')
  this.languages.push(lang)
  this.questions[l] = []
}