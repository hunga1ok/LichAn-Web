'use client';

import { useState } from 'react';

export default function DoiNgayPage() {
  const [mode, setMode] = useState<'solar2lunar' | 'lunar2solar'>('solar2lunar');
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">Đổi Ngày Âm Dương</h1>
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="flex border-b">
          <button 
            className={`flex-1 py-4 text-center font-medium ${mode === 'solar2lunar' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
            onClick={() => setMode('solar2lunar')}
          >
            Dương → Âm
          </button>
          <button 
            className={`flex-1 py-4 text-center font-medium ${mode === 'lunar2solar' ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}
            onClick={() => setMode('lunar2solar')}
          >
            Âm → Dương
          </button>
        </div>
        
        <div className="p-6">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Chức năng đổi ngày đang được tích hợp!"); }}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
                <select className="w-full border rounded-md p-2 bg-white">
                  {Array.from({length: 31}, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tháng</label>
                <select className="w-full border rounded-md p-2 bg-white">
                  {Array.from({length: 12}, (_, i) => i + 1).map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Năm</label>
                <input type="number" defaultValue={2026} className="w-full border rounded-md p-2" />
              </div>
            </div>
            
            <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors">
              Chuyển Đổi
            </button>
          </form>
          
          <div className="mt-8 p-4 bg-background-alt border border-primary-light/30 rounded-lg text-center hidden">
             {/* Kết quả sẽ render ở đây */}
          </div>
        </div>
      </div>
    </div>
  );
}
