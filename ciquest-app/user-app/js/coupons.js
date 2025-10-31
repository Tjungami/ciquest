// 仮データ
const userPoints = 120;

const ownedCoupons = [
  { title: "カフェ・リベルタ 100円OFF", desc: "ドリンク1杯につき100円割引", used: false },
  { title: "宇都宮餃子館 10%OFF", desc: "お会計から10%割引", used: true }
];

const exchangeableCoupons = [
  { title: "100円クーポン", desc: "ポイント交換：100pt", cost: 100 },
  { title: "200円クーポン", desc: "ポイント交換：190pt", cost: 80 }
];

// 表示処理
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("user-points").textContent = `${userPoints} pt`;
  renderOwnedCoupons();
  renderExchangeableCoupons();
});

function renderOwnedCoupons() {
  const list = document.getElementById("owned-coupons");
  list.innerHTML = "";
  ownedCoupons.forEach(c => {
    const li = document.createElement("li");
    li.className = "coupon-item";
    li.innerHTML = `
      <div class="coupon-info">
        <h4>${c.title}</h4>
        <p>${c.desc}</p>
      </div>
      ${c.used ? '<button class="exchange-btn used" disabled>使用済み</button>' : '<button class="exchange-btn">使う</button>'}
    `;
    list.appendChild(li);
  });
}

function renderExchangeableCoupons() {
  const list = document.getElementById("exchangeable-coupons");
  list.innerHTML = "";
  exchangeableCoupons.forEach(c => {
    const li = document.createElement("li");
    li.className = "coupon-item";
    li.innerHTML = `
      <div class="coupon-info">
        <h4>${c.title}</h4>
        <p>${c.desc}</p>
      </div>
      <button class="exchange-btn" data-cost="${c.cost}">交換</button>
    `;
    li.querySelector(".exchange-btn").addEventListener("click", () => {
      handleExchange(c);
    });
    list.appendChild(li);
  });
}

// 交換処理
function handleExchange(coupon) {
  if (userPoints < coupon.cost) {
    alert("ポイントが足りません！");
    return;
  }
  alert(`${coupon.title} を交換しました！`);
  // TODO: Django APIに交換リクエストを送る
  // fetch('/api/exchange-coupon/', { method: 'POST', body: JSON.stringify({ coupon_id: coupon.id }) })
}
