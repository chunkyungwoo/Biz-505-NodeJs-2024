const DIV_BOX = {
  추가: "추가",
  저장: "저장",
  메모: "메모",
  새로작성: "새로작성",
};
document.addEventListener("DOMContentLoaded", () => {
  const div_box = document.querySelector("div.box");
  div_box.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const divText = target.textContent;
      let url = "/";
      if (divText === DIV_BOX.새로작성) {
        url += "memo/input";
      } else if (divText === DIV_BOX.메모) {
        url += "memos/detail";
      }
      document.location.replace(url);
    }
  });
});
