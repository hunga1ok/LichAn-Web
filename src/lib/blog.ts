export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: 'Văn khấn' | 'Phong tục' | 'Xem ngày' | 'Tử vi phong thủy';
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'van-khan-mung-1-va-ngay-ram-hang-thang',
    title: 'Văn Khấn Mùng 1 Và Ngày Rằm Hàng Tháng Chuẩn Cổ Truyền',
    description: 'Trọn bộ bài văn khấn Thần Linh và Gia Tiên tại gia vào ngày Sóc (mùng 1) và ngày Vọng (ngày Rằm) hàng tháng theo phong tục truyền thống Việt Nam.',
    category: 'Văn khấn',
    publishedAt: '15/09/2026',
    readTime: '5 phút đọc',
    author: 'Ban Biên Tập Lịch An',
    tags: ['Văn khấn', 'Mùng 1', 'Ngày rằm', 'Cúng gia tiên', 'Phong tục'],
    content: `
## Ý nghĩa tâm linh của ngày Sóc và ngày Vọng

Trong văn hóa tâm linh của người Việt, ngày mùng 1 âm lịch (gọi là ngày **Sóc**) và ngày Rằm 15 âm lịch (gọi là ngày **Vọng**) là hai thời khắc đặc biệt trong tháng:
- **Ngày Sóc**: Khởi đầu cho một chu kỳ trăng mới, tượng trưng cho sự sinh sôi, cát lành và hanh thông.
- **Ngày Vọng**: Trăng tròn vẹn toàn, là lúc năng lượng âm dương giao hòa mạnh mẽ nhất, con cháu hướng về nguồn cội, tổ tiên để tỏ lòng hiếu kính.

Lễ cúng vào ngày này không cần mâm cao cỗ đầy, quan trọng nhất là **sự thành tâm, thanh tịnh và trang nghiêm**.

---

## Chuẩn bị lễ vật cúng mùng 1 và ngày rằm

Tùy theo điều kiện từng gia đình, lễ vật thường bao gồm:
1. **Hương (nhang), hoa tươi**: Hoa cúc vàng, hoa huệ trắng hoặc hoa sen.
2. **Trầu cau**: 1 quả cau, 3 lá trầu têm cánh phượng hoặc để nguyên.
3. **Mâm ngũ quả**: 5 loại quả tươi ngon, màu sắc tươi tắn (chuối, bưởi, cam, táo, thanh long...).
4. **Nước sạch, rượu trắng**: Mỗi thứ 1 chén nhỏ.
5. **Tiền vàng mã**: Tiền vàng cúng thổ công và gia tiên.
6. **Mâm cỗ mặn hoặc chay**: Xôi gấc, gà luộc, nem rán, canh bóng... hoặc xôi chè thanh tịnh.

---

## 1. Bài văn khấn Thổ Công và các vị Thần Linh tại gia

*(Đọc trước khi khấn gia tiên)*

> **Nam mô A Di Đà Phật! (3 lần, 3 lạy)**
>
> Con lạy chín phương Trời, mười phương Chư Phật, Chư Phật mười phương.  
> Con kính lạy Hoàng thiên Hậu Thổ chư vị Tôn thần.  
> Con kính lạy ngài Bản cảnh Thành hoàng, ngài Bản xứ Thổ địa, ngài Bản gia Táo quân cùng chư vị Tôn thần cai quản trong xứ này.
>
> Tín chủ (chúng) con là: ..............................................................  
> Ngụ tại địa chỉ: ....................................................................
>
> Hôm nay là ngày ...... tháng ...... năm Bính Ngọ.  
> Tín chủ con thành tâm sắm sửa hương hoa lễ vật, kim ngân trà quả, thắp nén tâm hương dâng lên trước án. Chúng con thành tâm kính mời ngài Bản cảnh Thành hoàng Chư vị Đại Vương, ngài Bản xứ Thần linh Thổ địa, ngài Bản gia Táo quân, Ngũ phương, Long Mạch, Tài thần. Cúi xin các ngài giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật.
>
> Cúi xin các ngài phù hộ độ trì cho toàn thể gia đạo chúng con vạn sự bình an, sức khỏe dồi dào, công việc hanh thông, tài lộc vượng tiến, gia đình hòa thuận, vạn sự cát tường.
>
> Chúng con lễ bạc tâm thành, trước án kính lễ, cúi xin được phù hộ độ trì.
>
> **Nam mô A Di Đà Phật! (3 lần, 3 lạy)**

---

## 2. Bài văn khấn Gia Tiên tiền tổ

*(Đọc sau khi đã khấn Thần Linh)*

> **Nam mô A Di Đà Phật! (3 lần, 3 lạy)**
>
> Con kính lạy Tổ tiên nội ngoại dòng họ: ........................................  
> Con kính lạy các cụ Tổ Khảo, Tổ Tỷ, Bá thúc huynh đệ, cô di tỷ muội, cùng các hương linh nội ngoại tiền tổ.
>
> Tín chủ (chúng) con là: ..............................................................  
> Cùng toàn thể gia quyến ngụ tại: .................................................
>
> Hôm nay là ngày ...... tháng ...... năm Bính Ngọ.  
> Gặp tiết ngày rằm (hoặc mùng một), tín chủ con với tấm lòng thành kính, sắm sửa hương hoa trà quả, thắp nén tâm hương, dâng lên trước ban thờ tổ tiên.
>
> Chúng con kính mời các cụ Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương linh nội ngoại dòng họ cúi xin thương xót con cháu, giáng lâm trước án, chứng giám lòng thành, thụ hưởng lễ vật.
>
> Cúi xin tiên tổ phù hộ độ trì cho con cháu trong nhà bình an mạnh khỏe, học hành tiến tới, công danh rạng rỡ, làm ăn phát đạt, trên thuận dưới hòa, gặp dữ hóa lành.
>
> Chúng con lễ bạc tâm thành, cúi xin chứng giám.
>
> **Nam mô A Di Đà Phật! (3 lần, 3 lạy)**

---

## Lưu ý quan trọng khi tiến hành nghi lễ
- Người làm lễ cần **tắm gội sạch sẽ, ăn mặc trang nghiêm lịch sự**, không mặc áo sát nách hay quần ngắn.
- Lau dọn ban thờ sạch sẽ trước khi thắp hương (bao sái nhẹ nhàng bằng nước ấm hoặc nước gừng).
- Khi thắp hương nên thắp số lẻ (1 nén biểu thị lòng thành, 3 nén kết nối tam giới).
    `,
  },
  {
    slug: 'xem-ngay-tot-khai-truong-mo-hang-2026',
    title: 'Cách Xem Ngày Tốt Khai Trương, Mở Hàng Đón Tài Lộc Năm 2026',
    description: 'Bí quyết chọn ngày giờ lành hoàng đạo mở hàng, xuất hành, khai xuân buôn bán năm Bính Ngọ 2026 giúp kinh doanh phát đạt, buôn may bán đắt.',
    category: 'Xem ngày',
    publishedAt: '12/09/2026',
    readTime: '6 phút đọc',
    author: 'Chuyên Gia Phong Thủy Lịch An',
    tags: ['Xem ngày', 'Khai trương', 'Mở hàng', 'Tài lộc', 'Phong thủy 2026'],
    content: `
## Tại sao xem ngày khai trương lại đặc biệt quan trọng?

Dân gian có câu: *"Đầu xuôi đuôi lọt"*, việc chọn ngày lành tháng tốt để khai trương cửa hàng, mở văn phòng công ty hay khai xuân đầu năm có ý nghĩa quyết định tới:
1. **Thiên thời**: Khí trường trời đất hòa hợp, đón nhận nguồn sinh khí dồi dào.
2. **Địa lợi**: Nơi kinh doanh hội tụ vượng khí, thuận lợi đón tiếp khách hàng.
3. **Nhân hòa**: Tâm lý chủ kinh doanh tự tin, nhân viên phấn khởi, khách hàng hoan hỉ.

---

## 4 Tiêu chí vàng chọn ngày khai trương đại cát

Khi xem ngày khai trương trên **Lịch An**, bạn cần đối chiếu đủ 4 yếu tố sau:

### 1. Ngày có Trực tốt cho thương mại
Trong 12 Trực, các trực sau đây là tốt nhất cho khai trương, buôn bán:
- **Trực Thành**: Mọi việc khởi đầu đều thành công mỹ mãn.
- **Trực Khai**: Mở rộng cơ nghiệp, đón nhận dòng tiền và khách hàng mới.
- **Trực Mãn**: Sung túc, đầy đủ, tài lộc tích tụ dồi dào.
- **Trực Kiến**: Khởi đầu công cuộc kinh doanh thuận lợi.

### 2. Tránh các ngày đại hung kiêng kỵ
Tuyệt đối không chọn khai trương vào các ngày:
- **Ngày Tam Nương** (nguyệt kỵ mùng 3, 7, 13, 18, 22, 27 âm lịch).
- **Ngày Nguyệt Kỵ** (mùng 5, 14, 23 âm lịch - *"Mùng năm, mười bốn, hai ba / Đi chơi cũng thiệt nữa là đi buôn"*).
- **Ngày Sát Chủ, Thụ Tử**: Mang năng lượng trì trệ, xung khắc.

### 3. Ngày hợp tuổi và mệnh của chủ doanh nghiệp
- **Tam Hợp**: Thân - Tý - Thìn; Dần - Ngọ - Tuất; Tỵ - Dậu - Sửu; Hợi - Mão - Mùi.
- **Tránh Lục Xung**: Tý xung Ngọ; Sửu xung Mùi; Dần xung Thân; Mão xung Dậu; Thìn xung Tuất; Tỵ xung Hợi.

### 4. Chọn giờ Hoàng Đạo xuất hành và mở cửa
Khi mở cửa đón khách đầu tiên, cần chọn đúng các giờ Hoàng Đạo: **Thanh Long, Minh Đường, Kim Quỹ hoặc Ngọc Đường**.

---

## Nghi thức mở hàng đón vía may mắn
- Chọn người mở hàng đầu tiên: Người có tính tình xởi lởi, vui vẻ, hợp tuổi với gia chủ.
- Chuẩn bị sẵn tiền lẻ để thối lại cho khách, tạo dòng lưu thông tiền bạc trôi chảy.
- Giữ tinh thần vui tươi, không to tiếng hay mặc cả gay gắt trong ngày đầu.
    `,
  },
  {
    slug: 'phong-tuc-tet-doan-ngo-mung-5-thang-5',
    title: 'Phong Tục Tết Đoan Ngọ Mùng 5 Tháng 5: Ý Nghĩa Và Lễ Vật Chu Đáo',
    description: 'Tìm hiểu nguồn gốc Tết Đoan Ngọ (Tết giết sâu bọ), các món ăn truyền thống không thể thiếu và cách cúng lễ chuẩn phong tục người Việt.',
    category: 'Phong tục',
    publishedAt: '08/09/2026',
    readTime: '4 phút đọc',
    author: 'Ban Biên Tập Lịch An',
    tags: ['Tết Đoan Ngọ', 'Mùng 5 tháng 5', 'Phong tục', 'Lễ hội Việt Nam'],
    content: `
## Nguồn gốc và ý nghĩa Tết Đoan Ngọ tại Việt Nam

Tết Đoan Ngọ diễn ra vào ngày **mùng 5 tháng 5 âm lịch**. 
- "Đoan" nghĩa là bắt đầu.
- "Ngọ" là khoảng thời gian từ 11 giờ trưa đến 1 giờ chiều (chính Ngọ), thời điểm dương khí thịnh vượng nhất trong năm.

Ở Việt Nam, Tết Đoan Ngọ còn được gọi dân dã là **Tết Giết Sâu Bọ**. Vào thời điểm chuyển mùa này, sâu bọ, dịch bệnh phát triển mạnh phá hoại mùa màng và sức khỏe con người. Nghi lễ cúng tế và ăn các món thanh nhiệt chính là phương thức dân gian trừ khử mầm bệnh, bảo vệ mùa màng tốt tươi.

---

## Những món ăn đặc trưng trong ngày Tết Đoan Ngọ

### 1. Cơm rượu nếp
Người xưa tin rằng vị cay nồng của men rượu nếp cái hoa vàng hoặc nếp cẩm có tác dụng tiêu diệt các loại ký sinh trùng trong cơ thể. Sáng sớm thức dậy vào ngày mùng 5/5, việc đầu tiên là ăn một bát cơm rượu nếp khi bụng còn rỗng.

### 2. Bánh tro (bánh gio)
Bánh tro có màu hổ phách trong suốt, vị mát, thường chấm cùng mật mía ngọt ngào. Món bánh này có tính thanh nhiệt, giải độc cơ thể rất tốt trong những ngày hè oi bức.

### 3. Trái cây đầu mùa chua ngọt
Mận Hậu, vải thiều, đào, chôm chôm... với vị chua rôn rốt đặc trưng được tin là khắc tinh của sâu bọ trong đường ruột.

---

## Mâm cỗ cúng Tết Đoan Ngọ chuẩn bị thế nào?
- Đĩa cơm rượu nếp (nếp trắng hoặc nếp cẩm).
- Đĩa bánh tro chấm mật mía.
- Mâm trái cây ngũ quả mùa hè (vải, mận, dưa hấu...).
- Hoa tươi (hoa sen, hoa cúc).
- Nhang, đèn, nước sạch dâng lên ban thờ tổ tiên vào đúng **giờ Ngọ (11h00 - 13h00)**.
    `,
  },
  {
    slug: 'huong-dan-bao-sai-ban-tho-cuoi-nam-dung-cach',
    title: 'Cách Bao Sái Ban Thờ Cuối Năm Đúng Chuẩn Phong Thủy Rước May Mắn',
    description: 'Quy trình lau dọn bao sái ban thờ, tỉa chân nhang cuối năm chu đáo giúp gia chủ bình an, tụ tài đọng lộc và tránh phạm đại kỵ phong thủy.',
    category: 'Phong tục',
    publishedAt: '01/09/2026',
    readTime: '7 phút đọc',
    author: 'Chuyên Gia Phong Thủy Lịch An',
    tags: ['Bao sái ban thờ', 'Tỉa chân nhang', 'Phong tục cuối năm', 'Tết', 'Tài lộc'],
    content: `
## Bao sái ban thờ là gì? Thời điểm nào thích hợp nhất?

Bao sái ban thờ là nghi thức lau dọn, vệ sinh nơi thờ tự gia tiên và thần linh vào dịp cuối năm âm lịch. Đây là việc làm thiêng liêng thể hiện lòng hiếu kính của con cháu và đón luồng sinh khí mới cho năm mới.

**Thời điểm bao sái tốt nhất:**
- Thường diễn ra sau ngày **cúng tiễn ông Công ông Táo (23 tháng Chạp)** cho đến trước đêm giao thừa (30 Tết).
- Nên chọn ngày có giờ hoàng đạo, thời tiết khô ráo, ban ngày sáng sủa.

---

## Chuẩn bị lễ vật và dụng cụ trước khi bao sái
1. **Nước bao sái chuyên dụng**: Dùng nước ngũ vị hương (quế, hồi, đinh hương, thảo quả, sả) nấu sôi hoặc nước ấm pha rượu gừng tươi giã nhuyễn.
2. **Khăn lau riêng biệt**: Tuyệt đối dùng khăn mới tinh, sạch sẽ, không dùng chung khăn lau đồ sinh hoạt gia đình.
3. **Mâm lễ xin phép**: Hoa quả tươi, trầu cau, chén nước sạch, nén hương thắp xin phép chư vị thần linh và tiên tổ trước khi hạ đồ thờ xuống lau dọn.

---

## Quy trình 4 bước bao sái ban thờ chuẩn chỉ

### Bước 1: Thắp hương xin phép thần linh, tiên tổ
Trước khi chạm vào ban thờ, gia chủ thắp 3 nén hương, khấn xin phép thần linh gia tiên cho phép con cháu được bao sái, tỉa chân hương để nơi thờ tự được thanh tịnh. Chờ hương tàn bớt mới bắt đầu tiến hành.

### Bước 2: Hạ đồ thờ cúng và lau dọn
- Trải vải đỏ hoặc giấy sạch lên bàn cao để đặt đồ thờ.
- Quy tắc lau: **Lau tượng Thần Linh/bài vị trước, sau đó mới lau bài vị/ảnh thờ Gia Tiên**.
- Lau từ trên cao xuống thấp, dùng khăn thấm nước rượu gừng lau nhẹ nhàng, sau đó dùng khăn khô lau lại.

### Bước 3: Tỉa chân nhang bát hương (Cực kỳ quan trọng)
- **Tuyệt đối KHÔNG xê dịch bát hương**: Bát hương là nơi tụ khí linh thiêng. Dùng một tay giữ chặt mép bát hương, tay kia nhẹ nhàng rút từng chân hương.
- Để lại số chân nhang lẻ: Thường giữ lại **3, 5, hoặc 7 chân nhang đẹp nhất**.
- Phần chân nhang tỉa ra đem hóa (đốt) thành tro sạch, thả xuống sông hoặc bón vào gốc cây xanh, tuyệt đối không vứt vào thùng rác.

### Bước 4: An vị và thắp hương tạ lễ
Sau khi lau dọn sạch sẽ, đặt lại các đồ thờ cúng về vị trí nguyên vẹn ban đầu. Gia chủ thắp nén hương mới dâng hoa quả tươi, kính cáo chư vị an vị ban thờ, cầu mong gia đạo năm mới thái hòa, vạn sự bình an.
    `,
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.slug !== currentSlug).slice(0, limit);
}
