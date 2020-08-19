function init(){
  this.translator = new Translator();
  this.translator.set('english');
}

function changeLanguageTo(language){
  this.translator.set(language);
}
