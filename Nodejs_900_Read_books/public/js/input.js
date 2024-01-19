document.addEventListener("DOMContentLoaded", () => {
  const B_INDEX = {
    B_NUM: 0,
    B_ISBN: 1,
    B_TITLE: 2,
    B_AUTHOR: 3,
    B_PUBLISHER: 4,
    B_PRICE: 5,
    B_DISCOUNT: 6,
    B_DESCRIPTION: 7,
    B_PUBDATE: 8,
    B_LINK: 9,
    B_IMAGE: 10,
  };
  const b_isbn_check = async (b_isbn) => {
    const response = await fetch(`/book/${b_isbn}/check`);
    const json = await response.json();
    console.log(json);

    return json.result;
  };
  const form = document.querySelector("form.book");
  const btn_submit = form.querySelector("button");
  const inputs = form.querySelectorAll("input");
  const b_isbn = inputs[B_INDEX.B_ISBN];
  const b_title = inputs[B_INDEX.B_TITLE];
  const b_author = inputs[B_INDEX.B_AUTHOR];
  const b_publisher = inputs[B_INDEX.B_PUBLISHER];
  const b_price = inputs[B_INDEX.B_PRICE];
  const b_discount = inputs[B_INDEX.B_DISCOUNT];
  const b_description = inputs[B_INDEX.B_DESCRIPTION];
  const b_pubdate = inputs[B_INDEX.B_PUBDATE];

  const error_divs = document.querySelectorAll("div.book.error");

  const b_isbn_valid = async (target) => {
    const result = await b_isbn_check(target.value);
    let message = "";
    let color = "red";
    if (result === "ERROR") {
      message = " * DB 오류";
    } else if (result === "있다") {
      message = " * 이미 등록된 ISBN입니다";
    } else if (result === "없다") {
      message = " * 사용가능한 ISBN입니다";
      color = "blue";
    }
    error_divs[B_INDEX.B_ISBN].innerHTML = message;
    error_divs[B_INDEX.B_ISBN].style.color = color;
    return color === "red";
  };
  btn_submit?.addEventListener("click", async () => {
    error_divs.forEach((item) => (item.innerHTML = ""));

    if (!b_isbn.value) {
      error_divs[B_INDEX.B_ISBN].innerHTML = " ISBN은 반드시 입력하세요";
      b_isbn.select();
      return false;
    } else {
      const bRedYes = b_isbn_valid(b_isbn);
      if (bRedYes) {
        b_isbn.select();
        return false;
      }
    }
    if (!b_title.value) {
      error_divs[B_INDEX.B_TITLE].innerHTML = " 도서명은 반드시 입력해야 합니다";
      b_title.select();
      return false;
    }
    if (!b_author.value) {
      error_divs[B_INDEX.B_AUTHOR].innerHTML = " 저자는 반드시 입력하세요";
      b_author.select();
      return false;
    }
    form.submit();
  });
  let EVENT_B_ISBN = false;
  b_isbn?.addEventListener("blur", async (event) => {
    const target = event.target;
    const value = target.value;
    if (!value) {
      error_divs[B_INDEX.B_ISBN].innerText = " ISBN을 입력해 주세요";

      target.select();
      return false;
    } else {
      const bRedYes = await b_isbn_valid(target);
      if (bRedYes) {
        target.select();
        return false;
      }
    }
    EVENT_B_ISBN = true;
  });

  b_title.addEventListener("blur", (event) => {
    if (!EVENT_B_TITLE) return false;
    const target = event.target;
    const value = target.value;
    if (!value) {
      error_divs[B_INDEX.B_TITLE].innerText = " 도서명은 반드시 입력해야 합니다";
      b_title.select();
      return false;
    }
  });

  b_isbn.focus();
});
