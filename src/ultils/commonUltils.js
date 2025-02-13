import * as XLSX from "xlsx/xlsx.mjs";
import { Buffer } from "buffer";

export const exportExcel = (data, nameSheet, nameFile) => {
  return new Promise((resolve, reject) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, nameSheet);
    XLSX.writeFile(wb, `${nameFile}.xlsx`);
    resolve("ok");
  });
};

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const containsWord = (str, word) => {
  const regex = new RegExp(`\\b${word}\\b`, "i"); // 'i' để không phân biệt hoa thường
  return regex.test(str);
};

export const blobToBase64 = (blob) =>
  new Buffer(blob, "base64").toString("binary");

export const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  // Format ngày và giờ
  const formattedDate = date.toLocaleDateString("vi-VN"); // Định dạng ngày kiểu Việt Nam
  const formattedTime = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
};
