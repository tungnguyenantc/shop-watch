const url_cart_remove = "/cart/remove";

table.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("removeCart")) {
    const productId = e.target.closest("tr").dataset.id;
    const tr = e.target.closest("tr");
    fetch(url_cart_remove, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        mode: "same-origin",
        "X-Requested-With": "XMLHttpRequest", //Necessary to work with request.is_ajax()
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ productId: productId }),
    })
      .then((res) => res.json())
      .then((data) => {
        // ẩn order khi giỏ hàng = 0
        data.total == 0
          ? document.querySelector(".order").classList.add("d-none")
          : null;
        // xóa mặt hàng
        tr.remove();
        // cập nhật số lượng
        totalCart.textContent = data.total;
        // cập nhật tổng tiền
        cartCurrentcy.textContent = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(data.totalTongTien);
      });
  }
});
