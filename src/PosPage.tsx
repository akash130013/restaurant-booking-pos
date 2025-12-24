import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ChefHat } from 'lucide-react';

// --- Type Definitions ---
interface MenuItem {
  id: number;
  name: string;
  price: number;
  cat: string;
  color: string;
}

interface CartItem extends MenuItem {
  qty: number;
}

// --- Mock Data ---
const CATEGORIES: string[] = ["All", "Starters", "Mains", "Drinks"];
const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: "Garlic Bread", price: 5.00, cat: "Starters", color: "bg-orange-100" },
  { id: 2, name: "Caesar Salad", price: 12.00, cat: "Starters", color: "bg-green-100" },
  { id: 3, name: "Beef Burger", price: 15.00, cat: "Mains", color: "bg-red-100" },
  { id: 4, name: "Grilled Salmon", price: 18.00, cat: "Mains", color: "bg-blue-100" },
  { id: 5, name: "Coke Zero", price: 3.00, cat: "Drinks", color: "bg-gray-200" },
];

export default function PosPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [category, setCategory] = useState<string>("All");

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === item.id);
      if (exist) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart(prev => 
      prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
          .filter(i => i.qty > 0)
    );
  };

  const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  const filteredItems = category === "All" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(i => i.cat === category);

  return (
    <div className="flex h-screen overflow-hidden text-gray-900">
      {/* LEFT: MENU AREA */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
          <h1 className="font-bold text-xl text-gray-800">Table 05 <span className="text-sm font-normal text-gray-500">| Walk-in</span></h1>
          <div className="flex gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} 
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${category === cat ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <button key={item.id} onClick={() => addToCart(item)}
              className={`${item.color} p-4 h-32 rounded-xl border border-black/5 flex flex-col justify-between hover:scale-[1.02] active:scale-95 transition-all text-left shadow-sm`}>
              <span className="font-bold text-gray-800">{item.name}</span>
              <span className="bg-white/60 self-start px-2 py-1 rounded text-sm font-semibold">${item.price.toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: CART SIDEBAR */}
      <div className="w-96 bg-white border-l shadow-xl flex flex-col z-10">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-700 font-bold">
            <ShoppingCart size={20} /> Current Order
          </div>
          <button onClick={() => setCart([])} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 && <div className="text-center text-gray-400 mt-10">Cart is empty</div>}
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-800">{item.name}</div>
                <div className="text-xs text-gray-500">${item.price.toFixed(2)} x {item.qty}</div>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-white rounded shadow-sm"><Minus size={14}/></button>
                <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-white rounded shadow-sm"><Plus size={14}/></button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 border-t space-y-3">
          <div className="flex justify-between text-xl font-bold text-gray-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95">
            <ChefHat size={20} /> Send to Kitchen
          </button>
        </div>
      </div>
    </div>
  );
}