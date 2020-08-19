function init(){
  this.translator = new Translator('js/lang/');
  this.translator.set('en');
}

function changeLanguageTo(language){
  this.translator.set(language);
}
