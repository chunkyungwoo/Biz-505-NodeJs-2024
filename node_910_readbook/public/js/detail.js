document.addEventListener("DOMContentLoaded", () => {
  const btn_list = document.querySelector("button.btn_list");

  btn_list?.addEventListener("click", () => {
    document.location.href = "/books";
  });
});
