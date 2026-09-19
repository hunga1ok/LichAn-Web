/**
 * Lịch An — Trình Tạo Lịch iCalendar (.ics) Chuẩn RFC 5545
 * ============================================================================
 * Hỗ trợ đồng bộ tự động vào Apple Calendar (iPhone/iPad/Mac),
 * Google Calendar (Android/Web), Microsoft Outlook.
 * 
 * Tự động tính toán ngày Rằm (15 âm), Mùng 1 (1 âm) và các ngày lễ
 * truyền thống Việt Nam dựa trên thuật toán thiên văn Hồ Ngọc Đức.
 * ============================================================================
 */

import { lunarService } from '@/lib/lunar';
import type { DayInfo } from '@/types/lunar';

export interface IcsEventOptions {
  includeRamMung1?: boolean;
  includeFestivals?: boolean;
  enableReminder?: boolean;
  reminderHoursBefore?: number; // Mặc định 4 giờ trước 00:00 ngày diễn ra = 20:00 tối hôm trước
}

export interface CalendarEvent {
  uid: string;
  summary: string;
  description: string;
  solarDate: { day: number; month: number; year: number };
  lunarDate: { day: number; month: number; year: number; isLeap: boolean };
  category: 'MUNG_1' | 'RAM' | 'LE_TET';
}

/**
 * Định dạng số thành 2 chữ số (01, 02...)
 */
function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

/**
 * Format date thành YYYYMMDD
 */
function formatDateToIcs(year: number, month: number, day: number): string {
  return `${year}${pad2(month)}${pad2(day)}`;
}

/**
 * Tính ngày tiếp theo cho DTEND (RFC 5545 DTEND cho VALUE=DATE là non-inclusive)
 */
function getNextDay(year: number, month: number, day: number): { day: number; month: number; year: number } {
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + 1);
  return {
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
  };
}

/**
 * Escape các ký tự đặc biệt theo chuẩn RFC 5545
 */
function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Danh mục các ngày lễ truyền thống âm lịch Việt Nam
 */
const TRADITIONAL_LUNAR_FESTIVALS: Record<string, { title: string; desc: string }> = {
  '1-1': {
    title: 'Mùng 1 Tết Nguyên Đán',
    desc: 'Ngày đầu năm mới âm lịch. Cúng Giao thừa, cúng Nguyên Đán, xuất hành hướng Cát, mừng tuổi ông bà cha mẹ.',
  },
  '2-1': {
    title: 'Mùng 2 Tết Nguyên Đán',
    desc: 'Mùng hai Tết, chúc Tết họ hàng nội ngoại, du xuân.',
  },
  '3-1': {
    title: 'Mùng 3 Tết Nguyên Đán',
    desc: 'Mùng ba Tết thầy, lễ Tạ gia tiên, hóa vàng.',
  },
  '15-1': {
    title: 'Rằm Tháng Giêng (Tết Nguyên Tiêu)',
    desc: 'Cả năm được rằm tháng Bảy không bằng rằm tháng Giêng. Ngày cầu an, dâng lễ đầu năm cát tường vạn sự.',
  },
  '3-3': {
    title: 'Tết Hàn Thực (Bánh trôi, bánh chay)',
    desc: 'Ngày mùng 3 tháng 3 âm lịch, phong tục làm bánh trôi bánh chay dâng cúng tổ tiên cội nguồn.',
  },
  '10-3': {
    title: 'Giỗ Tổ Hùng Vương (10/3 Âm lịch)',
    desc: 'Ngày Quốc lễ tưởng nhớ công ơn các vua Hùng dựng nước. Dù ai đi ngược về xuôi, nhớ ngày Giỗ Tổ mùng mười tháng ba.',
  },
  '15-4': {
    title: 'Đại Lễ Phật Đản (15/4 Âm lịch)',
    desc: 'Kỷ niệm ngày Đức Phật Thích Ca Mâu Ni đản sinh. Ngày ăn chay niệm Phật, phóng sinh tích phúc đức.',
  },
  '5-5': {
    title: 'Tết Đoan Ngọ (Giết sâu bọ)',
    desc: 'Tết Đoan Dương mùng 5 tháng 5 âm lịch. Phong tục ăn hoa quả chua, rượu nếp, tắm lá thảo mộc trừ tà độc.',
  },
  '15-7': {
    title: 'Rằm Tháng Bảy (Đại Lễ Vu Lan Báo Hiếu)',
    desc: 'Lễ Vu Lan tưởng nhớ công ơn dưỡng dục sinh thành cha mẹ và ngày Xá tội vong nhân.',
  },
  '15-8': {
    title: 'Rằm Trung Thu (Tết Đoàn Viên)',
    desc: 'Tết Trung Thu, trông trăng rước đèn, phá cỗ đoàn viên ngắm ánh trăng sáng nhất mùa thu.',
  },
  '9-9': {
    title: 'Tết Trùng Cửu (9/9 Âm lịch)',
    desc: 'Ngày Tết Trùng Dương, đăng cao ngắm cảnh, thưởng hoa cúc, cầu chúc trường thọ an khang.',
  },
  '23-12': {
    title: 'Tết Táo Quân (23 tháng Chạp)',
    desc: 'Tiễn ông Công ông Táo chầu trời cưỡi cá chép bẩm báo Ngọc Hoàng. Bắt đầu không khí Tết cổ truyền.',
  },
};

/**
 * Thu thập tất cả sự kiện âm lịch (Rằm, Mùng 1, Lễ Tết) trong một năm dương lịch
 */
export function getYearLunarEvents(
  year: number,
  options: IcsEventOptions = {}
): CalendarEvent[] {
  const {
    includeRamMung1 = true,
    includeFestivals = true,
  } = options;

  const events: CalendarEvent[] = [];
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInYear = isLeapYear ? 366 : 365;

  const startDate = new Date(year, 0, 1);

  for (let i = 0; i < daysInYear; i++) {
    const curr = new Date(startDate);
    curr.setDate(startDate.getDate() + i);

    const sDay = curr.getDate();
    const sMonth = curr.getMonth() + 1;
    const sYear = curr.getFullYear();

    const dayInfo: DayInfo = lunarService.getDayInfo(sDay, sMonth, sYear);
    const { lunarDate, canChiDay, canChiMonth, canChiYear, gioHoangDao, tietKhi } = dayInfo;
    const isLeapText = lunarDate.leap ? ' (Nhuận)' : '';
    const gioHdList = gioHoangDao.filter(g => g.isHoangDao).map(g => g.name).join(', ');

    const baseDescription = [
      `Âm lịch: Ngày ${lunarDate.day} tháng ${lunarDate.month}${isLeapText} năm ${canChiYear.fullName}`,
      `Can chi ngày: ${canChiDay.fullName} - Tháng: ${canChiMonth.fullName}`,
      `Tiết khí: ${tietKhi}`,
      `Giờ Hoàng Đạo: ${gioHdList}`,
      `Nguồn: Lịch An (https://lichan.com)`,
    ].join('\n');

    // 1. Kiểm tra Mùng 1
    if (includeRamMung1 && lunarDate.day === 1) {
      events.push({
        uid: `mung-1-${sYear}-${pad2(sMonth)}-${pad2(sDay)}@lichan.com`,
        summary: `Mùng 1 Tháng ${lunarDate.month}${isLeapText} ÂL (${canChiDay.fullName})`,
        description: `Sóc nhật (Mùng 1 đầu tháng âm lịch). Thích hợp thắp hương dâng lễ cầu bình an, may mắn cho cả tháng.\n\n${baseDescription}`,
        solarDate: { day: sDay, month: sMonth, year: sYear },
        lunarDate: { day: lunarDate.day, month: lunarDate.month, year: lunarDate.year, isLeap: lunarDate.leap === 1 },
        category: 'MUNG_1',
      });
    }

    // 2. Kiểm tra Ngày Rằm (15 âm)
    if (includeRamMung1 && lunarDate.day === 15) {
      // Nếu là Rằm tháng Giêng hoặc Rằm tháng Bảy hoặc Rằm Trung Thu thì có mô tả phong phú hơn
      let specialNote = 'Vọng nhật (Ngày Rằm). Thích hợp dâng hoa quả, thắp hương bái tạ tổ tiên thần linh, phóng sinh làm việc thiện.';
      if (lunarDate.month === 1 && !lunarDate.leap) {
        specialNote = 'Rằm Tháng Giêng (Tết Nguyên Tiêu) - Cả năm được rằm tháng Bảy không bằng rằm tháng Giêng.';
      } else if (lunarDate.month === 7 && !lunarDate.leap) {
        specialNote = 'Rằm Tháng Bảy (Đại Lễ Vu Lan Báo Hiếu & Xá tội vong nhân).';
      } else if (lunarDate.month === 8 && !lunarDate.leap) {
        specialNote = 'Rằm Tháng Tám (Tết Trung Thu - Tết Đoàn Viên).';
      }

      events.push({
        uid: `ram-thang-${lunarDate.month}-${sYear}-${pad2(sMonth)}-${pad2(sDay)}@lichan.com`,
        summary: `Rằm Tháng ${lunarDate.month}${isLeapText} ÂL (${specialNote.split('-')[0].trim()})`,
        description: `${specialNote}\n\n${baseDescription}`,
        solarDate: { day: sDay, month: sMonth, year: sYear },
        lunarDate: { day: lunarDate.day, month: lunarDate.month, year: lunarDate.year, isLeap: lunarDate.leap === 1 },
        category: 'RAM',
      });
    }

    // 3. Kiểm tra ngày lễ truyền thống
    if (includeFestivals) {
      const festivalKey = `${lunarDate.day}-${lunarDate.month}`;
      const festival = TRADITIONAL_LUNAR_FESTIVALS[festivalKey];
      // Tránh lặp sự kiện nếu đã add rằm/mùng 1 (hoặc làm nổi bật ngày lễ)
      if (festival && !(lunarDate.leap === 1)) {
        // Nếu ngày lễ trùng với Mùng 1 hoặc Rằm, ta cập nhật summary của event vừa thêm hoặc thêm sự kiện riêng biệt
        const existingIdx = events.findIndex(
          e => e.solarDate.day === sDay && e.solarDate.month === sMonth && e.solarDate.year === sYear
        );

        if (existingIdx !== -1) {
          // Nâng cấp sự kiện đã có lên tên Lễ hội trọng thể
          events[existingIdx].summary = `${festival.title} (Âm Lịch)`;
          events[existingIdx].description = `${festival.desc}\n\n${baseDescription}`;
          events[existingIdx].category = 'LE_TET';
        } else {
          events.push({
            uid: `le-tet-${festivalKey}-${sYear}-${pad2(sMonth)}-${pad2(sDay)}@lichan.com`,
            summary: `${festival.title} (Âm Lịch)`,
            description: `${festival.desc}\n\n${baseDescription}`,
            solarDate: { day: sDay, month: sMonth, year: sYear },
            lunarDate: { day: lunarDate.day, month: lunarDate.month, year: lunarDate.year, isLeap: false },
            category: 'LE_TET',
          });
        }
      }

      // Kiểm tra Đêm Giao Thừa (ngày cuối cùng của tháng Chạp)
      if (lunarDate.month === 12) {
        // Kiểm tra xem ngày mai có phải là mùng 1 tháng 1 không
        const tomorrow = new Date(curr);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomLunar = lunarService.solarToLunar(tomorrow.getDate(), tomorrow.getMonth() + 1, tomorrow.getFullYear());
        if (tomLunar.day === 1 && tomLunar.month === 1) {
          events.push({
            uid: `giao-thua-${sYear}-${pad2(sMonth)}-${pad2(sDay)}@lichan.com`,
            summary: `Đêm Giao Thừa (${lunarDate.day} tháng Chạp - Trừ Tịch)`,
            description: `Thời khắc thiêng liêng chuyển giao năm cũ sang năm mới ${canChiYear.fullName}. Làm lễ cúng Tất Niên và Giao thừa nghênh đón năm mới bình an đại cát.\n\n${baseDescription}`,
            solarDate: { day: sDay, month: sMonth, year: sYear },
            lunarDate: { day: lunarDate.day, month: lunarDate.month, year: lunarDate.year, isLeap: false },
            category: 'LE_TET',
          });
        }
      }
    }
  }

  return events;
}

/**
 * Tạo chuỗi iCalendar (.ics) chuẩn RFC 5545
 */
export function generateIcsContent(
  events: CalendarEvent[],
  options: {
    calendarName?: string;
    calendarDesc?: string;
    enableReminder?: boolean;
    reminderHoursBefore?: number;
  } = {}
): string {
  const {
    calendarName = 'Lịch Âm Lịch An (Rằm, Mùng 1 & Lễ Tết)',
    calendarDesc = 'Lịch nhắc ngày Rằm, Mùng 1 và các ngày lễ cổ truyền Việt Nam do Lịch An (lichan.com) cung cấp.',
    enableReminder = true,
    reminderHoursBefore = 4, // 4 tiếng trước 00:00 = 20:00 tối hôm trước
  } = options;

  const now = new Date();
  const dtstamp = `${now.getUTCFullYear()}${pad2(now.getUTCMonth() + 1)}${pad2(now.getUTCDate())}T${pad2(now.getUTCHours())}${pad2(now.getUTCMinutes())}${pad2(now.getUTCSeconds())}Z`;

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lich An//Lich Van Nien Viet Nam RFC5545//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeIcsText(calendarName)}`,
    `X-WR-CALDESC:${escapeIcsText(calendarDesc)}`,
    'X-WR-TIMEZONE:Asia/Ho_Chi_Minh',
  ];

  for (const event of events) {
    const dtstart = formatDateToIcs(event.solarDate.year, event.solarDate.month, event.solarDate.day);
    const nextDay = getNextDay(event.solarDate.year, event.solarDate.month, event.solarDate.day);
    const dtend = formatDateToIcs(nextDay.year, nextDay.month, nextDay.day);

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${event.uid}`);
    lines.push(`DTSTAMP:${dtstamp}`);
    lines.push(`DTSTART;VALUE=DATE:${dtstart}`);
    lines.push(`DTEND;VALUE=DATE:${dtend}`);
    lines.push(`SUMMARY:${escapeIcsText(event.summary)}`);
    lines.push(`DESCRIPTION:${escapeIcsText(event.description)}`);
    lines.push(`CATEGORIES:${event.category === 'LE_TET' ? 'LỄ TẾT,NGÀY LỄ' : 'LỊCH ÂM'}`);
    lines.push('STATUS:CONFIRMED');
    lines.push('TRANSP:TRANSPARENT');

    // Thêm cảnh báo nhắc nhở VALARM nếu được bật
    if (enableReminder) {
      lines.push('BEGIN:VALARM');
      lines.push('ACTION:DISPLAY');
      lines.push(`DESCRIPTION:${escapeIcsText(`Nhắc nhở: Ngày mai là ${event.summary}`)}`);
      // -PT4H nghĩa là 4 tiếng trước mốc 00:00 ngày diễn ra = 20:00 tối hôm trước
      lines.push(`TRIGGER:-PT${reminderHoursBefore}H`);
      lines.push('END:VALARM');
    }

    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');

  return lines.join('\r\n') + '\r\n';
}
