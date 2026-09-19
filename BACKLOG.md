# LỊCH AN (lichan.com) — PRODUCT BACKLOG & ROADMAP

> **Tầm nhìn**: Nền tảng tra cứu lịch âm dương, phong thủy và văn hóa cổ truyền Việt Nam chuẩn xác nhất, giao diện hiện đại, tối ưu trải nghiệm người dùng, hỗ trợ đa nền tảng (Web & Mobile API).

---

## 📊 TỔNG QUAN TIẾN ĐỘ HIỆN TẠI

- **Bộ kiểm thử tự động (Unit Tests)**: `437/437 Tests PASS (100%)`.
  - Core Thuật toán Âm Dương Hồ Ngọc Đức: `64/64 PASS` (Kiểm định > 3.653 ngày).
  - Module Trạch Nhật (Xem Ngày Tốt Chuyên Sâu): `105/105 PASS`.
  - Module Kho Văn Khấn Cổ Truyền: `96/96 PASS`.
  - Module Phong Thủy (Tam Tai - Kim Lâu - Hoang Ốc): `73/73 PASS`.
  - REST API Backend Endpoints: `18/18 PASS`.
  - Module Đồng Bộ Lịch (.ICS) & Đếm Ngược Tết: `33/33 PASS`.
  - Module Tử Vi Cá Nhân Hóa & Cửu Diệu Niên Hạn: `48/48 PASS`.
- **Kiến trúc hệ thống**: Next.js 16 (App Router) + TypeScript Strict + Tailwind CSS 4 + SSG (Static Site Generation 111 trang).
- **Trạng thái Repo**: Đã đồng bộ lên GitHub `https://github.com/hunga1ok/LichAn-Web.git`.

---

## 🗓️ CÁC SPRINT & DANH MỤC CÔNG VIỆC (BACKLOG)

```
┌────────────────────────────────────────────────────────────────────────┐
│                          LỘ TRÌNH TRIỂN KHAI                          │
├───────────────────┬───────────────────────────────────┬────────────────┤
│ Giai đoạn         │ Nội dung trọng tâm                │ Trạng thái     │
├───────────────────┼───────────────────────────────────┼────────────────┤
│ Sprint 1          │ Core Lịch Âm, Xem Ngày Tốt,       │ ✅ Hoàn thành  │
│                   │ Văn Khấn Cổ Truyền                │                │
├───────────────────┼───────────────────────────────────┼────────────────┤
│ Sprint 2          │ Bộ công cụ Phong Thủy: Tam Tai,   │ ✅ Hoàn thành  │
│                   │ Kim Lâu, Hoang Ốc & Mượn Tuổi     │                │
├───────────────────┼───────────────────────────────────┼────────────────┤
│ Sprint 3          │ REST API Backend (/api/v1/...)    │ ✅ Hoàn thành  │
│                   │ chuẩn bị cho Mobile App           │                │
├───────────────────┼───────────────────────────────────┼────────────────┤
│ Sprint 4          │ Đồng bộ Lịch (.ics) & Đếm ngược   │ ✅ Hoàn thành  │
│                   │ Tết Nguyên Đán (Viral / Traffic)  │                │
├───────────────────┼───────────────────────────────────┼────────────────┤
│ Sprint 5          │ Tử Vi Cá Nhân Hóa: Cửu Diệu Sao   │ ✅ Hoàn thành  │
│                   │ Chiếu Mệnh & Bát Trạch Hướng Nhà  │                │
├───────────────────┼───────────────────────────────────┼────────────────┤
│ Sprint 6          │ PWA Offline & Thông báo đẩy       │ ⏳ Kế tiếp     │
│                   │ nhắc nhở Mùng 1, Ngày Rằm         │                │
└───────────────────┴───────────────────────────────────┴────────────────┘
```

---

## 🚀 CHI TIẾT TỪNG SPRINT

### ✅ SPRINT 1: NỀN TẢNG LÕI & CÁC TÍNH NĂNG CƠ BẢN (ĐÃ XONG 100%)
- [x] **Core Lunar Library**: Thuật toán thiên văn Hồ Ngọc Đức tính toán tọa độ mặt trăng mặt trời, can chi, 24 tiết khí, trực nhật, sao tốt/xấu, giờ hoàng đạo.
- [x] **Lịch Vạn Niên (`/lich-van-nien`)**: Lưới lịch tháng 7 cột trực quan, đổi tháng/năm, hiển thị ngày lễ và ngày hôm nay.
- [x] **Đổi Ngày Âm Dương (`/doi-ngay-am-duong`)**: Chuyển đổi 2 chiều Dương ↔ Âm, hỗ trợ tháng nhuận.
- [x] **Xem Ngày Tốt Chuyên Sâu (`/xem-ngay-tot`)**:
  - Chọn ngày tốt theo 4 mục đích: Cưới hỏi, Khai trương, Động thổ, Xuất hành.
  - Lọc bỏ đại hung (Tam Nương, Nguyệt Kỵ, Sát Chủ, Thụ Tử, Nguyệt Phá).
  - Tích hợp bảng Âm Dương Bất Tương, Hướng Hỷ Thần, Tài Thần và 6 giờ Lý Thuần Phong.
- [x] **Kho Văn Khấn Cổ Truyền (`/van-khan`)**:
  - 11 bài văn khấn kinh điển phân theo 5 danh mục phong tục.
  - Trình đọc văn khấn tương tác: Tăng giảm cỡ chữ (A/A+/A++), checklist sắm lễ mâm cúng, sao chép 1-click, in ấn sạch đẹp (Print-friendly).

---

### 🔨 SPRINT 2: BỘ CÔNG CỤ PHONG THỦY TÍNH HẠN & MƯỢN TUỔI LÀM NHÀ
> **Mục tiêu**: Cung cấp công cụ tra cứu xem tuổi chuẩn xác cho gia chủ khi chuẩn bị làm nhà hoặc cưới hỏi.

#### User Stories:
- **Story 2.1 — Thuật toán tính Tam Tai**:
  - Căn cứ Tam Hợp cục:
    - Tuổi Thân - Tý - Thìn: Hạn Tam Tai vào 3 năm Dần - Mão - Thìn.
    - Tuổi Dần - Ngọ - Tuất: Hạn Tam Tai vào 3 năm Thân - Dậu - Tuất.
    - Tuổi Tỵ - Dậu - Sửu: Hạn Tam Tai vào 3 năm Hợi - Tý - Sửu.
    - Tuổi Hợi - Mão - Mùi: Hạn Tam Tai vào 3 năm Tỵ - Ngọ - Mùi.
  - Output: Xác định năm cần xem có phạm Tam Tai hay không, là năm Tam Tai thứ mấy (đầu, giữa hay cuối).
- **Story 2.2 — Thuật toán tính Kim Lâu**:
  - Tính tuổi mụ (Tuổi mụ = Năm xem - Năm sinh + 1).
  - Lấy tuổi mụ chia cho 9, xét số dư:
    - Dư 1: Phạm **Kim Lâu Thân** (hại bản thân gia chủ).
    - Dư 3: Phạm **Kim Lâu Thê** (hại vợ/chồng).
    - Dư 6: Phạm **Kim Lâu Tử** (hại con cái).
    - Dư 8: Phạm **Kim Lâu Súc** (hại vật nuôi, kinh tế).
    - Các số dư khác (0, 2, 4, 5, 7): Không phạm Kim Lâu.
- **Story 2.3 — Thuật toán tính Hoang Ốc**:
  - Tính theo vòng tròn 6 cung Hoang Ốc:
    - 1. **Nhất Cát** (Cát): Làm nhà tuổi này an cư lạc nghiệp.
    - 2. **Nhì Nghi** (Cát): Nhà cửa hưng vượng, giàu có.
    - 3. **Tam Địa Sát** (Hung): Mắc bệnh tật, tai ương.
    - 4. **Tứ Tấn Tài** (Cát): Phúc lộc dồi dào, làm ăn phát tài.
    - 5. **Ngũ Thọ Tử** (Hung): Gia đình ly tán, bất hòa.
    - 6. **Lục Hoang Ốc** (Hung): Khó thành đạt, vạn sự trắc trở.
- **Story 2.4 — Xem Tuổi Làm Nhà Tổng Hợp & Gợi Ý Mượn Tuổi**:
  - Đánh giá tổng hợp: Tuổi đẹp nhất là tuổi **không phạm cả 3 đại hạn Tam Tai, Kim Lâu, Hoang Ốc**.
  - Nếu gia chủ phạm hạn: Hệ thống tự động quét các năm sinh từ 20 đến 70 tuổi để **gợi ý Top các tuổi đẹp nhất trong năm** thích hợp để mượn tuổi động thổ.
  - Hướng dẫn thủ tục chuộc nhà và giấy tờ mượn tuổi theo cổ truyền.
- **Story 2.5 — Giao diện & Trải nghiệm (`/phong-thuy/xem-tuoi-lam-nha`)**:
  - Form nhập năm sinh gia chủ và năm dự kiến khởi công.
  - Thẻ kết quả đồ họa trực quan (Huy hiệu Xanh lá: Đại Cát; Đỏ: Phạm hạn).
  - Viết 30+ unit tests kiểm định thuật toán Tam Tai, Kim Lâu, Hoang Ốc.

---

### 🌐 SPRINT 3: REST API BACKEND (`/api/v1/...`) SẴN SÀNG CHO MOBILE APP
> **Mục tiêu**: Đóng gói toàn bộ lõi thuật toán thành RESTful API để sau này Mobile App (React Native/Flutter/iOS/Android) hoặc bên thứ 3 có thể gọi trực tiếp.

#### User Stories:
- **Story 3.1 — Endpoint Ngày (`GET /api/v1/lunar/day`)**:
  - Query params: `?date=YYYY-MM-DD` (hoặc mặc định hôm nay).
  - Trả về JSON: Dương lịch, Âm lịch, Can Chi, Giờ hoàng đạo, Trực, Tiết khí, Sao tốt/xấu, Việc nên/không nên làm, Lễ hội.
- **Story 3.2 — Endpoint Tháng (`GET /api/v1/lunar/month`)**:
  - Query params: `?month=MM&year=YYYY`.
  - Trả về mảng 28-31 ngày đầy đủ dữ liệu cho lưới lịch vạn niên.
- **Story 3.3 — Endpoint Đổi Ngày (`GET /api/v1/lunar/convert`)**:
  - Query params: `?type=solar2lunar&d=...&m=...&y=...` hoặc `type=lunar2solar`.
- **Story 3.4 — Endpoint Ngày Tốt (`GET /api/v1/lunar/auspicious`)**:
  - Query params: `?purpose=cuoi-hoi|khai-truong|dong-tho|xuat-hanh&month=MM&year=YYYY`.
  - Trả về danh sách ngày đạt điểm cát khí kèm lý do và cảnh báo.
- **Story 3.5 — Endpoint Văn Khấn (`GET /api/v1/van-khan`)**:
  - `GET /api/v1/van-khan`: Danh sách bài khấn, lọc theo category hoặc search keyword.
  - `GET /api/v1/van-khan/:slug`: Chi tiết bài khấn, sắm lễ, lưu ý.
- **Story 3.6 — Cấu hình Kỹ thuật**:
  - Cấu hình CORS mở (`Access-Control-Allow-Origin: *`).
  - Chuẩn hóa format response `{ success: true, data: ..., error: null }`.
  - Trang tài liệu API Documentation đơn giản tại `/api-docs`.

---

### 📅 SPRINT 4: ĐỒNG BỘ LỊCH (.ICS) & TIỆN ÍCH ĐẾM NGƯỢC TẾT (GROWTH / VIRAL) ✅ (HOÀN THÀNH)
> **Mục tiêu**: Giúp người dùng gắn bó lâu dài thông qua nhắc lịch trên điện thoại và hút lượng truy cập lớn dịp cuối năm.

#### User Stories:
- **Story 4.1 — Xuất File iCalendar (.ics)**: ✅
  - Sinh file `.ics` chuẩn RFC 5545 tương thích 100% với Apple Calendar, Google Calendar, Outlook.
  - Tùy chọn xuất:
    - Lịch Ngày Rằm & Mùng 1 trong năm (có thông báo nhắc trước 1 ngày lúc 20:00).
    - Lịch các ngày lễ truyền thống (Tết Nguyên Đán, Giỗ Tổ, Vu Lan, Trung Thu, Táo Quân...).
- **Story 4.2 — Đăng Ký Lịch Trực Tiếp (Webcal One-click Subscribe)**: ✅
  - Đường dẫn `webcal://lichan.com/api/v1/calendar/subscribe.ics` giúp người dùng iPhone/Mac/Android bấm một nút là tự động thêm lịch vào máy mà không cần tải file thủ công.
- **Story 4.3 — Trang Giao Diện Đồng Bộ Lịch (`/dong-bo-lich`)**: ✅
  - Bộ điều khiển tương tác chọn nội dung (Rằm/Mùng 1/Lễ Tết), chọn năm, bật/tắt nhắc nhở.
  - Nút đồng bộ Apple Calendar 1-click, Google Calendar import, Tải file .ics, và Copy URL.
  - Danh sách xem trước sự kiện mẫu và hướng dẫn từng bước cho iOS, Android, Outlook.
- **Story 4.4 — Trang Đếm Ngược Tết Nguyên Đán (`/dem-nguoc-tet`)**: ✅
  - Đồng hồ đếm ngược thời gian thực (Ngày : Giờ : Phút : Giây) đến 00:00 đêm Giao Thừa dựa trên thuật toán thiên văn.
  - Thông tin con giáp năm mới, phong tục đón xuân, danh sách các việc cần chuẩn bị từ 23 tháng Chạp đến mùng 1 Tết.
  - Nút chia sẻ lên Facebook, Zalo, sao chép link và sao chép lời chúc Tết tạo hiệu ứng lan truyền (viral).
- **Story 4.5 — Bộ Kiểm Thử (33 Unit Tests)**: ✅
  - 33 test cases kiểm thử định dạng RFC 5545, VEVENT, VALARM, ngày Rằm/Mùng 1 và đếm ngược Tết pass 100%.

---

### 🔮 SPRINT 5: TỬ VI CÁ NHÂN HÓA THEO NĂM SINH & CỬU DIỆU NIÊN HẠN ✅ (HOÀN THÀNH)
> **Mục tiêu**: Nâng cấp trang Tử vi từ 12 con giáp chung chung thành bảng luận giải cá nhân hóa chi tiết theo năm sinh.

#### User Stories:
- **Story 5.1 — Bảng Cửu Diệu Sao Chiếu Mệnh**: ✅
  - Thuật toán tính 9 sao theo tuổi mụ và giới tính (La Hầu, Thổ Tú, Thủy Diệu, Thái Bạch, Thái Dương, Vân Hớn, Kế Đô, Thái Âm, Mộc Đức).
  - Đánh giá Cát/Hung, tháng kỵ/hợp, chi tiết nghi thức cúng dâng sao (ngày cúng, giờ cúng, hướng lạy, số đèn, bài vị) và link văn khấn cúng sao giải hạn.
- **Story 5.2 — Bảng Bát Hạn Niên Vận**: ✅
  - Tính 8 niên hạn: Huỳnh Tuyền, Tam Kheo, Ngũ Mộ, Thiên Tinh, Tán Tận, Thiên La, Địa Võng, Diêm Vương.
  - Phân định Đại hạn / Tiểu hạn, ý nghĩa và lời khuyên phòng tránh cụ thể.
- **Story 5.3 — Cung Mệnh & Bát Trạch Hướng Nhà**: ✅
  - Tính Cung Phi (Càn, Khảm, Cấn, Chấn, Tốn, Ly, Khôn, Đoài) chuẩn Lạc Thư cho cả thế kỷ 20 và 21.
  - Phân loại Đông Tứ Mệnh và Tây Tứ Mệnh.
  - Bảng 4 hướng tốt (Sinh Khí, Thiên Y, Diên Niên, Phục Vị) và 4 hướng xấu (Tuyệt Mệnh, Ngũ Quỷ, Lục Sát, Họa Hại), màu sắc hợp/kỵ.
- **Story 5.4 — Giao Diện & Dynamic Pages `/tu-vi/[slug]`**: ✅
  - Trang `/tu-vi` cho phép chọn năm sinh, giới tính, năm xem niên hạn -> trả về báo cáo tử vi cá nhân hóa lập tức.
  - Sinh tĩnh (SSG) 66 trang `/tu-vi/[slug]` cho 66 năm hoa giáp (1960 - 2025) tối ưu SEO tuyệt đối.
  - Endpoint REST API `GET /api/v1/tu-vi` phục vụ Mobile App.
- **Story 5.5 — Bộ Kiểm Thử (48 Unit Tests)**: ✅
  - 48 test cases kiểm thử độc lập sao Cửu Diệu, Bát Hạn, Cung Phi Bát Trạch, Hoa Giáp nạp âm và báo cáo tổng hợp pass 100%.

---

### 📱 SPRINT 6: PWA HOÀN CHỈNH & MOBILE WEB TIỆN DỤNG
> **Mục tiêu**: Trải nghiệm mượt mà như một ứng dụng gốc trên điện thoại không cần cài từ App Store.

#### User Stories:
- **Story 6.1 — Offline Caching**:
  - Service Worker lưu cache toàn bộ thuật toán âm lịch và các bài văn khấn, vào những nơi không có sóng/3G (nhà chùa, nghĩa trang, vùng sâu) vẫn mở ra xem được bình thường.
- **Story 6.2 — Add to Home Screen (A2HS)**:
  - Banner hướng dẫn cài đặt Lịch An vào màn hình chính điện thoại với 1 chạm.
- **Story 6.3 — Web Push Notification (Thông báo đẩy)**:
  - Cho phép người dùng đăng ký nhận thông báo nhắc nhở vào 19:00 tối hôm trước ngày Mùng 1 và ngày Rằm.

---

## 📌 NGUYÊN TẮC PHÁT TRIỂN & CAM KẾT CHẤT LƯỢNG

1. **Lõi Toán Học & Kinh Điển Bất Khả Xâm Phạm**:
   - Lõi thiên văn Hồ Ngọc Đức (`src/lib/lunar/core/lunar-calendar.ts`) và lõi trạch nhật (`src/lib/lunar/core/trach-nhat.ts`) luôn được khóa cố định. Mọi chức năng mới chỉ giao tiếp qua Service Facade.
2. **Kiểm Thử Trước Khi Bàn Giao (TDD / Automated Verification)**:
   - Mọi sprint hay tính năng tính toán phong thủy/âm dương bắt buộc phải có Unit Tests độc lập và vượt qua 100% trước khi đưa lên giao diện.
3. **Hiệu Năng & SEO Tuyệt Đối**:
   - Ưu tiên Server Components và Static Site Generation (SSG).
   - Duy trì điểm Google Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO = 100.
4. **Tự Động Lưu Trữ (Git Workflow)**:
   - Mỗi khi hoàn tất một Story hoặc một Sprint, tự động chạy build kiểm định, commit và push lên kho lưu trữ GitHub.
