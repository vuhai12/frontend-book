import axiosConfig from "../axiosConfig";

export const apisendMessage = (data) => {
  if (!data.userId) {
    return axiosConfig.post(`/message/user-to-admin`, {
      message: data.message,
    });
  } else {
    return axiosConfig.post(`/message/user-to-admin`, {
      message: data.message,
      userId: data.userId,
    });
  }
};

export const apigetConversations = (userId) => {
  if (!userId) {
    return axiosConfig.get(`/message/conversations/user-chat-admin`);
  } else {
    return axiosConfig.get(
      `/message/conversations/user-chat-admin?userId=${userId}`
    );
  }
};

export const apigetListUserChatWithAdmin = () =>
  axiosConfig.get(`/message/users/chatted-with-admin`);
