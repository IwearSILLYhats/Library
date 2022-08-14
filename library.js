let myLibrary = [];

function Book(title, author, pages, read) {
this.title = title,
this.author = author,
this.pages = pages,
this.read = read,
this.info = `${title} by ${author}, ${pages} pages, ${read}.`
}

function addBookToLibrary() {

}


const popupForm = document.getElementById('popupForm');
const popup = document.getElementById('popup');
const createButton = document.getElementById('createButton');

window.onclick = function(event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  }

  createButton.onclick = function (){
    popup.style.display = "flex";
  }