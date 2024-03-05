const join_btn_click_event = async () => {
  const join_form = document.querySelector("form.join");
  const password = join_form.querySelector("#password");
  const re_password = join_form.querySelector("#re_password");
  const id = join_form.querySelector("#id");
  const name = join_form.querySelector("#name");
  const email = join_form.querySelector("#email");

  if (id.value === "") {
    alert("ID를 입력해주세요");
    id.select();
    return false;
  } else {
    const response = await fetch(`/user/${id.value}/check`);
    const json = await response.json();
    if (json.MESSAGE === "FOUND") {
      alert("이미 등록된 ID입니다");
      id.select();
      return false;
    } else {
      alert("사용가능한 ID입니다");
      password.select();
    }
  }
  if (password.value === "") {
    alert("비밀번호를 입력해주세요");
    password.select();
    return false;
  }
  if (re_password.value === "") {
    alert("비밀번호 확인을 입력해주세요");
    re_password.select();
    return false;
  }
  if (password.value !== re_password.value) {
    alert("동일한 비밀번호를 입력해주세요");
    password.select();
    return false;
  }
  if (name.value === "") {
    alert("이름을 입력해주세요");
    name.select();
    return false;
  }
  if (email.value === "") {
    alert("email을 입력해주세요");
    email.select();
    return false;
  }
  join_form.submit();
};

document.addEventListener("DOMContentLoaded", () => {
  const join_btn = document.querySelector("#join_btn");
  join_btn.addEventListener("click", join_btn_click_event);
});
