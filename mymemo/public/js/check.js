// 로그인을 해야 이용하게끔
document.addEventListener("DOMContentLoaded", () => {
  const needlogin = document.querySelector("");
  needlogin.addEventListener("click", () => {
    alert("로그인 후 이용하세요");
  });
});
