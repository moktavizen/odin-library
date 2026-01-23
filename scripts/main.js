const myLibrary = [];

// the constructor...
function Book(title, author, pages, readStatus) {
  if (!new.target) {
    throw Error("Constructors must be called using the `new` keyword");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// take params, create a book then store it in the array
function addBookToLibrary(title, author, pages, readStatus) {
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

addBookToLibrary("The Lord of The Rings", "J.R.R. Tolkien", 1137, "Completed");
addBookToLibrary("Harry Potter", "J.K. Rowling", 3407, "Reading");

const bookList = document.querySelector("#book-list");

function displayCards(bookId, bookTitle, bookAuthor, bookPages, bookReadStatus) {
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

  const statusLabel = document.createElement("div");
  statusLabel.textContent = "Status";

  const statusSelect = document.createElement("select");
  statusSelect.setAttribute("name", "readStatus");
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

  const removeBookBtn = document.createElement("button");
  removeBookBtn.classList.add("remove-book-btn");
  removeBookBtn.id = "remove-book-btn";
  removeBookBtn.setAttribute("data-id", `${bookId}`);
  removeBookBtn.textContent = "Remove";

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
  card.appendChild(removeBookBtn);

  bookList.appendChild(card);
}

function renderLibrary() {
  for (const book of myLibrary) {
    displayCards(book.id, book.title, book.author, book.pages, book.readStatus);
  }
}

renderLibrary();

const newBookDialog = document.querySelector("#new-book-dialog");
const showNewBookBtn = document.querySelector("#new-book-btn");
const confirmNewBookBtn = document.querySelector("#confirm-new-book-btn");

showNewBookBtn.addEventListener("click", () => {
  newBookDialog.showModal();
});

const newBookForm = document.querySelector("#new-book-form");
const formTitleInput = document.querySelector("#form-title-input");
const formAuthorInput = document.querySelector("#form-author-input");
const formPagesInput = document.querySelector("#form-pages-input");
const formStatusSelect = document.querySelector("#form-status-select");

function clearLibrary() {
  bookList.replaceChildren();
}

confirmNewBookBtn.addEventListener("click", (e) => {
  if (newBookForm.checkValidity()) {
    e.preventDefault();

    addBookToLibrary(
      formTitleInput.value,
      formAuthorInput.value,
      Number(formPagesInput.value),
      formStatusSelect.value,
    );

    newBookForm.reset();
    newBookDialog.close();

    clearLibrary();
    renderLibrary();
  }
});

bookList.addEventListener("click", (e) => {
  const target = e.target;

  if (target.id !== "remove-book-btn") {
    return;
  }

  const targetIndex = myLibrary.findIndex((book) => book.id === target.dataset.id);

  myLibrary.splice(targetIndex, 1);

  clearLibrary();
  renderLibrary();
});
