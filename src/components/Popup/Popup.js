import React, { useState } from "react";
import ImageDefault from "../../assets/image_default.png";
import { Upload } from "lucide-react";

const Popup = ({
  isShow,
  options,
  onCancel,
  onAction,
  subActionText,
  actionText,
  listCategory,
  role,
  title,
  isLoading,
}) => {
  const [items, setItems] = useState(options);
  const [checked, setChecked] = useState(options[3].value);
  const [selectedValue, setSelectedValue] = useState(options[1].value);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleOnchange = (option, e) => {
    if (
      option.type == "text" ||
      option.type == "password" ||
      option.type == "email" ||
      option.type == "number"
    ) {
      option.value = e.target.value;
      if (e.target.value !== "" && option.type == "text") {
        option.error = "";
        setItems([...items]);
      }

      if (e.target.value !== "" && option.type == "number") {
        option.error = "";
        setItems([...items]);
      }

      if (option.type == "email") {
        if (e.target.value != "" && isValidEmail(e.target.value)) {
          option.error = "";
        } else {
          option.error = "Không đúng định dạng email";
        }
        setItems([...items]);
      }

      if (
        e.target.value != "" &&
        option.type == "password" &&
        e.target.value.length >= 6
      ) {
        option.error = "";
        setItems([...items]);
      }
    }
    if (option.type == "file") {
      option.value = URL.createObjectURL(e.target.files[0]);
      option.file = e.target.files[0];

      if (e.target.files[0] !== "") {
        option.error = "";
      }
      setItems([...items]);
    }
    if (option.type == "radio") {
      setChecked(e.target.value);
      option.value = e.target.value;
    }
    if (option.type == "select") {
      if (e.target.value !== "") {
        option.error = "";
        setItems([...items]);
      }
      option.value = e.target.value;
      setSelectedValue(e.target.value);
    }
  };

  if (!isShow) return null;

  return (
    <>
      {/* Nền mờ nhẹ và tối đi */}
      <div
        className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
        onClick={(e) => {
          if (!isLoading) onCancel();
        }}
      >
        {/* Nội dung Popup */}
        <div
          className="bg-white rounded-2xl shadow-xl p-6 w-full  max-w-md relative max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()} // Ngăn đóng khi bấm vào popup
        >
          {/* Tiêu đề */}
          <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
          {/* Nội dung Form */}
          <div className="space-y-4">
            {items.map((option) => (
              <div key={option.id}>
                {option.type === "file" && (
                  <>
                    <img
                      alt="preview"
                      src={option.value || ImageDefault}
                      className="h-16 mx-auto"
                    />
                    <input
                      type="file"
                      id="avatar"
                      className="hidden"
                      onChange={(e) => handleOnchange(option, e)}
                    />
                    {/* Nút button để tải lên ảnh */}
                    <button
                      className="bg-blue-500 text-white px-2 py-2 flex items-center gap-1 rounded-lg hover:bg-blue-600"
                      onClick={() => document.getElementById("avatar").click()}
                    >
                      <Upload className="w-5 h-5" />
                      Tải Avatar
                    </button>
                    {option.error && (
                      <p className="text-red-600">{option.error}</p>
                    )}
                  </>
                )}
                {(option.type == "text" ||
                  option.type == "password" ||
                  option.type == "email" ||
                  option.type == "number") && (
                  <>
                    <label>{option.name}</label>
                    <input
                      autoComplete="new-password"
                      name={`input-${option.id}`}
                      className="border w-full rounded-lg px-4 py-2"
                      placeholder={option.name}
                      value={option?.value || ""}
                      type={option.type}
                      onChange={(e) => handleOnchange(option, e)}
                    />
                    {option.error && (
                      <p className="text-red-600">{option.error}</p>
                    )}
                  </>
                )}
                {option.type === "radio" &&
                  role.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        value={item.value}
                        checked={checked == item.value}
                        className="accent-blue-500"
                        onChange={(e) => handleOnchange(option, e)}
                      />
                      <span>{item.name}</span>
                    </label>
                  ))}

                {option.type === "select" && (
                  <>
                    <select
                      className="border w-full rounded-lg px-4 py-2"
                      value={selectedValue}
                      onChange={(e) => handleOnchange(option, e)}
                    >
                      <option value="">-- Chọn danh mục --</option>
                      {listCategory.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                    {option.error && (
                      <p className="text-red-600">{option.error}</p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          {/* Nút Hành động */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 rounded-lg"
              onClick={onCancel}
              disabled={isLoading}
            >
              {isLoading ? "Đang lưu..." : subActionText}
            </button>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition-all ${
                isLoading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={isLoading}
              onClick={onAction}
            >
              {isLoading ? "Đang lưu..." : actionText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
