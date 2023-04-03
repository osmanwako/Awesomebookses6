import { DateTime } from 'luxon';
import Book from './assets/js/book.js';
import {
  bookform,
  booklist,
  booknavs,
  booktimenow,
} from './assets/js/elements.js';
import viewtab from './assets/js/operation.js';

const addbook = (event) => {
  const title = event.target.elements.title.value;
  const author = event.target.elements.author.value;
  const book = new Book(title, author);
  book.addbook();
  const data = book.getcontainer();
  booklist.append(data);
  event.preventDefault();
  event.target.reset();
};

const isbookstored = () => {
  return localStorage.getItem('awesomebookslist');
};

const loadbook = () => {
  if (isbookstored()) {
    Book.lists = JSON.parse(localStorage.getItem('awesomebookslist'));
    Book.lists.forEach((element) => {
      const book = Object.assign(new Book(), element);
      const data = book.getcontainer();
      booklist.append(data);
    });
  }
};

const gettimenow = () => {
  const date = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
  booktimenow.textContent = date;
};

const start = () => {
  booknavs.forEach((nav) => {
    nav.addEventListener('click', viewtab);
  });
  gettimenow();
  bookform.addEventListener('submit', addbook);
  loadbook();
};

start();
