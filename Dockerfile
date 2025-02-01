# Sử dụng image Node.js làm base image
FROM node:16

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy tất cả file từ máy chủ vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Cài đặt `serve` để chạy ứng dụng tĩnh
RUN npm install -g serve

# Cung cấp cổng 3000
EXPOSE 3000

# Chạy ứng dụng từ thư mục build
CMD ["serve", "-s", "build", "-l", "3000"]
