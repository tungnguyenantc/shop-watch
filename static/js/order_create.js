const total_price = document.getElementsByClassName("total_price");
const total_all_price = document.querySelector(".total_all_price");

for (const i of total_price) {
  const total = i.innerText.split(".")[0];
  i.innerText = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(total);
}
total_all_price.textContent = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
}).format(total_all_price.textContent.split(".")[0]);
