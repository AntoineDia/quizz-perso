function Answer(){
  this.src = '',
  this.tags = []
  this.next = ''
}
function Question(){
  this.question = ''
  this.id = 'q' + Date.now()
  this.next = ''
  this.max = 1
  this.min = 1
  this.col = 2
  this.row = 1
  this.options = [new Answer, new Answer]
}
function Questionary(){
  const defaultLang = 'fr'
  this.name = ''
  this.languages = [defaultLang]
  this.questions = {
    [defaultLang]: [new Question]
  }
}

Questionary.prototype.addLang = function(lang){
  if(~this.languages.indexOf(lang))
    throw new Error('This language already exist')

  this.languages.push(lang)

  let lang0 = Object.keys(this.questions)[0]

  if(this.questions[lang0]){
    this.questions[lang] = []
    for(let questionId in this.questions[lang0]){
      this.questions[lang].push({
        ...this.questions[lang0][questionId]
      })
    }
  }
  else
    this.questions[lang] = [new Question]
}

Questionary.prototype.syncLangs = function(){
  this.languages.forEach(lang => {
    this.questions[lang]
  })
}

var compare = function (item1, item2, key) {

  // Get the object type
  var type1 = Object.prototype.toString.call(item1);
  var type2 = Object.prototype.toString.call(item2);

};

export {
  Answer, Question, Questionary
}