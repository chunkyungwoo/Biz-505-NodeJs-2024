document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.books");
  table?.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "TD") {
      const paTR = target.closest("TR");
      const tds = paTR.querySelectorAll("TD");
      const book_isbn = tds[0].innerText;
      document.location.href = `/books/${book_isbn}/detail`;
    }
  });
});
