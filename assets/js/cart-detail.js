const addCartDetail = document.querySelector(".addCartDetail");
const totalCart = document.querySelector(".badge-light");

addCartDetail.addEventListener("click", (e) => {
  productId = e.target.closest("div").dataset.id;
  const url_cart_detail = ``;
  fetch(url_cart_detail, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      mode: "same-origin",
      "X-Requested-With": "XMLHttpRequest", //Necessary to work with request.is_ajax()
      "X-CSRFToken": csrftoken,
    },
  })
    .then((res) => res.json())
    .then((data) => (totalCart.textContent = data.total));
});
