document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("div.btn_box");
  const form_box = document.querySelector("form.input_box");

  btn_box.addEventListener("click", (e) => {
    const target = e.target;
    if (target.innerHTML === "입력") {
      form_box.submit();
    } else if (target.innerHTML === "취소") {
      document.location.replace("/products");
    }
  });
});
