// ====== ナビゲーション遷移 ======
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.dataset.page;
    window.location.href = `../../pages/user/${page}.html`;
  });
});

// ====== 現在ページに応じてアクティブ表示 ======
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const currentPage = path.split("/").pop().replace(".html", ""); // 例: home, search, scan
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === currentPage);
  });
});
