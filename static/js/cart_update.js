const table = document.querySelector("table");
const remove = document.querySelector(".fa-trash");
const totalCart = document.querySelector(".badge-light");
const cartCurrentcy = document.querySelector(".badge-primary");
const url_cart_update = "/cart/update";
const decrement = document.querySelector(".decrement");
const moneys = document.getElementsByClassName("money");
const prices = document.getElementsByClassName("price");

totalCart.textContent == "0"
  ? document.querySelector(".order").classList.add("d-none")
  : null;

function ressetCart() {
  const cartCurrent = Number(cartCurrentcy.innerText.split(".")[0]);
  cartCurrentcy.innerText = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(cartCurrent);
}
ressetCart();

for (const i of prices) {
  const price = Number(i.innerText.replaceAll(",", ""));

  i.innerText = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}
for (const i of moneys) {
  const money = Number(i.innerText.split(".")[0]);

  i.innerText = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(money);
}

table.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains("increment")) {
    tangGiam(e, "tang");
  } else if (target.classList.contains("decrement")) {
    tangGiam(e, "giam");
  }
});
const totalCartCurrentcy = (tr, total_price_item) => {
  tr.querySelector(".money").textContent = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(total_price_item);
};

function tangGiam(e, typeproduct) {
  const productId = e.target.closest("tr").dataset.id;
  const tr = e.target.closest("tr");
  let quantity =
    typeproduct === "tang"
      ? e.target.previousElementSibling
      : e.target.nextElementSibling;

  fetch(url_cart_update, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      mode: "same-origin",
      "X-Requested-With": "XMLHttpRequest", //Necessary to work with request.is_ajax()
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
      type: `${typeproduct}`,
      productId: productId,
      quantity: quantity.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.type_ === "tang") {
        quantity.value = Number(quantity.value) + 1;
        totalCart.textContent = data.total;
        // tổng tiền từng san pham
        totalCartCurrentcy(tr, data.total_price_item);
        // tính tổng cộng

        cartCurrentcy.textContent = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(data.totalTongTien);
      } else if (data.type_ === "giam" && data.min === 1) {
        // tổng số lượng hàng
        totalCart.textContent = data.total;
        cartCurrentcy.textContent = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(data.totalTongTien);
      } else {
        quantity.value = Number(quantity.value) - 1;
        // tổng số lượng hàng
        totalCart.textContent = data.total;
        // tổng tiền từng san pham
        totalCartCurrentcy(tr, data.total_price_item);
        cartCurrentcy.textContent = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(data.totalTongTien);
      }
    });
}
