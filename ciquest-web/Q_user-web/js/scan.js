// カメラ映像からQRコードを解析する
const video = document.getElementById("camera");
const result = document.getElementById("scan-result");

// カメラ起動
navigator.mediaDevices
  .getUserMedia({ video: { facingMode: "environment" } })
  .then((stream) => {
    video.srcObject = stream;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    function scanLoop() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          handleQRCode(code.data);
          return; // 検出したらループ停止
        }
      }
      requestAnimationFrame(scanLoop);
    }
    scanLoop();
  })
  .catch(() => {
    result.textContent = "カメラを起動できません。手動入力をお使いください。";
  });

// QRコード内容の処理
function handleQRCode(data) {
  result.textContent = `QRコードを検出: ${data}`;
  // TODO: Django APIと連携してチャレンジ認証を送信
  // fetch('/api/verify-qr/', { method: 'POST', body: JSON.stringify({ code: data }) })
}

// 手動入力
document.getElementById("manual-submit").addEventListener("click", () => {
  const code = document.getElementById("manual-code").value.trim();
  if (!code) {
    result.textContent = "コードを入力してください。";
    return;
  }
  handleQRCode(code);
});

// ====== ナビゲーションボタン切り替え処理 ======
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const page = btn.dataset.page;
    // ページ遷移処理
    window.location.href = `./${page}.html`;
  });
});
