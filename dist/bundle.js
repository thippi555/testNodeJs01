AzureDevOpsExtensionSDK.init().then(() => {
  console.log("Azure DevOps Extension SDK initialized");
  AzureDevOpsExtensionSDK.ready().then(() => {
    console.log("SDK ready");

    // マウスオーバー時にAPI呼び出し
    async function callApi(eventName) {
      try {
        const response = await fetch("/api/proxy?event=" + encodeURIComponent(eventName));
        if (!response.ok) throw new Error("HTTPエラー: " + response.status);
        const data = await response.json();
        const el = document.getElementById("api-result");
        if (el) {
          el.innerText = `[${eventName}] API応答: ` + (data.message || JSON.stringify(data));
        }
      } catch (err) {
        console.error("API呼び出し失敗:", err);
        const el = document.getElementById("api-result");
        if (el) {
          el.innerText = `[${eventName}] API呼び出し失敗: ` + err.message;
        }
      }
    }

    // すべてのボタンにイベント追加
    document.querySelectorAll(".btn").forEach((btn) => {
      const label = btn.innerText.trim();
      btn.addEventListener("mouseenter", () => callApi(label));
    });

    // SDK にロード完了通知
    AzureDevOpsExtensionSDK.notifyLoadSucceeded();
  });
});
