import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchGetUserByIdToolkit,
  fetchUpdateNewUserToolkit,
} from "../../../redux/slides/userSlice";
import { toast } from "react-toastify";
import ImageDefault from "../../../assets/image_default.png";

const UserInfo = () => {
  const dispatch = useDispatch();
  const userDataUpdate = [
    {
      id: 1,
      inputType: "input",
      label: "Ảnh đại diện",
      type: "file",
      value: "",
      file: "",
      name: "avatar",
      error: "",
    },
    {
      id: 2,
      inputType: "input",
      label: "Họ và tên",
      type: "text",
      value: "",
      name: "name",
      error: "",
    },
    {
      id: 3,
      inputType: "input",
      label: "Email",
      type: "text",
      value: "",
      name: "email",
      error: "",
    },
    {
      id: 4,
      inputType: "input",
      label: "Địa chỉ",
      type: "text",
      value: "",
      name: "address",
      error: "",
    },
    {
      id: 5,
      inputType: "input",
      label: "Mật khẩu",
      type: "password",
      value: "",
      name: "password",
      error: "",
    },
  ];

  const [items, setItems] = useState(userDataUpdate);

  useEffect(() => {
    dispatch(fetchGetUserByIdToolkit()).then((result) => {
      if (result.payload.userData) {
        items[0].value = result.payload.userData.avatar;
        items[1].value = result.payload.userData.name;
        items[2].value = result.payload.userData.email;
        items[3].value = result.payload.userData.address;
        items[4].value = "";
        setItems([...items]);
      }
    });
  }, [dispatch]);

  const handleUpdateUserData = (item, e) => {
    if (item.type === "text" || item.type === "password") {
      item.value = e.target.value;
      item.error = item.value.trim()
        ? ""
        : `Vui lòng nhập ${item.label.toLowerCase()}`;
    }
    if (item.type === "file") {
      item.value = URL.createObjectURL(e.target.files[0]);
      item.file = e.target.files[0];
    }
    setItems([...items]);
  };

  const validate = () => {
    let isValid = true;
    items.forEach((item) => {
      if (!item.value && item.name !== "avatar" && item.name !== "password") {
        item.error = `Vui lòng nhập ${item.label.toLowerCase()}`;
        isValid = false;
      }
    });
    setItems([...items]);
    return isValid;
  };

  const handleUpdate = () => {
    if (validate()) {
      const formData = new FormData();
      if (items[0].file) {
        formData.append("avatar", items[0].file);
      }
      if (items[4].value) {
        formData.append("password", items[4].value);
      }
      formData.append("name", items[1].value);
      formData.append("email", items[2].value);
      formData.append("address", items[3].value);

      dispatch(fetchUpdateNewUserToolkit(formData)).then(() => {
        dispatch(fetchGetUserByIdToolkit()).then((result) => {
          if (result.payload.userData) {
            items[0].value = result.payload.userData.avatar;
            items[1].value = result.payload.userData.name;
            items[2].value = result.payload.userData.email;
            items[3].value = result.payload.userData.address;
            items[4].value = "";
            setItems([...items]);
            toast.success("Cập nhật thông tin thành công", { autoClose: 3000 });
          }
        });
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto  px-4 sm:px-6 lg:px-8">
      <h1 className="text-[20px] font-bold mb-6 text-center">
        Cập nhật thông tin cá nhân
      </h1>
      <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
        {/* Ảnh đại diện */}
        <div className="lg:w-1/3 p-6 flex flex-col items-center">
          <label htmlFor="avatar" className="cursor-pointer">
            <img
              src={items[0].value || ImageDefault}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover mb-4 border"
            />
          </label>
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={(e) => handleUpdateUserData(items[0], e)}
          />
        </div>

        {/* Form thông tin */}
        <div className="lg:w-2/3 p-6">
          {items.map((item) => {
            if (item.type === "text" || item.type === "password") {
              return (
                <div key={item.id} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {item.label}
                  </label>
                  <input
                    type={item.type}
                    value={item.value}
                    className="block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                    onChange={(e) => handleUpdateUserData(item, e)}
                  />
                  {item.error && (
                    <p className="text-red-500 text-sm mt-1">{item.error}</p>
                  )}
                </div>
              );
            }
            return null;
          })}
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Lưu Thông Tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
