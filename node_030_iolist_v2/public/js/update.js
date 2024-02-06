document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("div.btn_box");
  const back = document.querySelector("input.back");
  btn_box.addEventListener("click", (e) => {
    const target = e.target;

    if (target.value === "수정하기") {
    } else if (target.value === "취소") {
      const p_code = back.dataset.p_code;
      return document.location.replace(`/products/${p_code}/detail1`);
    }
  });
});
