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
addBookToLibrary("J.K. Rowling", "Harry Potter", 3407, "Reading");

const elements = {
  bookList: document.querySelector("#book-list"),
};

function displayCards(bookTitle, bookAuthor, bookPages, bookReadStatus) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = bookTitle;

  const authorLabel = document.createElement("div");
  authorLabel.textContent = "Author";

  const author = document.createElement("div");
  author.textContent = bookAuthor;

  const pagesLabel = document.createElement("div");
  pagesLabel.textContent = "Pages";

  const pages = document.createElement("div");
  pages.textContent = bookPages;

  const statusLabel = document.createElement("label");
  statusLabel.setAttribute("for", "status");
  statusLabel.textContent = "Status";

  const statusSelect = document.createElement("select");
  statusSelect.setAttribute("name", "readStatus");
  statusSelect.setAttribute("id", "status");
  const optReading = document.createElement("option");
  optReading.textContent = "Reading";
  const optCompleted = document.createElement("option");
  optCompleted.textContent = "Completed";
  const optOnHold = document.createElement("option");
  optOnHold.textContent = "On-Hold";
  const optPlanToRead = document.createElement("option");
  optPlanToRead.textContent = "Plan to Read";

  switch (bookReadStatus) {
    case "Reading":
      optReading.setAttribute("selected", "");
      break;
    case "Completed":
      optCompleted.setAttribute("selected", "");
      break;
    case "On-Hold":
      optOnHold.setAttribute("selected", "");
      break;
    case "Plan to Read":
      optPlanToRead.setAttribute("selected", "");
      break;
    default:
      throw Error("Unknown read status!");
  }

  card.appendChild(title);
  card.appendChild(authorLabel);
  card.appendChild(author);
  card.appendChild(pagesLabel);
  card.appendChild(pages);
  card.appendChild(statusLabel);
  card.appendChild(statusSelect);
  statusSelect.appendChild(optReading);
  statusSelect.appendChild(optCompleted);
  statusSelect.appendChild(optOnHold);
  statusSelect.appendChild(optPlanToRead);

  elements.bookList.appendChild(card);
}

for (const book of myLibrary) {
  displayCards(book.title, book.author, book.pages, book.readStatus);
}
