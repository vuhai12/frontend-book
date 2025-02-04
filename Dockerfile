# Build React App
FROM node:20-alpine AS build

WORKDIR /app

# Nhận biến môi trường ở build-time
ARG REACT_APP_API_URL
ARG REACT_APP_LIMIT_LIST_USER
ARG REACT_APP_LIMIT_LIST_BOOK
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_LIMIT_LIST_USER=$REACT_APP_LIMIT_LIST_USER
ENV REACT_APP_LIMIT_LIST_BOOK=$REACT_APP_LIMIT_LIST_BOOK

COPY package*.json . 
RUN npm install
COPY . .
RUN npm run build

# Serve ứng dụng React
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
