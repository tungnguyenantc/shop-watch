const shopWatch = document.querySelector(".shopWatch");
const totalCart = document.querySelector(".badge-light");
const url_add = "cart/";

// index cart
shopWatch.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("btn-block")) {
    const productId = target.closest("div").dataset.id;
    fetch(url_add, {
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
      .then((data) => (totalCart.textContent = data.total));
  }
});
