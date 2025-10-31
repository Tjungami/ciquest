// --- 発行クエスト一覧管理 ---

document.addEventListener("DOMContentLoaded", () => {
  const qrModal = document.getElementById("qrModal");
  const qrImage = document.getElementById("qrImage");
  const qrId = document.getElementById("qrId");
  const closeBtn = document.querySelector("#qrModal .close");

  // QR表示ボタン
  document.querySelectorAll(".qr-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      qrId.textContent = id;
      qrImage.src = "../../assets/qr_sample.png"; // 仮のQR画像
      qrModal.classList.remove("hidden");
    });
  });

  // モーダルを閉じる（×ボタン）
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      qrModal.classList.add("hidden");
    });
  }

  // 背景クリックでも閉じる
  window.addEventListener("click", (e) => {
    if (e.target === qrModal) {
      qrModal.classList.add("hidden");
    }
  });

  // 削除確認
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (confirm("このチャレンジを削除しますか？")) {
        alert("削除処理を実装予定（API接続）");
      }
    });
  });

  // 編集ボタン
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("編集画面へ遷移（実装予定）");
      // 例: location.href = `edit_challenge.html?id=${id}`;
    });
  });
});
