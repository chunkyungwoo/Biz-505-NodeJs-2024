document.addEventListener("DOMContentLoaded", () => {
  const login_form = document.querySelector("form.login");
  const input_id = login_form.querySelector("input.userid");
  const input_password = login_form.querySelector("input.password");
  const btn_login = login_form.querySelector("input.btn_login");

  btn_login.addEventListener("click", (e) => {
    const target = e.target;
    if (!input_id.value) {
      alert("ID를 입력하세요");
      input_id.select();
      return false;
    }
    if (!input_password.value) {
      alert("비밀번호를 입력하세요");
      input_password.select();
      return false;
    }

    login_form.submit();
  });

  const join_btn = document.querySelector("div.join");
  join_btn.addEventListener("click", (e) => {
    const target = e.target;
    if (target.value === "회원가입") {
      return (document.location.href = "/users/join");
    }
  });
});
