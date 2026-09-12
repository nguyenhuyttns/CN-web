/**
 * Script tương tác cho Profile Card - Nguyễn Đức Huy
 */

document.addEventListener('DOMContentLoaded', () => {
  const btnCopyInfo = document.getElementById('btnCopyInfo');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const card = document.getElementById('profileCard');

  // Thông tin tóm tắt để sao chép
  const profileSummary = `Họ tên: Nguyễn Đức Huy
Vị trí: Lập trình viên (Mobile App & ERP)
Năm sinh: 2003
Quê quán: Hải Dương
Tốt nghiệp: Kỹ thuật phần mềm
Email: nguyenduchuy.dev2003@gmail.com
SĐT: 0987.654.321`;

  let toastTimer = null;

  function showToast(message) {
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toastMsg.textContent = message;
    toast.classList.add('show');

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Sự kiện sao chép thông tin
  if (btnCopyInfo) {
    btnCopyInfo.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(profileSummary);
        } else {
          // Fallback cho môi trường không có clipboard API
          const textarea = document.createElement('textarea');
          textarea.value = profileSummary;
          textarea.style.position = 'fixed';
          textarea.style.left = '-9999px';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        showToast('Đã sao chép thông tin liên hệ của Nguyễn Đức Huy!');
      } catch (err) {
        showToast('Không thể tự động sao chép. Vui lòng thử lại!');
      }
    });
  }

  // Hiệu ứng tương tác 3D tilt nhẹ nhàng trên Desktop
  if (window.matchMedia('(min-width: 768px)').matches && card) {
    const wrapper = card.parentElement;

    wrapper.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    wrapper.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      card.style.transition = 'transform 0.5s ease';
    });

    wrapper.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  }
});
