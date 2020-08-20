function init(){
    const translatorOptions = new TranslatorOptionsBuilder()
                                            .folder('js/lang/')
                                            .rtlLaugnagesList(['he'])
                                            .defaultLaungage('en')
                                            .saveToLocalStorage(false)
                                            .attribute('tranlator')
                                            .appendDirectionAttribute("page-direction")
                                            .build();
    this.translator = new Translator(translatorOptions);
}
function setLanguage(lang){
    this.translator.set(lang);
    toggleLangage();
    toggleNavbar();
}

function toggleLangage(){
    document.querySelector(".lang-select").classList.toggle("open");
}

function toggleNavbar(){
    document.querySelector(".navbar-list").classList.toggle("open");
}
