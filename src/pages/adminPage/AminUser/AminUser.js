import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../../components/Popup/Popup";
import ImageDefault from "../../../assets/image_default.png";
import {
  fetchDeleteNewUserToolkit,
  fetchGetListUserToolkit,
  fetchUpdateNewUserToolkit,
  fetchCreatNewUserToolkit,
} from "../../../redux/slides/userSlice";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import Pagination from "../../../components/Pagination/Pagination";
import Search from "../../../components/Search/Search";

const roleOptions = [
  { id: 1, value: "R1", name: "Admin" },
  { id: 2, value: "R2", name: "User" },
];

const fieldSortOptions = [
  { sort: "name", sort_by: "DESC" },
  { sort: "email", sort_by: "DESC" },
  { sort: "role_code", sort_by: "DESC" },
];

const defaultUserFields = [
  {
    id: 1,
    label: "Avatar",
    inputType: "input",
    name: "Avatar",
    value: "",
    file: "",
    required: false,
    type: "file",
    error: "",
  },
  {
    id: 2,
    label: "Name",
    inputType: "input",
    name: "Name1",
    value: "",
    required: true,
    type: "text",
    error: "",
  },
  {
    id: 3,
    label: "Email",
    inputType: "input",
    name: "Email1",
    value: "",
    required: true,
    type: "email",
    error: "",
  },
  {
    id: 4,
    label: "Role",
    inputType: "input",
    name: "Role",
    value: "R2",
    required: true,
    type: "radio",
    error: "",
  },
  {
    id: 5,
    label: "Password",
    inputType: "input",
    name: "Password1",
    value: "",
    required: true,
    type: "password",
    error: "",
  },
  {
    id: 6,
    label: "Address",
    inputType: "input",
    name: "Address",
    value: "",
    required: false,
    type: "text",
    error: "",
  },
];

const AdminUser = () => {
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.user.listUsers);
  const [isShowPopupAddUser, setIsShowPopupAddUser] = useState(false);
  const [isShowPopupEditUser, setIsShowPopupEditUser] = useState(false);
  const [fieldSort, setFieldSort] = useState(fieldSortOptions);
  const [currentPage, setCurrentPage] = useState(1);
  const limitListUser = process.env.REACT_APP_LIMIT_LIST_USER || 5;
  const [optionsPopup, setOptionsPopup] = useState(defaultUserFields);
  const [seclectedUserId, setSeclectedUserId] = useState(null);
  const isLoadingAddUser = useSelector((state) => state.user.isLoadingAddUser);
  const isLoadingEditUser = useSelector(
    (state) => state.user.isLoadingEditUser
  );

  useEffect(() => {
    dispatch(fetchGetListUserToolkit({ limitListUser, currentPage }));
  }, [currentPage]);

  const handleStartOpenPopupAddUser = () => {
    setIsShowPopupAddUser(true);
  };

  const validateForm = (options) => {
    return options.filter((item) => {
      if (!item.value?.trim()) {
        item.error = `Missing ${item.name}`;
        setOptionsPopup([...optionsPopup]);
      }
      return !item.value?.trim();
    }).length;
  };

  const handleAddUser = () => {
    const filteredOptions = optionsPopup.filter(
      (item) => item.type !== "file" && item.type !== "radio"
    );
    if (!validateForm(filteredOptions)) {
      const formData = new FormData();
      if (optionsPopup[0].file) {
        formData.append("avatar", optionsPopup[0].file);
      }
      formData.append("name", optionsPopup[1].value);
      formData.append("email", optionsPopup[2].value);
      formData.append("role_code", optionsPopup[3].value);
      formData.append("password", optionsPopup[4].value);
      formData.append("address", optionsPopup[5].value);
      dispatch(fetchCreatNewUserToolkit(formData)).then((result) => {
        if (result.payload.error == 0) {
          Swal.fire({
            title: "Thông báo!",
            text: result.payload.message,
            icon: "success",
            confirmButtonText: "Đóng",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(
                fetchGetListUserToolkit({ limitListUser, currentPage })
              ).then(() => {
                setIsShowPopupAddUser(false);
                setOptionsPopup(defaultUserFields.map((item) => ({ ...item })));
              });
            }
          });
        }
        if (result.payload.error === 1) {
          optionsPopup.map((item) => {
            if (containsWord(result.payload.message, item.name)) {
              item.error = result.payload.message;
              setOptionsPopup([...optionsPopup]);
            }
          });
        }
        if (result.payload.error === 2) {
          Swal.fire({
            title: "Thông báo!",
            text: result.payload.message,
            icon: "error",
            confirmButtonText: "Đóng",
          });
        }
      });
    }
  };

  const handleDeleteUser = (user) => {
    dispatch(fetchDeleteNewUserToolkit(user.id)).then((result) => {
      if (result.payload.error === 1) {
        Swal.fire({
          title: "Thông báo!",
          text: result.payload.message,
          icon: "error",
          confirmButtonText: "Đóng",
        });
      } else {
        Swal.fire({
          title: "Thông báo!",
          text: result.payload.message,
          icon: "success",
          confirmButtonText: "Đóng",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(fetchGetListUserToolkit({ limitListUser, currentPage }));
          }
        });
      }
    });
  };

  const handleSort = (field) => {
    const updatedFieldSort = fieldSort.map((item) =>
      item.sort === field
        ? { ...item, sort_by: item.sort_by === "DESC" ? "ASC" : "DESC" }
        : item
    );
    setFieldSort(updatedFieldSort);
    const selected = updatedFieldSort.find((item) => item.sort === field);
    dispatch(
      fetchGetListUserToolkit({
        limitListUser,
        currentPage,
        field: selected.sort,
        sort: selected.sort_by,
      })
    );
  };

  const handleSearch = (searchString) => {
    dispatch(
      fetchGetListUserToolkit({ limitListUser, currentPage, searchString })
    );
  };

  const containsWord = (str, word) => {
    const regex = new RegExp(`\\b${word}\\b`, "i"); // 'i' để không phân biệt hoa thường
    return regex.test(str);
  };

  const handleEditUser = () => {
    const filteredOptions = optionsPopup.filter(
      (item) =>
        item.type !== "password" &&
        item.type !== "file" &&
        item.type !== "radio"
    );
    if (!validateForm(filteredOptions)) {
      const formData = new FormData();
      if (optionsPopup[0].file) {
        formData.append("avatar", optionsPopup[0].file);
      }
      if (optionsPopup[4].value) {
        formData.append("password", optionsPopup[4].value);
      }
      formData.append("name", optionsPopup[1].value);
      formData.append("email", optionsPopup[2].value);
      formData.append("role_code", optionsPopup[3].value);
      formData.append("address", optionsPopup[5].value);
      if (seclectedUserId) {
        formData.append("id", seclectedUserId);
      }

      dispatch(fetchUpdateNewUserToolkit(formData)).then((result) => {
        if (result.payload.error == 2) {
          Swal.fire({
            title: "Thông báo!",
            text: result.payload.message,
            icon: "error",
            confirmButtonText: "Đóng",
          });
        }
        if (result.payload.error == 0) {
          Swal.fire({
            title: "Thông báo!",
            text: result.payload.message,
            icon: "success",
            confirmButtonText: "Đóng",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(
                fetchGetListUserToolkit({
                  limitListUser,
                  currentPage,
                })
              ).then(() => {
                setIsShowPopupEditUser(false);
                setOptionsPopup(defaultUserFields.map((item) => ({ ...item })));
              });
            }
          });
        }
        if (result.payload.error == 1) {
          optionsPopup.map((item) => {
            if (containsWord(result.payload.message, item.name)) {
              item.error = result.payload.message;
              setOptionsPopup([...optionsPopup]);
            }
          });
        }
      });
    }
  };

  const handleStartOpenPopupEditUser = (user) => {
    setIsShowPopupEditUser(true);
    setSeclectedUserId(user.id);
    setOptionsPopup([
      {
        id: 1,
        label: "",
        inputType: "input",
        name: "avatar",
        value: user.avatar,
        required: true,
        type: "file",
        error: "",
      },
      {
        id: 2,
        label: "",
        inputType: "input",
        name: "name1",
        value: user.name,
        required: true,
        type: "text",
        error: "",
      },
      {
        id: 3,
        label: "",
        inputType: "input",
        name: "email1",
        value: user.email,
        required: true,
        type: "text",
        error: "",
      },
      {
        id: 4,
        label: "",
        inputType: "input",
        name: "role",
        value: user.role_code,
        required: true,
        type: "radio",
        error: "",
      },
      {
        id: 5,
        label: "Password",
        inputType: "input",
        name: "Password1",
        value: "",
        required: false,
        type: "password",
        error: "",
      },
      {
        id: 6,
        label: "Address",
        inputType: "input",
        name: "Address",
        value: user.address,
        required: false,
        type: "text",
        error: "",
      },
    ]);
  };

  const handleCancelPopup = () => {
    setIsShowPopupAddUser(false);
    setIsShowPopupEditUser(false);
    setOptionsPopup(defaultUserFields.map((item) => ({ ...item })));
  };

  return (
    <div className=" p-5 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
          onClick={handleStartOpenPopupAddUser}
        >
          Add User
        </button>

        <Search onKeySearch={handleSearch} />
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200">
                No
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200">
                Avatar
              </th>
              <th
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex justify-between">
                  <span>Name</span>
                  {fieldSort[0].sort_by === "DESC" ? (
                    <FaSortDown />
                  ) : (
                    <FaSortUp />
                  )}
                </div>
              </th>
              <th
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex justify-between">
                  <span>Email</span>
                  {fieldSort[1].sort_by === "DESC" ? (
                    <FaSortDown />
                  ) : (
                    <FaSortUp />
                  )}
                </div>
              </th>
              <th
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("role_code")}
              >
                <div className="flex justify-between">
                  <span>Role</span>
                  {fieldSort[2].sort_by === "DESC" ? (
                    <FaSortDown />
                  ) : (
                    <FaSortUp />
                  )}
                </div>
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200">
                Address
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {listUsers.map((user, index) => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={user.avatar || ImageDefault}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">{user.name}</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {user.role_code}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {user.address}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 text-center">
                  <button
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                    onClick={() => handleStartOpenPopupEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 ml-2"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPosts={listUsers.length}
        postsPerPage={limitListUser}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      {isShowPopupAddUser && (
        <Popup
          isShow={isShowPopupAddUser}
          options={optionsPopup}
          onAction={handleAddUser}
          onCancel={handleCancelPopup}
          actionText="Save"
          subActionText="Close"
          role={roleOptions}
          title="Add New User"
          isLoading={isLoadingAddUser}
        />
      )}
      {isShowPopupEditUser && (
        <Popup
          isShow={isShowPopupEditUser}
          options={optionsPopup}
          onAction={handleEditUser}
          onCancel={handleCancelPopup}
          actionText={"Save"}
          subActionText={"Close"}
          role={roleOptions}
          title="Edit User"
          isLoading={isLoadingEditUser}
        />
      )}
    </div>
  );
};

export default AdminUser;
