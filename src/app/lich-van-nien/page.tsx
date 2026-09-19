'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LichVanNienPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const nextMonth = () => {
    setCurrentDate(new Date(year, month, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 2, 1));
  };

  // Logic gen lịch cơ bản (chỉ dương lịch để minh họa UI client, thực tế sẽ gọi API hoặc xử lý thêm)
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayIndex = new Date(year, month - 1, 1).getDay(); // 0 is Sunday
  
  // Chuyển 0 (CN) -> 7 để tiện cho T2-CN
  const startDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1; 

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">Tháng trước</button>
        <h1 className="text-2xl font-bold text-primary">Tháng {month} Năm {year}</h1>
        <button onClick={nextMonth} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">Tháng sau</button>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 text-center font-bold text-gray-600">
        {weekDays.map(d => (
          <div key={d} className={`p-2 ${d === 'CN' ? 'text-danger' : ''}`}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {days.map((day, idx) => {
          if (!day) return <div key={idx} className="p-2 border rounded border-transparent bg-gray-50/50"></div>;
          
          const isToday = day === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear();
          const isSunday = (idx % 7) === 6;
          const urlDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

          return (
            <Link 
              href={`/xem-ngay/${urlDate}`} 
              key={idx} 
              className={`relative flex flex-col p-2 md:p-4 border rounded hover:border-primary transition-colors min-h-[80px]
                ${isToday ? 'border-primary border-2 bg-primary/5' : 'border-gray-200'}
              `}
            >
              <span className={`text-lg md:text-xl font-bold ${isSunday ? 'text-danger' : 'text-gray-800'}`}>
                {day}
              </span>
              <span className="text-xs text-gray-500 mt-auto">
                {/* Placeholder cho ngày âm */}
                âm {day}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
