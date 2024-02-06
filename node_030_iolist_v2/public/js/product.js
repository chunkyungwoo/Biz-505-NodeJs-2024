document.addEventListener("DOMContentLoaded", () => {
  const pro_table = document.querySelector("table.products");
  const btn_box = document.querySelector("div.btn_box");
  const input = document.querySelector("input.list");
  pro_table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const p_code = tr.dataset.pcode;
      document.location.replace(`/products/${p_code}/detail`);
    }
  });
  btn_box.addEventListener("click", (e) => {
    const target = e.target;
    if (target.value === "조회") {
      return document.location.replace(`/products/${input.value}/detail`);
    }
    if (target.value === "상품추가") {
      document.location.href = "/products/insert";
    }
  });
});
