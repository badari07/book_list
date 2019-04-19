class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};


class UI {

    addBookToList(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;

        list.appendChild(row)
    }

    showAlert(massage, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(massage));
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form')
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();

        }
    }


    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';


    }
};


class Store {

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;

    }
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((cur) => {
            const ui = new UI();
            ui.addBookToList(cur);
        })


    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))

    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((cur, index) => {
            if (cur.isbn === isbn) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }


}

document.addEventListener('DOMContentLoaded', Store.displayBooks)

document.getElementById('book-form').addEventListener('submit', (e) => {
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    const book = new Book(title, author, isbn);

    const ui = new UI();


    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');

    } else {
        ui.addBookToList(book);
        Store.addBook(book);

        ui.showAlert('Book Addede!', 'success')
        ui.clearFields();
    }

    e.preventDefault();
});


document.getElementById('book-list').addEventListener('click', (e) => {
    const ui = new UI();

    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book removed!', 'success');
})

// if(isbn==='isbn'){
//     ui.showAlert('isbn nunber should be unique.try another number')
// }