# Javascript Translator
> Simple to use librarery for making your static website dynamicly translateable to any language

## Why should i use it?
1. Most of the translation librarerys out there using node, basicly if you are using a static website this is impossible to translate nothing (Github pages for example)
2. The librarey is very simple to use, just import the script and create Translator

## Installation
simply download the latest release.

## Usage example
index.html:
```html
<html>
  <head>
     <!-- import librarery -->
      <script src="translator.js"></script>
      <!-- import your javascript -->
      <script src="main.js"></script>
    
    
      <title>{-website.name-}</title>
  </head>
 
  <!-- call init function (which we will create in main.js) after document fully loaded -->
  <body onload="init()">
    <navbar>
      <ul>
        <li><a href="#">{-navigation.bar.home-}</a></li>
        <li><a href="about.html">{-navigation.bar.about-}</a></li>
        <li><a href="contact.html">{-navigation.bar.contact-}</a></li>
        <li><button>{-hebrew-}</button></li>
        <li><button>{-english-}</button></li>
        <li><div>{-current-language-flag-}<div></li>
      <ul>  
    </navbar>

    <h1>{-welcome-} {-to-} <strong>{-website.name-}</strong></h1>
    <p>
      {-paragraph.welcome-}
    </p>
  </body>
</html>
```
main.js
```js

function init(){
  this.translator = new Translator();
  thistranslator.set('english');
}

function changeLanguageTo(language){
  this.translator.set(language);
}
```

english.json
```json
  "website.name":"My Awesome Website",
  "navigation.bar.home":"Home",
  "navigation.bar.about":"About",
  "navigation.bar.contact":"Contact",
  "hebrew":"Hebrew",
  "english":"English",
  "current-language-flag":"<img src='assets/flags/us.png' />",
  "welcome":"Hello & Welcome",
  "to":"to",
  "paragraph.welcome":"<div class='p-title'> Welcome </div> <br> <div> This is a weird paragraph  </div>"
```

hebrew.json
```json
  "website.name":"האתר המגניב שלי",
  "navigation.bar.home":"בית",
  "navigation.bar.about":"אודות",
  "navigation.bar.contact":"צור קשר",
  "hebrew":"עברית",
  "english":"אנגלית"
  "current-language-flag":"<img src='assets/flags/israel.png' />",
  "welcome":"שלום וברוכים הבאים",
  "to":"ל",
  "paragraph.welcome":"<div class='p-title'> ברוכים הבאים </div> <br> <div> זו פסקה  </div>"
```

