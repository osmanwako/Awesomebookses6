import { Book } from './assets/js/book';
import { bookform, booklist, booknavs, booknow } from './assets/js/elements';
import { viewtab } from './assets/js/operation';
import { DateTime } from 'luxon';

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

let isbookstored = () => {
  return localStorage.getItem('awesomebookslist');
};

let loadbook = () => {
  if (!isbookstored()) {
    return;
  }
  Book.lists = JSON.parse(localStorage.getItem('awesomebookslist'));
  Book.lists.forEach((element) => {
    const book = Object.assign(new Book(), element);
    const data = book.getcontainer();
    booklist.append(data);
  });
};

let gettimenow = () => {
  const date = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
  booknow.textContent = date;
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
