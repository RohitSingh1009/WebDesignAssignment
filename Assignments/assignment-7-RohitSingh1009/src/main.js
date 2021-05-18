let subscriptions = [];
let isBold = false;
let isItalic = false;
let fontSize = "4";

function populateFontSizeDropDown(selectedIndex){ // populating the dropdown of fontsize dropdown with 1 to 7 values
    let fontsizechange = document.getElementById("fontsizechanger");
    
    while (fontsizechange.firstChild) {
        fontsizechange.removeChild(fontsizechange.firstChild);
    }

    for(let i=1;i<=7; i++){
       let option= document.createElement("option");// Creating the option element in select tag
       option.setAttribute("value",i);
       if(selectedIndex && i == selectedIndex) option.setAttribute('selected', '')// setting the option tag attribute selected.
       else if(!selectedIndex && i == 4) { // setting the default attribute as selected 
           option.setAttribute("selected",'');
       }
       option.innerHTML=i;
        fontsizechange.appendChild(option);// Appending option to the select tag

    }
}

populateFontSizeDropDown(); 

Rx.Observable.fromEvent(document.getElementById('diveditorspace'), 'mouseup') // Adding an event through observable for the mouse up event which will help in selection
    .subscribe((event) => {
        isBold = document.queryCommandState('bold');// This method checks if the selected text is bold and returns boolean value
        isItalic = document.queryCommandState('italic');//This method checks if the selected text is italics and returns boolean value
        fontSize = document.queryCommandValue('fontSize');// This methods gets the value of the selected text for the font-size
        let buttonElement = document.getElementById('boldButton');
        buttonElement.className = isBold ? 'bold' : ''; // Adds the bold class if the value is true;
        let buttonElement1= document.getElementById('italicButton');
        buttonElement1.className= isItalic? 'italic': ''; // Adds the italics class if the value is true;
        let dropdownElement = document.getElementById('fontsizechanger');
        let options = dropdownElement.getElementsByTagName('option');
        for (let i = 0; i < options.length; i++) {
            // let isSelected = options[i].getAttribute('selected')!=null;
            if (i+1 == fontSize) {
                populateFontSizeDropDown(i+1);// calling the populatefontsizeDropdown method to set the attribute selected for font size of the selected text 
                break;
            }
            // if (i+1 != fontSize && isSelected) {
            //     options[i].removeAttribute('selected');
            // }
        }
        

    }
    )

const boldObservable = Rx.Observable.fromEvent(document.getElementById('boldButton'), 'click'); // Adding an event click to the observable for the bold button
const italicObservable = Rx.Observable.fromEvent(document.getElementById('italicButton'), 'click'); // Adding an event click to the observable for the italic button
const fontSizeObservable = Rx.Observable.fromEvent(document.getElementById('fontsizechanger'), 'change');// Adding an change event to the observable for the font size button
const onDestroyListener = Rx.Observable.fromEvent(document.getElementById('fontsizechanger'), 'change');

const boldSubscription = boldObservable.subscribe((event) => { 
    document.execCommand('bold');  // Subscribing to the observable and making the text 'bold'
    let isBold = document.queryCommandState('bold');// Selecting the text and this will return true if the text is bold
    let buttonElement = document.getElementById('boldButton');
    buttonElement.className = isBold ? 'bold' : '';
})

const italicSubscription = italicObservable.subscribe((event) => {
    document.execCommand('italic');  // Subscribing to the observable and making the text 'italics'
    let isItalic = document.queryCommandState('italic'); // Selecting the text and this will return true if the text is italics
    let buttonElement1= document.getElementById('italicButton');
    buttonElement1.className= isItalic? 'italic': '';
})

const fontSubcription = fontSizeObservable.subscribe((event) => {
    document.execCommand('fontSize', false, `${event.target.value}px`); // Changing the font size of the selected text
    let fontSize = document.queryCommandValue('fontSize');
})

subscriptions.push(boldSubscription);
subscriptions.push(italicSubscription);
subscriptions.push(fontSubcription);

// for (let sub of subscriptions) {
//     sub.unsubscribe();
// }

