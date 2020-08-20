# Javascript Translator
> Simple to use library for making your static website dynamically translatable to any language 

## Why should I use it?
1. Most of the translation libraries out there using a node, basically if you are using a static website this is impossible to translate nothing (Github pages for example)
2. The library is very simple to use, just import the script and create Translator 

## Installation 
simply download the latest release.

## Usage example
index.html:
```html
<html>
  <head>
      <!--  import translator library-->
      <script src="js/lang/translator.js"></script>
      <script src="js/main.js"></script>
      <link rel="stylesheet" href="style.css">
      <!-- syntax is {-your.word.here-} for translation -->
      <title>{-website.name-}</title>
  </head>
 
  <!-- call init function (which we will create in main.js) after document fully loaded -->
  <body onload="init()">
    <navbar id="navbar">
        <ul class="navbar-list">
            <!-- page-direction attribute is dynamicly set to rtl/ltr to help css styling-->
            <li page-direction><div class="navbar-item" >{-navigation.bar.home-}</div></li>
            <li page-direction><div class="navbar-item" >{-navigation.bar.about-}</div></li>
            <li page-direction><div class="navbar-item">{-navigation.bar.contact-}</div></li>
            <li page-direction>
                                                                                     
                <div class="navbar-item" onclick="toggleLangage()">
                  <div class="lang">
                    <!--small trick to add currenet lang img -->
                    {-current.lang.flag-} 
                    <div class="lang-name">
                      <!--small trick to add currenet lang name -->
                      {-current.lang.name-}
                    </div>
                  </div>
                </div>
                <div class="lang-select">
                    <div onclick="setLanguage('he')" class="item">{-hebrew-}</div>
                    <div onclick="setLanguage('en')" class="item">{-english-}</div>
                </div>
            </li>
        </ul>  
    </navbar>
    <div class="container">
        <div class="card" style="text-align: center;">
            <h1>{-welcome-} {-to-}-<strong>{-website.name-}</strong></h1>
        </div>    
        <div class="card">
            <h2>{-paragraph.gibrish.h2-}</h2>
            <p>
                {-paragraph.gibrish.p-}
            </p>
            <p>
                {-paragraph.gibrish.p-}
            </p>
            <p>
                {-paragraph.gibrish.p-}
            </p>
        </div>  
        
        <div class="card">
            <h2>{-paragraph.gibrish.h2-}</h2>
            <p>
                {-paragraph.gibrish.p-}
            </p>
            <p>
                {-paragraph.gibrish.p-}
            </p>
            <p>
                {-paragraph.gibrish.p-}
            </p>
        </div>   
        <div class="card">
            <h2>{-paragraph.gibrish.h2-}</h2>
            <p>
                {-paragraph.gibrish.p-}
            </p>
            <p>
                {-paragraph.gibrish.p-}
            </p>
            <p>
                {-paragraph.gibrish.p-}
            </p>
        </div>   
    </div>
  </body>
</html>
```
main.js
```js
function init(){
    // we create TranslatorOptions object with TranslatorOptionsBuilder
    const translatorOptions = new TranslatorOptionsBuilder()
              .folder('js/lang/') // what directory the translations files are located, default = ''
              .rtlLaugnagesList(['he']) // array of languages to set view to rtl instead of ltr, default empty array []
              .defaultLaungage('en') // default language file in this case - en.json file is the default, default en
              .saveToLocalStorage(false) // should the language change be saved to localstorage for next time library load - default true
              .attribute('tranlator') // adds attribute to each translation word for easy mapping of the dom - default YRol3TR
                    /*
                        what attribute to attach ltr / rtl when direction is changed 
                       "page-direction" in this case as on the li items in the html document
                        default = '' which means don't attach ltr rtl
                    */
              .appendDirectionAttribute("page-direction") 
              .build(); // build to generate TranslatorOptions object
    this.translator = new Translator(translatorOptions); // we pass the object to the translator object (if no object passed default object is created)
}
function setLanguage(lang){
    this.translator.set(lang); //changes language if not the same one, If lang already the same one nothing happends
    toggleLangage();
}

function toggleLangage(){
    document.querySelector(".lang-select").classList.toggle("open");
}

```

en.json
```json
{
  "website.name":"My Awesome Website",
  "navigation.bar.home":"Home",
  "navigation.bar.about":"About",
  "navigation.bar.contact":"Contact",
  "current.lang.name":"English",
  "current.lang.flag":"<img class='flag' src='assets/us.jpg' />",
  "hebrew":"Hebrew",
  "english":"English",
  "welcome":"Hello & Welcome",
  "to":"to",
  "paragraph.welcome":"Welcome <br> This is a welcome paragraph",
  "paragraph.gibrish.h2":"Lorem ipsum dolor sit amet.",
  "paragraph.gibrish.p":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab rerum vel labore doloribus laborum quibusdam adipisci ipsam inventore sit quae, tempore maiores illo eveniet obcaecati vitae eligendi nemo, nobis harum excepturi at veritatis? Facere vitae mollitia sint perferendis ea iste atque et, deleniti ipsum odio maiores in ex ducimus rerum.  "
}
```

he.json
```json
{
  "website.name":"האתר המגניב שלי",
  "navigation.bar.home":"בית",
  "navigation.bar.about":"אודות",
  "navigation.bar.contact":"צור קשר",
  "current.lang.name":"עברית",
  "current.lang.flag":"<img class='flag' src='assets/israel.png' />",
  "hebrew":"עברית",
  "english":"אנגלית",
  "welcome":"שלום וברוכים הבאים",
  "to":"ל",
  "paragraph.welcome":"ברוכים הבאים <br> זו פסקה",
  "paragraph.gibrish.h2":"לורם איפסום דולור סיט אמט",
  "paragraph.gibrish.p":"ורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי לורם איפסום דולור סיט אמט, לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי."
}
```

