import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";

const MyOrder = () => {
  const listOrder = useSelector((state) => state.order.listOrder);

  useEffect(() => {}, []);
  return (
    <>
      <Container>
        <h3>Đơn hàng của tôi</h3>
        {listOrder?.map((item, idx) => {
          return (
            <>
              <div
                style={{
                  background: "white",
                  padding: "30px",
                  margin: "30px",
                  borderRadius: "10px",
                }}
              >
                <p>Trạng thái</p>
                <p>Giao hàng: {item.paymentMethod}</p>
                <p>
                  Thanh toán:{" "}
                  {item.isPaid == false ? "Chưa thanh toán" : "Đã thanh toán"}
                </p>
                <p>Số lượng x {item.quantity}</p>
                <p>Tổng tiền: {item.total.toLocaleString()} VNĐ</p>
              </div>
            </>
          );
        })}
      </Container>
    </>
  );
};

export default MyOrder;
