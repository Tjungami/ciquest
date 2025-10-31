// 仮ユーザーデータ
const user = {
  name: "Ciquestユーザー",
  rank: "ブロンズ",
  points: 120,
  badges: ["🏆", "🥇", "🎯", "🍜"]
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("username").textContent = user.name;
  document.querySelector("#user-rank span").textContent = user.rank;
  document.querySelector("#user-points span").textContent = user.points;

  renderBadges();
});

// バッジ表示
function renderBadges() {
  const badgeList = document.getElementById("badge-list");
  badgeList.innerHTML = "";

  user.badges.forEach((emoji) => {
    const div = document.createElement("div");
    div.className = "badge";
    div.textContent = emoji;
    badgeList.appendChild(div);
  });
}

// 設定ボタン
document.getElementById("logout-btn").addEventListener("click", () => {
  alert("ログアウトしました（仮）");
  // TODO: Djangoのログアウトエンドポイントへ遷移
});

document.getElementById("help-btn").addEventListener("click", () => {
  alert("サポートページ（仮）へ移動");
});
