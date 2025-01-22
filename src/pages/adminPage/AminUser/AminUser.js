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
import { toast } from "react-toastify";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import Pagination from "../../../components/Pagination/Pagination";
import Search from "../../../components/Search/Search";

const roleOptions = [
  { id: 1, code: "R1", value: "Admin" },
  { id: 2, code: "R2", value: "User" },
];

const fieldSortOptions = [
  { sort: "name", sort_by: "DESC" },
  { sort: "email", sort_by: "DESC" },
  { sort: "role_code", sort_by: "DESC" },
];

const initialAddUserOptions = [
  {
    id: 1,
    label: "Avatar",
    inputType: "input",
    name: "Avatar",
    value: "",
    file: "",
    required: true,
    type: "file",
    error: "",
  },
  {
    id: 2,
    label: "Name",
    inputType: "input",
    name: "Name",
    value: "",
    required: true,
    type: "text",
    error: "",
  },
  {
    id: 3,
    label: "Email",
    inputType: "input",
    name: "Email",
    value: "",
    required: true,
    type: "text",
    error: "",
  },
  {
    id: 4,
    label: "Role",
    inputType: "input",
    name: "Role",
    value: "",
    required: true,
    type: "radio",
    error: "",
  },
  {
    id: 5,
    label: "Password",
    inputType: "input",
    name: "Password",
    value: "",
    required: true,
    type: "password",
    error: "",
  },
];

const optionEditUser = [
  {
    id: 1,
    label: "Avatar",
    inputType: "input",
    name: "Avatar",
    value: "",
    file: "",
    required: true,
    type: "file",
    error: "",
  },
  {
    id: 2,
    label: "Name",
    inputType: "input",
    name: "Name",
    value: "",
    required: true,
    type: "text",
    error: "",
  },
  {
    id: 3,
    label: "Email",
    inputType: "input",
    name: "Email",
    value: "",
    required: true,
    type: "text",
    error: "",
  },
  {
    id: 4,
    label: "Role",
    inputType: "input",
    name: "Role",
    value: "",
    required: true,
    type: "radio",
    error: "",
  },
  {
    id: 5,
    label: "Password",
    inputType: "input",
    name: "Password",
    value: "",
    required: false,
    type: "text",
    error: "",
  },
];

const AdminUser = () => {
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.user.listUsers);
  const [isShowAddUser, setIsShowAddUser] = useState(false);
  const [isShowEditUser, setIsShowEditUser] = useState(false);
  const [addUserOptions, setAddUserOptions] = useState(initialAddUserOptions);
  const [fieldSort, setFieldSort] = useState(fieldSortOptions);
  const [currentPage, setCurrentPage] = useState(1);
  const limitListUser = process.env.REACT_APP_LIMIT_LIST_USER || 5;

  useEffect(() => {
    dispatch(fetchGetListUserToolkit({ limitListUser, currentPage }));
  }, [currentPage]);

  const openAddUserPopup = () => {
    setIsShowAddUser(true);
    setAddUserOptions(
      initialAddUserOptions.map((item) => ({ ...item, value: "", error: "" }))
    );
  };

  const validateForm = (options) => {
    return options.filter((item) => item.required && !item.value.trim()).length;
  };

  const handleAddUser = () => {
    if (!validateForm(addUserOptions)) {
      const formData = new FormData();
      if (addUserOptions[0].file)
        formData.append("avatar", addUserOptions[0].file);
      formData.append("name", addUserOptions[1].value);
      formData.append("email", addUserOptions[2].value);
      formData.append("role_code", addUserOptions[3].value);
      formData.append("password", addUserOptions[4].value);

      dispatch(fetchCreatNewUserToolkit(formData)).then((result) => {
        if (result.payload.error === 1) {
          toast.error(result.payload.message);
        } else {
          toast.success(result.payload.message);
          dispatch(fetchGetListUserToolkit({ limitListUser, currentPage }));
          setIsShowAddUser(false);
        }
      });
    }
  };
  const validateEditUser = () => {
    let count = 0;
    optionsEditUserPopup.map((item) => {
      if (!item.value.toString().trim()) {
        item.error = `missing ${item.name}`;
        count++;
      }
    });
    return count;
  };

  const handleDeleteUser = () => {
    dispatch(fetchDeleteNewUserToolkit()).then((result) => {
      if (result.payload.error === 1) {
        toast.error(result.payload.message);
      } else {
        toast.success(result.payload.message);
        dispatch(fetchGetListUserToolkit({ limitListUser, currentPage }));
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
    console.log("selected", selected);
    dispatch(
      fetchGetListUserToolkit({
        limitListUser,
        currentPage,
        field: selected.sort,
        sort: selected.sort_by,
      })
    );
  };
  const [seclectedUserId, setSeclectedUserId] = useState(0);

  const handleSearch = (searchString) => {
    console.log("searchString", searchString);
    dispatch(
      fetchGetListUserToolkit({ limitListUser, currentPage, searchString })
    );
  };
  const handleEdit = () => {
    if (!validateEditUser()) {
      const formData = new FormData();
      if (optionsEditUserPopup[0].file) {
        formData.append("avatar", optionsEditUserPopup[0].file);
      }
      formData.append("name", optionsEditUserPopup[1].value);
      formData.append("email", optionsEditUserPopup[2].value);
      formData.append("role_code", optionsEditUserPopup[3].value);

      dispatch(fetchUpdateNewUserToolkit(formData)).then((result) => {
        if (result.payload.error == 1) {
          toast.error(result.payload.message, { autoClose: 1500 });
        } else {
          toast.success(result.payload.message, { autoClose: 500 });
          dispatch(
            fetchGetListUserToolkit({
              limitListUser,
              currentPage,
              searchString,
            })
          );
          setIsShowEditUser(false);
        }
      });
    }
    setOptionsEditUserPopup([...optionsEditUserPopup]);
  };

  const [optionsEditUserPopup, setOptionsEditUserPopup] =
    useState(optionEditUser);

  const handleOpenEditUser = (user) => {
    setIsShowEditUser(true);
    setSeclectedUserId(user.id);
    setOptionsEditUserPopup([
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
        name: "name",
        value: user.name,
        required: true,
        type: "text",
        error: "",
      },
      {
        id: 3,
        label: "",
        inputType: "input",
        name: "email",
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
        name: "Password",
        value: "",
        required: false,
        type: "text",
        error: "",
      },
    ]);
  };

  const handleCancelEdit = () => {
    setIsShowEditUser(false);
  };

  console.log("listUsers", listUsers);

  return (
    <div className=" p-5 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
          onClick={openAddUserPopup}
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
                Name{" "}
                {fieldSort[0].sort_by === "DESC" ? (
                  <FaSortDown />
                ) : (
                  <FaSortUp />
                )}
              </th>
              <th
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email{" "}
                {fieldSort[1].sort_by === "DESC" ? (
                  <FaSortDown />
                ) : (
                  <FaSortUp />
                )}
              </th>
              <th
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b border-gray-200 cursor-pointer"
                onClick={() => handleSort("role_code")}
              >
                Role{" "}
                {fieldSort[2].sort_by === "DESC" ? (
                  <FaSortDown />
                ) : (
                  <FaSortUp />
                )}
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
                  <button
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                    onClick={() => handleOpenEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 ml-2"
                    onClick={() => handleDeleteUser()}
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
      {isShowAddUser && (
        <Popup
          isShow={isShowAddUser}
          options={addUserOptions}
          onAction={handleAddUser}
          onCancel={() => setIsShowAddUser(false)}
          actionText="Save"
          subActionText="Close"
          role={roleOptions}
          title="Add New User"
        />
      )}
      {isShowEditUser && (
        <Popup
          isShow={isShowEditUser}
          options={optionsEditUserPopup}
          onAction={handleEdit}
          onCancel={handleCancelEdit}
          actionText={"Save"}
          subActionText={"Close"}
          role={roleOptions}
          title="Edit User"
        />
      )}
    </div>
  );
};

export default AdminUser;
