function init(){
  this.translator = new Translator();
  thistranslator.set('english');
}

function changeLanguageTo(language){
  this.translator.set(language);
}
