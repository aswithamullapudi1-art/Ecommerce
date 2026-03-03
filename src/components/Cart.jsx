import React from 'react'
import { useNavigate } from 'react-router-dom';

function Cart() {

  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const navigate = useNavigate();

  const totalCost = cartItems.reduce((sum, item) => sum + item.price, 0);

  function handleSubmit() {
    alert("Payment Successful! Total Amount: ₹" + totalCost.toFixed(2));
    localStorage.removeItem('cart');
    navigate("/products");
  }

  return (
    <div className="main-content common">
      <table className='border border-gray-300 shadow-xl rounded-lg'>
        <thead>
          <tr>
            <td className="p-[2vw]" colSpan={2}>
              <h1 className="underline">Billing Page</h1>
            </td>
          </tr>
          <tr>
            <td><b>Product Name</b></td>
            <td><b>Product Cost (₹)</b></td>
          </tr>
        </thead>

        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center p-4">
                Your cart is empty
              </td>
            </tr>
          ) : (
            cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.title.substring(0, 20)}</td>
                <td>₹ {item.price.toFixed(2)}</td>
              </tr>
            ))
          )}

          <tr>
            <td><b>Total Cost</b></td>
            <td><b>₹ {totalCost.toFixed(2)}</b></td>
          </tr>

          <tr>
            <td className="p-[2vw] text-center" colSpan={2}>
              <button
                onClick={handleSubmit}
                className='bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-xl transition duration-300'
                disabled={cartItems.length === 0}
              >
                Pay Now
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Cart;