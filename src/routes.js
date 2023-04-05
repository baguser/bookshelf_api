/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */

const {
  saveBook,
  getAllBookHandler,
  bookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require("./handler.");

/* eslint-disable quotes */
const routes = [
  // to save the books
  {
    method: "POST",
    path: "/books",
    handler: saveBook,
  },
  // showing books
  {
    method: "GET",
    path: "/books",
    handler: getAllBookHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: bookByIdHandler,
  },
  // to edit the books
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookByIdHandler,
  },
  // to delete the books
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
