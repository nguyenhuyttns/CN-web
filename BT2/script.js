/**
 * HND BADMINTON - PRODUCT CATALOG & INTERACTION SCRIPT
 * Manages product database, dynamic rendering, brand & category filtering,
 * search, sorting, quick view modal, and cart toast feedback.
 */

// ==========================================
// 1. PRODUCT DATABASE (CƠ SỞ DỮ LIỆU SẢN PHẨM)
// ==========================================
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

// ==========================================
// 2. STATE MANAGEMENT & DOM ELEMENTS
// ==========================================
const state = {
  currentBrand: "all",
  currentCategory: "all",
  searchQuery: "",
  sortBy: "featured",
  cartCount: 0
};

// DOM References
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

// ==========================================
// 3. UTILITY FUNCTIONS (HÀM TIỆN ÍCH)
// ==========================================

// Format Vietnamese Currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(amount);
}

// Show Toast Notification
function showToast(message, type = "success") {
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

// Add Item to Cart with micro-bounce
function addToCart(productName) {
  state.cartCount++;
  cartCount.textContent = state.cartCount;
  
  // Animation on cart button
  cartCount.style.transform = "scale(1.4)";
  setTimeout(() => {
    cartCount.style.transform = "scale(1)";
  }, 200);

  showToast(`Đã thêm vào giỏ: <strong>${productName}</strong>`);
}

// ==========================================
// 4. RENDER PRODUCTS
// ==========================================
function renderProducts() {
  // 1. Filter by Brand
  let filtered = PRODUCTS_DATA.filter(item => {
    if (state.currentBrand !== "all" && item.brand.toLowerCase() !== state.currentBrand.toLowerCase()) {
      return false;
    }
    // 2. Filter by Category
    if (state.currentCategory !== "all" && item.category !== state.currentCategory) {
      return false;
    }
    // 3. Filter by Search Query
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchBrand = item.brand.toLowerCase().includes(q);
      const matchChips = item.chips.some(chip => chip.toLowerCase().includes(q));
      if (!matchName && !matchBrand && !matchChips) {
        return false;
      }
    }
    return true;
  });

  // 4. Sort
  if (state.sortBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  }

  // 5. Update Status Counters
  productResultCount.textContent = `Đang hiển thị ${filtered.length} sản phẩm`;
  
  const hasActiveFilters = state.currentBrand !== "all" || state.currentCategory !== "all" || state.searchQuery !== "";
  resetFiltersBtn.style.display = hasActiveFilters ? "inline-flex" : "none";

  // 6. Handle Empty State
  if (filtered.length === 0) {
    productGrid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  } else {
    emptyState.style.display = "none";
  }

  // 7. Generate Product Cards HTML
  productGrid.innerHTML = filtered.map(item => {
    // Generate spec chips HTML
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

          <!-- Attribute chips -->
          <div class="product-specs-chips">
            ${chipsHtml}
          </div>

          <!-- Price Row -->
          <div class="product-price-row">
            <span class="current-price">${formatCurrency(item.price)}</span>
            ${item.originalPrice ? `<span class="original-price">${formatCurrency(item.originalPrice)}</span>` : ""}
          </div>

          <!-- Action Buttons -->
          <div class="product-card-actions">
            <button type="button" class="btn-card-view" onclick="openProductModal(${item.id})">
              Xem Chi Tiết
            </button>
            <button type="button" class="btn-card-buy" onclick="addToCart('${item.name}')">
              + Giỏ Hàng
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Category helper name
function getCategoryName(categoryKey) {
  switch (categoryKey) {
    case "vot": return "Vợt Cầu Lông";
    case "cau": return "Quả & Ống Cầu Lông";
    case "quanao": return "Quần Áo & Giày";
    case "phukien": return "Phụ Kiện Cầu Lông";
    default: return "Phụ Kiện Thể Thao";
  }
}

// ==========================================
// 5. QUICK VIEW MODAL
// ==========================================
window.openProductModal = function(id) {
  const product = PRODUCTS_DATA.find(p => p.id === id);
  if (!product) return;

  // Build specs rows
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

        <!-- Detailed Specifications Table -->
        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 8px; color: var(--color-secondary);">
          Bảng Thông Số Kỹ Thuật Chi Tiết:
        </h4>
        <table class="specs-table">
          <tbody>
            ${specsRows}
          </tbody>
        </table>

        <!-- Actions -->
        <div style="display: flex; gap: 12px; margin-top: auto;">
          <button type="button" class="btn btn-primary" style="flex: 1;" onclick="addToCart('${product.name}'); closeModal();">
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
  document.body.style.overflow = "hidden"; // prevent background scroll
};

function closeModal() {
  modalBackdrop.classList.remove("active");
  modalBackdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// ==========================================
// 6. EVENT LISTENERS
// ==========================================

// Brand Filter Tabs Click
brandFilterTabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".brand-tab");
  if (!tab) return;

  brandFilterTabs.querySelectorAll(".brand-tab").forEach(t => t.classList.remove("active"));
  tab.classList.add("active");

  state.currentBrand = tab.dataset.brand;
  renderProducts();
});

// Category Filter Pills Click
categoryFilterPills.addEventListener("click", (e) => {
  const pill = e.target.closest(".cat-pill");
  if (!pill) return;

  categoryFilterPills.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
  pill.classList.add("active");

  state.currentCategory = pill.dataset.category;
  renderProducts();
});

// Sort select change
sortSelect.addEventListener("change", (e) => {
  state.sortBy = e.target.value;
  renderProducts();
});

// Search input (Desktop)
searchInput.addEventListener("input", (e) => {
  state.searchQuery = e.target.value;
  clearSearchBtn.hidden = state.searchQuery === "";
  renderProducts();
});

clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  state.searchQuery = "";
  clearSearchBtn.hidden = true;
  renderProducts();
  searchInput.focus();
});

// Search input (Mobile)
mobileSearchInput.addEventListener("input", (e) => {
  state.searchQuery = e.target.value;
  searchInput.value = e.target.value;
  renderProducts();
});

// Reset Filters Button
function resetAllFilters() {
  state.currentBrand = "all";
  state.currentCategory = "all";
  state.searchQuery = "";
  state.sortBy = "featured";

  searchInput.value = "";
  mobileSearchInput.value = "";
  clearSearchBtn.hidden = true;
  sortSelect.value = "featured";

  brandFilterTabs.querySelectorAll(".brand-tab").forEach(t => {
    t.classList.toggle("active", t.dataset.brand === "all");
  });

  categoryFilterPills.querySelectorAll(".cat-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.category === "all");
  });

  renderProducts();
}

resetFiltersBtn.addEventListener("click", resetAllFilters);
emptyResetBtn.addEventListener("click", resetAllFilters);

// Brand Showcase Cards click (Links to catalog with brand filter)
document.querySelectorAll(".brand-show-card, .filter-by-brand-btn").forEach(el => {
  el.addEventListener("click", (e) => {
    const brand = el.dataset.brand || el.closest(".brand-show-card").dataset.brand;
    if (!brand) return;

    state.currentBrand = brand;
    brandFilterTabs.querySelectorAll(".brand-tab").forEach(t => {
      t.classList.toggle("active", t.dataset.brand.toLowerCase() === brand.toLowerCase());
    });

    renderProducts();

    // Smooth scroll to product section
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Modal close triggers
modalCloseBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) {
    closeModal();
  }
});

// ESC key to close modal or mobile drawer
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeMobileDrawer();
  }
});

// Mobile Drawer Toggle
function openMobileDrawer() {
  mobileDrawer.classList.add("active");
  drawerOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileDrawer() {
  mobileDrawer.classList.remove("active");
  drawerOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

mobileToggleBtn.addEventListener("click", openMobileDrawer);
closeDrawerBtn.addEventListener("click", closeMobileDrawer);
drawerOverlay.addEventListener("click", closeMobileDrawer);

// Close mobile drawer when clicking any link inside it
document.querySelectorAll(".drawer-link").forEach(link => {
  link.addEventListener("click", closeMobileDrawer);
});

// Sticky Header Box Shadow on Scroll
window.addEventListener("scroll", () => {
  const header = document.getElementById("siteHeader");
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Cart Button Click feedback
cartBtn.addEventListener("click", () => {
  if (state.cartCount === 0) {
    showToast("Giỏ hàng của bạn đang trống. Hãy chọn sản phẩm ưng ý nhé!", "info");
  } else {
    showToast(`Bạn đang có ${state.cartCount} sản phẩm trong giỏ hàng.`);
  }
});

// ==========================================
// 7. INITIALIZE ON DOM READY
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
