class TranslatorOptionsBuilder{
    constructor() {
        this.translatorOptions = new TranslatorOptions();
    }
    htmlElement(htmlElement){
        this.translatorOptions._htmlElement = htmlElement;
        return this;
    }

    folder(folder){
        this.translatorOptions._folder = folder;
        return this;
    }

    defaultLaungage(language){
        this.translatorOptions._defaultLaungage = language;
        return this;
    }

    attribute(attribute){
        this.translatorOptions._attribute = attribute;
        return this;
    }

    rtlLaugnagesList(languageList){
        this.translatorOptions._rtlLaugnagesList = languageList;
        return this;
    }

    saveToLocalStorage(saveToLocalStorage){
        this.translatorOptions._saveToLocalStorage = saveToLocalStorage;
        return this;
    }

    appendLangAttribute(appendLangAttribute){
        this.translatorOptions._appendLangAttribute = appendLangAttribute;
        return this;
    }

    appendDirectionAttribute(appendDirectionAttribute){
        this.translatorOptions._appendDirectionAttribute = appendDirectionAttribute;
        return this;
    }


    build(){
        return this.translatorOptions;
    }
}
class TranslatorOptions{
    constructor(
            folder='', 
            htmlElement = document.querySelector("html"), 
            attribute = 'YRol3TR', 
            rtlLaugnagesList=[], 
            defaultLaungage='en', 
            saveToLocalStorage=true,
            appendLangAttribute = '',
            appendDirectionAttribute = ''){
        this._attribute = attribute;
        this._rtlLaugnagesList = rtlLaugnagesList
        this._defaultLaungage = defaultLaungage;
        this._saveToLocalStorage = saveToLocalStorage;
        this._htmlElement = htmlElement;
        this._folder = folder;
        this._appendLangAttribute = appendLangAttribute;
        this._appendDirectionAttribute = appendDirectionAttribute;
    }
}

class Translator{
    attribute;
    lang;
    langObject = {};
    htmlElement;
    rtlLaugnagesList;
    defaultLang;
    folder;
    saveToLocalStorage;
    appendLangAttribute;
    appendDirectionAttribute;
    inited = {
        langFile:false,
        attributes:false
    };
    constructor(translatorOptions = new TranslatorOptions()){
        if(!(translatorOptions instanceof TranslatorOptions))
            throw new RunTimeError("Object translator options must be of type Translator Options");
        
        this.folder = translatorOptions._folder;
        this.rtlLaugnagesList = translatorOptions._rtlLaugnagesList;
        this.defaultLang = translatorOptions._defaultLaungage;
        this.attribute = translatorOptions._attribute;
        this.saveToLocalStorage = translatorOptions._saveToLocalStorage;
        this.htmlElement = translatorOptions._htmlElement;
        this.appendLangAttribute = translatorOptions._appendLangAttribute;
        this.appendDirectionAttribute = translatorOptions._appendDirectionAttribute;
        this.init();
    }

    getLanguagePreferenceFromStorage = function(){
        if(this.saveToLocalStorage)
            this.lang = localStorage.getItem("lang");
        if(this.lang == undefined)
            this.lang = this.defaultLang;
    }
    loadFile = function(){
        readTextFile(`${this.folder}${this.lang}.json`, 
            (success) => {
                this.langObject = JSON.parse(success);
                this.inited.langFile = true;
                this.translatePage()
            },
            (error) => {
                console.log(error)
            })
    }

    translatePage = function(){
        if(this.inited.attributes && this.inited.langFile){
            this.translate()
            this.addAdditionalAttributes();
        }
    }

    addAdditionalAttributes = function(){
        if(this.appendDirectionAttribute != ''){
            const directionAppendList = this.htmlElement.querySelectorAll(`[${this.appendDirectionAttribute}]`);
            const direction = this.getPageDirection();
            for(let element of directionAppendList)
                element.setAttribute(this.appendDirectionAttribute, direction);
        }
        if(this.appendLangAttribute != ''){
            const langAppendList = this.htmlElement.querySelectorAll(`[${this.appendLangAttribute}]`);
            for(let element of langAppendList)
               element.setAttribute(this.appendLangAttribute, this.lang);
        }
    }
    insertTranslateAttribute = function(element = this.htmlElement){
        if(element instanceof HTMLScriptElement)
            return;

        if(element.children.length > 0)
            for(let child of element.children)
                if(child.innerHTML != '')
                    this.insertTranslateAttribute(child)

        this.appendAttributes(element);
        if(element == this.htmlElement)
            this.inited.attributes = true;
    }

    appendAttributes = function(element){
        const result = this.findOriginalString(element.innerHTML);
        if(result.success){
            for(let original of result.original){
                if(element instanceof HTMLTitleElement){
                    element.setAttribute(this.attribute, strip(original));
                    element.innerHTML = "";
                }
                else{
                    const span = `<span ${this.attribute}="${strip(original)}"></span>`;
                    element.innerHTML = element.innerHTML.replace(original, span);
                }
            }
        }
    }
    init(){
        this.getLanguagePreferenceFromStorage();
        this.loadFile();
        this.setPageDirection();
        this.insertTranslateAttribute();
        this.translatePage();
    }
    setPageDirection = function(){
        this.htmlElement.dir = this.getPageDirection();
        this.htmlElement.lang = this.lang;
    }
    getPageDirection = function(){
        let direction = 'ltr';
        for(let lang of this.rtlLaugnagesList){
            if(lang === this.lang){
                direction = "rtl"
                break;
            }
        }
        return direction;
    }
    translate = function(){
        const direction = this.getPageDirection();
        const translateList = this.htmlElement.querySelectorAll(`[${this.attribute}]`);
        for(let translateElement of translateList){
            const originalString = translateElement.getAttribute(this.attribute);
            const translation = this.get(strip(originalString));
            translateElement.innerHTML = translation;
        }
    }
    findOriginalString = function(innerHtml){
        let result = null;
        if((result = match(innerHtml, /\{-.*?\-}/g)) != null){ 
            return {
                success:true,
                original: result};
        }
        return {success:false}
        
    }
    get = function(value){
        if(value in this.langObject)
            return this.langObject[value];
        return value;
    }
    set = function(lang){
        if(lang !== this.lang){
            this.lang = lang;
            if(this.saveToLocalStorage)
                localStorage.setItem("lang", this.lang);
            
            this.setPageDirection();
            this.loadFile();
        }
    }
}

function match(string, search){
    return string.match(search);
}

function readTextFile(file, callback, errorcallback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onload = (data) =>{
        if(data.target.status == 200)
            callback(data.target.response)
        else
            errorcallback(data.target.response)
    }
    rawFile.send();
}

function strip(innerHtml){
    return innerHtml.replace(/[{\-}']/g,"");;
}
