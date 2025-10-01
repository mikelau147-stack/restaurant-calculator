import React, { useState, useEffect, useCallback } from 'react';
import { Users, Calculator, Save, Trash2, Download, Upload } from 'lucide-react';
import './App.css';

// Menu data with categories
const menuData = {
  "牛肉類": [
    { name: "泡菜牛肉卷", price: 36 }, 
    { name: "洋蔥牛肉卷", price: 36 }, 
    { name: "牛舌", price: 38 },
    { name: "牛小排", price: 42 }, 
    { name: "和牛", price: 58 }
  ],
  "豬肉類": [
    { name: "墮落午餐肉", price: 28 }, 
    { name: "煙肉車厘茄", price: 30 }, 
    { name: "五花腩", price: 34 },
    { name: "豬頸肉", price: 32 }, 
    { name: "豬軟骨", price: 30 }
  ],
  "雞肉類": [
    { name: "雞皮", price: 24 }, 
    { name: "汁燒雞肉", price: 30 }, 
    { name: "雞翼", price: 32 },
    { name: "雞軟骨", price: 28 }, 
    { name: "雞胸肉", price: 34 }
  ],
  "海鮮類": [
    { name: "鮮蝦", price: 38 }, 
    { name: "扇貝", price: 42 }, 
    { name: "墨魚", price: 36 },
    { name: "三文魚", price: 45 }, 
    { name: "帶子", price: 48 }
  ],
  "蔬菜類": [
    { name: "椰菜", price: 18 }, 
    { name: "韭菜", price: 20 }, 
    { name: "茄子", price: 22 },
    { name: "燈籠椒", price: 24 }, 
    { name: "粟米", price: 20 }
  ]
};

function App() {
  const [quantities, setQuantities] = useState({});
  const [partySize, setPartySize] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);

  // Load saved data on component mount
  useEffect(() => {
    const savedQuantities = localStorage.getItem('restaurantQuantities');
    const savedPartySize = localStorage.getItem('restaurantPartySize');
    const savedHistory = localStorage.getItem('restaurantOrderHistory');

    if (savedQuantities) {
      setQuantities(JSON.parse(savedQuantities));
    }
    if (savedPartySize) {
      setPartySize(savedPartySize);
    }
    if (savedHistory) {
      setOrderHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Auto-save function
  const autoSave = useCallback(() => {
    localStorage.setItem('restaurantQuantities', JSON.stringify(quantities));
    localStorage.setItem('restaurantPartySize', partySize);
    localStorage.setItem('restaurantOrderHistory', JSON.stringify(orderHistory));
  }, [quantities, partySize, orderHistory]);

  // Auto-save when data changes
  useEffect(() => {
    const timeoutId = setTimeout(autoSave, 500);
    return () => clearTimeout(timeoutId);
  }, [autoSave]);

  const updateQuantity = (itemName, change) => {
    setQuantities(prev => {
      const newQty = Math.max(0, (prev[itemName] || 0) + change);
      if (newQty === 0) {
        const { [itemName]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemName]: newQty };
    });
  };

  const calculateTotal = () => {
    return Object.entries(quantities).reduce((total, [itemName, qty]) => {
      const item = Object.values(menuData).flat().find(i => i.name === itemName);
      return total + (item ? item.price * qty : 0);
    }, 0);
  };

  const saveOrder = () => {
    const selectedItems = Object.entries(quantities).filter(([_, qty]) => qty > 0);
    if (selectedItems.length === 0) {
      alert('請先選擇項目');
      return;
    }

    const order = {
      id: Date.now(),
      items: selectedItems.map(([itemName, qty]) => {
        const item = Object.values(menuData).flat().find(i => i.name === itemName);
        return {
          name: itemName,
          quantity: qty,
          price: item?.price || 0,
          subtotal: (item?.price || 0) * qty
        };
      }),
      total: calculateTotal(),
      partySize: parseInt(partySize) || 0,
      timestamp: new Date().toLocaleString('zh-HK'),
      perPersonCost: parseInt(partySize) > 0 ? calculateTotal() / parseInt(partySize) : 0
    };

    setOrderHistory(prev => [order, ...prev]);
    alert(`訂單已保存！\n總計：$${order.total}${order.perPersonCost > 0 ? `\n每人：$${Math.round(order.perPersonCost)}` : ''}`);
  };

  const clearAll = () => {
    if (window.confirm('確定要清空所有項目嗎？')) {
      setQuantities({});
    }
  };

  const exportData = () => {
    const data = {
      orderHistory,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `restaurant-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.orderHistory) setOrderHistory(data.orderHistory);
        alert('數據導入成功！');
      } catch (error) {
        alert('文件格式錯誤');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const selectedItems = Object.entries(quantities).filter(([_, qty]) => qty > 0);
  const total = calculateTotal();
  const perPersonCost = partySize && parseInt(partySize) > 0 ? total / parseInt(partySize) : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-slate-200">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Users size={20} className="text-teal-600" />
                肥後屋計數機
              </h1>
              <span className="text-slate-600">日式燒肉訂單計算系統</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6">
        {/* Menu Section */}
        <div className="flex-1">
          {Object.entries(menuData).map(([category, items]) => (
            <div key={category} className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-slate-200">
              <h2 className="text-lg font-semibold mb-4 text-slate-800">{category}</h2>
              <div className="grid grid-cols-1 gap-3">
                {items.map((item) => (
                  <div key={item.name} className="flex justify-between items-center p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                    <div>
                      <span className="font-medium text-slate-800">{item.name}</span>
                      <span className="text-orange-600 font-semibold ml-3">${item.price}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.name, -1)}
                        disabled={!quantities[item.name]}
                        className="w-8 h-8 rounded-full bg-teal-600 text-white disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-teal-700"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{quantities[item.name] || 0}</span>
                      <button 
                        onClick={() => updateQuantity(item.name, 1)}
                        className="w-8 h-8 rounded-full bg-teal-600 text-white hover:bg-teal-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-80">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 sticky top-6">
            <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center gap-2">
              <Calculator size={20} className="text-teal-600" />
              訂單明細
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">人數：</label>
              <input
                type="number"
                min="1"
                max="32"
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                placeholder="輸入用餐人數"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="mb-4 max-h-60 overflow-y-auto">
              {selectedItems.length === 0 ? (
                <p className="text-slate-500 text-center py-4">尚未選擇任何項目</p>
              ) : (
                selectedItems.map(([itemName, qty]) => {
                  const item = Object.values(menuData).flat().find(i => i.name === itemName);
                  const subtotal = item ? item.price * qty : 0;
                  return (
                    <div key={itemName} className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-sm">{itemName} × {qty}</span>
                      <span className="font-medium">${subtotal}</span>
                    </div>
                  );
                })
              )}
            </div>

            {selectedItems.length > 0 && (
              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg text-slate-800">總計：</span>
                  <span className="font-bold text-xl text-teal-600">${total}</span>
                </div>
                {perPersonCost > 0 && (
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-600">每人：</span>
                    <span className="font-medium text-slate-800">${Math.round(perPersonCost)}</span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <button 
                    onClick={saveOrder}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    保存訂單
                  </button>
                  
                  <button 
                    onClick={clearAll}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    清空全部
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-200">
              <div className="space-y-2">
                <button 
                  onClick={exportData}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  導出數據
                </button>
                
                <label className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 cursor-pointer">
                  <Upload size={18} />
                  導入數據
                  <input 
                    type="file" 
                    accept=".json" 
                    onChange={importData}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;