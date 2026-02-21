import { useState } from "react";
import { listBooks } from "../../constants/listBooks";
import { ArrowLeft } from "lucide-react";
import QuantitySelector from "../../components/QuantitySelector";

const Carthetail = () => {
  const books = listBooks.slice(0, 2);

  // Khởi tạo cart với quantity
  const [cart, setCart] = useState(
    books.map((item) => ({
      ...item,
      quantity: 1,
      price: 5, // demo giá
    })),
  );

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
  };

  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  const shipping = 5;
  const totalCost = subtotal + shipping;

  return (
    <div className="container mx-auto py-[40px] px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-[30px]">
        {/* LEFT SIDE */}
        <div className="bg-white rounded-md pb-[30px]">
          <div className="flex justify-between font-semibold text-[20px] border-b py-[20px] px-[20px]">
            <p>Cart</p>
            <p>{totalItems} Items</p>
          </div>

          <div className="px-[20px] overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="text-gray-500 font-semibold text-[12px]">
                <tr className="text-left">
                  <th className="py-[10px] w-[50%]">BOOK DETAIL</th>
                  <th className="py-[10px] w-[20%]">QUANTITY</th>
                  <th className="py-[10px] w-[15%]">PRICE</th>
                  <th className="py-[10px] w-[15%]">TOTAL</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-[15px]">
                      <div className="flex gap-[10px]">
                        <div className="w-[80px] shrink-0">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full object-cover rounded-md"
                          />
                        </div>

                        <div className="flex flex-col gap-[6px]">
                          <p className="text-[14px] font-semibold">
                            {item.title}
                          </p>
                          <p className="text-[12px] text-gray-500 line-clamp-2">
                            {item.des}
                          </p>
                          <p
                            onClick={() => handleRemove(index)}
                            className="text-red-600 text-[13px] cursor-pointer underline"
                          >
                            Remove
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-[15px]">
                      <QuantitySelector
                        value={item.quantity}
                        onChange={(newValue) =>
                          handleQuantityChange(index, newValue)
                        }
                      />
                    </td>

                    <td className="py-[15px]">${item.price}</td>

                    <td className="py-[15px]">${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex gap-[10px] items-center cursor-pointer mt-[20px] text-[#393280] font-semibold">
              <ArrowLeft size={18} />
              <p>Continue Shopping</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[#ED553B] text-white rounded-md p-[20px] h-fit">
          <h3 className="font-semibold text-[20px] border-b pb-[20px]">
            Order Summary
          </h3>

          <div className="flex flex-col gap-[20px] py-[30px] font-semibold text-[14px]">
            <div className="flex justify-between">
              <p>Items</p>
              <p>{totalItems}</p>
            </div>

            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>

            <div className="flex justify-between">
              <p>Shipping</p>
              <p>${shipping}</p>
            </div>

            <div className="flex justify-between text-[16px] border-t pt-[20px]">
              <p>TOTAL COST</p>
              <p>${totalCost}</p>
            </div>

            <button className="py-[12px] w-full bg-[#393280] rounded-md">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carthetail;
