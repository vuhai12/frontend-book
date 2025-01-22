import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Alert from "../Alert/Alert";
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

  const handleOnchange = async (option, e) => {
    const item = items?.find((item) => option.id === item.id);
    console.log("handleOnchange");
    if (item.type == "file") {
      item.value = URL.createObjectURL(e.target.files[0]);
      item.file = e.target.files[0];
    } else if (item.inputType == "select") {
      item.value = e.target.value;

      if (e.target.value == "default") {
        item.value = "";
      }
    } else if (item.type == "radio") {
      item.value = e.target.value; // Lấy giá trị của radio
      setChecked(e.target.value); // Cập nhật giá trị đã chọn
    } else {
      item.value = e.target.value;
    }
    setItems([...items]);
    items.map((item) => {
      if (item.value !== "") {
        item.error = "";
      }
    });
  };

  return (
    <div className="absolute top-0 bg-red ">
      <Modal
        show={isShow}
        onHide={onCancel}
        className=" boder-solid border-gray-500  fixed top-0 left-0 right-0 bottom-0 rounded-[10px] bg-white p-[20px] 
        sm:w-[30%] flex flex-col gap-3 sm:translate-x-[-50%] sm:left-[50%] sm:h-[80%] sm:top-[50%] sm:translate-y-[-50%] sm:overflow-auto
      "
      >
        <Modal.Body>
          <p className="text-center text-[15px] font-bold">{title}</p>
          {items.map((option) => {
            return (
              <div key={option.id}>
                {option.inputType == "input" && (
                  <div>
                    {option.type == "file" ? (
                      <img
                        alt="image"
                        src={option.value != "" ? option.value : ImageDefault}
                        className="h-[60px]"
                      />
                    ) : (
                      ""
                    )}
                    {option.type == "radio" ? (
                      role.map((item) => {
                        return (
                          <div
                            key={item.id}
                            style={{ display: "inline-block" }}
                          >
                            {item.value}
                            <input
                              value={item.code}
                              checked={checked === item.code}
                              className="border inline-block w-full rounded-[4px] border-gray-400 my-[6px] mx-0 py-[8px] px-[10px]"
                              type="radio"
                              onChange={(e) => handleOnchange(option, e)}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <input
                        className="border w-full rounded-[4px] border-gray-400 my-[6px] mx-0 py-[8px] px-[10px]"
                        placeholder={option.name}
                        name={option.name}
                        defaultValue={
                          option.type == "file" ? "" : option?.value
                        }
                        type={option.type}
                        onChange={(e) => handleOnchange(option, e)}
                      />
                    )}
                    {option.error && (
                      <Alert error={true} message={option.error} />
                    )}
                  </div>
                )}
                {option.inputType == "select" && (
                  <div>
                    <select
                      value={option.value}
                      onChange={(e) => handleOnchange(option, e)}
                      className="border w-full rounded-[4px] border-gray-400 my-[6px] mx-0 py-[8px] px-[10px]"
                    >
                      <option value="default">-- category --</option>
                      {listCategory.map((item) => {
                        return (
                          <option
                            value={item.code}
                            lable={item.value}
                            style={{ height: "100px", display: "inline-block" }}
                          >
                            {item.value}
                          </option>
                        );
                      })}
                    </select>
                    {option.error && (
                      <Alert error={true} message={option.error} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer className="flex flex-col gap-2">
          <button
            className="bg-red-500 text-white rounded-[5px] p-[10px]"
            onClick={onCancel}
          >
            {subActionText}
          </button>
          <button
            className="bg-slate-700 text-white rounded-[5px] p-[10px]"
            onClick={onAction}
          >
            {actionText}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Popup;
