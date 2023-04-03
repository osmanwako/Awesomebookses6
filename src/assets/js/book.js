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
