// Firebase設定
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

// Firebaseプロジェクト設定
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// メモ保存機能
document.getElementById("saveMemo").addEventListener("click", async () => {
  const roomName = document.getElementById("roomName").value.trim();
  const memoContent = document.getElementById("memoContent").value.trim();

  if (!roomName || !memoContent) {
    alert("部屋名とメモ内容を入力してください。");
    return;
  }

  await setDoc(doc(db, "rooms", roomName), { memo: memoContent });
  alert("メモを保存しました！");
});

// メモ読み込み機能
document.getElementById("loadMemo").addEventListener("click", async () => {
  const roomName = document.getElementById("roomName").value.trim();

  if (!roomName) {
    alert("部屋名を入力してください。");
    return;
  }

  const docSnap = await getDoc(doc(db, "rooms", roomName));
  if (docSnap.exists()) {
    document.getElementById("memoContent").value = docSnap.data().memo;
    alert("メモを読み込みました！");
  } else {
    alert("その部屋は存在しません。");
  }
});
