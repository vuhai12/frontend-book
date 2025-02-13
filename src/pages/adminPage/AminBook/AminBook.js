import React, { useEffect, useState } from "react";
import Popup from "../../../components/Popup/Popup";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createBook,
  deleteBook,
  fetchListBooks,
  updateBook,
} from "../../../redux/slides/bookSlice";
import Pagination from "../../../components/Pagination/Pagination";
import Search from "../../../components/Search/Search";
import { containsWord, truncateText } from "../../../ultils/commonUltils";

const defaultBookFields = [
  {
    id: 1,
    label: "image",
    inputType: "input",
    name: "image",
    value: "",
    file: "",
    required: true,
    type: "file",
    error: "",
  },
  {
    id: 2,
    label: "category_code",
    type: "select",
    name: "category_code",
    code: "",
    value: "",
    items: [],
    required: true,
    error: "",
  },
  {
    id: 3,
    label: "available",
    inputType: "input",
    name: "available",
    value: "",
    required: true,
    type: "number",
    error: "",
  },
  {
    id: 4,
    label: "title",
    inputType: "input",
    name: "title",
    value: "",
    required: true,
    type: "text",
    error: "",
  },
  {
    id: 5,
    label: "price",
    inputType: "input",
    name: "price",
    value: "",
    required: true,
    type: "number",
    error: "",
  },
  {
    id: 6,
    label: "description",
    inputType: "input",
    name: "description",
    value: "",
    required: true,
    type: "text",
    error: "",
  },
];

const fileds = [
  {
    sort: "title",
    sort_by: "DESC",
  },
  {
    sort: "available",
    sort_by: "DESC",
  },
  {
    sort: "category_code",
    sort_by: "DESC",
  },
  {
    sort: "price",
    sort_by: "DESC",
  },
  {
    sort: "description",
    sort_by: "DESC",
  },
];

const AminBook = () => {
  const [isShowAddModel, setIsShowAddModel] = useState(false);
  const listCategory = useSelector((state) => state.user.listCategory);
  const listBook = useSelector((state) => state.book.listBook);
  const totalBooks = useSelector((state) => state.book.totalBooks);
  const [seclectedId, setSelectedId] = useState("");
  const [isShowEditModel, setIsShowEditModel] = useState(false);
  const [popupBookFields, setPopupBookFields] = useState(
    defaultBookFields.map((field) => ({ ...field }))
  );
  const [optionsFieldSort, setOptionsFieldSort] = useState(fileds);
  const [pageCurent, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const limitListBook = 5;
  const isLoadingEditBook = useSelector(
    (state) => state.book.isLoadingEditBook
  );
  const isLoadingAddBook = useSelector((state) => state.book.isLoadingAddBook);

  const dispatch = useDispatch();
  const openAdd = () => {
    setIsShowAddModel(true);
  };

  useEffect(() => {
    dispatch(fetchListBooks({ limitListBook, pageCurent, searchString }));
  }, [pageCurent]);

  const handleCancel = () => {
    setIsShowEditModel(false);
    setIsShowAddModel(false);
    setPopupBookFields(defaultBookFields.map((item) => ({ ...item })));
  };

  const handleStartEdittingPostBook = (book) => {
    setSelectedId(book.id.toString());
    setIsShowEditModel(true);
    setPopupBookFields([
      {
        id: 1,
        label: "image",
        inputType: "input",
        name: "image",
        value: book.image,
        required: true,
        type: "file",
        error: "",
      },
      {
        id: 2,
        label: "category_code",
        type: "select",
        name: "category_code",
        value: book.categoryData?.code,
        type: "select",
        required: true,
        error: "",
      },
      {
        id: 3,
        label: "available",
        inputType: "input",
        name: "available",
        value: book.available,
        required: true,
        type: "number",
        error: "",
      },
      {
        id: 4,
        label: "title",
        inputType: "input",
        name: "title",
        value: book.title,
        required: true,
        type: "text",
        error: "",
      },
      {
        id: 5,
        label: "price",
        inputType: "input",
        name: "price",
        value: book.price,
        required: true,
        type: "number",
        error: "",
      },
      {
        id: 6,
        label: "description",
        inputType: "input",
        name: "description",
        value: book.description,
        required: true,
        type: "text",
        error: "",
      },
    ]);
  };

  const validateForm = () => {
    let count = 0;
    popupBookFields.map((item, idx) => {
      if (!item.value.toString().trim()) {
        item.error = `missing ${item.name}`;
        count++;
      }
    });
    setPopupBookFields([...popupBookFields]);
    return count;
  };

  const handleDeleteBook = async (bid) => {
    dispatch(deleteBook(bid)).then((result) => {
      if (result.payload.error == 0) {
        Swal.fire({
          title: "Thông báo!",
          text: result.payload.message,
          icon: "success",
          confirmButtonText: "Đóng",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(
              fetchListBooks({
                limitListBook,
                pageCurent,
                searchString,
              })
            ).then(() => {
              setPopupBookFields(
                defaultBookFields.map((item) => ({ ...item }))
              );
              setIsShowEditModel(false);
            });
          }
        });
      }
      if (result.payload.error == 1) {
        Swal.fire({
          title: "Thông báo!",
          text: result.payload.message,
          icon: "error",
          confirmButtonText: "Đóng",
        });
      }
    });
  };

  const handleAdd = () => {
    if (!validateForm()) {
      const formData = new FormData();
      formData.append("image", popupBookFields[0].file);
      formData.append("category_code", popupBookFields[1].value);
      formData.append("available", popupBookFields[2].value);
      formData.append("title", popupBookFields[3].value);
      formData.append("price", popupBookFields[4].value);
      formData.append("description", popupBookFields[5].value);

      dispatch(createBook(formData)).then((result) => {
        if (result.payload.error == 0) {
          Swal.fire({
            title: "Thông báo!",
            text: result.payload.message,
            icon: "success",
            confirmButtonText: "Đóng",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(
                fetchListBooks({
                  limitListBook,
                  pageCurent,
                  searchString,
                })
              ).then(() => {
                setPopupBookFields(
                  defaultBookFields.map((item) => ({ ...item }))
                );
                setIsShowAddModel(false);
              });
            }
          });
        }
        if (result.payload.error == 1) {
          defaultBookFields.map((item) => {
            if (containsWord(result.payload.message, item.name)) {
              item.error = result.payload.message;
            }
          });
        }
      });
    }
  };

  const handleSort = (field) => {
    const selected = optionsFieldSort.find((item) => item.sort == field);
    if (selected.sort_by == "DESC") {
      selected.sort_by = "ASC";
    } else {
      selected.sort_by = "DESC";
    }
    setOptionsFieldSort([...optionsFieldSort]);
    dispatch(
      fetchListBooks({
        limitListBook,
        pageCurent,
        field: selected.sort,
        sort: selected.sort_by,
      })
    );
  };

  const handleEdit = () => {
    if (!validateForm()) {
      const formData = new FormData();
      formData.append("bid", seclectedId);
      if (popupBookFields[0].file) {
        formData.append("image", popupBookFields[0].file);
      }
      formData.append("category_code", popupBookFields[1].value);
      formData.append("available", popupBookFields[2].value);
      formData.append("title", popupBookFields[3].value);
      formData.append("price", popupBookFields[4].value);
      formData.append("description", popupBookFields[5].value);

      dispatch(updateBook(formData)).then((result) => {
        if (result.payload.error == 0) {
          Swal.fire({
            title: "Thông báo!",
            text: result.payload.message,
            icon: "success",
            confirmButtonText: "Đóng",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(
                fetchListBooks({
                  limitListBook,
                  pageCurent,
                  searchString,
                })
              ).then(() => {
                setPopupBookFields(
                  defaultBookFields.map((item) => ({ ...item }))
                );
                setIsShowEditModel(false);
              });
            }
          });
        }
        if (result.payload.error == 1) {
          Swal.fire({
            title: "Thông báo!",
            text: result.payload.message,
            icon: "success",
            confirmButtonText: "Đóng",
          });
        }
        if (result.payload.error == 2) {
          Swal.fire({
            title: "Thông báo!",
            text: result.payload.message,
            icon: "success",
            confirmButtonText: "Đóng",
          });
        }
      });
    }
  };

  const handleSearch = (searchString) => {
    dispatch(fetchListBooks({ limitListBook, pageCurent, searchString }));
  };
  return (
    <>
      <div className="p-5 bg-gray-50 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={openAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
          >
            Add Book
          </button>
          <Search onKeySearch={handleSearch} />
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200">
                  <span>No</span>
                </th>
                <th className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200">
                  Book
                </th>
                <th
                  onClick={() => handleSort("title")}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200"
                >
                  <div className="flex justify-between">
                    <span>Title</span>
                    {optionsFieldSort[0].sort_by == "DESC" ? (
                      <FaSortDown />
                    ) : (
                      <FaSortUp />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200"
                  onClick={() => handleSort("available")}
                >
                  <div className="flex justify-between">
                    <span>Available</span>
                    {optionsFieldSort[1].sort_by == "DESC" ? (
                      <FaSortDown />
                    ) : (
                      <FaSortUp />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200"
                  onClick={() => handleSort("category_code")}
                >
                  <div className="flex justify-between">
                    <span>Category</span>
                    {optionsFieldSort[2].sort_by == "DESC" ? (
                      <FaSortDown />
                    ) : (
                      <FaSortUp />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200"
                  onClick={() => handleSort("price")}
                >
                  <div className="flex justify-between">
                    <span>Price</span>
                    {optionsFieldSort[3].sort_by == "DESC" ? (
                      <FaSortDown />
                    ) : (
                      <FaSortUp />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200"
                  onClick={() => handleSort("description")}
                >
                  <div className="flex justify-between">
                    <span>Description</span>
                    {optionsFieldSort[4].sort_by == "DESC" ? (
                      <FaSortDown />
                    ) : (
                      <FaSortUp />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200"
                  colSpan={3}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {listBook &&
                listBook?.length > 0 &&
                listBook?.map((item, idx) => {
                  return (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        <img
                          style={{ width: "50px", height: "50px" }}
                          src={item.image}
                        ></img>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {item.title}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {item.available}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {item.categoryData?.value}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {item.price.toLocaleString()} VND
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {truncateText(item.description, 50)}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        <button
                          onClick={() => handleStartEdittingPostBook(item)}
                          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                        >
                          EDIT
                        </button>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 ml-2"
                          onClick={() => handleDeleteBook(item.id)}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {isShowAddModel && (
          <Popup
            isShow={isShowAddModel}
            options={popupBookFields}
            onAction={handleAdd}
            onCancel={handleCancel}
            actionText={"Save"}
            subActionText={"Close"}
            listCategory={listCategory}
            title="Add New Book"
            isLoading={isLoadingAddBook}
          />
        )}
        {isShowEditModel && (
          <Popup
            isShow={isShowEditModel}
            options={popupBookFields}
            onAction={handleEdit}
            onCancel={handleCancel}
            actionText={"Save"}
            subActionText={"Close"}
            listCategory={listCategory}
            title="Edit Book"
            isLoading={isLoadingEditBook}
          />
        )}
      </div>
      <Pagination
        totalPosts={totalBooks}
        postsPerPage={limitListBook}
        setCurrentPage={setCurrentPage}
        currentPage={pageCurent}
      />
    </>
  );
};

export default AminBook;
