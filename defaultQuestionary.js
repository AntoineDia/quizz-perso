var defaultQuestionary = {
  fr: [
    {
      id: 0,
      next: 1,
      question: 'Quel est votre genre?',
      col: 2, row: 1,
      min: 1, max: 1,
      answers: [
        {
          next: '',
          text: 'Homme',
          src: 'https://picsum.photos/200/300',
          tags: [0],
        },
        {
          next: '',
          text: 'Femme',
          src: 'https://picsum.photos/200/300',
          tags: [1],
        }
      ]
    }
  ],
  en:[
    {
      id: 0,
      next: 1,
      question: 'What is your gender?',
      col: 2, row: 1,
      min: 1, max: 1,
      answers: [
        {
          next: '',
          text: 'Man',
          src: 'https://picsum.photos/200/300',
          tags: [0],
        },
        {
          next: '',
          text: 'Woman',
          src: 'https://picsum.photos/200/300',
          tags: [1],
        }
      ]
    }
  ],
  nl:[
    {
      id: 0,
      next: 1,
      question: 'Wat is je geslacht?',
      col: 2, row: 1,
      min: 1, max: 1,
      answers: [
        {
          next: '',
          text: 'Man',
          src: 'https://picsum.photos/200/300',
          tags: [0],
        },
        {
          next: '',
          text: 'Vrouw',
          src: 'https://picsum.photos/200/300',
          tags: [1],
        }
      ]
    }
  ]
}

document.addEventListener('PersonalityQuizDataLoad', function(e) {
  defaultQuestionary = JSON.parse(e.json)
})

export default defaultQuestionary