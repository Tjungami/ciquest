const API_BASE = "http://localhost:8000/api/inquiries";

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      loadInquiries(tab.dataset.status);
    });
  });

  loadInquiries("unread");
});

async function loadInquiries(status) {
  const container = document.getElementById("inquiryList");
  container.innerHTML = "<p>読み込み中...</p>";

  try {
    const res = await fetch(`${API_BASE}?status=${status}`);
    const data = await res.json();

    if (data.length === 0) {
      container.innerHTML = "<p>該当するお問い合わせはありません。</p>";
      return;
    }

    container.innerHTML = data.map(i => `
      <div class="inquiry-card">
        <div class="inquiry-header">
          <span class="inquiry-category">${i.category}</span>
          <small>${new Date(i.created_at).toLocaleString()}</small>
        </div>
        <p>${i.message}</p>
        ${i.related_challenge_id ? `
          <a href="challenges.html?highlight=${i.related_challenge_id}" class="ban-link">該当チャレンジを見る</a>
        ` : ""}
        <div class="inquiry-actions">
          ${status !== "resolved" ? `
            <button class="status-btn" onclick="updateStatus(${i.inquiry_id}, '${nextStatus(status)}')">
              ${nextStatusLabel(status)}
            </button>` : ""}
        </div>
      </div>
    `).join("");
  } catch {
    container.innerHTML = "<p>データの取得に失敗しました。</p>";
  }
}

function nextStatus(current) {
  if (current === "unread") return "in_progress";
  if (current === "in_progress") return "resolved";
  return "resolved";
}

function nextStatusLabel(current) {
  if (current === "unread") return "対応中にする";
  if (current === "in_progress") return "対応済みにする";
  return "完了";
}

async function updateStatus(id, newStatus) {
  try {
    await fetch(`${API_BASE}/${id}/update_status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const active = document.querySelector(".tab.active").dataset.status;
    loadInquiries(active);
  } catch {
    alert("状態変更に失敗しました。");
  }
}
