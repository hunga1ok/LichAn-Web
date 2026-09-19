'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Terminal, 
  Play, 
  Check, 
  Copy, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Smartphone, 
  Globe,
  Loader2
} from 'lucide-react';

interface ApiEndpoint {
  method: 'GET';
  path: string;
  title: string;
  description: string;
  defaultQuery: string;
  parameters: { name: string; type: string; required: boolean; desc: string }[];
}

const API_ENDPOINTS: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/v1/lunar/day',
    title: 'Tra cứu thông tin chi tiết một ngày',
    description: 'Trả về dữ liệu âm dương, can chi ngày/tháng/năm, 12 giờ hoàng đạo, tiết khí, trực nhật, sao tốt/xấu, việc nên làm/kiêng cữ, và hướng xuất hành.',
    defaultQuery: 'date=2026-09-19&xuatHanh=true',
    parameters: [
      { name: 'date', type: 'string', required: false, desc: 'Ngày cần xem (YYYY-MM-DD hoặc DD-MM-YYYY). Mặc định là ngày hôm nay.' },
      { name: 'xuatHanh', type: 'boolean', required: false, desc: 'Nếu true, bổ sung hướng Hỷ Thần, Tài Thần và 6 giờ Lý Thuần Phong.' },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/lunar/calendar',
    title: 'Lấy dữ liệu lưới tháng (Lịch Vạn Niên)',
    description: 'Trả về toàn bộ danh sách các ngày trong tháng (28 - 31 ngày) phục vụ hiển thị lưới lịch âm dương trên ứng dụng di động.',
    defaultQuery: 'month=10&year=2026',
    parameters: [
      { name: 'month', type: 'number', required: false, desc: 'Tháng dương lịch (1 - 12). Mặc định là tháng hiện tại.' },
      { name: 'year', type: 'number', required: false, desc: 'Năm dương lịch (1900 - 2100). Mặc định là năm hiện tại.' },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/lunar/convert',
    title: 'Chuyển đổi ngày Âm Dương hai chiều',
    description: 'Chuyển đổi ngày từ Dương lịch sang Âm lịch hoặc ngược lại, hỗ trợ chuẩn xác tháng nhuận.',
    defaultQuery: 'type=solar2lunar&d=19&m=9&y=2026',
    parameters: [
      { name: 'type', type: 'string', required: false, desc: '"solar2lunar" (Dương -> Âm) hoặc "lunar2solar" (Âm -> Dương).' },
      { name: 'd', type: 'number', required: true, desc: 'Ngày cần đổi (1 - 31).' },
      { name: 'm', type: 'number', required: true, desc: 'Tháng cần đổi (1 - 12).' },
      { name: 'y', type: 'number', required: true, desc: 'Năm cần đổi (1900 - 2100).' },
      { name: 'leap', type: 'number', required: false, desc: 'Chỉ áp dụng khi type=lunar2solar: 1 nếu là tháng nhuận, 0 nếu không.' },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/lunar/auspicious',
    title: 'Lọc danh sách ngày hoàng đạo theo việc',
    description: 'Lọc ngày tốt cho 4 mục đích: Cưới hỏi, Khai trương, Động thổ, Xuất hành theo chuẩn Hiệp Kỷ Biện Phương Thư.',
    defaultQuery: 'purpose=cuoi-hoi&month=10&year=2026&onlyGood=true',
    parameters: [
      { name: 'purpose', type: 'string', required: true, desc: '"cuoi-hoi" | "khai-truong" | "dong-tho" | "xuat-hanh".' },
      { name: 'month', type: 'number', required: true, desc: 'Tháng dương lịch (1 - 12).' },
      { name: 'year', type: 'number', required: true, desc: 'Năm dương lịch (1900 - 2100).' },
      { name: 'onlyGood', type: 'boolean', required: false, desc: 'true (chỉ lấy ngày tốt) hoặc false (lấy toàn bộ ngày).' },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/van-khan',
    title: 'Danh sách và tìm kiếm bài văn khấn',
    description: 'Tra cứu danh sách bài văn khấn chuẩn cổ truyền, hỗ trợ lọc theo 5 danh mục phong tục hoặc tìm kiếm từ khóa.',
    defaultQuery: 'search=thần tài',
    parameters: [
      { name: 'category', type: 'string', required: false, desc: 'Lọc theo chủ đề: "than-linh-gia-tien" | "kinh-doanh-tai-loc" | "xay-dung-nha-cua" | "hon-su-gia-dao" | "le-tet-truyen-thong".' },
      { name: 'search', type: 'string', required: false, desc: 'Từ khóa tìm kiếm (tiêu đề, thẻ, đối tượng cúng).' },
    ],
  },
  {
    method: 'GET',
    path: '/api/v1/feng-shui/xem-tuoi-lam-nha',
    title: 'Xem tuổi làm nhà & gợi ý mượn tuổi',
    description: 'Tính toán 3 đại hạn Tam Tai, Kim Lâu, Hoang Ốc. Tự động trả về danh sách Top tuổi đẹp nhất để mượn tuổi khi gia chủ phạm hạn.',
    defaultQuery: 'birthYear=1990&targetYear=2026',
    parameters: [
      { name: 'birthYear', type: 'number', required: true, desc: 'Năm sinh gia chủ (ví dụ: 1990).' },
      { name: 'targetYear', type: 'number', required: false, desc: 'Năm dự kiến khởi công (mặc định năm hiện tại).' },
    ],
  },
];

export default function ApiDocsClient() {
  const [activeEndpoint, setActiveEndpoint] = useState<ApiEndpoint>(API_ENDPOINTS[0]);
  const [queryString, setQueryString] = useState<string>(API_ENDPOINTS[0].defaultQuery);
  const [loading, setLoading] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseData, setResponseData] = useState<any | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedSnippetTab, setSelectedSnippetTab] = useState<'flutter' | 'reactNative' | 'curl'>('flutter');

  const handleSelectEndpoint = (ep: ApiEndpoint) => {
    setActiveEndpoint(ep);
    setQueryString(ep.defaultQuery);
    setResponseData(null);
    setResponseStatus(null);
  };

  const handleExecuteRequest = async () => {
    setLoading(true);
    setResponseData(null);
    setResponseStatus(null);
    try {
      const url = `${activeEndpoint.path}?${queryString}`;
      const res = await fetch(url);
      setResponseStatus(res.status);
      const data = await res.json();
      setResponseData(data);
    } catch (err: any) {
      setResponseStatus(500);
      setResponseData({ error: err.message || 'Không thể kết nối đến máy chủ API.' });
    } finally {
      setLoading(false);
    }
  };

  const fullUrl = `https://lichan.com${activeEndpoint.path}?${queryString}`;

  const getCodeSnippet = () => {
    switch (selectedSnippetTab) {
      case 'flutter':
        return `// Flutter / Dart HTTP Client
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<void> fetchLichAnData() async {
  final url = Uri.parse('${fullUrl}');
  final response = await http.get(url, headers: {
    'Accept': 'application/json',
  });

  if (response.statusCode == 200) {
    final Map<String, dynamic> data = json.decode(utf8.decode(response.bodyBytes));
    print('Thành công: \${data['data']}');
  } else {
    print('Lỗi: \${response.statusCode}');
  }
}`;
      case 'reactNative':
        return `// React Native / JavaScript (Fetch API)
async function fetchLichAnData() {
  try {
    const response = await fetch('${fullUrl}');
    const result = await response.json();
    if (result.success) {
      console.log('Dữ liệu:', result.data);
    } else {
      console.error('Lỗi:', result.error);
    }
  } catch (error) {
    console.error('Lỗi mạng:', error);
  }
}`;
      case 'curl':
        return `# cURL CLI
curl -X GET "${fullUrl}" \\
     -H "Accept: application/json"`;
    }
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar: Danh sách các Endpoints */}
      <div className="lg:col-span-4 space-y-3">
        <div className="text-xs font-bold text-stone-500 uppercase tracking-wider px-1">
          Danh sách API v1 ({API_ENDPOINTS.length} endpoints)
        </div>

        <div className="space-y-1.5">
          {API_ENDPOINTS.map((ep) => {
            const isSelected = activeEndpoint.path === ep.path;
            return (
              <button
                key={ep.path}
                onClick={() => handleSelectEndpoint(ep)}
                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-amber-400 text-stone-800'
                }`}
              >
                <div className="space-y-0.5 truncate pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isSelected ? 'bg-amber-950 text-amber-300' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="font-bold text-xs truncate">{ep.title}</span>
                  </div>
                  <div className={`text-[11px] font-mono truncate ${isSelected ? 'text-amber-200' : 'text-stone-400'}`}>
                    {ep.path}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Card */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-2 text-stone-600">
          <div className="font-bold text-amber-900 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" /> CORS mở toàn cầu
          </div>
          <p className="leading-relaxed text-[11px]">
            Tất cả endpoints hỗ trợ <code className="bg-stone-200 px-1 rounded font-mono">Access-Control-Allow-Origin: *</code>. Ứng dụng Mobile App và Web SPA có thể gọi trực tiếp mà không bị chặn trình duyệt.
          </p>
        </div>
      </div>

      {/* Main Console: Chi tiết Endpoint & Interactive Tester */}
      <div className="lg:col-span-8 space-y-6">
        <Card className="border-amber-900/15 shadow-sm bg-white overflow-hidden">
          <CardHeader className="border-b border-stone-200 bg-stone-50/70 p-5 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-emerald-700 text-white text-xs font-mono font-bold">
                  {activeEndpoint.method}
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-stone-900">
                  {activeEndpoint.path}
                </span>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-900 border-amber-300 text-xs font-semibold">
                Public API
              </Badge>
            </div>
            <CardDescription className="text-stone-600 text-xs sm:text-sm">
              {activeEndpoint.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-5 space-y-6">
            {/* Parameters Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-700 block uppercase">
                Query Parameters:
              </span>
              <div className="border border-stone-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold">
                      <th className="py-2 px-3">Tên tham số</th>
                      <th className="py-2 px-3">Kiểu</th>
                      <th className="py-2 px-3">Bắt buộc</th>
                      <th className="py-2 px-3">Mô tả</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {activeEndpoint.parameters.map((p, i) => (
                      <tr key={i} className="hover:bg-amber-50/30">
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-900">{p.name}</td>
                        <td className="py-2.5 px-3 text-stone-500 font-mono text-[11px]">{p.type}</td>
                        <td className="py-2.5 px-3">
                          {p.required ? (
                            <span className="text-rose-700 font-bold text-[11px]">Bắt buộc</span>
                          ) : (
                            <span className="text-stone-400 text-[11px]">Tùy chọn</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-stone-600 text-xs leading-snug">{p.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Test Console Input */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-700 block uppercase">
                Interactive Try It Out (Kiểm Thử Trực Tiếp):
              </span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-stone-400">
                    {activeEndpoint.path}?
                  </div>
                  <input
                    type="text"
                    value={queryString}
                    onChange={(e) => setQueryString(e.target.value)}
                    className="w-full pl-[calc(10px+var(--path-width,160px))] pr-3 py-2.5 rounded-lg border border-stone-300 font-mono text-xs bg-stone-50 text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/30"
                    style={{
                      // Ước tính độ dài path để thụt lề input
                      paddingLeft: `${activeEndpoint.path.length * 7.5 + 24}px`,
                    }}
                    placeholder="tham-so-query"
                  />
                </div>
                <Button
                  onClick={handleExecuteRequest}
                  disabled={loading}
                  className="bg-[#8B6914] hover:bg-[#725510] text-white text-xs font-bold gap-1.5 cursor-pointer shrink-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang gửi...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" /> Gửi Request
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Response Output Console */}
            {responseStatus !== null && (
              <div className="space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-700 uppercase flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-amber-800" /> Response Output:
                  </span>
                  <Badge className={`font-mono text-xs ${
                    responseStatus === 200 ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}>
                    HTTP Status: {responseStatus}
                  </Badge>
                </div>

                <div className="rounded-xl bg-stone-900 text-stone-100 p-4 font-mono text-xs overflow-x-auto max-h-96 shadow-inner border border-stone-800">
                  <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
              </div>
            )}

            {/* Mobile Code Snippets */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 uppercase flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-amber-800" /> Mã Nguồn Tích Hợp Cho Mobile App:
                </span>
                <button
                  onClick={handleCopyCode}
                  className="text-xs font-medium text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Đã sao chép' : 'Sao chép mã'}
                </button>
              </div>

              {/* Language Switcher Tabs */}
              <div className="flex items-center gap-2 border-b border-stone-200 text-xs">
                <button
                  onClick={() => setSelectedSnippetTab('flutter')}
                  className={`pb-2 px-1 font-semibold transition-colors cursor-pointer border-b-2 ${
                    selectedSnippetTab === 'flutter'
                      ? 'border-amber-800 text-amber-900'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Flutter / Dart
                </button>
                <button
                  onClick={() => setSelectedSnippetTab('reactNative')}
                  className={`pb-2 px-1 font-semibold transition-colors cursor-pointer border-b-2 ${
                    selectedSnippetTab === 'reactNative'
                      ? 'border-amber-800 text-amber-900'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  React Native / JS
                </button>
                <button
                  onClick={() => setSelectedSnippetTab('curl')}
                  className={`pb-2 px-1 font-semibold transition-colors cursor-pointer border-b-2 ${
                    selectedSnippetTab === 'curl'
                      ? 'border-amber-800 text-amber-900'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  cURL CLI
                </button>
              </div>

              {/* Code Snippet Box */}
              <div className="rounded-lg bg-stone-900 text-amber-300 p-3.5 font-mono text-[11px] overflow-x-auto border border-stone-800">
                <pre>{getCodeSnippet()}</pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
