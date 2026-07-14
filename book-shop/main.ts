import readline from "node:readline";

// ---- 初期データ ----
const BOOKS = [
  {
    id: 1,
    title: "JavaScript 入門",
    price: 2200,
    category: "Programming",
    stock: 3,
  },
  {
    id: 2,
    title: "TypeScript はじめの一歩",
    price: 2800,
    category: "Programming",
    stock: 2,
  },
  { id: 3, title: "アルゴリズム基礎", price: 1800, category: "CS", stock: 1 },
  { id: 4, title: "デザイン入門", price: 1600, category: "Design", stock: 2 },
];

// 利用可能クーポン
const COUPON_DB = {
  TS10: { type: "percent", code: "TS10", percent: 10 }, // 10%OFF
  SAVE500: { type: "fixed", code: "SAVE500", amount: 500 }, // 500円引き
};

// ---- ユーティリティ ----
function formatYen(n) {
  return `¥${Number(n).toLocaleString("ja-JP")}`;
}
function prompt(rl, q) {
  return new Promise((resolve) => rl.question(q, resolve));
}
function calcDiscount(price, coupon) {
  if (!coupon) return 0;
  if (coupon.type === "percent")
    return Math.floor((price * coupon.percent) / 100);
  if (coupon.type === "fixed") return Math.min(price, Number(coupon.amount));
  return 0;
}

// ---- セッション状態 ----
const state = {
  balance: 0, // 残高
  cart: [], // { title, paid, original, couponCode? }
  history: [], // { title, paid, discount, couponCode?, date }
  activeCoupon: null, // 次の1回に適用
  usedCoupons: [], // 使用済みコード
};

// ---- メニュー ----
async function mainMenu(rl) {
  console.log("\nどのアクションを行いますか？");
  console.log("1. お金をチャージする");
  console.log("2. カートを確認する");
  console.log("3. 商品を購入する");
  console.log("4. 購入履歴を確認する");
  console.log("5. クーポンを適用する");
  console.log("6. 終了する");
  const ans = await prompt(rl, "> ");
  return Number(ans);
}

// ---- 1. チャージ ----
async function charge(rl) {
  console.log(`現在の残高: ${formatYen(state.balance)}`);
  const amount = Number(
    await prompt(rl, "チャージする金額を入力してください: ")
  );
  if (Number.isInteger(amount) && amount > 0) {
    state.balance += amount;
    console.log(`チャージしました。現在の残高: ${formatYen(state.balance)}`);
  } else {
    console.log("無効な金額です。");
  }
}

// ---- 2. カート表示 ----
function showCart() {
  if (state.cart.length === 0) {
    console.log("カートは空です。");
    return;
  }
  let total = 0;
  console.log("🛒 カート内の商品:");
  state.cart.forEach((item, idx) => {
    total += item.paid;
    const couponInfo = item.couponCode
      ? `（クーポン: ${item.couponCode}）`
      : "";
    console.log(
      `${idx + 1}. ${item.title}  支払: ${formatYen(
        item.paid
      )} / 定価: ${formatYen(item.original)} ${couponInfo}`
    );
  });
  console.log(
    `合計支払額: ${formatYen(total)} / 残高: ${formatYen(state.balance)}`
  );
  if (state.activeCoupon)
    console.log(`適用待ちのクーポン: ${state.activeCoupon.code}`);
}

// ---- 3. 購入 ----
async function purchase(rl) {
  const list = BOOKS.filter((b) => b.stock > 0);
  if (list.length === 0) {
    console.log("すべて売り切れです。");
    return;
  }
  console.log("購入可能な本のリスト:");
  list.forEach((b, i) => {
    console.log(
      `${i + 1}. ${b.title} [${formatYen(b.price)} | ${b.category}] (在庫:${
        b.stock
      })`
    );
  });

  const ans = Number(await prompt(rl, "購入する番号を入力してください: "));
  if (!Number.isInteger(ans) || ans < 1 || ans > list.length) {
    console.log("無効な番号です。");
    return;
  }

  const book = list[ans - 1];
  const discount = calcDiscount(book.price, state.activeCoupon);
  const priceToPay = Math.max(0, book.price - discount);

  if (state.balance < priceToPay) {
    console.log(
      `残高が不足しています（必要: ${formatYen(priceToPay)} / 残高: ${formatYen(
        state.balance
      )}）。チャージしてください。`
    );
    return;
  }

  // 決済
  book.stock -= 1;
  state.balance -= priceToPay;

  const usedCode = state.activeCoupon ? state.activeCoupon.code : null;
  if (usedCode) state.usedCoupons.push(usedCode);

  state.cart.push({
    title: book.title,
    paid: priceToPay,
    original: book.price,
    couponCode: usedCode || undefined,
  });
  state.history.push({
    title: book.title,
    paid: priceToPay,
    discount,
    couponCode: usedCode || undefined,
    date: new Date().toLocaleString(),
  });

  // クーポンは1購入で消費
  state.activeCoupon = null;

  const discountMsg = discount > 0 ? `（割引 ${formatYen(discount)}）` : "";
  console.log(
    `${book.title}を購入しました！ 支払: ${formatYen(
      priceToPay
    )} ${discountMsg} / 残高: ${formatYen(state.balance)}`
  );
}

// ---- 4. 購入履歴 ----
function showHistory() {
  if (state.history.length === 0) {
    console.log("まだ購入履歴がありません。");
    return;
  }
  console.log("📖 購入履歴:");
  state.history.forEach((h, i) => {
    const couponInfo = h.couponCode ? ` / クーポン:${h.couponCode}` : "";
    console.log(
      `${i + 1}. ${h.title}  支払:${formatYen(h.paid)} / 割引:${formatYen(
        h.discount
      )}  ${h.date}${couponInfo}`
    );
  });
}

// ---- 5. クーポン適用 ----
async function applyCoupon(rl) {
  console.log("利用可能なクーポン例: TS10（10%OFF）, SAVE500（500円引き）");
  const code = String(await prompt(rl, "クーポンコードを入力してください: "))
    .trim()
    .toUpperCase();
  const c = COUPON_DB[code];
  if (!c) {
    console.log("クーポンが見つかりません。");
    return;
  }
  if (state.usedCoupons.includes(code)) {
    console.log("このクーポンは既に使用済みです。");
    return;
  }
  state.activeCoupon = c;
  console.log(`クーポン ${code} を適用しました。次の1回の購入に適用されます。`);
}

// ---- エントリーポイント ----
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const choice = await mainMenu(rl);
    switch (choice) {
      case 1:
        await charge(rl);
        break;
      case 2:
        showCart();
        break;
      case 3:
        await purchase(rl);
        break;
      case 4:
        showHistory();
        break;
      case 5:
        await applyCoupon(rl);
        break;
      case 6:
        console.log("終了します。");
        rl.close();
        return;
      default:
        console.log("無効な入力です。1〜6の番号を入力してください。");
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
