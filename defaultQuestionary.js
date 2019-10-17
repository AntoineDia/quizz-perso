var defaultQuestionary = {
  fr: [
    {
      id: 0,
      next: 1,
      question: 'Quel est votre genre?',
      cols: 2, rows: 1,
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
      cols: 2, rows: 1,
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
      cols: 2, rows: 1,
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

export default defaultQuestionary