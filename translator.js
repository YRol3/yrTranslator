
class Translator{
    specialAttribute = "YRol3TR"
    lang;
    langObject = {};
    htmlElement = null;
    rtlLaugnagesList = ['he']
    defualtLang = 'en';
    editChild;
    editing = false;
    inited = {langFile:false, attributes:false};
    constructor(htmlElement =  document.querySelector("html")){
        this.setPage(htmlElement);
        this.getLanguagePreferenceFromStorage();
        this.loadFile();
    }

    getLanguagePreferenceFromStorage = function(){
        this.lang = localStorage.getItem("lang");
        if(this.lang == undefined)
            this.lang = this.defualtLang;
    }
    loadFile = function(){
        readTextFile(`./js/lang/${this.lang}.json`, 
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
            this.setPageDirection();
            this.translate()
        }
    }
    insertTranslateAttribute = function(element){
        if(element.children.length > 0)
            for(let child of element.children)
                if(child.innerHTML != '')
                    this.insertTranslateAttribute(child)

        this.appendAttributes(element);
    }

    appendAttributes = function(element){
        const result = this.findOriginalString(element.innerHTML);
        if(result.success){
            for(let original of result.original){
                if(element instanceof HTMLTitleElement){
                    element.setAttribute(this.specialAttribute, strip(original));
                    element.innerHTML = "";
                }
                else{
                    element.innerHTML = element.innerHTML.replace(original,`<span ${this.specialAttribute}="${strip(original)}"></span>`);
                }
            }
        }
    }
    setPage = function(htmlElement){
        this.htmlElement = htmlElement;
        this.insertTranslateAttribute(this.htmlElement);
        this.inited.attributes = true;
        this.translatePage();
    }
    setPageDirection = function(){
        let direction = 'ltr';
        for(let lang of this.rtlLaugnagesList){
            if(lang === this.lang){
                direction = "rtl"
                break;
            }
        }
        this.htmlElement.dir = direction;
        this.htmlElement.lang = this.lang;
    }
    translate = function(){
        const translateList = this.htmlElement.querySelectorAll(`[${this.specialAttribute}]`);
        for(let translateElement of translateList){
            const originalString = translateElement.getAttribute(this.specialAttribute);
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
        return `"${value}"`;
    }
    set = function(lang){
        if(lang !== this.lang){
            this.lang = lang;
            localStorage.setItem("lang", this.lang);
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
        resolver("done");
    }
    rawFile.send();s
}

function strip(innerHtml){
    return innerHtml.replace(/[{\-}']/g,"");;
}