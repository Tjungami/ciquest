// ====== Leafletマップ初期化 ======
document.addEventListener("DOMContentLoaded", () => {
  // Leafletマップを生成（初期位置は仮で宇都宮）
  const map = L.map('map', { zoomControl: false, attributionControl: false }).setView([36.5551, 139.8828], 14);

  // タイル設定（attribution削除OK）
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    // attribution: '&copy; OpenStreetMap contributors & CartoDB' ← 消す
  }).addTo(map);

  // 独自クレジットを追加
  const credit = L.control({ position: 'bottomleft' });
  credit.onAdd = function () {
    const div = L.DomUtil.create('div', 'osm-credit');
    div.innerHTML = '© OpenStreetMap contributors';
    return div;
  };
  credit.addTo(map);


  // 店舗データ（本番ではDjango APIで取得）
  const stores = [
    { name: "カフェ・リベルタ", lat: 36.557, lon: 139.883, desc: "学生に人気のカフェ" },
    { name: "宇都宮餃子館", lat: 36.55599980238667, lon: 139.90666010760114, desc: "名物餃子クエスト開催中！" },
    { name: "Book & Chill", lat: 36.554, lon: 139.885, desc: "静かに読書ができる喫茶店" }
  ];

  // 店舗ピンを追加（名前はマップ上には常時出さない）
  stores.forEach(store => {
    const marker = L.marker([store.lat, store.lon]).addTo(map);

    // クリックしたときだけ吹き出しを出す
    marker.on('click', () => {
      const googleUrl = `https://www.google.com/maps?q=${store.lat},${store.lon}`;
      const popupHtml = `
        <div style="text-align:center;">
          <b>${store.name}</b><br>
          <button onclick="window.open('${googleUrl}', '_blank')" 
            style="margin-top:5px;padding:6px 12px;border:none;border-radius:6px;
                   background:#ff4655;color:white;font-size:0.9em;cursor:pointer;">
            Googleマップで開く
          </button>
        </div>
      `;
      L.popup()
        .setLatLng([store.lat, store.lon])
        .setContent(popupHtml)
        .openOn(map);
    });
  });

  // 現在地取得 → 成功したら中心に設定
  map.locate({ setView: true, maxZoom: 16, watch: false });

  // 現在地が見つかったとき
  map.on('locationfound', e => {
    L.circleMarker(e.latlng, {
      radius: 6,
      fillColor: "#007aff",
      color: "#007aff",
      fillOpacity: 0.8
    })
    .addTo(map)
    .bindPopup("あなたの現在地")
    .openPopup();
  });

  // 位置情報取得失敗時
  map.on('locationerror', () => {
    alert("位置情報が取得できませんでした。\nブラウザの設定を確認してください。");
  });
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

