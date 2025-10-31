const API_BASE = "http://localhost:8000/api/stores";

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      loadStores(tab.dataset.status);
    });
  });

  loadStores("pending");
});

async function loadStores(status) {
  const container = document.getElementById("store-list");
  container.innerHTML = "<p>読み込み中...</p>";

  try {
    const res = await fetch(`${API_BASE}?status=${status}`);
    const data = await res.json();

    if (data.length === 0) {
      container.innerHTML = "<p>該当する店舗はありません。</p>";
      return;
    }

    container.innerHTML = data.map(store => `
      <div class="store-card">
        <div class="store-info">
          <strong>${store.name}</strong><br>
          ${store.address || "住所未登録"}<br>
          <small>登録日: ${new Date(store.created_at).toLocaleDateString()}</small>
        </div>
        <div class="store-actions">
          ${status === "pending" ? `
            <button class="approve-btn" onclick="updateStatus(${store.store_id}, 'approved')">承認</button>
            <button class="reject-btn" onclick="updateStatus(${store.store_id}, 'rejected')">却下</button>
          ` : ""}
        </div>
      </div>
    `).join("");
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>データの取得に失敗しました。</p>";
  }
}

async function updateStatus(id, newStatus) {
  try {
    await fetch(`${API_BASE}/${id}/${newStatus}`, { method: "POST" });
    const activeTab = document.querySelector(".tab.active").dataset.status;
    loadStores(activeTab);
  } catch (err) {
    alert("更新に失敗しました");
  }
}
