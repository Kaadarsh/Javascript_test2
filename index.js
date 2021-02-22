// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>


    `;

    list.appendChild(row);
  }
        //<td><a href="#" class="btn btn-success btn-sm success">Edit</a></td>

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static updateData(el2){

    if(el2.classList.contains('success')){

          var currentTitle = localStorage.getItem('title');
          var currentAuthor = localStorage.getItem('author');
          var currentIsbn = localStorage.getItem('isbn');

          //document.getElementById("title").value=currentTitle;
          //document.getElementById("author").value=currentAuthor;
          //document.getElementById("isbn").value=currentIsbn;

          localStorage.setItem('title',currentTitle);
          localStorage.setItem('author',currentAuthor);
          localStorage.setItem('isbn',currentIsbn);
        }
  }
  /*static updateData2(el2){
          localStorage.setItem('title',document.getElementById('title').value);
          localStorage.setItem('author',document.getElementById('author').value);
          localStorage.setItem('isbn',document.getElementById('isbn').value);
          updateData(el2);
  }*/

    //localStorage.setItem('bgcolor', document.getElementById('bgcolor').value);
    //localStorage.setItem('title',document.querySelector('title').value);
    //localStorage.setItem('author',document.querySelector('author').value);
    //localStorage.setItem('isbn',document.querySelector('isbn').value);

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if(title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Data Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Data Removed', 'success');
});

document.querySelector('#book-list').addEventListener('click',(e2)=>{
  UI.updateData(e2.target)
  //UI.updateData2(e2.target)

  UI.showAlert('Data Updated', 'success');
});