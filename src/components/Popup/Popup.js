import React, { useState } from "react";
import ImageDefault from "../../assets/image_default.png";

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
}) => {
  const [items, setItems] = useState(options);
  const [checked, setChecked] = useState("R1");

  const handleOnchange = (option, e) => {
    const updatedItems = items.map((item) => {
      if (item.id === option.id) {
        if (item.type === "file") {
          item.value = URL.createObjectURL(e.target.files[0]);
          item.file = e.target.files[0];
        } else if (item.inputType === "select") {
          item.value = e.target.value === "default" ? "" : e.target.value;
        } else if (item.type === "radio") {
          item.value = e.target.value;
          setChecked(e.target.value);
        } else {
          item.value = e.target.value;
        }
        item.error = item.value ? "" : item.error;
      }
      return item;
    });

    setItems([...updatedItems]);
  };

  if (!isShow) return null;

  return (
    <>
      {/* Nền mờ nhẹ và tối đi */}
      <div
        className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
        onClick={onCancel}
      >
        {/* Nội dung Popup */}
        <div
          className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()} // Ngăn đóng khi bấm vào popup
        >
          {/* Tiêu đề */}
          <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>

          {/* Nội dung Form */}
          <div className="space-y-4">
            {items.map((option) => (
              <div key={option.id}>
                {option.inputType === "input" && (
                  <div>
                    {option.type === "file" && (
                      <img
                        alt="preview"
                        src={option.value || ImageDefault}
                        className="h-16 mx-auto"
                      />
                    )}
                    {option.type === "radio" ? (
                      role.map((item) => (
                        <label
                          key={item.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            value={item.code}
                            checked={checked === item.code}
                            className="accent-blue-500"
                            onChange={(e) => handleOnchange(option, e)}
                          />
                          <span>{item.value}</span>
                        </label>
                      ))
                    ) : (
                      <input
                        className="border w-full rounded-lg px-4 py-2"
                        placeholder={option.name}
                        defaultValue={
                          option.type === "file" ? "" : option?.value
                        }
                        type={option.type}
                        onChange={(e) => handleOnchange(option, e)}
                      />
                    )}
                  </div>
                )}
                {option.inputType === "select" && (
                  <select
                    className="border w-full rounded-lg px-4 py-2"
                    value={option.value}
                    onChange={(e) => handleOnchange(option, e)}
                  >
                    <option value="default">-- Chọn danh mục --</option>
                    {listCategory.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          {/* Nút Hành động */}
          <div className="mt-6 flex flex-col gap-3">
            <button
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 rounded-lg"
              onClick={onCancel}
            >
              {subActionText}
            </button>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
              onClick={onAction}
            >
              {actionText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
