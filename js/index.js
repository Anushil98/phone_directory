
class Phone {
  constructor(name ,num) {
    this.name = name;
    this.num = num;
  }
}


class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#Phone-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.name}</td>
      <td>${book.num}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">DELETE</a></td>
    `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
  
  static showself()
  {
    
  }
  static Alert(message)
  {
    
    var x=document.getElementById(message);
    x.style.display="block";
    setTimeout(() => x.style.display='none', 1000);
  }

  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#num').value = '';
  }
}

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

  static removeBook(num) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.num === num) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#Num-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('#name').value;
  const num = document.querySelector('#num').value;

  if(name === '' || num === '') {
    UI.Alert("error");
  } else {
    const book = new Phone(name, num);

    UI.addBookToList(book);

    Store.addBook(book);

    UI.Alert('add');

    UI.clearFields();
  }
});

document.querySelector('#Phone-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
  UI.Alert("remove");

  
});