const xhr = new XMLHttpRequest();
let TO_DO_LIST; //Creating an Array
xhr.open('GET',"/todos"); //opening the xhr request
xhr.onload = (response) => {
    if(response.currentTarget.status === 200){
        const dolist = JSON.parse(response.currentTarget.responseText); // Parsing the Json file and putting it in variable and sending it to CreateList function.
        TO_DO_LIST = JSON.parse(response.currentTarget.responseText);
        createList(dolist);
    }
}
xhr.send();
const createList = (dolist) =>{ // This function is to read from the JSON file and add it in the list of the dom.
    const myTestDiv = document.getElementById('myTest');
    const container = document.createElement("div");

    const list = document.createElement("ul");
    list.id="myUL";
    let listItem;
    dolist.forEach((listname, index)=> {
        let closeIcon = document.createElement('span') // Creating the span tag so as to complete the Todo
        closeIcon.innerText = 'X';
        closeIcon.className="crossButton"
        closeIcon.addEventListener('click', () => {// adding the event-listener on the cross click and sending the id to the toggle function
            toggleComplete(`item-${index}`);
        })
        listItem = document.createElement('li');
        listItem.id = `item-${index}`;    // Creating the id of the List.
        listItem.setAttribute("data-index",index); 
        listItem.textContent =listname.listname;
        listItem.classList.add("list-item");
        listItem.addEventListener('click', () => { // adding the event listener to render the detail view of the JSON.
            renderDetails(listname, `item-${index}`);
        });
        listItem.append(closeIcon); // Close icon is appended to the list.
        list.appendChild(listItem); // List appending th list item
    });
    container.append(list);
    myTestDiv.append(container); 
}

const toggleComplete = function(id) { // This function is used to mark the ToDo's to complete and strike out
    console.log(id)
    const listItem = document.getElementById(id); // Getting the element through Id
    if(listItem.classList.contains('complete')) {  // Checking if the listItem contains class complete or not . If it does not contain, adding the complete class
        listItem.classList.remove('complete')
    } else {
        listItem.classList.add('complete')
    }
}

const renderDetails = function (listItem, id) { 
    const listItemElement = document.getElementById(id); 
    const isComplete = listItemElement.classList.contains('complete'); // Adding an flag to show the status of the ToDo's.
    console.log(listItemElement, isComplete)
    const detailsElement = document.getElementById('todoDetails');
    
    let wrapper = document.getElementById('details-wrapper');
   // wrapper.innerText ="Detailed View";
   // wrapper.className="class-wrapper";

   const detailElement = document.createElement('h1'); // Creating an h1 tag for the title
   detailElement.className="element-h1"
   detailElement.innerText = "Detailed Description";

    
    const descriptionElement = document.createElement('div'); //Creating div tag for the description
    descriptionElement.className="element-div";
    descriptionElement.innerText = `Description: ${listItem.listdescription}`;

    const nameElement = document.createElement('div'); // Creating  div tag for the name
    nameElement.className="element-div";
    nameElement.innerText = `Name: ${listItem.listname}`;
    
    const dateElement = document.createElement('div'); // Creating div tag that contains date
    dateElement.className="element-div"
    dateElement.innerText = `Due Date: ${listItem.listduedate}`;
    
    const timeElement = document.createElement('div');// Creating div tag that contains time
    timeElement.className="element-div"
    timeElement.innerText = `Time: ${listItem.listTime}`;


    const statusElement = document.createElement('div'); // Creating div tag that contains status
    statusElement.className="element-div"
    statusElement.innerText = `Status: ${isComplete? 'COMPLETED': 'INCOMPLETE'}`;

    if(wrapper == null) { // Adding all the below divs in the wrapper div and checking if it is null and appending all the divs to the wrapper div
        wrapper = document.createElement('div');
        wrapper.id = 'details-wrapper';
        wrapper.className='wrapper-div';
        wrapper.appendChild(detailElement);
        wrapper.appendChild(nameElement);
        wrapper.appendChild(descriptionElement);
        wrapper.appendChild(dateElement);
        wrapper.appendChild(timeElement);
        wrapper.appendChild(statusElement);
        
    } 
    else { // If it is not null then it should show the details of the div that is being clicked on.
        wrapper.replaceChild(detailElement, wrapper.childNodes[0]);
        wrapper.replaceChild(nameElement, wrapper.childNodes[1]);
        wrapper.replaceChild(descriptionElement, wrapper.childNodes[2]);
        wrapper.replaceChild(dateElement, wrapper.childNodes[3]);
        wrapper.replaceChild(timeElement, wrapper.childNodes[4]);
        wrapper.replaceChild(statusElement, wrapper.childNodes[5]);
        
    }
    
    detailsElement.append(wrapper)
}
 function newElement() {
     const inputName = document.getElementById('myInput').value; // Adding the value of the element into the variable
     const inputDecription= document.getElementById('DescriptionInput').value;
     const inputDate = document.getElementById('DateInput').value;
     const inputTime = document.getElementById('TimeInput').value;

     let todo = { // Adding all the variables to the array.
         listname: inputName,
         listdescription: inputDecription,
         listduedate: inputDate,
         listTime: inputTime
     }

     console.log(todo)



    let li = document.createElement("li"); // Adding the li on the click of add button.
    li.id = `item-${TO_DO_LIST.length}`;
    li.addEventListener('click', () => { // Sending the id and the ToDo array to the renderDetails function
        renderDetails(todo, li.id);    
    });
    let t = document.createTextNode(inputName);
    li.appendChild(t);
    if (inputName === '') {   // If nothing is inputted, adding an alert
      alert("You must write something!");
    } 
    else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    let closeIcon = document.createElement('span') // Creating the span with cross so that if we want to mark the task complete, wecan do it by clicking
        closeIcon.innerText = 'X';
        closeIcon.className="crossButton"
        closeIcon.addEventListener('click', () => {toggleComplete(li.id)}); // Calling the toggle function to add classList complete.
       
        li.appendChild(closeIcon); // Appending closeIcon on the li tag

        
 }