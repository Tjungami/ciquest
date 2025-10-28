const API_BASE = "http://localhost:8000/api/challenges";

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");

  searchBtn.addEventListener("click", () => {
    loadChallenges(searchInput.value.trim());
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") loadChallenges(searchInput.value.trim());
  });

  loadChallenges();
});

async function loadChallenges(keyword = "") {
  const container = document.getElementById("challengeList");
  container.innerHTML = "<p>読み込み中...</p>";

  try {
    const res = await fetch(`${API_BASE}?search=${encodeURIComponent(keyword)}`);
    const data = await res.json();

    if (data.length === 0) {
      container.innerHTML = "<p>該当するチャレンジはありません。</p>";
      return;
    }

    container.innerHTML = data.map(ch => `
      <div class="challenge-card">
        <div class="challenge-info">
          <strong>${ch.title}</strong><br>
          店舗: ${ch.store_name || "不明"}<br>
          獲得ポイント: ${ch.reward_points}pt
          ${ch.is_banned ? "<span style='color:#e57373;font-weight:bold;'>（BAN中）</span>" : ""}
        </div>
        <div>
          ${!ch.is_banned ? 
            `<button class="ban-btn" onclick="banChallenge(${ch.challenge_id})">BAN</button>` 
            : ""
          }
        </div>
      </div>
    `).join("");
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>データの取得に失敗しました。</p>";
  }
}

async function banChallenge(id) {
  if (!confirm("このチャレンジをBAN（非表示）にしますか？")) return;
  try {
    await fetch(`${API_BASE}/${id}/ban`, { method: "POST" });
    loadChallenges(document.getElementById("searchInput").value.trim());
  } catch {
    alert("BAN処理に失敗しました。");
  }
}
