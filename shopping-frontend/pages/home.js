import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const IndexPage = () => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showCart, setShowCart] = useState(false);

  // 模擬的產品數據
  const products = [
    {
      id: 1,
      name: 'MacBook',
      specs: [
        'Apple M3 Pro 晶片',
        '36GB 統一記憶體',
        '512GB SSD 儲存裝置',
      ],
      price: 1999,
      originalPrice: 2599,
      discount: 600,
      image: '/images/macbook.png',
      stock: 5,
    },
    {
      id: 2,
      name: 'ASUS',
      specs: [
        'Windows 11 Home',
        '1TB M.2 NVMe SSD',
        '16GB DDR4-3200 RGB RAM',
      ],
      price: 999,
      originalPrice: 1199,
      discount: 200,
      image: '/images/asus.png',
      stock: 5,
    },
    {
      id: 3,
      name: 'Lenovo',
      specs: [
        'Windows 11 Home',
        '1TB WD M.2 NVMe SSD',
        '64GB DDR5-6000MHz KINGSTON RAM',
      ],
      price: 2149,
      originalPrice: 2399,
      discount: 250,
      image: '/images/lenovo.png',
      stock: 5,
    },
    {
      id: 4,
      name: 'MSI',
      specs: [
        'Windows 11 Home',
        'Intel® Core™ i7-14700KF CPU',
        '2TB WD M.2 NVMe SSD',
      ],
      price: 2299,
      originalPrice: 2649,
      discount: 350,
      image: '/images/msi.png',
      stock: 5,
    },
  ];

  // 處理數量變更
  const handleQuantityChange = (productId, value) => {
    setQuantities({ ...quantities, [productId]: value });
  };

  // 添加到購物車
  const addToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:5069/api/cart', {
        productId: product.id,
        quantity: quantities[product.id] || 1,
      });
  
      setCart([...cart, { ...product, quantity: quantities[product.id] || 1 }]);
      alert(`${product.name} 已加入購物車！`);
    } catch (error) {
      console.error('添加至購物車失敗:', error.response ? error.response.data : error.message);
      alert('添加至購物車失敗：' + (error.response ? error.response.data : error.message));
    }
  };
  
  

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Shopping!</h1>
      <div style={{ display: 'flex', padding: '20px', position: 'relative' }}>
        {/* 產品列表 */}
        <div style={{ flex: 2, display: 'flex', gap: '20px', flexWrap: 'nowrap', overflowX: 'auto' }}>
          {products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ddd', padding: '20px', width: '300px', borderRadius: '10px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
              <h2>{product.name}</h2>
              <div>
                {product.specs.map((spec, index) => (
                  <p key={index} style={{ margin: '5px 0' }}>{spec}</p>
                ))}
              </div>
              <p style={{ color: 'red' }}>折扣 ${product.discount} 元</p>
              <p style={{ textDecoration: 'line-through' }}>${product.originalPrice} 元</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${product.price} 元</p>
              <p style={{ color: '#555' }}>庫存: {product.stock}</p>
              <div style={{ margin: '10px 0' }}>
                <label htmlFor={`quantity-${product.id}`} style={{ marginRight: '10px' }}>數量:</label>
                <select
                  id={`quantity-${product.id}`}
                  value={quantities[product.id] || 1}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  style={{ padding: '5px', borderRadius: '5px' }}
                >
                  {[...Array(product.stock)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => addToCart(product)}
                style={{
                  backgroundColor: '#ff4d4d',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 購物車圖示和購物車內容的顯示 */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          display: 'inline-block',
        }}
        onMouseEnter={() => setShowCart(true)}
        onMouseLeave={() => setShowCart(false)}
      >
        <button
          style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          <img src="/images/cart-icon.png" alt="Shopping Cart Icon" style={{ width: '24px', marginRight: '10px' }} />
          購物車
        </button>

        {showCart && (
          <div
            style={{
              position: 'absolute',
              top: '50px',
              right: '0',
              width: '300px',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
              zIndex: 1,
            }}
          >
            <h3>購物車內容</h3>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>尚無商品</p>
              </div>
            ) : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{item.name} x {item.quantity}</span>
                      <span>${item.price * item.quantity}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/cart">
              <button style={{ display: 'block', marginTop: '10px', width: '100%', padding: '10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                前往購物車頁面
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
