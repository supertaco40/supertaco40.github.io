class PageCounter {
  currentValue = 1;
  pageSize = 3;
  render() {
    const pagesDiv = document.getElementById('pages-div');
    pagesDiv.innerHTML = `
        <button class="pages__button" id="page-decrement">-</button>
        <span class="pages__value">${this.currentValue}</span>
        <button class="pages__button" id="page-increment">+</button>
        `;
  }
}

export default PageCounter;
