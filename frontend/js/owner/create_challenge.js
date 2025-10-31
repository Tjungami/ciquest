// --- オーナー用チャレンジ作成フォーム制御 ---

function toggleRewardFields() {
  const questType = document.getElementById("quest_type").value;
  const commonReward = document.getElementById("commonReward");
  const storeSpecificReward = document.getElementById("storeSpecificReward");

  if (questType === "common") {
    commonReward.classList.remove("hidden");
    storeSpecificReward.classList.add("hidden");
  } else {
    commonReward.classList.add("hidden");
    storeSpecificReward.classList.remove("hidden");
  }
}

function toggleRewardDetail() {
  const rewardType = document.getElementById("reward_type").value;
  const couponSection = document.getElementById("reward_coupon");
  const serviceSection = document.getElementById("reward_service");

  couponSection.classList.toggle("hidden", rewardType !== "coupon");
  serviceSection.classList.toggle("hidden", rewardType !== "service");
}

// --- リセットボタンの確認アラート ---
function confirmReset(event) {
  const confirmResult = confirm("フォームの内容をすべてリセットします。よろしいですか？");
  if (!confirmResult) {
    event.preventDefault(); // リセット処理を止める
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // クエストタイプ切り替え
  document
    .getElementById("quest_type")
    .addEventListener("change", toggleRewardFields);

  // 報酬タイプ切り替え
  const rewardType = document.getElementById("reward_type");
  if (rewardType) {
    rewardType.addEventListener("change", toggleRewardDetail);
  }

  // リセットボタンに確認アラート追加
  const resetBtn = document.querySelector("button[type='reset']");
  if (resetBtn) {
    resetBtn.addEventListener("click", confirmReset);
  }
});