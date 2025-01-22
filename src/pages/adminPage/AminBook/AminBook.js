import React, { useEffect, useState } from "react";
import Popup from "../../../components/Popup/Popup";
import { FaSortDown } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { fetchGetListCategoryToolkit } from "../../../redux/slides/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreatNewBookToolkit,
  fetchDeleteNewBookToolkit,
  fetchGetListBookToolkit,
  fetchUpdateNewBookToolkit,
} from "../../../redux/slides/bookSlice";
import { toast } from "react-toastify";
import Pagination from "../../../components/Pagination/Pagination";

const optionEdit = [
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
    inputType: "select",
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
    type: "text",
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
    type: "text",
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

const optionAdd = [
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
    inputType: "select",
    name: "category_code",
    value: "",
    code: "",
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
    type: "text",
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
    type: "text",
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

const AminBook = () => {
  const [isShowAddModel, setIsShowAddModel] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const listBook = useSelector((state) => state.book.listBook);

  const totalBooks = useSelector((state) => state.book.totalBooks);

  const [seclectedId, setSelectedId] = useState("");

  const [isShowEditModel, setIsShowEditModel] = useState(false);
  const [optionsEditPopup, setOptionEditPopup] = useState(optionEdit);

  const [optionsFieldSort, setOptionsFieldSort] = useState(fileds);

  const [optionsAddPopup, setOptionAddPopup] = useState(optionAdd);
  const [pageCurent, setCurrentPage] = useState(1);

  const [searchString, setSearchString] = useState("");

  const dispatch = useDispatch();
  const openAdd = () => {
    setIsShowAddModel(true);
    dispatch(fetchGetListCategoryToolkit()).then((result) => {
      setListCategory(result.payload);
    });
    optionAdd.map((item) => {
      item.value = "";
      item.error = "";
    });
  };
  const limit = 3;
  useEffect(() => {
    dispatch(fetchGetListBookToolkit({ limit, pageCurent, searchString }));
  }, [pageCurent]);

  const handleCancelEdit = () => {
    setIsShowEditModel(false);
    optionEdit.map((item) => (item.value = ""));
  };

  const validateEdit = () => {
    let count = 0;
    optionsEditPopup.map((item) => {
      if (!item.value.toString().trim()) {
        item.error = `missing ${item.name}`;
        count++;
      }
    });
    return count;
  };

  const handleStartEdittingPostBook = (book) => {
    setSelectedId(book.id.toString());
    setIsShowEditModel(true);
    dispatch(fetchGetListCategoryToolkit()).then((result) => {
      setListCategory(result.payload);
    });
    setOptionEditPopup([
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
        inputType: "select",
        name: "category_code",
        value: book.categoryData.code,
        type: "text",
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
        type: "text",
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
        type: "text",
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

  const validateAdd = () => {
    let count = 0;
    optionsAddPopup.map((item, idx) => {
      if (item.required && !item.value.toString().trim()) {
        item.error = `missing ${item.name}`;
        count++;
      }
    });
    return count;
  };

  const handleDeleteBook = async (id) => {
    let bid = [id];
    // let filename = [filedata]
    dispatch(fetchDeleteNewBookToolkit({ bid })).then((result) => {
      if (result.payload.error == 1) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
        dispatch(fetchGetListBookToolkit({ limit, pageCurent, searchString }));
      }
    });
  };

  const handleAdd = () => {
    if (!validateAdd()) {
      const formData = new FormData();

      formData.append("image", optionsAddPopup[0].file);
      formData.append("category_code", optionsAddPopup[1].value);
      formData.append("available", optionsAddPopup[2].value);
      formData.append("title", optionsAddPopup[3].value);
      formData.append("price", optionsAddPopup[4].value);
      formData.append("description", optionsAddPopup[5].value);

      dispatch(fetchCreatNewBookToolkit(formData)).then((result) => {
        if (result.payload.error == 1) {
          toast.error(result.payload.message, { autoClose: 1500 });
        } else {
          toast.success(result.payload.message, { autoClose: 500 });
          dispatch(
            fetchGetListBookToolkit({ limit, pageCurent, searchString })
          );
          setIsShowAddModel(false);
        }
      });
    }
    setOptionAddPopup([...optionAdd]);
  };

  const handleCancelAdd = () => {
    setIsShowAddModel(false);
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
      fetchGetListBookToolkit({
        limit,
        pageCurent,
        field: selected.sort,
        sort: selected.sort_by,
      })
    );
  };

  const handleEdit = () => {
    if (!validateEdit()) {
      const formData = new FormData();
      formData.append("bid", seclectedId);
      if (optionsEditPopup[0].file) {
        formData.append("image", optionsEditPopup[0].file);
      }
      formData.append("category_code", optionsEditPopup[1].value);
      formData.append("available", optionsEditPopup[2].value);
      formData.append("title", optionsEditPopup[3].value);
      formData.append("price", optionsEditPopup[4].value);
      formData.append("description", optionsEditPopup[5].value);

      dispatch(fetchUpdateNewBookToolkit(formData)).then((result) => {
        if (result.payload.error == 1) {
          toast.error(result.payload.message, { autoClose: 1500 });
        } else {
          toast.success(result.payload.message, { autoClose: 500 });
          dispatch(
            fetchGetListBookToolkit({ limit, pageCurent, searchString })
          );
          setIsShowEditModel(false);
        }
      });
    }
    setOptionEditPopup([...optionsEditPopup]);
  };
  return (
    <>
      <div className="mt-[60px] sm:mt-0 p-[10px]">
        <div>
          <button
            onClick={openAdd}
            className="rounded-[5px]  border-[1px] border-solid border-gray-500 px-[20px] py-[5px] my-[10px] mr-[10px] hover:bg-slate-600 hover:text-gray-50"
          >
            Add
          </button>
        </div>
        <div className="overflow-auto ">
          <table className="w-full">
            <thead>
              <tr>
                <th
                  className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  
                                "
                >
                  <span>No</span>
                </th>
                <th className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  ">
                  Book
                </th>
                <th
                  onClick={() => handleSort("title")}
                  className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  "
                >
                  <span>Title</span>
                  {optionsFieldSort[0].sort_by == "DESC" ? (
                    <FaSortDown />
                  ) : (
                    <FaSortUp />
                  )}
                </th>
                <th
                  className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  "
                  onClick={() => handleSort("available")}
                >
                  <span>Available</span>
                  {optionsFieldSort[1].sort_by == "DESC" ? (
                    <FaSortDown />
                  ) : (
                    <FaSortUp />
                  )}
                </th>
                <th
                  className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  "
                  onClick={() => handleSort("category_code")}
                >
                  <span>Category</span>
                  {optionsFieldSort[2].sort_by == "DESC" ? (
                    <FaSortDown />
                  ) : (
                    <FaSortUp />
                  )}
                </th>
                <th
                  className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  "
                  onClick={() => handleSort("price")}
                >
                  <span>Price</span>
                  {optionsFieldSort[3].sort_by == "DESC" ? (
                    <FaSortDown />
                  ) : (
                    <FaSortUp />
                  )}
                </th>
                <th
                  className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  "
                  onClick={() => handleSort("description")}
                >
                  <span>Description</span>
                  {optionsFieldSort[4].sort_by == "DESC" ? (
                    <FaSortDown />
                  ) : (
                    <FaSortUp />
                  )}
                </th>
                <th
                  className="px-[5px] border-[1px]  border-gray-200 bg-gray-100 text-left text-[12px] font-semibold text-gray-600  "
                  colSpan={3}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {listBook &&
                listBook.length > 0 &&
                listBook.map((item, idx) => {
                  return (
                    <tr key={item.id}>
                      <td className="px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]">
                        {idx + 1}
                      </td>
                      <td className="px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]">
                        <img
                          style={{ width: "50px", height: "50px" }}
                          src={item.image}
                        ></img>
                      </td>
                      <td className="px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]">
                        {item.title}
                      </td>
                      <td className="px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]">
                        {item.available}
                      </td>
                      <td className="px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]">
                        {item.categoryData.value}
                      </td>
                      <td className="px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]">
                        {item.price.toLocaleString()} VND
                      </td>
                      <td className="px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]">
                        {item.description}
                      </td>
                      <td className="px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]">
                        <button
                          onClick={() => handleStartEdittingPostBook(item)}
                          className="bg-gray-700 rounded-[5px] text-white p-[5px]"
                        >
                          EDIT
                        </button>
                      </td>
                      <td className="px-[5px] border-[1px]  border-gray-200 bg-white text-[12px]">
                        <button
                          className="bg-red-700 rounded-[5px] text-white p-[5px]"
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
            options={optionsAddPopup}
            onAction={handleAdd}
            onCancel={handleCancelAdd}
            actionText={"Save"}
            subActionText={"Close"}
            listCategory={listCategory}
          />
        )}
        {isShowEditModel && (
          <Popup
            isShow={isShowEditModel}
            options={optionsEditPopup}
            onAction={handleEdit}
            onCancel={handleCancelEdit}
            actionText={"Save"}
            subActionText={"Close"}
            listCategory={listCategory}
          />
        )}
      </div>
      <Pagination
        totalPosts={totalBooks}
        postsPerPage={limit}
        setCurrentPage={setCurrentPage}
        currentPage={pageCurent}
      />
    </>
  );
};

export default AminBook;
