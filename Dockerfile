# Sử dụng node làm base image
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json để cài đặt dependency trước
COPY package.json package-lock.json ./

# Cài đặt dependency
RUN npm install 



# Copy toàn bộ mã nguồn vào container
COPY . .

RUN npm install 

# Thiết lập biến môi trường
ARG REACT_APP_API_URL
ARG REACT_APP_LIMIT_LIST_USER
ARG REACT_APP_LIMIT_LIST_BOOK
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_LIMIT_LIST_USER=${REACT_APP_LIMIT_LIST_USER}
ENV REACT_APP_LIMIT_LIST_BOOK=${REACT_APP_LIMIT_LIST_BOOK}

# Build ứng dụng
RUN npm run build

# Mở cổng
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]
