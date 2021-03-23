class Book {
  name: string;
  author: string;

  constructor(name: string, author: string) {
    this.name = name;
    this.author = author;
  }

  show() {
    console.log(this);
  }
}

const book = new Book('Hello', 'cybsa');
book.show();
