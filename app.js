console.log("welcome to the brain of web dev")
let body=document.querySelector('body');
body.style.color='White';

showNotes();
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener('click', function (e) {
    let addtxt = document.getElementById("addtxt");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");

    //if local storage is null, create an array noteObj
    if (notes == null ) {
        notesObj = [];
    }
    //if localStorage is not Null, parse the new text with notesObj
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj= {
        title: addtitle.value,
        text:   addtxt.value
    };
    notesObj.push(myObj);

    //adding notes:notesObj in local Storage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtitle.value = "";
    addtxt.value = "";
    // console.log(notesObj);
    showNotes();
    // deleteNode();
})


function showNotes() {
    let notes = localStorage.getItem("notes");
    //if local storage is null, create an array noteObj
    if (notes == null) {
        notesObj = [];
    }
    //if localStorage is not Null, parse the new text with notesObj
    else {

        notesObj = JSON.parse(notes);
    }

    //Adding a note with all the previous note
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        
        <div class="notecard card my-2 mx-2" style="width: 18rem;background-color:black; border:1px solid rgb(166, 166, 232); box-shadow:1px 1px 10px rgb(166, 166, 232);">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text" style=" border:1px solid rgb(166, 166, 232); border-radius:7px; padding:0.5rem; ">${element.title}</p>
                <p class="card-text" style=" border:1px solid rgb(166, 166, 232); border-radius:7px; padding:0.5rem; ">${element.text}</p>
                <button id="${index}" onclick="deleteNode(this.id)" class="btn" id="addbtn" style="background-color: #black; border:1px solid rgb(166, 166, 232); color:red;">Delete Notes</button>
            </div>
        </div>
        `;
    });
    let notesElm = document.getElementById("notes");
    let titleElm = document.getElementById("titles");
    console.log("number of notes and title:" + notesObj.length);
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a note".`
    }
}

// function to delete a note
function deleteNode(index) {
    console.log("deleting note with index:" + index + 1);

    let notes = localStorage.getItem("notes");
    //if local storage is null, create an array noteObj
    if (notes == null) {
        notesObj = [];
    }
    //if localStorage is not Null, parse the new text with notesObj
    else {

        notesObj = JSON.parse(notes);
    }

    //deleting the note which is having a particular index
    //splice(index,1) deletes element at index position and delete 1 element
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// implementing Search button
let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {
    
    //fetching value of search
    let inputValue = search.value.toLowerCase();
    //fetching all notecards
    let notecards = document.getElementsByClassName('notecard');
    //running loop for all notecards
    Array.from(notecards).forEach(function (element) {

        //saving the text and title of particular note 
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        let cardtitle = element.getElementsByTagName("p")[1].innerText;
        // console.log(element);

        //checking if notecard's title/text includes inputValue
        if (cardtxt.includes(inputValue) || cardtitle.includes(inputValue) ) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })
})