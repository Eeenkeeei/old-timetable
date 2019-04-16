export function innerNews() {

let news = [];

fetch("https://timetable-eeenkeeei.herokuapp.com/getNewsList", {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
})
    .then(res => res.json())
    .then(
        (result) => {
            for (const resultElement of result) {
                let object = {
                    header: resultElement.header,
                    author: resultElement.author,
                    text: resultElement.text
                };
                news.push(object);
            }
            const innerNewsEl = document.querySelector('#innerNews');
            for (const newsElement of news) {
                const newsItem = document.createElement('div');
                newsItem.innerHTML = `
                    <div class="card" style="margin-top: 10px">
  <div class="card-body">
    <h5 class="card-title text-uppercase h4">${newsElement.header}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Автор: ${newsElement.author}</h6>
    <p class="card-text">${newsElement.text}</p>
   
  </div>
</div>
                    `;
                innerNewsEl.appendChild(newsItem)
            }
        },
        (error) => {
            console.log(error)
        }
    );



}
