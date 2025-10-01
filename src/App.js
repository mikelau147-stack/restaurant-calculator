import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, Trash2, Save, History, X, Calendar, Check, AlertCircle, ChevronDown, ChevronUp, Edit3, BarChart3, TrendingUp, DollarSign, Users, Search, ChevronRight, Menu } from 'lucide-react';

const menuData = {
  "牛肉類": [
    { name: "泡菜牛肉卷", price: 36 }, { name: "洋蔥牛肉卷", price: 36 }, { name: "金菇牛肉卷", price: 36 },
    { name: "牛舌", price: 38 }, { name: "安格斯肉眼", price: 40 }, { name: "黃芥末籽肉眼", price: 42 }, { name: "牛仔骨", price: 46 }
  ],
  "豬肉類": [
    { name: "墮落午餐肉", price: 28 }, { name: "煙肉車厘茄", price: 30 }, { name: "煙肉荔枝卷", price: 30 }, { name: "芝士煙肉蛋卷", price: 30 },
    { name: "豬肉蘆荀卷", price: 34 }, { name: "豬肉紫蘇梅醬卷", price: 34 }, { name: "酸薑豬肉卷", price: 34 }, { name: "豬肉蒜頭卷", price: 34 },
    { name: "五花腩", price: 34 }, { name: "黃芥末五花腩", price: 36 }
  ],
  "羊肉類": [{ name: "羊架", price: 46 }],
  "雞肉類": [
    { name: "雞皮", price: 24 }, { name: "雞軟骨", price: 24 }, { name: "汁燒雞肉", price: 30 }, { name: "雞肝", price: 32 },
    { name: "雞腎", price: 32 }, { name: "雞心", price: 32 }, { name: "雞翼", price: 32 }, { name: "大蔥雞肉", price: 34 },
    { name: "紫蘇雞肉", price: 34 }, { name: "七里香(雞屁股)", price: 34 }, { name: "雞胸軟骨", price: 36 }, { name: "雞肉軟骨棒", price: 36 }, { name: "明太子雞肉", price: 36 }
  ],
  "蔬菜類": [
    { name: "燒秋葵", price: 20 }, { name: "車厘茄", price: 20 }, { name: "冬菇", price: 20 }, { name: "鵪鶉蛋", price: 22 },
    { name: "汁燒豆腐", price: 24 }, { name: "雞脾菇", price: 24 }, { name: "意大利瓜", price: 24 }, { name: "大蔥", price: 24 },
    { name: "甜薯", price: 24 }, { name: "粟米", price: 24 }, { name: "玉子", price: 24 }, { name: "銀杏", price: 24 }, { name: "蘆筍", price: 26 },
    { name: "茄子泡菜卷", price: 30 }, { name: "明太子豆腐", price: 30 }, { name: "大烤菇", price: 30 }, { name: "青椒仔", price: 30 },
    { name: "芝士油揚", price: 30 }, { name: "什菌油揚", price: 36 }, { name: "燒原條茄子", price: 48 }
  ],
  "沙律及小菜": [
    { name: "和風沙律", price: 52 }, { name: "加牛油果", price: 14 }, { name: "加溫泉蛋", price: 14 }, { name: "菠菜什菌暖沙律", price: 54 },
    { name: "胡麻豆腐泥沙律", price: 54 }, { name: "枝豆", price: 30 }, { name: "柚子蘿蔔漬", price: 30 }, { name: "胡麻菠菜卷", price: 38 },
    { name: "味噌山藥", price: 38 }, { name: "冷豆腐山藥秋葵", price: 38 }, { name: "日式凍蕃茄", price: 40 }, { name: "蒜頭漬", price: 30 },
    { name: "鱈魚乾", price: 34 }, { name: "芥辣八爪魚", price: 38 }, { name: "明太子山藥", price: 38 }, { name: "蟹膏山藥", price: 38 },
    { name: "螢光魷魚", price: 48 }, { name: "味醂魚干", price: 58 }
  ],
  "主食類": [
    { name: "日式煎餃子", price: 38 }, { name: "白飯", price: 12 }, { name: "年糕", price: 24 }, { name: "芝士年糕", price: 24 },
    { name: "味噌湯", price: 26 }, { name: "飯團(原味/明太子/紫蘇/梅)", price: 30 }, { name: "加溫泉蛋", price: 14 }, { name: "加山藥泥", price: 14 },
    { name: "燒飯團(原味/明太子/紫蘇/梅)", price: 32 }, { name: "牛油蔥飯", price: 34 }, { name: "貓飯", price: 34 },
    { name: "冷/熱稻庭烏冬", price: 38 }, { name: "冷/熱蕎麥麵", price: 38 }, { name: "茶漬飯(原味/明太子/梅/什菌)", price: 48 }
  ],
  "海鮮類": [
    { name: "多春魚", price: 24 }, { name: "魷魚筒", price: 24 }, { name: "虎蝦配柚子鹽", price: 56 }, { name: "海鱔", price: 58 },
    { name: "紫蘇廣島蠔", price: 58 }, { name: "鯖魚", price: 62 }, { name: "秋刀魚", price: 62 }, { name: "明太子", price: 68 },
    { name: "大魷魚筒(時價)", price: 0 }, { name: "清酒煮蜆", price: 58 }, { name: "汁燒鮑魚", price: 58 }, { name: "牛油扇貝", price: 66 },
    { name: "汁燒扇貝", price: 66 }, { name: "柚子清酒貴妃蚌", price: 66 }, { name: "柚子清酒北寄貝", price: 66 }, { name: "柚子汁燒蟶子", price: 76 }
  ],
  "炸物類": [
    { name: "炸山藥條", price: 34 }, { name: "炸雞皮餃子", price: 48 }, { name: "唐揚池魚仔", price: 48 }, { name: "檸檬椒塩墨魚咀", price: 48 }
  ],
  "甜品類": [
    { name: "棉花糖", price: 22 }, { name: "黑糖脆薯", price: 28 }, { name: "燒菠蘿", price: 28 },
    { name: "雪糕(豆腐/芝麻/綠茶/玄米/海塩)", price: 28 }, { name: "香蕉朱古力", price: 38 }
  ],
  "日本酒及果酒": [
    { name: "腰古井柚子酒 (柚浪) 500ml", price: 252 }, 
    { name: "甲子正宗梅酒紀行 720ml", price: 272 },
    { name: "鍛高譚の梅 (紫蘇) 720ml", price: 312 }, 
    { name: "綠茶梅酒 720ml", price: 312 },
    { name: "千葉梨汽酒 720ml", price: 312 }, 
    { name: "94串燒 720ml", price: 432 },
    { name: "千曲錦 720ml", price: 432 }, 
    { name: "安東水軍特別純米酒 720ml", price: 432 },
    { name: "奧丹波 □ 純米吟釀 720ml", price: 592 }, 
    { name: "奧丹波 △ 純米吟釀 720ml", price: 642 },
    { name: "奧丹波 ○ 純米吟釀 720ml", price: 602 }, 
    { name: "日本盛 (House) 1800ml", price: 702 }
  ],
  "生啤酒": [
    { name: "三得利生啤酒 GOLD", price: 60 }, 
    { name: "三得利生啤酒 GOLD (JUMBO)", price: 110 },
    { name: "三得利生啤酒 BLACK", price: 70 }, 
    { name: "三得利生啤酒 BLACK (JUMBO)", price: 120 },
    { name: "三得利生啤酒 HALF", price: 70 }, 
    { name: "三得利生啤酒 HALF (JUMBO)", price: 120 }
  ],
  "小杯酒類": [
    { name: "Highball 150ml", price: 60 },
    { name: "梅酒 150ml", price: 70 },
    { name: "鍛高譚の梅 (紫蘇) 150ml", price: 70 },
    { name: "綠茶梅酒 150ml", price: 70 },
    { name: "柚子果酒 150ml", price: 70 },
    { name: "清酒 (冷) 200ml", price: 92 },
    { name: "清酒 (熱) 200ml", price: 92 }
  ],
  "特色調酒": [
    { name: "性 (桃味)", price: 70 },
    { name: "生命 (草莓味)", price: 70 },
    { name: "力量 (柑橘味)", price: 70 },
    { name: "陽光 (蘋果味)", price: 70 },
    { name: "自然 (蜜瓜味)", price: 70 },
    { name: "藝術 (柚子味)", price: 70 },
    { name: "自由 (荔枝味)", price: 70 },
    { name: "精神 (葡萄味)", price: 70 }
  ],
  "無酒精飲品": [
    { name: "可樂", price: 20 },
    { name: "熱 / 凍烏龍茶", price: 28 },
    { name: "熱綠茶", price: 28 },
    { name: "日本汽水 (波子汽水)", price: 34 },
    { name: "日本汽水 (桃味)", price: 34 },
    { name: "日本汽水 (蘋果味)", price: 34 },
    { name: "日本汽水 (蜜瓜味)", price: 34 },
    { name: "日本汽水 (紅提味)", price: 34 },
    { name: "日本汽水 (綠茶味)", price: 34 },
    { name: "日本汽水 (蜜柑味)", price: 34 },
    { name: "日本汽水 (士多啤梨味)", price: 34 },
    { name: "日本汽水 (柚子味)", price: 34 },
    { name: "日本汽水 (蕃茄味)", price: 34 },
    { name: "天然水", price: 34 }
  ],
  "其他費用": [
    { name: "開瓶費 (720ml)", price: 80 },
    { name: "開瓶費 (750ml)", price: 100 },
    { name: "開瓶費 (over 750ml)", price: 150 }
  ]
};

// Category configuration with icons
const categoryConfig = {
  "牛肉類": { icon: "牛", isDrink: false },
  "豬肉類": { icon: "豬", isDrink: false },
  "羊肉類": { icon: "羊", isDrink: false },
  "雞肉類": { icon: "雞", isDrink: false },
  "蔬菜類": { icon: "蔬", isDrink: false },
  "沙律及小菜": { icon: "沙", isDrink: false },
  "主食類": { icon: "主", isDrink: false },
  "海鮮類": { icon: "海", isDrink: false },
  "炸物類": { icon: "炸", isDrink: false },
  "甜品類": { icon: "甜", isDrink: false },
  "日本酒及果酒": { icon: "日", isDrink: true },
  "生啤酒": { icon: "生", isDrink: true },
  "小杯酒類": { icon: "小", isDrink: true },
  "特色調酒": { icon: "特", isDrink: true },
  "無酒精飲品": { icon: "無", isDrink: true },
  "其他費用": { icon: "其", isDrink: false }
};

// Optimized storage utility
const storage = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); }
    catch { return []; }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { console.warn('Storage failed'); }
  }
};

// Utility functions
const getBasePrice = (itemName) => {
  for (const items of Object.values(menuData)) {
    const item = items.find(item => item.name === itemName);
    if (item) return item.price;
  }
  return 0;
};

const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return {
    date: date.toLocaleDateString('zh-HK', { month: '2-digit', day: '2-digit' }),
    time: date.toLocaleTimeString('zh-HK', { hour: '2-digit', minute: '2-digit' }),
    fullDate: date.toLocaleDateString('zh-HK'),
    timestamp: date.getTime()
  };
};

const getDateRange = (preset) => {
  const now = new Date();
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  let startDate;

  switch (preset) {
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'quarter':
      const quarterStart = Math.floor(now.getMonth() / 3) * 3;
      startDate = new Date(now.getFullYear(), quarterStart, 1);
      break;
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
  
  return { startDate, endDate };
};

const filterOrdersByDateRange = (orders, startDate, endDate) => {
  return orders.filter(order => {
    const orderDate = new Date(order.timestamp);
    return orderDate >= startDate && orderDate <= endDate;
  });
};

const calculateDishAnalytics = (orders, filterType = 'all') => {
  const dishStats = {};
  
  orders.forEach(order => {
    order.items.forEach(item => {
      const categoryName = Object.keys(menuData).find(category => 
        menuData[category].some(menuItem => menuItem.name === item.name)
      );
      const isDrink = categoryName ? categoryConfig[categoryName]?.isDrink : false;
      
      if (filterType === 'food' && isDrink) return;
      if (filterType === 'drink' && !isDrink) return;
      
      if (!dishStats[item.name]) {
        dishStats[item.name] = {
          name: item.name,
          totalQuantity: 0,
          totalRevenue: 0,
          orderCount: 0,
          isDrink
        };
      }
      
      dishStats[item.name].totalQuantity += item.quantity;
      dishStats[item.name].totalRevenue += item.subtotal;
      dishStats[item.name].orderCount += 1;
    });
  });
  
  return Object.values(dishStats).sort((a, b) => b.totalRevenue - a.totalRevenue);
};

const calculateRevenueByCategory = (orders) => {
  let foodRevenue = 0;
  let drinkRevenue = 0;
  
  orders.forEach(order => {
    order.items.forEach(item => {
      const categoryName = Object.keys(menuData).find(category => 
        menuData[category].some(menuItem => menuItem.name === item.name)
      );
      const isDrink = categoryName ? categoryConfig[categoryName]?.isDrink : false;
      
      if (isDrink) {
        drinkRevenue += item.subtotal;
      } else {
        foodRevenue += item.subtotal;
      }
    });
  });
  
  return { foodRevenue, drinkRevenue, totalRevenue: foodRevenue + drinkRevenue };
};

const calculatePeopleAnalytics = (orders) => {
  const totalPeople = orders.reduce((sum, order) => sum + (order.partySize || 0), 0);
  const ordersWithPeople = orders.filter(order => order.partySize > 0);
  
  const groupSizes = {
    small: { count: 0, label: '小組 (1-2人)', range: [1, 2] },
    medium: { count: 0, label: '中組 (3-4人)', range: [3, 4] },
    large: { count: 0, label: '大組 (5-7人)', range: [5, 7] },
    mega: { count: 0, label: '聚會 (8+人)', range: [8, 31] },
    super: { count: 0, label: '包場 (32人)', range: [32, 32] }
  };
  
  ordersWithPeople.forEach(order => {
    const size = order.partySize;
    if (size >= 1 && size <= 2) groupSizes.small.count++;
    else if (size >= 3 && size <= 4) groupSizes.medium.count++;
    else if (size >= 5 && size <= 7) groupSizes.large.count++;
    else if (size >= 8 && size <= 31) groupSizes.mega.count++;
    else if (size === 32) groupSizes.super.count++;
  });
  
  const sizeFrequency = {};
  ordersWithPeople.forEach(order => {
    const size = order.partySize;
    sizeFrequency[size] = (sizeFrequency[size] || 0) + 1;
  });
  
  const mostCommonSizes = Object.entries(sizeFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([size, count]) => ({ size: parseInt(size), count }));
  
  return {
    totalPeople,
    ordersWithPeople: ordersWithPeople.length,
    groupSizes,
    mostCommonSizes
  };
};

const calculateItemsByPartySize = (orders) => {
  const itemsBySize = {
    small: {},
    medium: {},
    large: {},
    mega: {},
    super: {}
  };
  
  orders.filter(order => order.partySize > 0).forEach(order => {
    const size = order.partySize;
    let category;
    if (size >= 1 && size <= 2) category = 'small';
    else if (size >= 3 && size <= 4) category = 'medium';
    else if (size >= 5 && size <= 7) category = 'large';
    else if (size >= 8 && size <= 31) category = 'mega';
    else if (size === 32) category = 'super';
    
    if (category) {
      order.items.forEach(item => {
        if (!itemsBySize[category][item.name]) {
          itemsBySize[category][item.name] = { quantity: 0, revenue: 0, orders: 0 };
        }
        itemsBySize[category][item.name].quantity += item.quantity;
        itemsBySize[category][item.name].revenue += item.subtotal;
        itemsBySize[category][item.name].orders += 1;
      });
    }
  });
  
  Object.keys(itemsBySize).forEach(category => {
    itemsBySize[category] = Object.entries(itemsBySize[category])
      .sort(([,a], [,b]) => b.revenue - a.revenue)
      .slice(0, 3)
      .map(([name, stats]) => ({ name, ...stats }));
  });
  
  return itemsBySize;
};

const searchOrders = (orders, searchTerm) => {
  if (!searchTerm.trim()) return orders;
  
  const term = searchTerm.toLowerCase().trim();
  
  return orders.filter(order => {
    if (order.orderNumber.toLowerCase().includes(term)) return true;
    if (order.customerName && order.customerName.toLowerCase().includes(term)) return true;
    const hasMatchingDish = order.items.some(item => 
      item.name.toLowerCase().includes(term)
    );
    if (hasMatchingDish) return true;
    if (order.total.toString().includes(term)) return true;
    
    return false;
  });
};

const checkOrderNumberExists = (orderHistory, orderNumber) => {
  return orderHistory.some(order => order.orderNumber.toLowerCase() === orderNumber.toLowerCase());
};

// Restaurant Logo Component
function RestaurantLogo({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 120" className="w-full h-full">
        <rect x="10" y="5" width="80" height="35" rx="2" fill="none" stroke="white" strokeWidth="3"/>
        <rect x="12" y="7" width="76" height="31" rx="1" fill="#1e3a5f"/>
        <text x="50" y="30" textAnchor="middle" fill="white" fontSize="18" fontFamily="serif" fontWeight="bold">肥</text>
        <polygon points="20,50 80,50 50,85" fill="none" stroke="white" strokeWidth="3"/>
        <polygon points="22,52 78,52 50,82" fill="#1e3a5f"/>
        <text x="50" y="72" textAnchor="middle" fill="white" fontSize="14" fontFamily="serif" fontWeight="bold">後</text>
        <circle cx="50" cy="100" r="18" fill="none" stroke="white" strokeWidth="3"/>
        <circle cx="50" cy="100" r="15" fill="#1e3a5f"/>
        <text x="50" y="108" textAnchor="middle" fill="white" fontSize="12" fontFamily="serif" fontWeight="bold">屋</text>
      </svg>
    </div>
  );
}

// Fixed Category Navigation Component
function CompactCategoryNav({ expandedCategories, onCategoryClick, currentCategory, isExpanded, onToggle }) {
  const categories = Object.keys(categoryConfig);
  const navRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        onToggle(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isExpanded, onToggle]);
  
  return (
    <div className="relative" ref={navRef}>
      <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(!isExpanded);
          }}
          className={`w-12 h-10 flex items-center justify-center transition-all duration-200 hover:bg-teal-50 ${
            expandedCategories.has(currentCategory) 
              ? 'bg-teal-100 text-teal-700' 
              : 'bg-slate-50 text-slate-600 hover:text-teal-600'
          }`}
          title={currentCategory}
        >
          <span className="text-sm font-bold">{categoryConfig[currentCategory]?.icon}</span>
        </button>
        
        {/* Fixed dropdown positioning */}
        {isExpanded && (
          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-slate-200 z-[60] min-w-48 max-h-80 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={(e) => {
                  e.stopPropagation();
                  onCategoryClick(category);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-teal-50 transition-colors border-b border-slate-100 last:border-b-0 ${
                  expandedCategories.has(category) 
                    ? 'bg-teal-100 text-teal-700' 
                    : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold w-6 text-center">
                    {categoryConfig[category].icon}
                  </span>
                  <span className="text-sm">{category}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Notification Component
function Notification({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-teal-600',
    warning: 'bg-amber-500'
  };

  return (
    <div className={`fixed top-4 right-4 ${styles[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50`}>
      {type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:bg-white hover:bg-opacity-20 rounded">
        <X size={16} />
      </button>
    </div>
  );
}

// Dialog Components
function Dialog({ title, icon, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="flex items-center space-x-3 mb-4">
          {icon}
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <Dialog title="確認" icon={<AlertCircle className="text-amber-500" size={24} />}>
      <p className="text-slate-600 mb-6">{message}</p>
      <div className="flex space-x-3">
        <button onClick={onCancel} className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition-colors">
          取消
        </button>
        <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
          確認刪除
        </button>
      </div>
    </Dialog>
  );
}

function OrderNumberDialog({ orderData, orderHistory, onSave, onCancel }) {
  const [orderNumber, setOrderNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    setBookingTime(timeString);
  }, []);

  useEffect(() => {
    if (orderNumber.trim() && checkOrderNumberExists(orderHistory, orderNumber.trim())) {
      setDuplicateWarning(true);
    } else {
      setDuplicateWarning(false);
    }
  }, [orderNumber, orderHistory]);

  const handleSave = () => {
    if (!orderNumber.trim()) return;
    
    const bookingDetails = {
      orderNumber: orderNumber.trim(),
      customerName: customerName.trim() || '未提供',
      bookingTime: bookingTime || new Date().toTimeString().slice(0, 5)
    };
    
    onSave(bookingDetails);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSave();
    else if (e.key === 'Escape') onCancel();
  };

  return (
    <Dialog title="儲存訂單" icon={<Save className="text-emerald-500" size={24} />}>
      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-slate-700 font-medium mb-2">訂單編號 *</label>
          <input
            ref={inputRef}
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="例如：A001, 桌號3, 訂單123..."
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              duplicateWarning 
                ? 'border-amber-400 focus:ring-amber-500 bg-amber-50' 
                : 'border-slate-300 focus:ring-teal-500'
            }`}
          />
          {duplicateWarning && (
            <div className="mt-2 p-2 bg-amber-100 border border-amber-300 rounded text-amber-800 text-sm">
              <div className="flex items-center space-x-2">
                <AlertCircle size={16} />
                <span>此訂單編號已存在，請檢查歷史記錄或使用其他編號</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-slate-700 font-medium mb-2">訂枱人姓名</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="例如：陳先生, Ms. Wong..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-medium mb-2">訂枱時間</label>
          <input
            type="time"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="bg-slate-50 p-3 rounded-lg mb-4">
        <h4 className="font-semibold text-slate-700 mb-2">訂單明細：</h4>
        <div className="space-y-1 text-sm max-h-32 overflow-y-auto">
          {orderData.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.name} × {item.quantity}</span>
              <span>${item.subtotal}</span>
            </div>
          ))}
        </div>
        <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
          <span>總計：</span>
          <span className="text-amber-600">${orderData.total}</span>
        </div>
        {orderData.partySize && (
          <div className="text-sm text-slate-600 mt-1">
            人數：{orderData.partySize}人 | 每人：${(orderData.total / orderData.partySize).toFixed(0)}
          </div>
        )}
      </div>

      <div className="flex space-x-3">
        <button onClick={onCancel} className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition-colors">
          取消
        </button>
        <button
          onClick={handleSave}
          disabled={!orderNumber.trim()}
          className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white rounded-lg transition-colors"
        >
          {duplicateWarning ? '仍要儲存' : '儲存訂單'}
        </button>
      </div>
    </Dialog>
  );
}

function EditOrderDialog({ order, onSave, onCancel }) {
  const [orderNumber, setOrderNumber] = useState(order.orderNumber);
  const [customerName, setCustomerName] = useState(order.customerName || '');
  const [partySize, setPartySize] = useState(order.partySize?.toString() || '');
  const [bookingTime, setBookingTime] = useState(order.bookingTime || '');
  const [editItems, setEditItems] = useState(() => {
    const itemsMap = {};
    order.items.forEach(item => {
      itemsMap[item.name] = { quantity: item.quantity, price: item.price };
    });
    return itemsMap;
  });
  const [marketPrices, setMarketPrices] = useState(() => {
    const prices = {};
    order.items.forEach(item => {
      if (getBasePrice(item.name) === 0) prices[item.name] = item.price;
    });
    return prices;
  });

  const updateQuantity = (itemName, change) => {
    setEditItems(prev => {
      const currentItem = prev[itemName] || { quantity: 0, price: getItemPrice(itemName) };
      const newQty = Math.max(0, Math.min(20, currentItem.quantity + change));
      
      if (newQty === 0) {
        const { [itemName]: removed, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [itemName]: { ...currentItem, quantity: newQty } };
    });
  };

  const updateMarketPrice = (itemName, price) => {
    const numPrice = parseFloat(price) || 0;
    if (numPrice > 0) {
      setMarketPrices(prev => ({ ...prev, [itemName]: numPrice }));
      setEditItems(prev => ({ ...prev, [itemName]: { ...prev[itemName], price: numPrice } }));
    }
  };

  const getItemPrice = (itemName) => {
    const basePrice = getBasePrice(itemName);
    return basePrice === 0 ? (marketPrices[itemName] || editItems[itemName]?.price || 0) : basePrice;
  };

  const calculateTotal = () => Object.values(editItems).reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleSave = () => {
    const selectedItems = Object.entries(editItems).filter(([_, item]) => item.quantity > 0);
    if (selectedItems.length === 0) return;

    const updatedOrder = {
      ...order,
      orderNumber: orderNumber.trim(),
      customerName: customerName.trim() || '未提供',
      partySize: parseInt(partySize) || undefined,
      bookingTime: bookingTime,
      items: selectedItems.map(([itemName, item]) => ({
        name: itemName,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      })),
      total: calculateTotal()
    };
    onSave(updatedOrder);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="flex items-center space-x-3 mb-4">
          <Edit3 className="text-teal-600" size={24} />
          <h3 className="text-lg font-semibold text-slate-800">編輯訂單</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-slate-700 font-medium mb-2">訂單編號</label>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-2">訂枱人姓名</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-2">人數</label>
            <input
              type="number"
              min="1"
              max="32"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-2">訂枱時間</label>
            <input
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-slate-700 mb-3">訂單商品：</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {Object.entries(editItems).map(([itemName, item]) => (
              <div key={itemName} className="flex items-center bg-slate-50 p-3 rounded-lg">
                <div className="flex-1">
                  <span className="text-slate-800 font-medium">{itemName}</span>
                </div>
                
                <div className="w-20 text-right mr-4">
                  {getBasePrice(itemName) === 0 ? (
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-amber-600 font-bold text-xs">時價</span>
                      <input
                        type="number"
                        placeholder="$"
                        value={marketPrices[itemName] || ''}
                        onChange={(e) => updateMarketPrice(itemName, e.target.value)}
                        className="w-16 px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                  ) : (
                    <span className="text-amber-600 font-bold">${getBasePrice(itemName)}</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(itemName, -1)}
                    className="w-8 h-8 flex items-center justify-center bg-slate-200 hover:bg-slate-300 rounded-full transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(itemName, 1)}
                    className="w-8 h-8 flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white rounded-full transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>總計：</span>
              <span className="text-teal-700">${calculateTotal()}</span>
            </div>
            {partySize && parseInt(partySize) > 0 && (
              <div className="text-sm text-slate-600 mt-1">
                人數：{partySize}人 | 每人：${(calculateTotal() / parseInt(partySize)).toFixed(0)}
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg transition-colors">
            取消
          </button>
          <button
            onClick={handleSave}
            disabled={!orderNumber.trim() || Object.keys(editItems).length === 0}
            className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white rounded-lg transition-colors"
          >
            儲存變更
          </button>
        </div>
      </div>
    </div>
  );
}

// Analytics Page Component
function AnalyticsPage({ orderHistory, onBack }) {
  const [dateRange, setDateRange] = useState('month');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [sortBy, setSortBy] = useState('revenue');

  const getFilteredOrders = () => {
    if (dateRange === 'custom' && customStartDate && customEndDate) {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate + 'T23:59:59');
      return filterOrdersByDateRange(orderHistory, start, end);
    } else {
      const { startDate, endDate } = getDateRange(dateRange);
      return filterOrdersByDateRange(orderHistory, startDate, endDate);
    }
  };

  const filteredOrders = getFilteredOrders();
  const foodAnalytics = calculateDishAnalytics(filteredOrders, 'food');
  const drinkAnalytics = calculateDishAnalytics(filteredOrders, 'drink');
  const { foodRevenue, drinkRevenue, totalRevenue } = calculateRevenueByCategory(filteredOrders);
  const peopleAnalytics = calculatePeopleAnalytics(filteredOrders);
  const itemsByPartySize = calculateItemsByPartySize(filteredOrders);

  const totalOrders = filteredOrders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const revenuePerPerson = peopleAnalytics.totalPeople > 0 ? totalRevenue / peopleAnalytics.totalPeople : 0;

  const sortedFood = [...foodAnalytics].sort((a, b) => {
    switch (sortBy) {
      case 'quantity': return b.totalQuantity - a.totalQuantity;
      case 'revenue': return b.totalRevenue - a.totalRevenue;
      case 'orders': return b.orderCount - a.orderCount;
      default: return b.totalRevenue - a.totalRevenue;
    }
  });

  const sortedDrinks = [...drinkAnalytics].sort((a, b) => {
    switch (sortBy) {
      case 'quantity': return b.totalQuantity - a.totalQuantity;
      case 'revenue': return b.totalRevenue - a.totalRevenue;
      case 'orders': return b.orderCount - a.orderCount;
      default: return b.totalRevenue - a.totalRevenue;
    }
  });

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <div className="bg-gradient-to-r from-teal-700 to-teal-800 shadow-lg p-4 border-b border-teal-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <RestaurantLogo size="md" />
            <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
              <BarChart3 size={28} className="text-teal-200" />
              <span>數據分析</span>
            </h1>
          </div>
          <button
            onClick={onBack}
            className="flex items-center space-x-1 px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors"
          >
            <X size={16} />
            <span>返回</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Date Range Selector */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">時間範圍</h3>
          <div className="flex flex-wrap gap-3 mb-4">
            {[
              { key: 'week', label: '近7天' },
              { key: 'month', label: '本月' },
              { key: 'quarter', label: '本季' },
              { key: 'year', label: '今年' },
              { key: 'custom', label: '自訂範圍' }
            ].map(option => (
              <button
                key={option.key}
                onClick={() => setDateRange(option.key)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  dateRange === option.key
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {dateRange === 'custom' && (
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">開始日期</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">結束日期</label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-6">
          {[
            { label: '總營收', value: `$${totalRevenue}`, icon: <DollarSign className="text-emerald-600" size={24} />, bg: 'bg-emerald-100' },
            { label: '食物營收', value: `$${foodRevenue}`, icon: <span className="text-orange-600 text-xl">🍽️</span>, bg: 'bg-orange-100' },
            { label: '飲品營收', value: `$${drinkRevenue}`, icon: <span className="text-blue-600 text-xl">🍹</span>, bg: 'bg-blue-100' },
            { label: '總訪客數', value: peopleAnalytics.totalPeople, icon: <Users className="text-purple-600" size={24} />, bg: 'bg-purple-100' },
            { label: '每人營收', value: `$${revenuePerPerson.toFixed(0)}`, icon: <TrendingUp className="text-teal-600" size={24} />, bg: 'bg-teal-100' },
            { label: '平均訂單', value: `$${averageOrderValue.toFixed(0)}`, icon: <BarChart3 className="text-amber-600" size={24} />, bg: 'bg-amber-100' }
          ].map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{card.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                </div>
                <div className={`${card.bg} p-3 rounded-full`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Food Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
              <span className="text-xl">🍽️</span>
              <span>熱門食物 (前10名)</span>
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="revenue">按營收排序</option>
              <option value="quantity">按數量排序</option>
              <option value="orders">按訂單次數排序</option>
            </select>
          </div>
          
          <div className="space-y-3">
            {sortedFood.slice(0, 10).map((dish, index) => (
              <div key={dish.name} className="flex items-center space-x-4">
                <div className="w-8 text-center font-bold text-slate-500">#{index + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-slate-800">{dish.name}</span>
                    <span className="text-sm text-slate-600">
                      數量: {dish.totalQuantity} | 營收: ${dish.totalRevenue}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{
                        width: `${sortBy === 'revenue' 
                          ? (dish.totalRevenue / (sortedFood[0]?.totalRevenue || 1)) * 100
                          : sortBy === 'quantity'
                          ? (dish.totalQuantity / (sortedFood[0]?.totalQuantity || 1)) * 100
                          : (dish.orderCount / (sortedFood[0]?.orderCount || 1)) * 100
                        }%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Drink Items */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
              <span className="text-xl">🍹</span>
              <span>熱門飲品 (前10名)</span>
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="revenue">按營收排序</option>
              <option value="quantity">按數量排序</option>
              <option value="orders">按訂單次數排序</option>
            </select>
          </div>
          
          <div className="space-y-3">
            {sortedDrinks.slice(0, 10).map((drink, index) => (
              <div key={drink.name} className="flex items-center space-x-4">
                <div className="w-8 text-center font-bold text-slate-500">#{index + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-slate-800">{drink.name}</span>
                    <span className="text-sm text-slate-600">
                      數量: {drink.totalQuantity} | 營收: ${drink.totalRevenue}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${sortBy === 'revenue' 
                          ? (drink.totalRevenue / (sortedDrinks[0]?.totalRevenue || 1)) * 100
                          : sortBy === 'quantity'
                          ? (drink.totalQuantity / (sortedDrinks[0]?.totalQuantity || 1)) * 100
                          : (drink.orderCount / (sortedDrinks[0]?.orderCount || 1)) * 100
                        }%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Group Size Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <Users size={20} className="text-teal-600" />
            <span>團體規模分布</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {Object.entries(peopleAnalytics.groupSizes).map(([key, group]) => (
              <div key={key} className="text-center">
                <div className="bg-teal-50 rounded-lg p-4 mb-2">
                  <p className="text-2xl font-bold text-teal-700">{group.count}</p>
                  <p className="text-sm text-slate-600">{group.label}</p>
                </div>
              </div>
            ))}
          </div>

          {peopleAnalytics.mostCommonSizes.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-700 mb-3">最常見團體人數</h4>
              <div className="grid grid-cols-5 gap-3">
                {peopleAnalytics.mostCommonSizes.map((sizeData, index) => (
                  <div key={sizeData.size} className="bg-slate-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-slate-800">{sizeData.size}人</div>
                    <div className="text-sm text-slate-600">{sizeData.count}次</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Popular Items by Party Size */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">不同團體規模熱門商品</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {Object.entries(itemsByPartySize).map(([sizeCategory, items]) => {
              const categoryLabels = {
                small: '小組 (1-2人)',
                medium: '中組 (3-4人)',
                large: '大組 (5-7人)',
                mega: '聚會 (8+人)',
                super: '包場 (32人)'
              };
              
              return (
                <div key={sizeCategory} className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-700 mb-3 text-center">
                    {categoryLabels[sizeCategory]}
                  </h4>
                  <div className="space-y-2">
                    {items.slice(0, 3).map((item, index) => (
                      <div key={item.name} className="text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="w-4 h-4 bg-teal-600 text-white text-xs rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="flex-1 truncate" title={item.name}>
                            {item.name}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 ml-6">
                          ${item.revenue} • {item.quantity}份
                        </div>
                      </div>
                    ))}
                    {items.length === 0 && (
                      <div className="text-xs text-slate-400 text-center py-2">
                        暫無數據
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component
function JapaneseMenuCalculator() {
  const [quantities, setQuantities] = useState({});
  const [marketPrices, setMarketPrices] = useState({});
  const [partySize, setPartySize] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [notification, setNotification] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [orderNumberDialog, setOrderNumberDialog] = useState(null);
  const [editOrderDialog, setEditOrderDialog] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [currentCategory, setCurrentCategory] = useState('牛肉類');
  const [isCategoryNavExpanded, setIsCategoryNavExpanded] = useState(false);

  useEffect(() => {
    setOrderHistory(storage.get('restaurantOrderHistory'));
  }, []);

  const showNotification = (message, type = 'info') => setNotification({ message, type });

  const updateQuantity = (itemName, change) => {
    setQuantities(prev => {
      const newQty = Math.max(0, Math.min(20, (prev[itemName] || 0) + change));
      if (newQty === 0) {
        const { [itemName]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemName]: newQty };
    });
  };

  const updateMarketPrice = (itemName, price) => {
    const numPrice = parseFloat(price) || 0;
    if (numPrice > 0) {
      setMarketPrices(prev => ({ ...prev, [itemName]: numPrice }));
    } else {
      setMarketPrices(prev => {
        const { [itemName]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  const getItemPrice = (itemName) => {
    const basePrice = getBasePrice(itemName);
    return basePrice === 0 ? (marketPrices[itemName] || 0) : basePrice;
  };

  const calculateTotal = () => {
    return Object.entries(quantities).reduce((total, [itemName, qty]) => {
      return total + (getItemPrice(itemName) * qty);
    }, 0);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const scrollToCategory = (category) => {
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setExpandedCategories(prev => {
        const newSet = new Set(prev);
        newSet.add(category);
        return newSet;
      });
      
      setCurrentCategory(category);
      setIsCategoryNavExpanded(false);
    }
  };

  const saveOrder = () => {
    const selectedItems = Object.entries(quantities).filter(([_, qty]) => qty > 0);
    if (selectedItems.length === 0) {
      showNotification('請先選擇商品再儲存訂單', 'error');
      return;
    }

    const marketPriceItems = selectedItems.filter(([itemName, _]) => getBasePrice(itemName) === 0);
    const missingPrices = marketPriceItems.filter(([itemName, _]) => !marketPrices[itemName]);
    
    if (missingPrices.length > 0) {
      showNotification('請為時價商品設定價格', 'error');
      return;
    }

    const orderData = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      partySize: partySize ? parseInt(partySize) : undefined,
      items: selectedItems.map(([itemName, qty]) => ({
        name: itemName,
        quantity: qty,
        price: getItemPrice(itemName),
        subtotal: getItemPrice(itemName) * qty
      })),
      total: calculateTotal()
    };

    setOrderNumberDialog({
      orderData,
      onSave: (bookingDetails) => {
        const finalOrder = { 
          ...orderData, 
          orderNumber: bookingDetails.orderNumber,
          customerName: bookingDetails.customerName,
          bookingTime: bookingDetails.bookingTime
        };
        const updatedHistory = [finalOrder, ...orderHistory];
        setOrderHistory(updatedHistory);
        storage.set('restaurantOrderHistory', updatedHistory);
        
        setQuantities({});
        setMarketPrices({});
        setPartySize('');
        setExpandedCategories(new Set());
        setCurrentCategory('牛肉類');
        
        setOrderNumberDialog(null);
        showNotification(`訂單 "${bookingDetails.orderNumber}" 已儲存！`, 'success');
      },
      onCancel: () => setOrderNumberDialog(null)
    });
  };

  const editOrder = (order) => {
    setEditOrderDialog({
      order,
      onSave: (updatedOrder) => {
        const updatedHistory = orderHistory.map(o => o.id === order.id ? updatedOrder : o);
        setOrderHistory(updatedHistory);
        storage.set('restaurantOrderHistory', updatedHistory);
        setEditOrderDialog(null);
        showNotification(`訂單 "${updatedOrder.orderNumber}" 已更新！`, 'success');
      },
      onCancel: () => setEditOrderDialog(null)
    });
  };

  const deleteOrder = (orderId) => {
    setConfirmDialog({
      message: '確定要刪除這個訂單嗎？',
      onConfirm: () => {
        const updatedHistory = orderHistory.filter(order => order.id !== orderId);
        setOrderHistory(updatedHistory);
        storage.set('restaurantOrderHistory', updatedHistory);
        showNotification('訂單已刪除！', 'success');
        setConfirmDialog(null);
        setExpandedOrders(prev => {
          const newSet = new Set(prev);
          newSet.delete(orderId);
          return newSet;
        });
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const selectedItems = Object.entries(quantities).filter(([_, qty]) => qty > 0);
  const total = calculateTotal();
  const perPersonCost = partySize && parseInt(partySize) > 0 ? total / parseInt(partySize) : 0;

  const filteredOrderHistory = searchOrders(orderHistory, searchTerm);

  if (showAnalytics) {
    return (
      <AnalyticsPage 
        orderHistory={orderHistory} 
        onBack={() => setShowAnalytics(false)} 
      />
    );
  }

  if (showHistory) {
    return (
      <div className="h-screen bg-slate-50 flex flex-col">
        <div className="bg-gradient-to-r from-teal-700 to-teal-800 shadow-lg p-4 border-b border-teal-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <RestaurantLogo size="md" />
              <h1 className="text-2xl font-bold text-white">訂單歷史 ({orderHistory.length})</h1>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowAnalytics(true)}
                className="flex items-center space-x-1 px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors"
              >
                <BarChart3 size={16} />
                <span>數據分析</span>
              </button>
              <button
                onClick={() => setShowHistory(false)}
                className="flex items-center space-x-1 px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
              >
                <X size={16} />
                <span>返回菜單</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋訂單編號、顧客姓名、商品名稱或金額..."
              className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>

          {searchTerm && (
            <div className="mt-2 text-sm text-teal-100">
              {filteredOrderHistory.length === 0 ? (
                <span className="text-red-300">找不到符合條件的訂單</span>
              ) : (
                <span>
                  找到 <span className="font-semibold text-white">{filteredOrderHistory.length}</span> 個符合條件的訂單
                  {filteredOrderHistory.length !== orderHistory.length && (
                    <span className="text-teal-200"> (共 {orderHistory.length} 個訂單)</span>
                  )}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {filteredOrderHistory.length === 0 ? (
            <div className="text-center py-12">
              {searchTerm ? (
                <>
                  <Search size={48} className="mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-500 text-lg mb-2">找不到符合條件的訂單</p>
                  <p className="text-slate-400 text-sm">
                    試試搜尋其他關鍵字，或
                    <button 
                      onClick={clearSearch}
                      className="text-teal-600 hover:text-teal-700 underline ml-1"
                    >
                      清除搜尋條件
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <Calendar size={48} className="mx-auto text-slate-400 mb-4" />
                  <p className="text-slate-500 text-lg">暫無訂單記錄</p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-3 max-w-4xl mx-auto">
              {filteredOrderHistory.map((order) => {
                const isExpanded = expandedOrders.has(order.id);
                const { date, time } = formatDateTime(order.timestamp);
                return (
                  <div key={order.id} className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div 
                      className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() => toggleOrderExpansion(order.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold text-slate-800 text-lg">
                              訂單編號: 
                              <span className={searchTerm && order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) 
                                ? 'bg-yellow-200 px-1 rounded' : ''}>
                                {order.orderNumber}
                              </span>
                            </h3>
                            <div className="flex items-center space-x-3 text-sm text-slate-500">
                              <span>{date}</span>
                              <span>{time}</span>
                              {order.customerName && (
                                <span className={searchTerm && order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) 
                                  ? 'bg-yellow-200 px-1 rounded' : ''}>
                                  {order.customerName}
                                </span>
                              )}
                              {order.partySize && <span>{order.partySize}人</span>}
                              {order.bookingTime && <span>{order.bookingTime}</span>}
                              <span>{order.items.length} 項商品</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <span className={`text-xl font-bold text-amber-600 ${
                              searchTerm && order.total.toString().includes(searchTerm) 
                                ? 'bg-yellow-200 px-1 rounded' : ''
                            }`}>
                              ${order.total}
                            </span>
                            {order.partySize && (
                              <div className="text-sm text-slate-500">
                                每人：${(order.total / order.partySize).toFixed(0)}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              editOrder(order);
                            }}
                            className="p-2 text-teal-600 hover:bg-teal-50 rounded transition-colors"
                            title="編輯訂單"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteOrder(order.id);
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="刪除訂單"
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className="text-slate-400">
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t bg-slate-50">
                        <div className="pt-3 space-y-2">
                          <h4 className="font-medium text-slate-700 mb-2">訂單明細：</h4>
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className={searchTerm && item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                                ? 'bg-yellow-200 px-1 rounded' : ''}>
                                {item.name} × {item.quantity}
                              </span>
                              <span>${item.subtotal}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        {confirmDialog && <ConfirmDialog message={confirmDialog.message} onConfirm={confirmDialog.onConfirm} onCancel={confirmDialog.onCancel} />}
        {editOrderDialog && <EditOrderDialog order={editOrderDialog.order} onSave={editOrderDialog.onSave} onCancel={editOrderDialog.onCancel} />}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <div className="flex-1 flex flex-col">
        <div className="bg-gradient-to-r from-teal-700 to-teal-800 shadow-lg p-4 border-b border-teal-600">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <RestaurantLogo size="lg" />
              <h1 className="text-2xl font-bold text-white">肥後屋計數機</h1>
              <CompactCategoryNav 
                expandedCategories={expandedCategories}
                onCategoryClick={scrollToCategory}
                currentCategory={currentCategory}
                isExpanded={isCategoryNavExpanded}
                onToggle={setIsCategoryNavExpanded}
              />
            </div>
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center space-x-1 px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors"
            >
              <History size={16} />
              <span>歷史記錄</span>
              {orderHistory.length > 0 && (
                <span className="bg-white text-teal-700 text-xs rounded-full px-2 py-1 ml-1 font-semibold">
                  {orderHistory.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {Object.entries(menuData).map(([category, items]) => (
            <div key={category} id={`category-${category}`} className="mb-8">
              <div 
                className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg shadow-sm border border-slate-200 mb-4 hover:bg-slate-50 transition-colors"
                onClick={() => toggleCategory(category)}
              >
                <h2 className="text-xl font-semibold text-slate-700 flex items-center space-x-3">
                  <span className="w-8 h-8 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center text-sm font-bold">
                    {categoryConfig[category]?.icon}
                  </span>
                  <span>{category}</span>
                </h2>
                <div className="text-slate-400">
                  {expandedCategories.has(category) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {expandedCategories.has(category) && (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.name} className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-slate-200">
                      <div className="flex-1">
                        <span className="text-slate-800 font-medium">{item.name}</span>
                      </div>
                      
                      <div className="w-20 text-right">
                        {item.price === 0 ? (
                          <div className="flex flex-col items-end space-y-1">
                            <span className="text-amber-600 font-bold text-xs">時價</span>
                            <input
                              type="number"
                              placeholder="$"
                              value={marketPrices[item.name] || ''}
                              onChange={(e) => updateMarketPrice(item.name, e.target.value)}
                              className="w-16 px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                          </div>
                        ) : (
                          <span className="text-amber-600 font-bold">${item.price}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => updateQuantity(item.name, -1)}
                          className="w-8 h-8 flex items-center justify-center bg-slate-200 hover:bg-slate-300 rounded-full transition-colors"
                          disabled={!quantities[item.name]}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">{quantities[item.name] || 0}</span>
                        <button
                          onClick={() => updateQuantity(item.name, 1)}
                          className="w-8 h-8 flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white rounded-full transition-colors"
                          disabled={item.price === 0 && !marketPrices[item.name]}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-80 bg-white shadow-lg flex flex-col border-l border-slate-200">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-800">訂單明細</h2>
            {selectedItems.length > 0 && (
              <button
                onClick={() => {
                  setQuantities({});
                  setMarketPrices({});
                  setPartySize('');
                }}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition-colors"
              >
                <Trash2 size={14} />
                <span>清空</span>
              </button>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">人數</label>
            <input
              type="number"
              min="1"
              max="32"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              placeholder="輸入用餐人數"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {selectedItems.length === 0 ? (
            <p className="text-slate-500 text-center py-8">尚未選擇任何項目</p>
          ) : (
            <div className="space-y-3">
              {selectedItems.map(([itemName, qty]) => {
                const price = getItemPrice(itemName);
                const subtotal = price * qty;
                return (
                  <div key={itemName} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="font-medium text-slate-800 text-sm mb-1">{itemName}</div>
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>${price} × {qty}</span>
                      <span className="font-semibold">${subtotal}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {selectedItems.length > 0 && (
          <div className="p-6 border-t bg-slate-50">
            <div className="flex justify-between items-center text-xl font-bold text-slate-800 mb-2">
              <span>總計:</span>
              <span className="text-amber-600">${total}</span>
            </div>
            {perPersonCost > 0 && (
              <div className="text-sm text-slate-600 text-right mb-4">
                每人：${perPersonCost.toFixed(0)}
              </div>
            )}
            <button
              onClick={saveOrder}
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-colors shadow-md"
            >
              <Save size={18} />
              <span>儲存訂單</span>
            </button>
          </div>
        )}
      </div>

      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      {confirmDialog && <ConfirmDialog message={confirmDialog.message} onConfirm={confirmDialog.onConfirm} onCancel={confirmDialog.onCancel} />}
      {orderNumberDialog && <OrderNumberDialog orderData={orderNumberDialog.orderData} orderHistory={orderHistory} onSave={orderNumberDialog.onSave} onCancel={orderNumberDialog.onCancel} />}
      {editOrderDialog && <EditOrderDialog order={editOrderDialog.order} onSave={editOrderDialog.onSave} onCancel={editOrderDialog.onCancel} />}
    </div>
  );
}

export default JapaneseMenuCalculator;
