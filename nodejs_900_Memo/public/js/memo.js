document.addEventListener("DOMContentLoaded", () => {
  const date_form = document.querySelector("form.date");
  const input_form = document.querySelector("form.input");

  const btn_save = document.querySelector("input.btn_save");
  const btn_new = document.querySelector("input.btn_new");
  const btn_delete = document.querySelector("input.btn_delete");

  const toDate = date_form.querySelector("input.todate");
  const toTime = date_form.querySelector("input.totime");
  const toSubject = date_form.querySelector("input.tosubject");
  const toMemo = date_form.querySelector("input.tomemo");
  const toImage = date_form.querySelector("input.toImage");
  const memo_image = date_form.querySelector("img.memo.image");

  const memo_box = document.querySelector("ul.memo");

  memo_image.addEventListener("click", () => {
    toImage.click();
  });
  toImage.addEventListener("change", (event) => {
    const imageFile = event.target.files[0];
    const imageURL = (window.URL || webkitURL).createObjectURL(imageFile);
    memo_image.src = imageURL;
  });

  memo_box.addEventListener("click", async (e) => {
    const target = e.target;
    const classList = target.classList;
    if (classList.contains("memo")) {
      let seq = 0;
      if (classList.contains("list")) {
        seq = target.dataset.seq;
      } else {
        seq = target.closest("LI").dataset.seq;
      }
      const res = await fetch(`${seq}/get`);
      const json = await res.json();
      console.log(json);

      toDate.value = json.m_date;
      toTime.value = json.m_time;
      toSubject.value = json.m_subject;
      toMemo.value = json.m_memo;

      if (json.m_image) {
        memo_image.src = `/images/${json.m_image}`;
      } else {
        memo_image.src = `/images/noImage.svg`;
      }
      btn_save.value = "수정";
      btn_save.classList.add("update");
      input_form.action = `/?seq=${json.m_seq}`;
      btn_delete.type = "button";
      btn_delete.dataset.seq = json.m_seq;
    }
  });
  btn_delete.addEventListener("click", (event) => {
    const target = event.target;
    const seq = target.dataset.seq;
    if (confirm("메모를 삭제할까요")) {
      document.location.replace(`/${seq}/delete`);
    }
  });
  btn_new.addEventListener("click", async (e) => {
    location.reload();
  });
  btn_save?.addEventListener("click", () => {
    input_form.appendChild(toDate);
    input_form.appendChild(toTime);
    input_form.submit();
  });
});
