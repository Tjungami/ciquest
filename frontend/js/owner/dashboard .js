// --- 店舗ダッシュボード用スクリプト ---

document.addEventListener("DOMContentLoaded", () => {
  const showBtn = document.getElementById("showStoreQR");
  const modal = document.getElementById("storeQRModal");
  const closeBtn = document.querySelector("#storeQRModal .close");
  const qrImage = document.getElementById("storeQRCode");

  // 店舗QRを表示
  showBtn.addEventListener("click", () => {
    // 実際にはAPIから店舗QRのURLを取得予定
    qrImage.src = "../../assets/qr_sample.png";
    modal.classList.remove("hidden");
  });

  // モーダル閉じる
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // 背景クリックでも閉じる
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
