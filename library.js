let myLibrary = [];

function Book(title, author, pages, read) {
this.title = title,
this.author = author,
this.pages = pages,
this.read = read,
this.info = `${title} by ${author}, ${pages} pages, ${read}.`
}


/* Creates a new div with two divs nested inside it with book titles corresponding to each index in the myLibrary array*/
function BookMark (title, read, index){
  let mark = document.createElement('div');
    mark.setAttribute('class', 'bookmark');
    mark.setAttribute('data-index', index)
    if(read == true){mark.classList.add('read');}
      document.querySelector('.list').appendChild(mark);

  let tag = document.createElement('div');
      mark.appendChild(tag);
      tag.textContent = title;
      
  let ribbon = document.createElement('div');
      mark.appendChild(ribbon);

  let buttons = document.createElement('div');
      tag.appendChild(buttons);

  let bookToggle = document.createElement('img');
      bookToggle.setAttribute('src', 'book-open-variant.svg');
      bookToggle.addEventListener('click', function(event){toggleRead(index)});
      buttons.appendChild(bookToggle);

  let bookDelete = document.createElement('img');
      bookDelete.setAttribute('src', 'delete-forever.svg');
      bookDelete.addEventListener('click', function (event){bookRemove(index)});
      buttons.appendChild(bookDelete);


}

function toggleRead (index) {
  myLibrary[index].read = !myLibrary[index].read;
  let toggle = '.bookmark:nth-child' + '(' + (index + 1) + ')';
  let toggle2 = document.querySelector(toggle);
  toggle2.classList.toggle('read');
}
function bookRemove (index){
  myLibrary.splice(index, 1);
  updateNav();
}

/* Clicking the submit button on the form creates a new book object using the input values in the popupform. It then adds that object to the myLibrary array.*/

function addBookToLibrary() {
  let bookInfo = [...document.querySelectorAll('.popupForm input')].map(input => input.value);

  let checkRead = document.getElementById('read').checked;

  let newBook = new Book(bookInfo[0], bookInfo[1], bookInfo[2], checkRead);

  myLibrary.push(newBook);
  updateNav();
}

/* takes the items in the myLibrary array and sorts them alphabetically by book title, then deletes everything in the left navigation bar and finally constructs a new div for each item in the array. The created divs should have the book title, a marker noting whether it has been read, and should change the main content window  */

function updateNav() {
  myLibrary = myLibrary.sort(function (a, b) {
    let x = a.title.toLowerCase(),
        y = b.title.toLowerCase();
    return x == y ? 0 : x > y ? 1 : -1;
  })

  let list = document.querySelector('.list');

  while (list.firstChild){
    list.removeChild(list.firstChild);
  }
  
  myLibrary.forEach( element => BookMark(element.title, element.read, myLibrary.indexOf(element)))

}

function linkBookmarks (){

}


const popupForm = document.querySelector('.popupForm');
const popup = document.querySelector('.popup');
const createButton = document.getElementById('createButton');
const submit = document.querySelector('.popupForm button')

/* Clicking the button greys out the window, creating a popup form with inputs for the book info. Clicking anywhere outside of the form causes the form to disappear */

window.onclick = function(event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  }

  createButton.onclick = function (){
    popup.style.display = "flex";
  }

  submit.onclick = addBookToLibrary;