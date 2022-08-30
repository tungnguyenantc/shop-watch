let html = function (path) {
  return `<li class="nav-item dropdown mr-3">
  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
    <i class="fas fa-user"></i> Wellcome
  </a>
  <div class="dropdown-menu">
    <a href="profile.html" class="dropdown-item">
      <i class="fas fa-user-circle"></i> Profile
    </a>
    <a href="settings.html" class="dropdown-item">
      <i class="fas fa-cog"></i> Settings
    </a>
  </div>
  </li>

  <li class="nav-item">
  <a href='/logout?next=${path}' class="nav-link">
    <i class="fa-solid fa-user"></i> Logout
  </a>
  </li>`;
};

let alert_user_pass = `<div class="alert alert-warning" role="alert">
Username or Paswword incorrect
</div>`;
const loginModal = document.querySelector(".loginModal");

document.querySelector(".btn-login").addEventListener("click", (e) => {
  e.preventDefault();
  const user = document.querySelector(".username").value;
  const password = document.querySelector(".password").value;
  const csrfmiddlewaretoken = document.getElementsByName(
    "csrfmiddlewaretoken"
  )[0].value;
  const liLogin = document.querySelector(".modalLogin");
  const ulLoginLogout = document.querySelector(".ul-login-logout");
  const alert_ = document.querySelector(".alert-warning");

  // check null user and pass
  if (!user && !password) {
    document.querySelector(".username").classList.add("is-invalid");
    document.querySelector(".password").classList.add("is-invalid");
    return false;
  } else if (!user) {
    document.querySelector(".username").classList.add("is-invalid");
    return false;
  } else if (!password) {
    document.querySelector(".password").classList.add("is-invalid");
    return false;
  }

  const url = "/login";

  fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      mode: "same-origin",
      "X-Requested-With": "XMLHttpRequest", //Necessary to work with request.is_ajax()
      "X-CSRFToken": csrfmiddlewaretoken,
    },
    body: JSON.stringify({ username: user, password: password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(url);
      if (data.success) {
        console.log("success");
        liLogin.closest("li").remove();
        const html_path = html(window.location.pathname);
        ulLoginLogout.insertAdjacentHTML("afterbegin", html_path);
        // remove modal
        loginModal.remove();
        // remove lớp phủ modal
        document.querySelector(".modal-backdrop").remove();
        // aler login success
        document.querySelector(".loginAlertSuccess").classList.remove("anhien");
        //
        document.body.classList.remove("modal-open");
        setTimeout(
          () => document.querySelector(".loginAlertSuccess").remove(),
          5000
        );
      } else {
        // xóa cảnh báo
        document.querySelector(".username").classList.remove("is-invalid");
        document.querySelector(".username").classList.add("is-valid");

        document.querySelector(".password").classList.remove("is-invalid");
        document.querySelector(".password").classList.add("is-valid");

        document
          .querySelector(".modal-body")
          .insertAdjacentHTML("afterbegin", alert_user_pass);
        setTimeout(
          () => document.querySelector(".alert-warning").remove(),
          5000
        );
      }
    });
});
