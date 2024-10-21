import axios from 'axios';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5069/api/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // 計算總價
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>購物車頁面</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>商品名稱</th>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>數量</th>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>價錢</th>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>總金額</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{item.product.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{item.quantity}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>${item.product.price}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>${item.product.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>總金額: ${calculateTotalPrice()} 元</h2>
          <button
            style={{
              backgroundColor: '#ff4d4d',
              color: '#fff',
              border: 'none',
              padding: '15px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '20px',
            }}
          >
            結帳
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
