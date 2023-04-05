/* eslint-disable max-len */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const { nanoid } = require("nanoid");
const books = require("./books");

// save books
const saveBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  // dibawah untuk mengetes apakah newNote masuk ke dalam array notes
  const ifSuccess = books.filter((book) => book.id === id).length > 0;

  // Bila buku berhasil dimasukkan,
  if (ifSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // jika gagal ditambahkan
  const response = h.response({
    status: "error",
    message: "Buku gagal di tambahkan",
  });
  response.code(500);
  return response;
};

// ============================================================

// tampilkan semua buku

const getAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let ngefilter = books;

  if (name !== undefined) {
    ngefilter = ngefilter.filter((b) =>
      b.name.toLowerCase().include(name.toLowerCase())
    );
  }

  if (reading !== undefined) {
    ngefilter = ngefilter.filter((b) => b.reading === (reading === "1"));
  }

  if (finished !== undefined) {
    ngefilter = ngefilter.filter((b) => b.finished === (finished === "1"));
  }

  const response = h.response({
    status: "success",
    data: {
      books: ngefilter.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// ============================================================

// tampilkan buku dengan id

const bookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

// =============================================================

// edit buku

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// ============================================================

// hapus book

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((i) => i.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  // bila index -1 maka kembalikan dengan respon gagal
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// ============================================================

module.exports = {
  saveBook,
  getAllBookHandler,
  bookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
