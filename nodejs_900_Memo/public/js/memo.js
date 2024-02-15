document.addEventListener("DOMContentLoaded", () => {
  const TH_ITEMS = {
    일련번호: "m_seq",
    작성자: "m_author",
    작성일자: "m_date",
    작성시각: "m_time",
    메모내용: "m_memo",
  };
  const url = new URL(document.location.href);
  const sort = url.searchParams.get("sort");
  const order = url.searchParams.get("order");
  const memo_table = document.querySelector("table.memo");

  memo_table?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const m_seq = tr.dataset.mseq;
      document.location.replace(`/memos/${m_seq}/detail`);
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const btn_update = document.querySelector("button.btn_update");
  const btn_delete = document.querySelector("button.btn_delete");

  btn_delete.addEventListener("click", (e) => {
    if (confirm("정말 삭제할까요?")) {
      const target = e.target;
      const m_seq = target.dataset.seq;
      document.location.replace(`/memos/${m_seq}/delete`);
    }
  });
  btn_update.addEventListener("click", (e) => {
    const m_seq = e.target.dataset.seq;
    if (m_seq) {
      document.location.replace(`/memos/${m_seq}/update`);
    } else {
      alert("메모 정보가 잘못되었습니다");
    }
  });
});
