function init(){
  this.translator = new Translator('js/lang');
  this.translator.set('english');
}

function changeLanguageTo(language){
  this.translator.set(language);
}
