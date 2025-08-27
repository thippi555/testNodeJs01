import * as SDK from "azure-devops-extension-sdk";

SDK.init().then(() => {
  console.log("Azure DevOps Extension SDK initialized");

  SDK.ready().then(() => {
    console.log("SDK ready");
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = "<h2>Extension loaded successfully</h2>";
    }
  });
});