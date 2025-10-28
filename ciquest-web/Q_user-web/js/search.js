// 仮データ（後でAPIと接続予定）
const stores = [
  { name: "カフェ・リベルタ", desc: "学生に人気のカフェ", distance: 250, tag: "カフェ" },
  { name: "宇都宮餃子館", desc: "名物餃子クエスト開催中！", distance: 800, tag: "ラーメン" },
  { name: "Book & Chill", desc: "静かに読書ができる喫茶店", distance: 500, tag: "カフェ" },
  { name: "夜風居酒屋", desc: "地元で評判の焼き鳥店", distance: 700, tag: "居酒屋" },
];

// ===== 要素取得 =====
const storeList = document.getElementById("store-list");
const searchInput = document.getElementById("search-input");
const tagButtons = document.querySelectorAll(".tag");

// ===== リスト描画関数 =====
function renderList(list) {
  storeList.innerHTML = "";
  list.forEach((s) => {
    const li = document.createElement("li");
    li.className = "store-item";
    li.innerHTML = `
      <div class="store-info">
        <h3>${s.name}</h3>
        <p>${s.desc}・距離：${s.distance}m</p>
      </div>
      <button class="detail-btn">▶</button>
    `;
    li.querySelector(".detail-btn").addEventListener("click", () => {
      alert(`${s.name} の詳細ページへ（仮）`);
    });
    storeList.appendChild(li);
  });
}

// 初期表示
renderList(stores);

// ===== 検索バー入力 =====
searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.trim().toLowerCase();
  const filtered = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(keyword) ||
      s.tag.toLowerCase().includes(keyword)
  );
  renderList(filtered);
});

// ===== タグフィルタ =====
tagButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tagButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const tag = btn.dataset.tag;
    if (tag === "all") {
      renderList(stores);
    } else {
      const filtered = stores.filter((s) => s.tag === tag);
      renderList(filtered);
    }
  });
});

// ===== ナビボタン処理 =====
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const page = btn.dataset.page;
    window.location.href = `./${page}.html`;
  });
});
