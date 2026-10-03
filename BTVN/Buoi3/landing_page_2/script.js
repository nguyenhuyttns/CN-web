/**
 * ==========================================================================
 * HND BADMINTON - HỆ THỐNG JAVASCRIPT TƯƠNG TÁC LANDING PAGE CHUYÊN NGHIỆP
 * Ngôn ngữ: JavaScript Thuần (Vanilla JS) - 100% không dùng framework / thư viện ngoài
 * ==========================================================================
 * 
 * MỤC LỤC CÁC MODULE CHỨC NĂNG CHÍNH:
 * 1. CSDL Dữ Liệu Tĩnh & Dữ Liệu Mẫu (PRODUCTS_DATA, REVIEWS_DATA)
 * 2. Quản Lý Trạng Thái Ứng Dụng (Application State & DOM Cache)
 * 3. Các Hàm Tiện Ích Chung (Currency, Toast, Add to Cart, Smooth Scroll)
 * 4. Chuyển Đổi Giao Diện Sáng / Tối (Dark / Light Mode & LocalStorage)
 * 5. Điều Hướng & Đánh Dấu Mục Đang Xem Khi Cuộn (Navigation & Scrollspy)
 * 6. Slider Ảnh Tự Viết Bằng JS Thuần (Hero Carousel Slider)
 * 7. Tải Nội Dung Linh Động Từ Dữ Liệu (renderItems & Real-time Filter / Search)
 * 8. Hiển Thị Đánh Giá Khách Hàng Động (Data-driven Reviews & Filter)
 * 9. Kiểm Tra Dữ Liệu Form Trước Khi Submit (Inline Error Form Validation)
 * 10. Cửa Sổ Xem Nhanh Sản Phẩm (Quick View Modal)
 * 11. Đăng Ký Các Bộ Lắng Nghe Sự Kiện (Event Listeners Setup)
 * 12. Khởi Tạo Ứng Dụng Khi Sẵn Sàng (DOM Ready Bootstrap)
 */

// ==========================================================================
// 1. CƠ SỞ DỮ LIỆU ĐỘNG (DATA SOURCES)
// ==========================================================================

/**
 * Mảng chứa dữ liệu các sản phẩm trong kho hàng HND Badminton.
 * Mỗi object mô phỏng một record từ Database / REST API thực tế, gồm:
 * id, tên, hãng, phân loại, giá bán, giá gốc, nhãn khuyến mãi, ảnh và thông số kỹ thuật.
 * 
 * [ĐỀ XUẤT CẢI TIẾN TƯƠNG LAI]:
 * - Thay vì lưu cứng mảng này trong file JS, trong môi trường Production thực tế,
 *   nên dùng API `fetch('https://api.hndbadminton.vn/products')` để tải dữ liệu bất đồng bộ (async/await).
 */
const PRODUCTS_DATA = [
  // --- VỢT CẦU LÔNG ---
  {
    id: 1,
    name: "Vợt Cầu Lông Yonex Astrox 88D Pro (Gen 3)",
    brand: "Yonex",
    category: "vot",
    price: 4350000,
    originalPrice: 4800000,
    badge: "HOT",
    badgeClass: "badge-hot",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Trọng lượng / Chu vi cán": "3U/G5 - 4U/G5",
      "Điểm cân bằng": "302mm (Nặng đầu / Tấn công)",
      "Độ cứng thân đũa": "Cứng (Stiff)",
      "Sức căng tối đa": "28 lbs (12.5 kg)",
      "Lối chơi phù hợp": "Thiên công cầu sau, smash uy lực"
    },
    chips: ["4U/G5", "Nặng đầu", "Đũa cứng", "302mm"],
    description: "Phiên bản Astrox 88D Pro thế hệ thứ 3 với công nghệ Rotational Generator System nâng cao, tối ưu lực đập cầu cắm sân và gia tăng tốc độ phục hồi của khung vợt."
  },
  {
    id: 2,
    name: "Vợt Cầu Lông Victor Thruster Ryuga II Pro",
    brand: "Victor",
    category: "vot",
    price: 3950000,
    originalPrice: 4400000,
    badge: "MỚI",
    badgeClass: "badge-new",
    image: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Trọng lượng / Chu vi cán": "3U/G5 - 4U/G5",
      "Điểm cân bằng": "305mm (Siêu nặng đầu)",
      "Độ cứng thân đũa": "Cứng",
      "Sức căng tối đa": "31 lbs (14 kg)",
      "Lối chơi phù hợp": "Tấn công áp đảo, smash hủy diệt"
    },
    chips: ["4U/G5", "Siêu nặng đầu", "Sức căng 31 lbs"],
    description: "Cây vợt gắn liền với tay vợt Lee Zii Jia. Khung vợt tích hợp vật liệu Pyrofil từ Nhật Bản mang đến khả năng hấp thụ sốc và truyền tải lực tối đa trong từng pha cầu."
  },
  {
    id: 3,
    name: "Vợt Cầu Lông Li-Ning Tectonic 7C (Combat)",
    brand: "Lining",
    category: "vot",
    price: 3650000,
    originalPrice: 4100000,
    badge: "-12%",
    badgeClass: "badge-sale",
    image: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Trọng lượng / Chu vi cán": "4U/G5 (85g)",
      "Điểm cân bằng": "305mm (Nặng đầu)",
      "Độ cứng thân đũa": "Hơi cứng",
      "Sức căng tối đa": "30 lbs (13.5 kg)",
      "Lối chơi phù hợp": "Tấn công nhanh, linh hoạt phản tạt"
    },
    chips: ["4U/G5", "Nặng đầu", "Sợi Carbon Tectonic"],
    description: "Ứng dụng sợi carbon modun cao tại các góc 5h và 7h, giúp khung vợt có độ đàn hồi linh hoạt, phục hồi hình dạng siêu tốc sau cú đánh."
  },
  {
    id: 4,
    name: "Vợt Cầu Lông Mizuno Fortius 11 Quick",
    brand: "Mizuno",
    category: "vot",
    price: 4500000,
    originalPrice: 4900000,
    badge: "CAO CẤP",
    badgeClass: "badge-hot",
    image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Trọng lượng / Chu vi cán": "4U/G6 (83g)",
      "Điểm cân bằng": "295mm (Cân bằng)",
      "Độ cứng thân đũa": "Cứng",
      "Sức căng tối đa": "27 lbs (12.2 kg)",
      "Lối chơi phù hợp": "Phản tạt tốc độ, gài lưới chuẩn xác"
    },
    chips: ["4U/G6", "Cân bằng", "Tốc độ nhanh"],
    description: "Fortius 11 Quick của Mizuno là tuyệt tác kỹ thuật Nhật Bản, cho cảm giác tiếp xúc cầu cực kỳ đầm chắc, đường cầu đi chuẩn từng milimet."
  },
  {
    id: 5,
    name: "Vợt Cầu Lông Yonex Nanoflare 1000Z",
    brand: "Yonex",
    category: "vot",
    price: 4200000,
    originalPrice: 4600000,
    badge: "KỶ LỤC",
    badgeClass: "badge-new",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Trọng lượng / Chu vi cán": "4U/G5 (83g)",
      "Điểm cân bằng": "292mm (Nhẹ đầu - Tốc độ)",
      "Độ cứng thân đũa": "Siêu cứng (Extra Stiff)",
      "Sức căng tối đa": "28 lbs (12.5 kg)",
      "Lối chơi phù hợp": "Tốc độ chớp nhoáng, phản xạ nhanh"
    },
    chips: ["4U/G5", "Nhẹ đầu", "Kỷ lục tốc độ 565km/h"],
    description: "Cây vợt nắm giữ kỷ lục thế giới về tốc độ đập cầu 565 km/h. Khung vợt khí động học Sonic Flare System giảm tối đa lực cản không khí."
  },

  // --- QUẢ CẦU LÔNG & ỐNG CẦU ---
  {
    id: 6,
    name: "Ống Cầu Lông Victor Champion No.1 (12 quả)",
    brand: "Victor",
    category: "cau",
    price: 320000,
    originalPrice: 350000,
    badge: "TIÊU CHUẨN",
    badgeClass: "badge-new",
    image: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Tốc độ bay": "Speed 77 (Chuẩn Việt Nam)",
      "Chất liệu lông": "Lông ngỗng tự nhiên chọn lọc",
      "Đế cầu": "Gỗ bần tự nhiên 3 lớp",
      "Quy cách đóng gói": "Ống 12 quả",
      "Độ bền": "Độ bền cực cao, quỹ đạo bay ổn định"
    },
    chips: ["Speed 77", "Lông ngỗng", "Đế gỗ bần"],
    description: "Quả cầu lông thi đấu chính thức tại nhiều giải đấu quốc tế. Tốc độ bay ổn định, đường cầu đầm tay và không bị rung lắc khi smash."
  },
  {
    id: 7,
    name: "Ống Cầu Lông Yonex Aerosensa 50 (AS-50)",
    brand: "Yonex",
    category: "cau",
    price: 490000,
    originalPrice: 530000,
    badge: "BWF OLYMPIC",
    badgeClass: "badge-hot",
    image: "https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Tốc độ bay": "Speed 76 / 77",
      "Chất liệu lông": "Lông ngỗng hạng nhất (Grade A)",
      "Đế cầu": "100% Gỗ bần cao cấp BWF",
      "Quy cách đóng gói": "Ống 12 quả",
      "Tiêu chuẩn": "Chuẩn thi đấu Olympic & Thế giới"
    },
    chips: ["Chuẩn Olympic", "Grade A", "Speed 77"],
    description: "Dòng cầu lông cao cấp nhất của Yonex, được sử dụng trong các giải Olympic và Super Series. Quỹ đạo hoàn hảo tuyệt đối."
  },

  // --- TRANG PHỤC & GIÀY THỂ THAO ---
  {
    id: 8,
    name: "Áo Đấu Cầu Lông Yonex Tournament CoolMax",
    brand: "Yonex",
    category: "quanao",
    price: 380000,
    originalPrice: 450000,
    badge: "-15%",
    badgeClass: "badge-sale",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Kích thước (Size)": "M (50-60kg), L (61-70kg), XL (71-80kg), XXL (>80kg)",
      "Chất liệu": "Thun lạnh mè Poly 4 chiều",
      "Công nghệ": "Very Cool tản nhiệt -3°C",
      "Màu sắc": "Xanh Navy / Trắng / Đỏ Thể Thao",
      "Đặc tính": "Thoáng khí, kháng khuẩn, chống tia UV"
    },
    chips: ["Size M-XXL", "Thun lạnh 4 chiều", "Tản nhiệt -3°C"],
    description: "Áo đấu chuyên nghiệp với công nghệ làm mát sợi vải Very Cool độc quyền của Yonex, giúp cơ thể luôn khô thoáng sau nhiều hiệp đấu."
  },
  {
    id: 9,
    name: "Giày Cầu Lông Li-Ning Halberd TD Đệm Khí",
    brand: "Lining",
    category: "quanao",
    price: 1850000,
    originalPrice: 2100000,
    badge: "BÁN CHẠY",
    badgeClass: "badge-hot",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Kích cỡ (Size)": "39, 40, 41, 42, 43, 44",
      "Công nghệ đế": "Đế cao su Non-Marking bám sàn",
      "Hệ thống đệm": "Li-Ning BOOM hấp thụ chấn động",
      "Thân giày": "Vải dệt Mesh thoáng khí kết hợp TPU chống lật cổ chân",
      "Trọng lượng": "310g / chiếc"
    },
    chips: ["Size 39-44", "Chống lật cổ chân", "Đệm Li-Ning BOOM"],
    description: "Mẫu giày bảo vệ tối đa khớp gối và cổ chân của bạn với đế đệm công nghệ BOOM siêu êm ái cùng thanh chống xoắn carbon sợi."
  },

  // --- PHỤ KIỆN: CƯỚC, QUẤN CÁN, TÚI ---
  {
    id: 10,
    name: "Cước Căng Vợt Cầu Lông Yonex BG 65 Titanium",
    brand: "Yonex",
    category: "phukien",
    price: 150000,
    originalPrice: 170000,
    badge: "PHỔ BIẾN",
    badgeClass: "badge-hot",
    image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Đường kính dây (Gauge)": "0.70 mm",
      "Chiều dài cuộn": "10 mét (Đan 1 cây vợt)",
      "Lớp phủ bề mặt": "Hợp chất Titanium Hydro Ti",
      "Cảm giác đánh": "Đanh, âm thanh nổ to, siêu bền bỉ",
      "Sức căng khuyến nghị": "20 - 28 lbs"
    },
    chips: ["0.70mm", "Phủ Titanium", "Âm nổ đanh", "Siêu bền"],
    description: "Dòng cước 'quốc dân' bền nhất thế giới của Yonex. Lớp phủ Titanium tăng độ cứng và tạo âm thanh vang đanh sắc nét khi chạm cầu."
  },
  {
    id: 11,
    name: "Hộp 10 Chiếc Quấn Cán Vợt Cầu Lông Victor GR-233",
    brand: "Victor",
    category: "phukien",
    price: 180000,
    originalPrice: 220000,
    badge: "-18%",
    badgeClass: "badge-sale",
    image: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Kích thước": "Rộng 25mm x Dài 1050mm x Dày 0.6mm",
      "Chất liệu": "Polyurethane siêu thấm hút mồ hôi",
      "Quy cách": "Hộp 10 chiếc nhiều màu (Xanh, Trắng, Đen, Cam, Vàng)",
      "Đặc tính": "Độ bám dính cao, êm ái, chống trơn trợt"
    },
    chips: ["Hộp 10 chiếc", "Thấm mồ hôi", "Độ dày 0.6mm"],
    description: "Quấn cán Victor GR-233 giúp tay cầm vợt luôn khô thoáng, bám dính chắc chắn ngay cả khi bạn đổ nhiều mồ hôi tay trong những trận cầu căng thẳng."
  },
  {
    id: 12,
    name: "Túi Đựng Vợt Cầu Lông Mizuno 6 Ngăn Chống Nhiệt",
    brand: "Mizuno",
    category: "phukien",
    price: 1250000,
    originalPrice: 1450000,
    badge: "MỚI",
    badgeClass: "badge-new",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Sức chứa": "6 - 9 cây vợt + Ngăn giày riêng + Quần áo",
      "Chất liệu": "Polyester 900D chống thấm nước",
      "Ngăn cách nhiệt": "Lót bạc Thermo Guard bảo vệ cước và khung",
      "Kích thước": "75cm x 30cm x 32cm",
      "Quai đeo": "Quai đeo balo đệm khí êm ái vai"
    },
    chips: ["Chứa 6-9 vợt", "Ngăn cách nhiệt", "Ngăn giày riêng"],
    description: "Túi đựng vợt cao cấp từ Mizuno với ngăn cách nhiệt Thermo Guard bảo vệ vợt khỏi biến dạng dưới thời tiết nắng nóng, tích hợp ngăn giày riêng thông thoáng khí."
  }
];

// --- REVIEWS DATA (Dữ liệu đánh giá từ khách hàng) ---
const REVIEWS_DATA = [
  {
    id: 1,
    name: "Trần Hoàng Long",
    role: "CLB Cầu Lông Cầu Giấy",
    rating: 5,
    stars: "★★★★★",
    comment: "Mình mua cây Astrox 88D Pro tại shop đan 11kg cước BG65Ti. Cầm đầm tay, smash tiếng nổ rất đanh. Đóng gói cẩn thận có ống carton bảo vệ.",
    avatar: "TH"
  },
  {
    id: 2,
    name: "Nguyễn Minh Tuấn",
    role: "Khách hàng thành viên",
    rating: 5,
    stars: "★★★★★",
    comment: "Áo thể thao Yonex thun mè mặc rất mát, thấm hút mồ hôi cực nhanh khi đánh 3 set liền. Giao hàng về Hải Dương đúng 1 ngày là nhận được.",
    avatar: "NM"
  },
  {
    id: 3,
    name: "Lê Phương Anh",
    role: "Học viên cầu lông phong trào",
    rating: 5,
    stars: "★★★★★",
    comment: "Shop tư vấn rất có tâm. Mình mới chơi được hướng dẫn chọn cây 4U thân trung bình đánh không bị mỏi cổ tay. Ống cầu Victor bay rất đầm và chuẩn quỹ đạo.",
    avatar: "LA"
  },
  {
    id: 4,
    name: "Vũ Quang Huy",
    role: "Đội tuyển ĐH Bách Khoa",
    rating: 4,
    stars: "★★★★☆",
    comment: "Dịch vụ đan vợt 4 nút ở đây rất đều tay, đúng mức cân 11.5kg mình yêu cầu. Máy đan điện tử chuẩn BWF, khung vợt không bị xước hay móp góc.",
    avatar: "QH"
  },
  {
    id: 5,
    name: "Đặng Thùy Dương",
    role: "Lông thủ CLB Thanh Xuân",
    rating: 5,
    stars: "★★★★★",
    comment: "Giày Li-Ning Halberd TD đệm BOOM đi siêu êm, giảm chấn đầu gối rất tốt. Đổi size giày trong 24h hỗ trợ cực kỳ nhiệt tình.",
    avatar: "TD"
  },
  {
    id: 6,
    name: "Phạm Hải Đăng",
    role: "Vận động viên phong trào",
    rating: 4,
    stars: "★★★★☆",
    comment: "Ống cầu Yonex AS-50 chuẩn thi đấu quốc tế, lông cầu dai và không bị tòe khi đập smash mạnh. Giá cả hợp lý so với thị trường.",
    avatar: "HD"
  }
];

// ==========================================================================
// 2. QUẢN LÝ TRẠNG THÁI (APPLICATION STATE & DOM CACHING)
// ==========================================================================

/**
 * State đối tượng lưu trữ trạng thái hiện tại của giao diện.
 * Mọi thao tác tìm kiếm, click tab hãng, chọn danh mục hoặc sắp xếp đều cập nhật vào state này.
 */
const state = {
  currentBrand: "all",       // Bộ lọc hãng ('all', 'Yonex', 'Victor', 'Lining', 'Mizuno')
  currentCategory: "all",    // Bộ lọc danh mục ('all', 'vot', 'cau', 'quanao', 'phukien')
  searchQuery: "",          // Từ khóa tìm kiếm hiện thời
  sortBy: "featured",        // Kiểu sắp xếp ('featured', 'price-asc', 'price-desc', 'name-asc')
  cartCount: 0,              // Số lượng món đồ trong giỏ hàng
  currentReviewRating: "all" // Lọc đánh giá khách hàng
};

// Cache các phần tử DOM quan trọng để tránh gọi document.getElementById() nhiều lần
const productGrid = document.getElementById("productGrid");
const productResultCount = document.getElementById("productResultCount");
const emptyState = document.getElementById("emptyState");
const emptyResetBtn = document.getElementById("emptyResetBtn");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const sortSelect = document.getElementById("sortSelect");

const brandFilterTabs = document.getElementById("brandFilterTabs");
const categoryFilterPills = document.getElementById("categoryFilterPills");

const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const searchDropdown = document.getElementById("searchDropdown");

const sectionSearchInput = document.getElementById("sectionSearchInput");
const clearSectionSearchBtn = document.getElementById("clearSectionSearchBtn");

const mobileSearchInput = document.getElementById("mobileSearchInput");

const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");

const mobileToggleBtn = document.getElementById("mobileToggleBtn");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const mobileDrawer = document.getElementById("mobileDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");

const modalBackdrop = document.getElementById("modalBackdrop");
const modalContent = document.getElementById("modalContent");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const toastContainer = document.getElementById("toastContainer");

// ==========================================================================
// 3. CÁC HÀM TIỆN ÍCH DÙNG CHUNG (UTILITY FUNCTIONS)
// ==========================================================================

/**
 * Định dạng số tiền sang chuẩn tiền tệ Việt Nam Đồng (VND).
 * Ví dụ: 4350000 -> "4.350.000 ₫"
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Hiển thị Toast thông báo nhanh nổi lên góc dưới màn hình.
 * Tự động biến mất mượt mà sau 2.8 giây.
 */
function showToast(message, type = "success") {
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span>${type === "success" ? "✓" : "ℹ"}</span>
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/**
 * Thêm sản phẩm vào giỏ hàng với hiệu ứng nhảy kích thước (micro-bounce).
 * [ĐỀ XUẤT CẢI TIẾN TƯƠNG LAI]:
 * - Lưu mảng chi tiết các sản phẩm trong giỏ vào localStorage: `localStorage.setItem('cartItems', JSON.stringify(cartList))`
 * - Xây dựng thêm một Modal giỏ hàng hoàn chỉnh hiển thị danh sách sản phẩm, số lượng và nút thanh toán.
 */
function addToCart(productName) {
  state.cartCount++;
  if (cartCount) {
    cartCount.textContent = state.cartCount;
    // Animation scale nhẹ tạo cảm giác phản hồi xúc giác (micro-interaction)
    cartCount.style.transform = "scale(1.4)";
    setTimeout(() => {
      cartCount.style.transform = "scale(1)";
    }, 200);
  }
  showToast(`Đã thêm vào giỏ hàng: <strong>${productName}</strong>`);
}

/**
 * Chuyển đổi mã key danh mục sang tên hiển thị tiếng Việt.
 */
function getCategoryName(categoryKey) {
  switch (categoryKey) {
    case "vot": return "Vợt Cầu Lông";
    case "cau": return "Quả & Ống Cầu Lông";
    case "quanao": return "Quần Áo & Giày";
    case "phukien": return "Phụ Kiện Cầu Lông";
    default: return "Phụ Kiện Thể Thao";
  }
}

/**
 * Cuộn trang mượt mà xuống Section Sản Phẩm (#products),
 * có tính toán bù trừ chiều cao 76px của Sticky Header để tiêu đề không bị che lấp.
 */
function scrollToProductsSection() {
  const productsSection = document.getElementById("products");
  if (productsSection) {
    const offset = 76;
    const elemRect = productsSection.getBoundingClientRect().top;
    const bodyRect = document.body.getBoundingClientRect().top;
    const offsetPosition = elemRect - bodyRect - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
  if (searchDropdown) {
    searchDropdown.style.display = "none";
  }
}

// ==========================================================================
// 4. CHUYỂN ĐỔI THEME SÁNG / TỐI (DARK / LIGHT MODE & LOCALSTORAGE)
// ==========================================================================

/**
 * Khởi tạo Theme khi tải trang:
 * 1. Kiểm tra xem người dùng đã từng lưu theme nào trong localStorage chưa (`hnd_theme`).
 * 2. Nếu chưa, tự động lấy theme theo cài đặt của hệ điều hành qua `window.matchMedia('(prefers-color-scheme: dark)')`.
 * 3. Gán sự kiện click cho cả nút trên Header và nút trong Menu Mobile.
 */
function initTheme() {
  const savedTheme = localStorage.getItem("hnd_theme") ||
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  applyTheme(savedTheme, false);

  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const drawerThemeToggleBtn = document.getElementById("drawerThemeToggleBtn");

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
  }

  if (drawerThemeToggleBtn) {
    drawerThemeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
  }
}

/**
 * Áp dụng theme vào thẻ <html> thông qua thuộc tính `data-theme`,
 * lưu vào `localStorage` và đồng bộ nội dung các nút bấm / tooltip accessibility.
 * 
 * [ĐỀ XUẤT CẢI TIẾN TƯƠNG LAI]:
 * - Thêm listener: `window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => ...)`
 *   để tự động đồng bộ khi người dùng đổi theme trên Windows / MacOS / Android.
 */
function applyTheme(theme, showFeedback = false) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("hnd_theme", theme);

  // Cập nhật text trong menu mobile
  const drawerThemeText = document.querySelector(".drawer-theme-text");
  if (drawerThemeText) {
    drawerThemeText.textContent = theme === "dark" ? "Chuyển sang Chế độ Sáng" : "Chuyển sang Chế độ Tối";
  }

  // Cập nhật ARIA label cho người khiếm thị sử dụng Screen Reader
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute("aria-label", theme === "dark" ? "Chuyển sang Chế độ Sáng" : "Chuyển sang Chế độ Tối");
  }

  if (showFeedback) {
    showToast(`Đã chuyển sang ${theme === "dark" ? "Chế độ Tối (Dark Mode)" : "Chế độ Sáng (Light Mode)"}`);
  }
}

// ==========================================================================
// 5. ĐIỀU HƯỚNG, MENU MOBILE & SCROLLSPY
// ==========================================================================

/**
 * Khởi tạo Navigation:
 * - Đóng/mở mobile drawer bằng sự kiện click và toggle class CSS.
 * - Chặn nhảy trang đột ngột của thẻ <a> có href="#..." và thay bằng scrollTo({ behavior: 'smooth' }).
 * - Lắng nghe sự kiện scroll của trình duyệt để chạy hàm Scrollspy.
 */
function initNavigation() {
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener("click", toggleMobileDrawer);
  }
  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener("click", closeMobileDrawer);
  }
  if (drawerOverlay) {
    drawerOverlay.addEventListener("click", closeMobileDrawer);
  }

  // Smooth scroll cho các liên kết điều hướng
  const allNavLinks = document.querySelectorAll(".main-nav .nav-link, .drawer-nav .drawer-link");
  allNavLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const headerOffset = 74;
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });

          closeMobileDrawer();
        }
      }
    });
  });

  // Lắng nghe sự kiện scroll và chạy Scrollspy
  window.addEventListener("scroll", handleScrollSpy, { passive: true });
  handleScrollSpy();
}

/**
 * Đóng mở menu drawer trên Mobile bằng cách toggle class .active trên Button và Drawer
 */
function toggleMobileDrawer() {
  const isOpen = mobileDrawer.classList.contains("active");
  if (isOpen) {
    closeMobileDrawer();
  } else {
    openMobileDrawer();
  }
}

function openMobileDrawer() {
  mobileDrawer.classList.add("active");
  drawerOverlay.classList.add("active");
  mobileToggleBtn.classList.add("active");
  mobileToggleBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden"; // Chống cuộn nền khi menu mobile đang mở
}

function closeMobileDrawer() {
  mobileDrawer.classList.remove("active");
  drawerOverlay.classList.remove("active");
  mobileToggleBtn.classList.remove("active");
  mobileToggleBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

/**
 * Thuật toán Scrollspy (Đánh dấu mục đang xem trên Navigation Bar):
 * - Sử dụng `window.scrollY` và `document.querySelectorAll("section[id]")`.
 * - So sánh vị trí con trỏ cuộn `scrollPosition` với `sectionTop` và `sectionHeight`.
 * - Section nào đang chiếm sóng viewport thì gán class `.active` cho thẻ <a> tương ứng.
 * 
 * [ĐỀ XUẤT CẢI TIẾN TƯƠNG LAI]:
 * - Có thể refactor sang `IntersectionObserver API` để trình duyệt tự quản lý tối ưu hiệu năng CPU
 *   thay vì liên tục trigger trên scroll event.
 */
function handleScrollSpy() {
  const header = document.getElementById("siteHeader");
  if (header) {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav .nav-link, .drawer-nav .drawer-link");
  const scrollPosition = window.scrollY + 150; // Offset trước 150px để trải nghiệm nhìn tự nhiên

  let currentSectionId = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  // Nếu cuộn đến tận đáy trang web, kích hoạt ngay mục Liên Hệ
  if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 80)) {
    currentSectionId = "contact";
  }

  if (currentSectionId) {
    navLinks.forEach(link => {
      const linkTarget = link.getAttribute("href");
      if (linkTarget === `#${currentSectionId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
}

// ==========================================================================
// 6. HERO IMAGE SLIDER (VANILLA JAVASCRIPT SLIDER - KHÔNG DÙNG THƯ VIỆN)
// ==========================================================================

/**
 * Tự xây dựng Image Carousel Slider bằng JavaScript thuần:
 * - Thuật toán chuyển vị trí slide: `translateX(-${currentIndex * 100}%)`
 * - Thuật toán vòng tròn: `currentIndex = (index + totalSlides) % totalSlides` (không bao giờ bị tràn mảng)
 * - Tự động chuyển slide (Auto-play) sau mỗi 4.2 giây qua `setInterval`.
 * - Tạm dừng khi rê chuột vào (`mouseenter` -> `clearInterval`) và chạy lại khi rời chuột (`mouseleave`).
 * - Hỗ trợ nút Previous (<), Next (>) và click các chấm tròn phân trang (Pagination Dots).
 * 
 * [ĐỀ XUẤT CẢI TIẾN TƯƠNG LAI]:
 * - Bổ sung Touch Swipe Events (`touchstart`, `touchmove`, `touchend`) để người dùng điện thoại
 *   có thể vuốt slide qua trái/phải bằng ngón tay.
 */
function initHeroSlider() {
  const track = document.getElementById("heroSliderTrack");
  const prevBtn = document.getElementById("heroSliderPrev");
  const nextBtn = document.getElementById("heroSliderNext");
  const dotsContainer = document.getElementById("heroSliderDots");
  const slider = document.getElementById("heroSlider");

  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides = track.querySelectorAll(".hero-slide");
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoPlayTimer = null;

  // Tạo các chấm tròn Pagination bằng Array.from() và map()
  dotsContainer.innerHTML = Array.from({ length: totalSlides }, (_, i) => `
    <button class="slider-dot ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Xem slide ${i + 1}"></button>
  `).join("");

  const dots = dotsContainer.querySelectorAll(".slider-dot");

  // Hàm chuyển đến slide chỉ định
  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === currentIndex);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoPlay();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoPlay();
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.index, 10);
      goToSlide(idx);
      restartAutoPlay();
    });
  });

  // Tự động chuyển slide sau mỗi 4.2 giây
  function startAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, 4200);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Tạm dừng khi hover chuột vào slider (Pause on hover)
  slider.addEventListener("mouseenter", stopAutoPlay);
  slider.addEventListener("mouseleave", startAutoPlay);

  startAutoPlay();
}

// ==========================================================================
// 7. TẢI NỘI DUNG LINH ĐỘNG TỪ DỮ LIỆU & BỘ LỌC REAL-TIME
// ==========================================================================

/**
 * renderItems(data)
 * Hàm bắt buộc theo yêu cầu đề bài: "Viết hàm renderItems(data) dùng map() và DOM API
 * để tạo phần tử HTML từ dữ liệu (không hardcode nội dung trực tiếp trong HTML)".
 * 
 * Cơ chế hoạt động:
 * 1. Kiểm tra nếu mảng data rỗng -> Hiển thị Empty State thông báo.
 * 2. Cập nhật số lượng sản phẩm hiển thị trên thanh đếm.
 * 3. Dùng `data.map(item => ...).join("")` để chuyển từng object sản phẩm thành template HTML hoàn chỉnh
 *    và gán trực tiếp vào `productGrid.innerHTML`.
 * 
 * [ĐỀ XUẤT CẢI TIẾN TƯƠNG LAI]:
 * - Bổ sung hiệu ứng Skeleton Loading (placeholder shimmer) trước khi dữ liệu được load xong.
 * - Áp dụng `loading="lazy"` cho ảnh để tiết kiệm băng thông mạng khi có nhiều sản phẩm.
 */
function renderItems(data) {
  if (!productGrid) return;

  // Xử lý trường hợp không tìm thấy kết quả phù hợp
  if (!data || data.length === 0) {
    productGrid.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    if (productResultCount) {
      const q = state.searchQuery.trim();
      productResultCount.textContent = q !== "" 
        ? `Không tìm thấy sản phẩm nào khớp với từ khóa "${q}"`
        : "Không có sản phẩm nào phù hợp";
    }
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (productResultCount) {
    const q = state.searchQuery.trim();
    if (q !== "") {
      productResultCount.innerHTML = `Tìm thấy <strong>${data.length}</strong> sản phẩm khớp với "<em>${q}</em>"`;
    } else {
      productResultCount.textContent = `Đang hiển thị ${data.length} sản phẩm`;
    }
  }

  // Sinh HTML động từ mảng object bằng map() và join()
  productGrid.innerHTML = data.map(item => {
    // Chuyển mảng chip thông số thành các thẻ span
    const chipsHtml = item.chips
      .map(c => `<span class="spec-chip">${c}</span>`)
      .join("");

    return `
      <article class="product-card" data-id="${item.id}">
        <div class="product-thumb-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'400\\' viewBox=\\'0 0 400 400\\'><rect fill=\\'%23f1f5f9\\' width=\\'400\\' height=\\'400\\'/><circle cx=\\'200\\' cy=\\'160\\' r=\\'60\\' fill=\\'none\\' stroke=\\'%230284c7\\' stroke-width=\\'8\\'/><line x1=\\'200\\' y1=\\'220\\' x2=\\'200\\' y2=\\'330\\' stroke=\\'%230284c7\\' stroke-width=\\'8\\'/><text x=\\'200\\' y=\\'365\\' font-family=\\'sans-serif\\' font-size=\\'18\\' font-weight=\\'bold\\' fill=\\'%2364748b\\' text-anchor=\\'middle\\'>HND BADMINTON</text></svg>';">
          <span class="card-badge-brand">${item.brand}</span>
          ${item.badge ? `<span class="card-badge-status ${item.badgeClass}">${item.badge}</span>` : ""}
        </div>

        <div class="product-info">
          <span class="product-category-tag">${getCategoryName(item.category)}</span>
          <h3 class="product-title" title="${item.name}">${item.name}</h3>

          <div class="product-specs-chips">
            ${chipsHtml}
          </div>

          <div class="product-price-row">
            <span class="current-price">${formatCurrency(item.price)}</span>
            ${item.originalPrice ? `<span class="original-price">${formatCurrency(item.originalPrice)}</span>` : ""}
          </div>

          <div class="product-card-actions">
            <button type="button" class="btn-card-view" onclick="openProductModal(${item.id})">
              Xem Chi Tiết
            </button>
            <button type="button" class="btn-card-buy" onclick="addToCart('${item.name.replace(/'/g, "\\'")}')">
              + Giỏ Hàng
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/**
 * Hàm lọc sản phẩm và sắp xếp theo thời gian thực (Real-time Filtering & Sorting):
 * - Sử dụng phương thức `Array.prototype.filter()`.
 * - Lọc kết hợp 3 tiêu chí:
 *   1. Text search: Quét qua Tên, Thương hiệu, Specs chips, Danh mục và Mô tả.
 *   2. Thương hiệu: Brand tabs (Yonex, Victor, Li-Ning, Mizuno).
 *   3. Phân loại: Category pills (Vợt, Cầu, Quần áo & Giày, Phụ kiện).
 * - Sắp xếp qua `Array.prototype.sort()` theo Giá tăng dần, Giá giảm dần hoặc Tên A-Z.
 * - Gọi lại `renderItems(filtered)` để cập nhật DOM tức thì mà không reload trang.
 */
function applyProductFilters() {
  const query = state.searchQuery.trim().toLowerCase();

  let filtered = PRODUCTS_DATA.filter(item => {
    // 1. Quét tìm kiếm text trên tất cả các thuộc tính
    if (query !== "") {
      const matchName = item.name.toLowerCase().includes(query);
      const matchBrand = item.brand.toLowerCase().includes(query);
      const matchChips = item.chips.some(chip => chip.toLowerCase().includes(query));
      const matchCategory = getCategoryName(item.category).toLowerCase().includes(query);
      const matchDesc = item.description ? item.description.toLowerCase().includes(query) : false;

      const isMatched = matchName || matchBrand || matchChips || matchCategory || matchDesc;
      if (!isMatched) {
        return false;
      }
    }

    // 2. Lọc theo thương hiệu (Brand)
    if (state.currentBrand !== "all") {
      if (item.brand.toLowerCase() !== state.currentBrand.toLowerCase()) {
        return false;
      }
    }

    // 3. Lọc theo danh mục (Category)
    if (state.currentCategory !== "all" && item.category !== state.currentCategory) {
      return false;
    }

    return true;
  });

  // 4. Sắp xếp danh sách (Sort)
  if (state.sortBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  }

  // 5. Cập nhật trạng thái hiển thị nút "Xóa bộ lọc"
  const hasActiveFilters = state.currentBrand !== "all" || state.currentCategory !== "all" || state.searchQuery !== "";
  if (resetFiltersBtn) {
    resetFiltersBtn.style.display = hasActiveFilters ? "inline-flex" : "none";
  }

  // Render danh sách sau khi đã lọc
  renderItems(filtered);
  return filtered;
}

/**
 * Hiển thị Popup Dropdown gợi ý kết quả trực tiếp ngay dưới ô Header Search khi gõ
 * Giúp người dùng ở đầu trang (Hero) thấy ngay kết quả tức thời mà không cần tự lăn chuột.
 */
function updateSearchDropdown(query, results) {
  if (!searchDropdown) return;

  if (!query || query === "") {
    searchDropdown.style.display = "none";
    searchDropdown.innerHTML = "";
    return;
  }

  if (results.length === 0) {
    searchDropdown.innerHTML = `
      <div class="search-dropdown-empty">
        Không tìm thấy sản phẩm nào khớp với "<strong>${query}</strong>"
      </div>
    `;
    searchDropdown.style.display = "block";
    return;
  }

  // Lấy tối đa 5 sản phẩm nổi bật nhất để hiển thị trong dropdown
  const itemsHtml = results.slice(0, 5).map(item => `
    <div class="search-dropdown-item" onclick="openProductModal(${item.id});">
      <img src="${item.image}" alt="${item.name}" class="search-dropdown-thumb" onerror="this.style.display='none'">
      <div class="search-dropdown-info">
        <div class="search-dropdown-title">${item.name}</div>
        <div class="search-dropdown-price">${formatCurrency(item.price)}</div>
      </div>
    </div>
  `).join("");

  searchDropdown.innerHTML = `
    <div class="search-dropdown-header">
      <span>Gợi ý (${results.length} sản phẩm)</span>
      <span>Nhấn Enter để xem</span>
    </div>
    <div class="search-dropdown-list">
      ${itemsHtml}
    </div>
    <div class="search-dropdown-footer" onclick="scrollToProductsSection()">
      Xem tất cả ${results.length} sản phẩm trong kho &darr;
    </div>
  `;
  searchDropdown.style.display = "block";
}

/**
 * Xử lý sự kiện nhập liệu tìm kiếm đồng bộ trên cả 3 ô input:
 * 1. Ô tìm kiếm trên Header Desktop
 * 2. Ô tìm kiếm trực tiếp trong Section Sản Phẩm
 * 3. Ô tìm kiếm trên giao diện Mobile
 * 
 * Tự động giải quyết xung đột Multi-filter: Khi người dùng gõ tìm kiếm,
 * nếu từ khóa có chứa tên hãng (như Yonex, Victor...), hệ thống tự động reset tab Brand về "all"
 * để đảm bảo toàn bộ sản phẩm khớp từ khóa đều được hiển thị, không bị lọc nhầm thành 0 kết quả!
 */
let searchScrollDebounce = null;
function handleSearchInput(value, source = "header") {
  state.searchQuery = value;

  // Đồng bộ giá trị giữa các ô input
  if (source !== "header" && searchInput) searchInput.value = value;
  if (source !== "section" && sectionSearchInput) sectionSearchInput.value = value;
  if (source !== "mobile" && mobileSearchInput) mobileSearchInput.value = value;

  // Ẩn/hiện nút xóa nhanh chữ x
  if (clearSearchBtn) clearSearchBtn.hidden = value === "";
  if (clearSectionSearchBtn) clearSectionSearchBtn.hidden = value === "";

  // Tự động giải phóng tab Brand nếu từ khóa tìm kiếm là một hãng cụ thể
  const lower = value.toLowerCase().trim();
  const brands = ["yonex", "victor", "lining", "mizuno"];
  const matchedBrand = brands.find(b => lower.includes(b));
  if (matchedBrand && state.currentBrand !== "all" && state.currentBrand.toLowerCase() !== matchedBrand) {
    state.currentBrand = "all";
    if (brandFilterTabs) {
      brandFilterTabs.querySelectorAll(".brand-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.brand === "all");
      });
    }
  }

  const filteredResults = applyProductFilters();

  // Hiển thị dropdown gợi ý nếu người dùng đang tìm kiếm từ Header
  if (source === "header") {
    updateSearchDropdown(lower, filteredResults);

    // Tự động cuộn xuống section sản phẩm sau 900ms nếu người dùng đang đứng ở đầu trang
    if (lower !== "" && window.scrollY < 300) {
      if (searchScrollDebounce) clearTimeout(searchScrollDebounce);
      searchScrollDebounce = setTimeout(() => {
        scrollToProductsSection();
      }, 900);
    }
  } else {
    if (searchDropdown) searchDropdown.style.display = "none";
  }
}

/**
 * Xóa toàn bộ bộ lọc và từ khóa tìm kiếm về trạng thái mặc định ban đầu
 */
function resetAllFilters() {
  state.currentBrand = "all";
  state.currentCategory = "all";
  state.searchQuery = "";
  state.sortBy = "featured";

  if (searchInput) searchInput.value = "";
  if (sectionSearchInput) sectionSearchInput.value = "";
  if (mobileSearchInput) mobileSearchInput.value = "";
  if (clearSearchBtn) clearSearchBtn.hidden = true;
  if (clearSectionSearchBtn) clearSectionSearchBtn.hidden = true;
  if (searchDropdown) searchDropdown.style.display = "none";
  if (sortSelect) sortSelect.value = "featured";

  if (brandFilterTabs) {
    brandFilterTabs.querySelectorAll(".brand-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.brand === "all");
    });
  }

  if (categoryFilterPills) {
    categoryFilterPills.querySelectorAll(".cat-pill").forEach(pill => {
      pill.classList.toggle("active", pill.dataset.category === "all");
    });
  }

  applyProductFilters();
}

// ==========================================================================
// 8. HIỂN THỊ ĐÁNH GIÁ KHÁCH HÀNG ĐỘNG (DATA-DRIVEN REVIEWS)
// ==========================================================================

/**
 * Render danh sách đánh giá từ mảng `REVIEWS_DATA` bằng `map()` và DOM API.
 */
function renderReviews(data) {
  const reviewsGrid = document.getElementById("reviewsGrid");
  if (!reviewsGrid) return;

  reviewsGrid.innerHTML = data.map(rev => `
    <div class="review-card">
      <div class="review-stars">${rev.stars}</div>
      <p class="review-comment">"${rev.comment}"</p>
      <div class="reviewer-meta">
        <div class="reviewer-avatar">${rev.avatar}</div>
        <div>
          <strong>${rev.name}</strong>
          <span>${rev.role}</span>
        </div>
      </div>
    </div>
  `).join("");
}

/**
 * Khởi tạo bộ lọc đánh giá theo số sao (Tất cả, 5 sao, 4 sao)
 */
function initReviewsFilter() {
  const filterBtns = document.querySelectorAll(".review-filter-btn");
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const rating = btn.dataset.rating;
      state.currentReviewRating = rating;

      if (rating === "all") {
        renderReviews(REVIEWS_DATA);
      } else {
        const ratingNum = parseInt(rating, 10);
        const filtered = REVIEWS_DATA.filter(r => r.rating === ratingNum);
        renderReviews(filtered);
      }
    });
  });
}

// ==========================================================================
// 9. KIỂM TRA DỮ LIỆU FORM TRƯỚC KHI SUBMIT (INLINE ERROR VALIDATION)
// ==========================================================================

/**
 * Quản lý Validation Form tư vấn chọn vợt:
 * - Kiểm tra Họ tên: không rỗng, >= 2 ký tự.
 * - Kiểm tra Email: không rỗng, kiểm tra định dạng RFC Email chuẩn bằng Regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`.
 * - Kiểm tra Số điện thoại: không rỗng, đúng định dạng số điện thoại Việt Nam 10 chữ số (đầu số 03, 05, 07, 08, 09).
 * - Hiển thị lỗi inline ngay bên dưới từng ô input kèm đổi màu viền đỏ và rung lắc (`has-error`).
 * - Lắng nghe sự kiện `blur` (khi người dùng click ra ngoài) và `input` (khi đang gõ sửa lỗi).
 * - Khi submit thành công: hiển thị hộp thông báo màu xanh, Toast thông báo và reset form.
 * 
 * [ĐỀ XUẤT CẢI TIẾN TƯƠNG LAI]:
 * - Tích hợp gửi dữ liệu lên Backend server qua `fetch('/api/consultation', { method: 'POST', body: ... })`.
 * - Thêm tính năng chống Spam (Google reCAPTCHA v3 hoặc Cloudflare Turnstile).
 */
function initFormValidation() {
  const consultForm = document.getElementById("consultForm");
  if (!consultForm) return;

  const custName = document.getElementById("custName");
  const custEmail = document.getElementById("custEmail");
  const custPhone = document.getElementById("custPhone");
  const formFeedbackAlert = document.getElementById("formFeedbackAlert");

  // Hàm kiểm tra Họ tên
  function validateName() {
    const val = custName.value.trim();
    const group = document.getElementById("groupCustName");
    const errEl = document.getElementById("custNameError");

    if (!val) {
      errEl.textContent = "Họ và tên không được để trống.";
      group.classList.add("has-error");
      group.classList.remove("is-valid");
      return false;
    }
    if (val.length < 2) {
      errEl.textContent = "Họ và tên phải có ít nhất 2 ký tự.";
      group.classList.add("has-error");
      group.classList.remove("is-valid");
      return false;
    }

    errEl.textContent = "";
    group.classList.remove("has-error");
    group.classList.add("is-valid");
    return true;
  }

  // Hàm kiểm tra Email bằng Regular Expression
  function validateEmail() {
    const val = custEmail.value.trim();
    const group = document.getElementById("groupCustEmail");
    const errEl = document.getElementById("custEmailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!val) {
      errEl.textContent = "Địa chỉ email không được để trống.";
      group.classList.add("has-error");
      group.classList.remove("is-valid");
      return false;
    }
    if (!emailRegex.test(val)) {
      errEl.textContent = "Email không hợp lệ (ví dụ: yourname@domain.com).";
      group.classList.add("has-error");
      group.classList.remove("is-valid");
      return false;
    }

    errEl.textContent = "";
    group.classList.remove("has-error");
    group.classList.add("is-valid");
    return true;
  }

  // Hàm kiểm tra Số điện thoại Việt Nam (10 số, đầu 03/05/07/08/09)
  function validatePhone() {
    const val = custPhone.value.trim();
    const group = document.getElementById("groupCustPhone");
    const errEl = document.getElementById("custPhoneError");
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

    if (!val) {
      errEl.textContent = "Số điện thoại không được để trống.";
      group.classList.add("has-error");
      group.classList.remove("is-valid");
      return false;
    }
    if (!phoneRegex.test(val)) {
      errEl.textContent = "Số điện thoại không hợp lệ (cần 10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09).";
      group.classList.add("has-error");
      group.classList.remove("is-valid");
      return false;
    }

    errEl.textContent = "";
    group.classList.remove("has-error");
    group.classList.add("is-valid");
    return true;
  }

  // Gắn sự kiện blur và input để validate inline tức thì
  if (custName) {
    custName.addEventListener("blur", validateName);
    custName.addEventListener("input", () => {
      const group = document.getElementById("groupCustName");
      if (group && group.classList.contains("has-error")) {
        validateName();
      }
    });
  }

  if (custEmail) {
    custEmail.addEventListener("blur", validateEmail);
    custEmail.addEventListener("input", () => {
      const group = document.getElementById("groupCustEmail");
      if (group && group.classList.contains("has-error")) {
        validateEmail();
      }
    });
  }

  if (custPhone) {
    custPhone.addEventListener("blur", validatePhone);
    custPhone.addEventListener("input", () => {
      const group = document.getElementById("groupCustPhone");
      if (group && group.classList.contains("has-error")) {
        validatePhone();
      }
    });
  }

  // Xử lý sự kiện submit Form
  consultForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();

    // Nếu bất kỳ trường nào sai -> focus ngay vào trường lỗi đầu tiên và hiển thị cảnh báo
    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      if (!isNameValid) {
        custName.focus();
      } else if (!isEmailValid) {
        custEmail.focus();
      } else if (!isPhoneValid) {
        custPhone.focus();
      }

      if (formFeedbackAlert) {
        formFeedbackAlert.className = "form-feedback-alert error";
        formFeedbackAlert.textContent = "Vui lòng hoàn thành đúng các trường thông tin có đánh dấu (*) trước khi gửi.";
        formFeedbackAlert.style.display = "block";
      }
      return;
    }

    // Mô phỏng trạng thái gửi dữ liệu (Loading state)
    const submitBtn = document.getElementById("consultSubmitBtn");
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Đang gửi thông tin...</span>`;

    setTimeout(() => {
      const customerName = custName.value.trim();
      const customerPhone = custPhone.value.trim();

      if (formFeedbackAlert) {
        formFeedbackAlert.className = "form-feedback-alert success";
        formFeedbackAlert.innerHTML = `
          ✓ Cảm ơn bạn <strong>${customerName}</strong>! Chuyên viên tư vấn vợt của HND Badminton sẽ liên hệ qua Zalo / SĐT <strong>${customerPhone}</strong> trong ít phút.
        `;
        formFeedbackAlert.style.display = "block";
      }

      showToast(`Đã gửi yêu cầu tư vấn thành công! Chuyên viên sẽ gọi cho bạn sớm.`);

      // Reset toàn bộ form và xóa các trạng thái viền xanh/đỏ
      consultForm.reset();
      document.querySelectorAll(".form-group").forEach(group => {
        group.classList.remove("is-valid", "has-error");
      });

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }, 600);
  });
}

// ==========================================================================
// 10. MODAL XEM CHI TIẾT SẢN PHẨM (PRODUCT QUICK VIEW MODAL)
// ==========================================================================

/**
 * Mở cửa sổ Modal xem chi tiết thông số kỹ thuật của sản phẩm khi click "Xem Chi Tiết":
 * - Tìm kiếm object sản phẩm trong `PRODUCTS_DATA` theo id.
 * - Render bảng thông số kỹ thuật chi tiết.
 * - Khóa cuộn trang nền (`document.body.style.overflow = "hidden"`).
 */
window.openProductModal = function(id) {
  const product = PRODUCTS_DATA.find(p => p.id === id);
  if (!product || !modalContent || !modalBackdrop) return;

  let specsRows = "";
  for (const [key, value] of Object.entries(product.specs)) {
    specsRows += `
      <tr>
        <td>${key}</td>
        <td>${value}</td>
      </tr>
    `;
  }

  modalContent.innerHTML = `
    <div class="modal-product-grid">
      <div class="modal-img-wrap">
        <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'400\\' viewBox=\\'0 0 400 400\\'><rect fill=\\'%23f1f5f9\\' width=\\'400\\' height=\\'400\\'/><circle cx=\\'200\\' cy=\\'160\\' r=\\'60\\' fill=\\'none\\' stroke=\\'%230284c7\\' stroke-width=\\'8\\'/><line x1=\\'200\\' y1=\\'220\\' x2=\\'200\\' y2=\\'330\\' stroke=\\'%230284c7\\' stroke-width=\\'8\\'/><text x=\\'200\\' y=\\'365\\' font-family=\\'sans-serif\\' font-size=\\'18\\' font-weight=\\'bold\\' fill=\\'%2364748b\\' text-anchor=\\'middle\\'>HND BADMINTON</text></svg>';">
      </div>

      <div class="modal-info-col">
        <span class="modal-brand-badge">${product.brand}</span>
        <h2 class="modal-product-title">${product.name}</h2>

        <div class="modal-price-row">
          <span class="modal-current-price">${formatCurrency(product.price)}</span>
          ${product.originalPrice ? `<span class="modal-original-price">${formatCurrency(product.originalPrice)}</span>` : ""}
        </div>

        <p class="modal-desc">${product.description}</p>

        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 8px; color: var(--color-secondary);">
          Bảng Thông Số Kỹ Thuật Chi Tiết:
        </h4>
        <table class="specs-table">
          <tbody>
            ${specsRows}
          </tbody>
        </table>

        <div style="display: flex; gap: 12px; margin-top: auto;">
          <button type="button" class="btn btn-primary" style="flex: 1;" onclick="addToCart('${product.name.replace(/'/g, "\\'")}'); closeModal();">
            Thêm Vào Giỏ Hàng
          </button>
          <button type="button" class="btn btn-outline" onclick="closeModal()">
            Đóng
          </button>
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.add("active");
  modalBackdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

function closeModal() {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove("active");
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ==========================================================================
// 11. ĐĂNG KÝ BỘ LẮNG NGHE SỰ KIỆN (EVENT LISTENERS SETUP)
// ==========================================================================

function initEventListeners() {
  // Lọc theo Brand tab
  if (brandFilterTabs) {
    brandFilterTabs.addEventListener("click", (e) => {
      const tab = e.target.closest(".brand-tab");
      if (!tab) return;

      brandFilterTabs.querySelectorAll(".brand-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      state.currentBrand = tab.dataset.brand;
      applyProductFilters();
    });
  }

  // Lọc theo Category pill
  if (categoryFilterPills) {
    categoryFilterPills.addEventListener("click", (e) => {
      const pill = e.target.closest(".cat-pill");
      if (!pill) return;

      categoryFilterPills.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      state.currentCategory = pill.dataset.category;
      applyProductFilters();
    });
  }

  // Dropdown sắp xếp giá và tên
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      applyProductFilters();
    });
  }

  // 1. Ô tìm kiếm trên Header Desktop
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      handleSearchInput(e.target.value, "header");
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        scrollToProductsSection();
      }
    });

    searchInput.addEventListener("focus", () => {
      if (state.searchQuery.trim() !== "") {
        const lower = state.searchQuery.toLowerCase().trim();
        const results = PRODUCTS_DATA.filter(item =>
          item.name.toLowerCase().includes(lower) ||
          item.brand.toLowerCase().includes(lower) ||
          item.chips.some(c => c.toLowerCase().includes(lower))
        );
        updateSearchDropdown(lower, results);
      }
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      handleSearchInput("", "header");
      if (searchInput) searchInput.focus();
    });
  }

  // 2. Ô tìm kiếm trực tiếp trong Section Sản Phẩm
  if (sectionSearchInput) {
    sectionSearchInput.addEventListener("input", (e) => {
      handleSearchInput(e.target.value, "section");
    });

    sectionSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        scrollToProductsSection();
      }
    });
  }

  if (clearSectionSearchBtn) {
    clearSectionSearchBtn.addEventListener("click", () => {
      handleSearchInput("", "section");
      if (sectionSearchInput) sectionSearchInput.focus();
    });
  }

  // 3. Ô tìm kiếm trên Header Mobile
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", (e) => {
      handleSearchInput(e.target.value, "mobile");
    });

    mobileSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        scrollToProductsSection();
      }
    });
  }

  // Tự động đóng search dropdown khi click ra ngoài
  document.addEventListener("click", (e) => {
    if (searchDropdown && !e.target.closest(".header-search")) {
      searchDropdown.style.display = "none";
    }
  });

  // Nút xóa bộ lọc (Reset filters)
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", resetAllFilters);
  }
  if (emptyResetBtn) {
    emptyResetBtn.addEventListener("click", resetAllFilters);
  }

  // Click vào card thương hiệu ở Brand Showcase để cuộn xuống catalog và chọn sẵn hãng
  document.querySelectorAll(".brand-show-card, .filter-by-brand-btn").forEach(el => {
    el.addEventListener("click", () => {
      const brand = el.dataset.brand || el.closest(".brand-show-card")?.dataset.brand;
      if (!brand) return;

      state.currentBrand = brand;
      state.searchQuery = "";
      if (searchInput) searchInput.value = "";
      if (sectionSearchInput) sectionSearchInput.value = "";
      if (mobileSearchInput) mobileSearchInput.value = "";

      if (brandFilterTabs) {
        brandFilterTabs.querySelectorAll(".brand-tab").forEach(t => {
          t.classList.toggle("active", t.dataset.brand.toLowerCase() === brand.toLowerCase());
        });
      }

      applyProductFilters();
      scrollToProductsSection();
    });
  });

  // Đóng modal khi bấm nút x hoặc bấm ra ngoài nền backdrop
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  // Phím ESC đóng modal hoặc mobile drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeMobileDrawer();
      if (searchDropdown) searchDropdown.style.display = "none";
    }
  });

  // Thông báo phản hồi khi click nút Giỏ Hàng trên Header
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      if (state.cartCount === 0) {
        showToast("Giỏ hàng của bạn đang trống. Hãy chọn sản phẩm yêu thích nhé!", "info");
      } else {
        showToast(`Bạn đang có ${state.cartCount} sản phẩm trong giỏ hàng.`);
      }
    });
  }
}

// ==========================================================================
// 12. KHỞI CHẠY ỨNG DỤNG KHI DOM ĐÃ SẴN SÀNG (DOM READY)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Kích hoạt giao diện Theme (Dark/Light mode & đọc localStorage)
  initTheme();

  // 2. Kích hoạt Điều hướng, Menu Mobile Drawer và Scrollspy cuộn trang
  initNavigation();

  // 3. Khởi chạy Hero Image Slider (Auto-play, pause on hover)
  initHeroSlider();

  // 4. Render danh sách sản phẩm động từ PRODUCTS_DATA bằng hàm renderItems()
  renderItems(PRODUCTS_DATA);

  // 5. Render danh sách đánh giá khách hàng động từ REVIEWS_DATA
  renderReviews(REVIEWS_DATA);
  initReviewsFilter();

  // 6. Kích hoạt kiểm tra dữ liệu Form (Inline Error Validation)
  initFormValidation();

  // 7. Gắn các bộ lắng nghe sự kiện tìm kiếm, lọc và modal
  initEventListeners();
});
