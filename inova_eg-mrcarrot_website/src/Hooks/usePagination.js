import { useMemo, useState } from "react";

export const usePagination = (array, itemsPerPage) => {
  const [pages, setPages] = useState(null);
  const getPages = async (array, itemsPerPage) => {
    const pages = [];
    //create an empty page array
    let page = [];
    //loop the array that needs to be sliced into pages
    for (var j = 0; j < array?.length; j++) {
      //push the items in the main array into the page array until the limit of the page is reached
      page.push(array[j]);
      //if the limit is reached in this case 3 (items per page) and this wasn't the start of the array
      if ((j + 1) % itemsPerPage === 0) {
        // push the page array into the pages (this is our first page in the pages array)
        pages.push(page);
        // reset the page array so we can refill it again
        page = [];
      }
      //if the end of the array is reached we push the page no matter if it reached the page limit or not into the pages array
      else if (j === array.length - 1) {
        pages.push(page);
        page = [];
      }
    }
    // returning the pages array that contains each page with its items that will be used to render pages and their items
    return pages;
  };

  useMemo(async () => {
    const actualPages = await getPages(array, itemsPerPage);
    setPages(actualPages);
  }, [array, itemsPerPage]);

  return { pages };
};
