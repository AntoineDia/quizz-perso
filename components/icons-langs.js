var langs = ['en','fr','nl','de','es','it','pt', 'pl', 'hu','zh']

var iconsLangs = {}
langs.forEach(function(lang){
  // eslint-disable-next-line
  iconsLangs[lang] = require('../langs/'+lang+'.svg')
})

export default iconsLangs