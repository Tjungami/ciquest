// --- 統計画面モックデータ表示 ---
document.addEventListener("DOMContentLoaded", () => {
  // グラフ表示
  const ctx = document.getElementById("userTrendChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["4月", "5月", "6月", "7月", "8月", "9月", "10月"],
      datasets: [{
        label: "来店ユーザー数",
        data: [50, 80, 120, 150, 200, 240, 260],
        borderColor: "#0078d7",
        backgroundColor: "rgba(0,120,215,0.1)",
        tension: 0.3,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
});
