const myLibrary = [];

// the constructor...
class Book {
  #id = crypto.randomUUID();
  #title;
  #author;
  #pages;
  #readStatus;

  constructor(title, author, pages, readStatus) {
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#readStatus = readStatus;
  }

  get id() {
    return this.#id;
  }
  get title() {
    return this.#title;
  }
  get author() {
    return this.#author;
  }
  get pages() {
    return this.#pages;
  }
  get readStatus() {
    return this.#readStatus;
  }
  set readStatus(newReadStatus) {
    this.#readStatus = newReadStatus;
  }
}

// take params, create a book then store it in the array
function addBookToLibrary(title, author, pages, readStatus) {
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

const bookList = document.querySelector("#book-list");

function displayBookCard({ id, title, author, pages, readStatus }) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title");
  titleDiv.textContent = title;

  const authorLabelDiv = document.createElement("div");
  authorLabelDiv.textContent = "Author";

  const authorDiv = document.createElement("div");
  authorDiv.textContent = author;

  const pagesLabelDiv = document.createElement("div");
  pagesLabelDiv.textContent = "Pages";

  const pagesDiv = document.createElement("div");
  pagesDiv.textContent = pages;

  const statusLabelDiv = document.createElement("div");
  statusLabelDiv.textContent = "Status";

  const statusSelect = document.createElement("select");
  statusSelect.classList.add("status-select");
  statusSelect.setAttribute("name", "readStatus");
  statusSelect.setAttribute("data-id", `${id}`);
  const readingOption = document.createElement("option");
  readingOption.textContent = "Reading";
  const completedOption = document.createElement("option");
  completedOption.textContent = "Completed";
  const onHoldOption = document.createElement("option");
  onHoldOption.textContent = "On-Hold";
  const planToReadOption = document.createElement("option");
  planToReadOption.textContent = "Plan to Read";

  switch (readStatus) {
    case "Reading":
      readingOption.setAttribute("selected", "");
      break;
    case "Completed":
      completedOption.setAttribute("selected", "");
      break;
    case "On-Hold":
      onHoldOption.setAttribute("selected", "");
      break;
    case "Plan to Read":
      planToReadOption.setAttribute("selected", "");
      break;
    default:
      throw Error("Unknown read status!");
  }

  const removeBookBtn = document.createElement("button");
  removeBookBtn.classList.add("remove-book-btn");
  removeBookBtn.setAttribute("data-id", `${id}`);
  removeBookBtn.textContent = "Remove";

  cardDiv.appendChild(titleDiv);
  cardDiv.appendChild(authorLabelDiv);
  cardDiv.appendChild(authorDiv);
  cardDiv.appendChild(pagesLabelDiv);
  cardDiv.appendChild(pagesDiv);
  cardDiv.appendChild(statusLabelDiv);
  cardDiv.appendChild(statusSelect);
  statusSelect.appendChild(readingOption);
  statusSelect.appendChild(completedOption);
  statusSelect.appendChild(onHoldOption);
  statusSelect.appendChild(planToReadOption);
  cardDiv.appendChild(removeBookBtn);

  bookList.appendChild(cardDiv);
}

function renderLibrary() {
  if (!myLibrary.length) {
    bookList.classList.add("empty");
    bookList.innerHTML =
      "There are no books ☹️<br />Add new book using button at the top right corner!";
    return;
  }
  bookList.classList.remove("empty");

  for (const book of myLibrary) {
    displayBookCard(book);
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
  const targetIndex = myLibrary.findIndex((book) => book.id === target.dataset.id);
  switch (target.className) {
    case "status-select":
      myLibrary[targetIndex].readStatus = target.value;
      break;
    case "remove-book-btn":
      myLibrary.splice(targetIndex, 1);
      clearLibrary();
      renderLibrary();
      break;
  }
});
