# LỊCH AN (lichan.com) — PRODUCT BACKLOG & ROADMAP

> **Tầm nhìn**: Nền tảng tra cứu lịch âm dương, phong thủy và văn hóa cổ truyền Việt Nam chuẩn xác nhất, giao diện hiện đại, tối ưu trải nghiệm người dùng, hỗ trợ đa nền tảng (Web & Mobile API).

---

## 📊 TỔNG QUAN TIẾN ĐỘ HIỆN TẠI

- **Bộ kiểm thử tự động (Unit Tests)**: `491/491 Tests PASS (100%)`.
  - Core Thuật toán Âm Dương Hồ Ngọc Đức: `64/64 PASS` (Kiểm định > 3.653 ngày).
  - Module Trạch Nhật (Xem Ngày Tốt Chuyên Sâu): `105/105 PASS`.
  - Module Nhị Thập Bát Tú (28 Chòm Sao Thiên Văn Cổ): `23/23 PASS` (Chu kỳ 28 ngày & Thất Diệu).
  - Module Kho Văn Khấn Cổ Truyền: `96/96 PASS`.
  - Module Phong Thủy (Tam Tai - Kim Lâu - Hoang Ốc): `73/73 PASS`.
  - REST API Backend Endpoints: `18/18 PASS`.
  - Module Đồng Bộ Lịch (.ICS) & Đếm Ngược Tết: `33/33 PASS`.
  - Module Tử Vi Cá Nhân Hóa & Cửu Diệu Niên Hạn: `48/48 PASS`.
  - Phân Hệ Xem Tuổi Toàn Diện (Vợ Chồng, Làm Ăn, Sinh Con, Xông Đất): `31/31 PASS`.
- **Kiến trúc hệ thống**: Next.js 16 (App Router) + TypeScript Strict + Tailwind CSS 4 + SSG (Static Site Generation 124 trang).
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
│ Sprint 6          │ Phân Hệ Xem Tuổi Toàn Diện:       │ ✅ Hoàn thành  │
│                   │ Vợ Chồng, Làm Ăn, Sinh Con, Xông  │                │
├───────────────────┼───────────────────────────────────┼────────────────┤
│ Sprint 7          │ Tối Ưu SEO Core Pages, Sửa Lỗi    │ ✅ Hoàn thành  │
│                   │ Kỹ Thuật & Trang 404/Error (Đợt 1)│                │
├───────────────────┼───────────────────────────────────┼────────────────┤
│ Sprint 8          │ Nâng Cấp UX Navigation, Bộ Chọn   │ ✅ Hoàn thành  │
│                   │ Lịch Vạn Niên & Tiện Ích (Đợt 2)  │                │
├───────────────────┼───────────────────────────────────┼────────────────┤
│ Sprint 9          │ Design System Foundation:          │ ✅ Hoàn thành  │
│                   │ UI Primitives & Design Tokens       │                │
├───────────────────┼───────────────────────────────────┼────────────────┤
│ Sprint 10         │ UX Deep Linking & Polish: URL      │ ✅ Hoàn thành  │
│                   │ State Sync & Tương tác nhất quán   │                │
├───────────────────┼───────────────────────────────────┼────────────────┤
│ Sprint 11         │ Accessibility & Micro-Polish:      │ ✅ Hoàn thành  │
│                   │ Contrast, Font Size, ARIA Labels   │                │
├───────────────────┼───────────────────────────────────┼────────────────┤
│ Sprint 12         │ PWA Offline & Thông báo đẩy       │ ⏳ Kế tiếp     │
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
  - Chọn ngày tốt theo 6 mục đích: Cưới hỏi, Khai trương, Động thổ, Xuất hành, Cắt tóc, Cất nóc.
  - Lọc bỏ đại hung (Tam Nương, Nguyệt Kỵ, Sát Chủ, Thụ Tử, Nguyệt Phá).
  - Tích hợp bảng Âm Dương Bất Tương, Hướng Hỷ Thần, Tài Thần và 6 giờ Lý Thuần Phong.
  - **Tích hợp Nhị Thập Bát Tú (28 Chòm Sao Cổ)**: Chu kỳ thiên văn 28 ngày gắn với Thất Diệu, thơ ca quyết khẩu quyết, việc cát nên làm & kiêng kỵ, chấm điểm trọng số trạch cát tự động.
- [x] **Kho Văn Khấn Cổ Truyền (`/van-khan`)**:
  - 11 bài văn khấn kinh điển phân theo 5 danh mục phong tục.
  - Trình đọc văn khấn tương tác: Tăng giảm cỡ chữ (A/A+/A++), checklist sắm lễ mâm cúng, sao chép 1-click, in ấn sạch đẹp (Print-friendly).

---

### ✅ SPRINT 2: BỘ CÔNG CỤ PHONG THỦY TÍNH HẠN & MƯỢN TUỔI LÀM NHÀ (ĐÃ XONG 100%)
- [x] **Story 2.1 — Thuật toán tính Tam Tai** (Tam Hợp Cục, xác định năm Tam Tai 1/2/3).
- [x] **Story 2.2 — Thuật toán tính Kim Lâu** (Tuổi mụ chia 9, phân loại Thân/Thê/Tử/Súc).
- [x] **Story 2.3 — Thuật toán tính Hoang Ốc** (Vòng 6 cung: Nhất Cát → Lục Hoang Ốc).
- [x] **Story 2.4 — Xem Tuổi Làm Nhà Tổng Hợp & Gợi Ý Mượn Tuổi**.
- [x] **Story 2.5 — Giao diện `/phong-thuy/xem-tuoi-lam-nha`** + 30 unit tests.

---

### ✅ SPRINT 3: REST API BACKEND (`/api/v1/...`) (ĐÃ XONG 100%)
- [x] **Story 3.1–3.6** — Endpoints: Ngày, Tháng, Đổi Ngày, Ngày Tốt, Văn Khấn, CORS & API Docs.

---

### ✅ SPRINT 4: ĐỒNG BỘ LỊCH (.ICS) & TIỆN ÍCH ĐẾM NGƯỢC TẾT (ĐÃ XONG 100%)
- [x] **Story 4.1–4.5** — File iCalendar RFC 5545, Webcal Subscribe, Giao diện `/dong-bo-lich`, Đếm Ngược Tết, 33 unit tests.

---

### ✅ SPRINT 5: TỬ VI CÁ NHÂN HÓA & CỬU DIỆU NIÊN HẠN (ĐÃ XONG 100%)
- [x] **Story 5.1–5.5** — Cửu Diệu, Bát Hạn, Cung Phi Bát Trạch, SSG 66 trang Hoa Giáp, 48 unit tests.

---

### ✅ SPRINT 6: PHÂN HỆ XEM TUỔI TOÀN DIỆN (ĐÃ XONG 100%)
- [x] **Story 6.1–6.6** — Vợ Chồng, Làm Ăn, Sinh Con, Xông Đất, Hub `/xem-tuoi`, 31 unit tests.

---

### ✅ SPRINT 7: TỐI ƯU SEO, CORE PAGES & BẢO TRÌ KỸ THUẬT (ĐÃ XONG 100%)
- [x] **Story 7.1–7.5** — Tách Server/Client Components, Nâng cấp `/xem-ngay/[date]`, Schema.org Fix, 404/Error Pages, SEO Config.

---

### ✅ SPRINT 8: NÂNG CẤP UX NAVIGATION & TIỆN ÍCH LỊCH (ĐÃ XONG 100%)
- [x] **Story 8.1–8.5** — Header Restructure, Mobile Menu Backdrop, Month/Year Picker, UX Form, Padding & PWA Icons.

---

### ✅ SPRINT 9: XÂY DỰNG DESIGN SYSTEM CỐT LÕI (FOUNDATION) (ĐÃ XONG 100%)
> **Mục tiêu**: Thiết lập hệ thống thiết kế (Design System) hoàn chỉnh gồm Design Tokens, UI Primitives chuẩn hóa, và loại bỏ triệt để mã hex hardcode trên toàn bộ codebase.

#### User Stories:
- [x] **Story 9.1 — Mở Rộng Design Tokens (`globals.css`)**:
  - Bổ sung các biến `@theme` còn thiếu: `--color-primary-hover` (#6e5310), `--color-accent` (#D4A017), `--color-surface` (#FFFFFF), `--color-muted` (stone-500), `--color-muted-foreground` (stone-600).
  - Chuẩn hóa thang bo góc: `--radius-sm` (6px), `--radius-md` (8px), `--radius-lg` (12px), `--radius-xl` (16px).

- [x] **Story 9.2 — Bổ Sung UI Primitives (`@/components/ui/`)**:
  - **[MỚI] `input.tsx`**: Input chuẩn hóa focus ring, height, padding, hỗ trợ `disabled` & `error` state.
  - **[MỚI] `select.tsx`**: Dropdown tùy biến với icon mũi tên phong thủy, fix lỗi iOS Safari caret.
  - **[MỚI] `tabs.tsx`**: Component chuyển tab `underline`/`pills`, bo góc đồng bộ Card cha, animated indicator.
  - **[MỚI] `skeleton.tsx`**: Khung xương tải trang (`SkeletonLine`, `SkeletonCircle`, `SkeletonCard`) dùng cho loading states.

- [x] **Story 9.3 — Loại Bỏ Hardcode Hex & Áp Dụng Design Tokens**:
  - Thay `text-[#8B6914]` → `text-primary`, `bg-[#8B6914]` → `bg-primary` trên **~26 file TSX**.
  - Thay `hover:bg-[#6e5310]` / `hover:bg-[#725510]` → `hover:bg-primary-dark`.
  - Thay `text-[#DC240E]` → `text-danger`, `border-[#D4A017]` → `border-accent`.
  - Thay `bg-[#FEF7E6]` → `bg-background-alt`.
  - Đảm bảo component `button.tsx`, `badge.tsx` cũng chuyển sang dùng token.

- [x] **Story 9.4 — Áp Dụng UI Primitives Thay Thế Native HTML**:
  - Thay toàn bộ `<select className="...">` native bằng `<Select>` component tại: `DoiNgayClient` (3), `ThanSoHocClient` (3), `XuatHanhClient` (3), `LichVanNienClient` (2), `TuViClient` (3).
  - Thay `<input type="number" className="...">` bằng `<Input>` component tại: `DoiNgayClient` (1), `ThanSoHocClient` (1).
  - Thay tab switcher tự viết bằng `<Tabs>` component tại: `DoiNgayClient` (Solar ↔ Lunar), `TuViClient` (Cá nhân ↔ Con giáp).

---

### ✅ SPRINT 10: TỐI ƯU TƯƠNG TÁC & DEEP LINKING (UX POLISH) (ĐÃ XONG 100%)
> **Mục tiêu**: Giải quyết các điểm ma sát tương tác lớn nhất — cho phép chia sẻ link kết quả, cải thiện phản hồi thị giác trên mobile, thống nhất pattern tương tác.

#### User Stories:
- [x] **Story 10.1 — URL State Sync (Deep Linking / Shareable Results)**:
  - Tích hợp `useSearchParams` + `window.history.replaceState` cho 8 trang công cụ:
    - `/xem-tuoi/vo-chong?chong=1990&vo=1994`
    - `/xem-tuoi/lam-an?a=1990&b=1993&ga=nam&gb=nu`
    - `/xem-tuoi/sinh-con?bo=1990&me=1993&nam=2026`
    - `/xem-tuoi/xong-dat?gia_chu=1990&nam=2026`
    - `/than-so-hoc?d=19&m=9&y=1995`
    - `/doi-ngay-am-duong?mode=solar2lunar&d=20&m=9&y=2026&leap=0`
    - `/tu-vi?tab=canhan&nam=1993&xem=2026&gt=nam`
    - `/lich-van-nien?thang=9&nam=2026`
  - Khi user thay đổi input → URL cập nhật tức thì (không reload). Khi mở link chia sẻ → state load đúng giá trị.
  - Tích hợp nút Chia sẻ sao chép link có tooltip phản hồi trực quan.

- [x] **Story 10.2 — Loại Bỏ Fake Loading Delay & Thống Nhất Pattern Phản Hồi**:
  - Xóa `setTimeout(350ms)` fake loading tại `VoChongClient.tsx`, `LamAnClient.tsx`, `SinhConClient.tsx`, `XongDatClient.tsx`.
  - Thống nhất: Kết quả hiển thị tức thì (reactive `useMemo`) mượt mà, phản hồi tức thì.

- [x] **Story 10.3 — Cải Thiện Lịch Vạn Niên Trên Mobile**:
  - Thêm `touch-manipulation` loại bỏ trễ click 300ms trên màn hình cảm ứng di động.
  - Thêm visual feedback active ring animation (`active:scale-95`) khi chạm ô ngày.
  - Bổ sung chấm đỏ chỉ thị ngày lễ cho giao diện di động.
  - Nút chia sẻ link tháng/năm trực quan.

---

### ✅ SPRINT 11: ACCESSIBILITY & MICRO-POLISH (A11Y) (ĐÃ XONG 100%)
> **Mục tiêu**: Nâng chuẩn trải nghiệm cho đối tượng người lớn tuổi (40-65+) — đối tượng chính của Lịch An — và tuân thủ WCAG AA.

#### User Stories:
- [x] **Story 11.1 — Nâng Cỡ Chữ Tối Thiểu & Tăng Contrast**:
  - Nâng `text-[11px]` → `text-xs` (12px) cho nội dung người dùng đọc (giờ hoàng đạo, sắm lễ, mô tả) trên toàn bộ codebase (~14 file).
  - Giữ nguyên `text-[11px]` cho label kỹ thuật API docs (theo chuẩn developer).
  - Tăng chữ phụ `text-stone-400`/`text-stone-500` → `text-stone-600` trên nền sáng để đạt contrast ratio ≥ 4.5:1.

- [x] **Story 11.2 — Bổ Sung ARIA Labels & Focus Management**:
  - Thêm `aria-label` cho toàn bộ icon button (hamburger menu, nút chuyển tháng/năm, nút chuyển ngày, nút copy/chia sẻ, nút đóng menu).
  - Thêm `aria-expanded`, `aria-haspopup`, `role="dialog"` cho mobile menu drawer và dropdown tiện ích.
  - Thêm `aria-pressed` cho các nút toggle chế độ xem, bộ lọc ngày tốt, chọn giới tính và tab điều hướng.
  - Khai báo `aria-label` chi tiết cho từng ô ngày trên lưới Lịch Vạn Niên (ngày dương, ngày âm, ngày lễ, hôm nay).

- [x] **Story 11.3 — Responsive Fine-Tuning Cho Màn Hình Nhỏ (360px)**:
  - Tinh chỉnh form Ngày-Tháng-Năm tại `DoiNgayClient.tsx` thành `grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5` không bị co cụm trên viewport 360px.
  - Tối ưu hiển thị chấm đỏ ngày lễ mobile và padding trên Lịch Vạn Niên.

---

### 📱 SPRINT 12: PWA HOÀN CHỈNH & MOBILE WEB TIỆN DỤNG
> **Mục tiêu**: Trải nghiệm mượt mà như một ứng dụng gốc trên điện thoại không cần cài từ App Store.

#### User Stories:
- **Story 12.1 — Offline Caching**:
  - Service Worker lưu cache toàn bộ thuật toán âm lịch và các bài văn khấn, vào những nơi không có sóng/3G (nhà chùa, nghĩa trang, vùng sâu) vẫn mở ra xem được bình thường.
- **Story 12.2 — Add to Home Screen (A2HS)**:
  - Banner hướng dẫn cài đặt Lịch An vào màn hình chính điện thoại với 1 chạm.
- **Story 12.3 — Web Push Notification (Thông báo đẩy)**:
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

