// --- スタンプカード設定フォーム制御 ---
document.addEventListener("DOMContentLoaded", () => {
  const rewardList = document.getElementById("rewardList");
  const addRewardBtn = document.querySelector(".add-reward-btn");

  let rewardCount = 0;

  // 報酬フォームを追加
  function addRewardForm() {
    rewardCount++;
    const div = document.createElement("div");
    div.classList.add("reward-item");
    div.innerHTML = `
      <label>必要スタンプ数</label>
      <input type="number" name="stamp_threshold_${rewardCount}" min="1" max="30" required>

      <label>報酬タイプ</label>
      <select name="reward_type_${rewardCount}" onchange="toggleRewardType(this, ${rewardCount})">
        <option value="coupon">クーポン</option>
        <option value="service">サービス</option>
      </select>

      <div class="reward-coupon">
        <label>クーポン選択</label>
        <select name="reward_coupon_id_${rewardCount}">
          <option value="">選択してください</option>
          <option value="1">ドリンク無料クーポン</option>
          <option value="2">デザート無料クーポン</option>
        </select>
      </div>

      <div class="reward-service hidden">
        <label>サービス内容</label>
        <input type="text" name="reward_service_desc_${rewardCount}" placeholder="例：トッピング無料、特別メニュー提供など">
      </div>

      <button type="button" class="delete-reward-btn">削除</button>
    `;
    rewardList.appendChild(div);

    // 削除ボタン処理
    div.querySelector(".delete-reward-btn").addEventListener("click", () => {
      div.remove();
    });
  }

  // イベント登録
  addRewardBtn.addEventListener("click", addRewardForm);

  // 初期状態で1つ追加
  addRewardForm();

  // フォーム送信
  document.getElementById("stampSettingsForm").addEventListener("submit", () => {
    alert("スタンプ設定を保存しました！（モック）");
  });
});

// 報酬タイプ切り替え
function toggleRewardType(selectEl, id) {
  const container = selectEl.closest(".reward-item");
  const couponDiv = container.querySelector(".reward-coupon");
  const serviceDiv = container.querySelector(".reward-service");

  if (selectEl.value === "coupon") {
    couponDiv.classList.remove("hidden");
    serviceDiv.classList.add("hidden");
  } else {
    couponDiv.classList.add("hidden");
    serviceDiv.classList.remove("hidden");
  }
}
