export class Book {
  static lists = [];

  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.listid = `book${Date.now()}`;
  }

  addbook() {
    Book.lists = [...Book.lists, this];
    Book.storebook();
  }

  static storebook() {
    localStorage.setItem('awesomebookslist', JSON.stringify(Book.lists));
  }

  static DeleteBook(event) {
    const parent = event.target.parentElement;
    const id = `${event.target.id}`;
    Book.lists = Book.lists.filter((book) => book.listid !== id);
    Book.storebook();
    if (parent) parent.remove();
  }

  createbutton() {
    const button = document.createElement('input');
    button.type = 'button';
    button.name = 'removebtn';
    button.className = 'button-remove';
    button.value = 'Remove';
    button.id = this.listid;
    button.addEventListener('click', Book.DeleteBook);
    return button;
  }

  createparagraph() {
    const p = document.createElement('p');
    p.className = 'p-title-author';
    p.textContent = `${this.title} by ${this.author}`;
    return p;
  }

  getcontainer() {
    const div = document.createElement('div');
    div.className = 'book-list';
    div.append(this.createparagraph(), this.createbutton());
    return div;
  }
}

const bookform = document.getElementById('form-asm-bookid');
const booklist = document.getElementById('awesomebookslist');
const booknavs = document.querySelectorAll('.nav-link');

function viewtab(event) {
  const id = `awesome${event.target.id}`;
  const prevlink = document.querySelector('a.active');
  const sectionhide = document.querySelector('section.d-flex');
  const sectionview = document.getElementById(id);
  sectionhide.classList.toggle('d-flex');
  sectionhide.classList.toggle('d-none');
  sectionview.classList.toggle('d-flex');
  sectionview.classList.toggle('d-none');
  event.target.classList.toggle('active');
  prevlink.classList.toggle('active');
}
function isbookstored() {
  return localStorage.getItem('awesomebookslist');
}

function addbook(event) {
  const title = event.target.elements.title.value;
  const author = event.target.elements.author.value;
  const book = new Book(title, author);
  book.addbook();
  const data = book.getcontainer();
  booklist.append(data);
  event.preventDefault();
  event.target.reset();
}

function initial() {
  booknavs.forEach((nav) => {
    nav.addEventListener('click', viewtab);
  });

  if (!isbookstored()) {
    return;
  }
  Book.lists = JSON.parse(localStorage.getItem('awesomebookslist'));
  Book.lists.forEach((element) => {
    const book = Object.assign(new Book(), element);
    const data = book.getcontainer();
    booklist.append(data);
  });
}

bookform.addEventListener('submit', addbook);
initial();
