import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetUserByIdToolkit,
  fetchUpdateNewUserToolkit,
} from "../../../redux/slides/userSlice";
import { toast } from "react-toastify";
import ImageDefault from "../../../assets/image_default.png";
import { Upload } from "lucide-react"; // Import icon tải lên

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
      placeholder: "Ảnh đại diện",
    },
    {
      id: 2,
      inputType: "input",
      label: "Họ và tên",
      type: "text",
      value: "",
      name: "name",
      error: "",
      placeholder: "Họ và tên",
    },
    {
      id: 3,
      inputType: "input",
      label: "Email",
      type: "text",
      value: "",
      name: "email",
      error: "",
      placeholder: "Email",
    },
    {
      id: 4,
      inputType: "input",
      label: "Địa chỉ",
      type: "text",
      value: "",
      name: "address",
      error: "",
      placeholder: "Địa chỉ",
    },
    {
      id: 5,
      inputType: "input",
      label: "Đổi mật khẩu",
      type: "password",
      value: "",
      name: "password",
      error: "",
      placeholder: "Nhập mật khẩu mới",
    },
  ];

  const [items, setItems] = useState(userDataUpdate);
  const isLoadingInfoUser = useSelector(
    (state) => state.user.isLoadingInfoUser
  );

  useEffect(() => {
    dispatch(fetchGetUserByIdToolkit()).then((result) => {
      if (result.payload.userData) {
        items[0].value = result.payload.userData.avatar;
        items[1].value = result.payload.userData.name;
        items[2].value = result.payload.userData.email;
        items[3].value = result.payload.userData.address;

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

      if (items[0].value) {
        formData.append("avatar", items[0].file);
      }

      if (items[4].value) {
        if (items[4].value.length >= 6) {
          formData.append("password", items[4].value);
        } else {
          items[4].error = "Password cần ít nhất 6 ký tự";
          setItems([...items]);
          return;
        }
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
            Swal.fire({
              title: "Thông báo!",
              text: "Cập nhật thông tin thành công",
              icon: "success",
              confirmButtonText: "Đóng",
            });
          }
        });
      });
    }
  };

  return (
    <div className=" min-h-screen">
      <h1 className="text-[20px]  mb-6 ">Cập nhật thông tin cá nhân</h1>
      <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
        {/* Ảnh đại diện */}

        <div className="lg:w-1/3 p-6 flex flex-col items-center">
          {/* Ảnh đại diện */}
          <img
            src={items[0].value || ImageDefault}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover mb-4 border"
          />

          {/* Input file (ẩn) */}
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={(e) => handleUpdateUserData(items[0], e)}
          />

          {/* Nút button để tải lên ảnh */}
          <button
            className="bg-blue-500 text-white px-2 py-2 flex items-center gap-1 rounded-lg hover:bg-blue-600"
            onClick={() => document.getElementById("avatar").click()} // Kích hoạt input file
          >
            <Upload className="w-5 h-5" />
            Tải Avatar
          </button>
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
                    placeholder={item.placeholder}
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
            disabled={isLoadingInfoUser} // Nút sẽ bị vô hiệu hóa khi loading = true
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring ${
              isLoadingInfoUser
                ? "bg-gray-400 cursor-not-allowed" // Khi loading, đổi màu và không thể nhấn
                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
            }`}
          >
            {isLoadingInfoUser ? "Đang lưu..." : "Lưu Thông Tin"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
