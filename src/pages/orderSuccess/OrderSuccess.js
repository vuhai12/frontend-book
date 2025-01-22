import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const OrderSuccess = () => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <Container>
        <p>Đơn hàng đặt thành công</p>
        <p>Phương thức thanh toán: {location.state?.paymentMethod}</p>
        <p>Địa chỉ: {location.state?.address}</p>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {location.state?.cartsChecked?.map((item, idx) => {
              return (
                <tr>
                  <td>
                    <img
                      style={{ width: "50px", height: "50px" }}
                      src={item.image}
                    ></img>
                  </td>
                  <th>{item.price.toLocaleString()} vnđ</th>
                  <th>x {item.quantity}</th>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div style={{ float: "right" }}>
          <p>Tổng tiền</p>
          <h3>{location.state?.totalPrice.toLocaleString()} vnđ</h3>
        </div>
      </Container>
    </>
  );
};

export default OrderSuccess;
