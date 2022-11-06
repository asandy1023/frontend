let nowPage = 0;
let nextPage = 2;
let doagain = false;
let totalItem = [];
let tempItem = [];
let item = {};
while (nowPage != nextPage) {

  //scroll page down
  await new Promise((r) => setTimeout(r, 2000));
  window.scrollTo(0, 0);
  window.scroll({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });

  //when error auto do again
  do {
    tempItem = [];
    doagain = false;
    await new Promise((r) => setTimeout(r, 1000));
    try {
      let resultItems = document.querySelectorAll(
        "#main > div > div.dYFPlI > div._9dX3ZL > div > div.ZgwlcK > div.shopee-search-item-result > div.row.shopee-search-item-result__items > div"
      );
      resultItems.forEach((element) => {
        item = {};

        let title = element.querySelector(
          "div > a > div > div > div.KMyn8J > div.dpiR4u > div > div"
        ).innerText;

        let img = element.querySelector(
          " div > a > div > div > div > div > img"
        ).src;

        let price = element.querySelector(
          " div > a > div > div > div.KMyn8J > div.hpDKMN > div > span.ZEgDH9"
        ).innerText;

        let link = element.querySelector("div > a").href;

        item["title"] = title;
        item["img"] = img;
        item["price"] = price;
        item["link"] = link;
        tempItem.push(item);
      });
    } catch (error) {
      console.log("doagain");
      doagain = true;
    }
  } while (doagain == true);
  //push item to totalItem
  for (let index = 0; index < tempItem.length; index++) {
    totalItem.push(tempItem[index]);
  }
  //get page before pressing next page
  const urlParams = new URLSearchParams(window.location.search);
  let nowPageString = urlParams.get("page");
  nowPage = parseInt(nowPageString);
  //pressing next page
  document.querySelector("#main > div > div.dYFPlI > div > div > div.ZgwlcK > div.shopee-search-item-result > div._4jsMAm > div > button.shopee-icon-button.shopee-icon-button--right").click();
  //get page after pressing next page
  const urlParams1 = new URLSearchParams(window.location.search);
  let nextPageInString = urlParams1.get("page");
  nextPage = parseInt(nextPageInString);
  if (nextPage == nowPage) {
    break;
  }
}

// Print totalItem
console.log(totalItem);