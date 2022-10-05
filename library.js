let myLibrary = [];

/* function Book(title, author, pages, read) {
this.title = title,
this.author = author,
this.pages = pages,
this.read = read
} */
class Book{
  constructor(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
  }
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
    let tagText = document.createElement('p');
        tagText.addEventListener('click', function (event){openBook(index)});
      tag.appendChild(tagText);
      tagText.textContent = title;
      
  let ribbon = document.createElement('div');
      mark.appendChild(ribbon);

  let buttons = document.createElement('div');
      tag.appendChild(buttons);

  let bookToggle = document.createElement('img');
      bookToggle.setAttribute('src', 'book-open-variant.svg');
      bookToggle.setAttribute('title', 'Toggle read status');
      bookToggle.addEventListener('click', function(event){toggleRead(index)});
      buttons.appendChild(bookToggle);

  let bookDelete = document.createElement('img');
      bookDelete.setAttribute('src', 'delete-forever.svg');
      bookDelete.setAttribute('title', 'Remove book from list');
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
  let formInfo = [...document.querySelectorAll('.popupForm input')];
  let bookInfo = formInfo.map(input => input.value);

  let checkRead = document.getElementById('read').checked;

  if(bookInfo[0] && bookInfo[1] && bookInfo[2]){
  let newBook = new Book(bookInfo[0], bookInfo[1], bookInfo[2], checkRead);

  myLibrary.push(newBook);
  updateNav();
  }
  formInfo[0].value = '';
  formInfo[1].value = '';
  formInfo[2].value = '';
  formInfo[3].checked = false;

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

// Click book title in bookmark to populate main content of page with book info.
function openBook (index){


  let arrayIndex = myLibrary[index];
  let content = document.querySelector('.content');

      while (content.firstChild){
       content.removeChild(content.firstChild);
      }

  let title = document.createElement('h1');
      title.textContent = arrayIndex.title;
      content.appendChild(title);

  let author = document.createElement('h3');
      author.textContent = arrayIndex.author;
      content.appendChild(author);

  let read = arrayIndex.read ? 'I have totally read this' : 'I have not read this, yet';

  let info = document.createElement('h5');
      info.textContent = `${title.textContent} by ${author.textContent}, ${arrayIndex.pages} pages, and ${read}.`;
      content.appendChild(info);

  let summary = document.createElement('p');
      summary.textContent = 'Just pretend this is the summary of your favorite book, pulling this info from wikipedia is currently beyond the scope of my abilities, but I shall return. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
      content.appendChild(summary);

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
  popupForm.onsubmit = function(e) { e.preventDefault();};