document.addEventListener('DOMContentLoaded', () => {
  loadSummary();
  loadRecentStores();
});

async function loadSummary() {
  try {
    const [storesRes, challengesRes, couponsRes] = await Promise.all([
      fetch('http://localhost:8000/api/stores?status=pending'),
      fetch('http://localhost:8000/api/challenges'),
      fetch('http://localhost:8000/api/coupons'),
    ]);

    const [stores, challenges, coupons] = await Promise.all([
      storesRes.json(),
      challengesRes.json(),
      couponsRes.json(),
    ]);

    document.getElementById('pendingStores').textContent = `承認待ち店舗: ${stores.length} 件`;
    document.getElementById('totalChallenges').textContent = `チャレンジ数: ${challenges.length} 件`;
    document.getElementById('totalCoupons').textContent = `クーポン数: ${coupons.length} 件`;
  } catch (err) {
    console.error(err);
  }
}

async function loadRecentStores() {
  const container = document.getElementById('recentStores');
  try {
    const res = await fetch('http://localhost:8000/api/stores?status=pending');
    const data = await res.json();
    if (data.length === 0) {
      container.innerHTML = '<p>現在、承認待ちはありません。</p>';
      return;
    }
    container.innerHTML = data.map(store => `
      <div class="store-item">
        <div>
          <strong>${store.name}</strong><br>
          ${store.address}
        </div>
        <div>
          <button onclick="approveStore(${store.store_id})">承認</button>
          <button onclick="rejectStore(${store.store_id})">却下</button>
        </div>
      </div>
    `).join('');
  } catch {
    container.innerHTML = '<p>データの取得に失敗しました。</p>';
  }
}

async function approveStore(id) {
  await fetch(`http://localhost:8000/api/stores/${id}/approve`, { method: 'POST' });
  loadRecentStores();
  loadSummary();
}

async function rejectStore(id) {
  await fetch(`http://localhost:8000/api/stores/${id}/reject`, { method: 'POST' });
  loadRecentStores();
  loadSummary();
}
