function init(){
    const translatorOptions = new TranslatorOptionsBuilder()
                                            .folder('js/lang/')
                                            .rtlLaugnagesList(['he'])
                                            .defaultLaungage('en')
                                            .saveToLocalStorage(true)
                                            .attribute('tranlator')
                                            .appendDirectionAttribute("page-direction")
                                            .build();
    this.translator = new Translator(translatorOptions);
}
function setLanguage(lang){
    this.translator.set(lang);
    toggleLangage();
}

function toggleLangage(){
    document.querySelector(".lang-select").classList.toggle("open");
}
