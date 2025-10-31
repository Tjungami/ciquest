const API_BASE = "http://localhost:8000/api/coupons";

document.addEventListener("DOMContentLoaded", () => {
  loadCoupons();

  document.getElementById("couponForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    await addCoupon();
  });
});

async function loadCoupons() {
  const container = document.getElementById("couponContainer");
  container.innerHTML = "<p>読み込み中...</p>";

  try {
    const res = await fetch(`${API_BASE}?type=common`);
    const data = await res.json();

    if (data.length === 0) {
      container.innerHTML = "<p>共通クーポンはまだありません。</p>";
      return;
    }

    container.innerHTML = data.map(c => `
      <div class="coupon-card">
        <div class="coupon-info">
          <strong>${c.title}</strong><br>
          ${c.description}<br>
          必要ポイント: 
          <input type="number" min="1" value="${c.required_points}" 
            onchange="updatePoints(${c.coupon_id}, this.value)">
          <br>
          有効期限: ${new Date(c.expires_at).toLocaleDateString()}
        </div>
        <div class="coupon-actions">
          <button class="delete-btn" onclick="deleteCoupon(${c.coupon_id})">削除</button>
        </div>
      </div>
    `).join("");
  } catch (err) {
    container.innerHTML = "<p>データの取得に失敗しました。</p>";
  }
}

async function addCoupon() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const required_points = parseInt(document.getElementById("required_points").value);
  const expires_at = document.getElementById("expires_at").value;

  if (!title || !description || !required_points || !expires_at) {
    alert("全ての項目を入力してください。");
    return;
  }

  try {
    await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        required_points,
        type: "common",
        expires_at,
      }),
    });
    document.getElementById("couponForm").reset();
    loadCoupons();
  } catch {
    alert("クーポン追加に失敗しました。");
  }
}

async function updatePoints(id, newPoints) {
  try {
    await fetch(`${API_BASE}/${id}/update_points`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ required_points: parseInt(newPoints) }),
    });
  } catch {
    alert("ポイント更新に失敗しました。");
  }
}

async function deleteCoupon(id) {
  if (!confirm("このクーポンを削除しますか？")) return;
  try {
    await fetch(`${API_BASE}/${id}/delete`, { method: "DELETE" });
    loadCoupons();
  } catch {
    alert("削除に失敗しました。");
  }
}
