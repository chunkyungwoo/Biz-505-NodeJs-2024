const NAV_TEXT = {
  체크리스트: "체크리스트",
  나의메모: "나의메모",
  로그인: "로그인",
  회원가입: "회원가입",
};
document.addEventListener("DOMContentLoaded", () => {
  const main_nav = document.querySelector("nav.main");
  main_nav.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "LI") {
      const navText = target.textContent;
      let url = "";
      if (navText === NAV_TEXT.체크리스트) {
        url = "/check";
      } else if (navText === NAV_TEXT.나의메모) {
        url = "/memo";
      } else if (navText === NAV_TEXT.로그인) {
        url = "/users/login";
      } else if (navText === NAV_TEXT.로그아웃) {
        url = "/users/logout";
      } else if (navText === NAV_TEXT.회원가입) {
        url = "/users/join";
      }
      document.location.href = url;
    }
  });
});
