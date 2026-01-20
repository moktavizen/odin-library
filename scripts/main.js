const myLibrary = [];

// the constructor...
function Book(author, title, pages, readStatus) {
  if (!new.target) {
    throw Error("Constructors must be called using the `new` keyword");
  }
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.readStatus = readStatus;
}

// take params, create a book then store it in the array
function addBookToLibrary(author, title, pages, readStatus) {
  const newBook = new Book(author, title, pages, readStatus);
  myLibrary.push(newBook);
}

addBookToLibrary("J.R.R. Tolkien", "The Lord of The Rings", 1137, "Completed");
addBookToLibrary("J.K. Rowling", "Harry Potter", 3407, "Completed");
