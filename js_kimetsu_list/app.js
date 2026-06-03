"use srrict";

const kimetsuList = document.getElementById("kimetsu_list");

const loading = document.getElementById("loading");

// 条件分岐が不要となったためAPIの定義も不要となる
// const KIMETSU_ALL_API = "https://ihatov08.github.io/kimetsu_api/api/all.json"; // ALL
// const KIMETSU_HASIRA_API =
//   "https://ihatov08.github.io/kimetsu_api/api/hashira.json"; // 柱
// const KIMETSU_ONI_API = "https://ihatov08.github.io/kimetsu_api/api/oni.json"; // 鬼
// const KIMETSU_KISATSUTAI_API =
//   "https://ihatov08.github.io/kimetsu_api/api/kisatsutai.json"; // 鬼殺隊

const fetchAPI = async (url) => {
  try {
    // ローディング画面を表示
    loading.style.display = "block";

    // 空文字をいれてリセットさせる
    kimetsuList.textContent = "";

    const response = await fetch(url);

    const all = await response.json();

    for (let i = 0; i < all.length; i++) {
      // divタグを作って、kimetsuListの子要素に配置
      const div = document.createElement("div");
      kimetsuList.appendChild(div);

      // name用のpタグを作成し、forループを回す。divタグの子要素に配置
      const pName = document.createElement("p");
      pName.textContent = all[i].name;
      div.appendChild(pName);

      // imgタグを作成し、絶対パスを指定、divタグの子要素に配置
      const img = document.createElement("img");
      img.src = `https://ihatov08.github.io` + all[i].image;
      div.appendChild(img);

      // category用のpタグを作成し、divタグの子要素に配置
      const pCategory = document.createElement("p");
      pCategory.textContent = all[i].category;
      div.appendChild(pCategory);
    }
    // 読み込みが終わったら文字を隠す
    loading.style.display = "none";
  } catch (error) {
    console.log(error);
  }
};

fetchAPI("https://ihatov08.github.io/kimetsu_api/api/all.json");

// radioボタンの挙動 //
const radios = document.getElementsByName("category");

for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener("change", (e) => {
    const value = e.target.value;

    // if (selectValue === "all") {
    //   fetchAPI(KIMETSU_ALL_API);
    // } else if (selectValue === "hashira") {
    //   fetchAPI(KIMETSU_HASIRA_API);
    // } else if (selectValue === "oni") {
    //   fetchAPI(KIMETSU_ONI_API);
    // } else if (selectValue === "kisatsutai") {
    //   fetchAPI(KIMETSU_KISATSUTAI_API);
    // }

    // valueを取得して下記のURLで受け取れば条件分岐が不要となる
    const selectValue = `https://ihatov08.github.io/kimetsu_api/api/${value}.json`;

    fetchAPI(selectValue);
  });
}
