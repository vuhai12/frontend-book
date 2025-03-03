import { useEffect, useState } from "react";
import { Send, MessageCircle, ArrowLeft } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchlistConversations,
  fetchlistUsersChatWithAdmin,
  sendMessage,
} from "../../redux/slides/messageSlice";
import Avatar from "../../assets/image_default.png";
import { useSocket } from "../../context/SocketContext";
import { useRef } from "react";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const socket = useSocket();

  const listConversations = useSelector(
    (state) => state.message.listConversations
  );
  const listUsersChatWithAdmin = useSelector(
    (state) => state.message.listUsersChatWithAdmin
  );
  const userIdRef = useRef(null); // Tạo ref để lưu userId
  useEffect(() => {
    userIdRef.current = userId; // Cập nhật userId mới nhất
  }, [userId]);

  useEffect(() => {
    dispatch(fetchlistConversations());
    dispatch(fetchlistUsersChatWithAdmin());

    socket.on("recivedMessage", (data) => {
      if (roleCode().id == data.userId) {
        dispatch(fetchlistConversations());
      }
    });
    socket.on("recivedMessageUserToAdmin", (data) => {
      if (userIdRef.current === data.userId && roleCode()?.role_code == "R1") {
        dispatch(fetchlistConversations({ userId: data.userId }));
      }
    });
  }, []);

  const roleCode = () => {
    if (token) {
      const { role_code, id } = jwtDecode(token);
      return { role_code, id };
    }
    return null; // Nếu không có token thì trả về null
  };

  const handleSendMessage = (e, userId) => {
    if (!input.trim()) return;
    if (userId) {
      dispatch(sendMessage({ message: input, userId })).then(() => {
        dispatch(fetchlistConversations({ userId })).then((res) => {
          socket.emit("newMessage", { userId });
        });
      });
    } else {
      dispatch(sendMessage({ message: input })).then(() => {
        dispatch(fetchlistConversations()).then(() => {
          socket.emit("newMessageUserToAdmin");
        });
      });
    }
    setInput("");
  };

  const handleSelectUser = (userId) => {
    dispatch(fetchlistConversations({ userId })).then(() => {
      setUserId(userId);
    });
  };

  const handleBacktoUserList = () => {
    dispatch(fetchlistUsersChatWithAdmin()).then(() => {
      setUserId("");
    });
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {!isOpen && (
        <button
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 bg-white shadow-xl rounded-lg flex flex-col overflow-hidden border">
          <div className="bg-blue-600 text-white p-3 flex justify-between">
            {roleCode()?.role_code == "R1" && userId ? (
              <button onClick={handleBacktoUserList}>
                <ArrowLeft size={18} />
              </button>
            ) : (
              <span>Hỗ trợ</span>
            )}

            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="p-3 h-64 overflow-y-auto flex flex-col-reverse">
            {roleCode()?.role_code == "R2" &&
              listConversations.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-1 rounded-lg max-w-xs ${
                    msg.receiverId === "1"
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-200 self-start"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            {userId && roleCode()?.role_code == "R1"
              ? listConversations.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 my-1 rounded-lg max-w-xs ${
                      msg.receiverId === "1"
                        ? " self-start bg-gray-200"
                        : " self-end bg-blue-500 text-white"
                    }`}
                  >
                    {msg.message}
                  </div>
                ))
              : ""}
          </div>

          {roleCode()?.role_code == "R2" && (
            <div className="p-2 border-t flex">
              <input
                type="text"
                className="flex-1 p-2 border rounded-l"
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className="bg-blue-600 text-white p-2 rounded-r"
                onClick={handleSendMessage}
              >
                <Send size={20} />
              </button>
            </div>
          )}

          {roleCode()?.role_code == "R1" && !userId && (
            <div className="">
              {listUsersChatWithAdmin.map((item) => {
                return (
                  <div
                    className="flex py-3 px-5 justify-between gap-3 items-center hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectUser(item.dataValues.id)}
                  >
                    <div>
                      <img
                        src={item.dataValues.avatar || Avatar}
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="flex-1 flex-col">
                      <p className="font-semibold">{item.dataValues.name}</p>
                      <p>{item.lastMessage}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {roleCode()?.role_code == "R1" && userId && (
            <div className="p-2 border-t flex">
              <input
                type="text"
                className="flex-1 p-2 border rounded-l"
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSendMessage(e, userId)
                }
              />
              <button
                className="bg-blue-600 text-white p-2 rounded-r"
                onClick={(e) => handleSendMessage(e, userId)}
              >
                <Send size={20} />
              </button>
            </div>
          )}

          {!roleCode()?.role_code && (
            <div className="p-3 text-center ">
              <span className="text-red-500">Bạn cần đăng nhập để chat! </span>
              <span
                className="underline text-blue-950 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBox;
