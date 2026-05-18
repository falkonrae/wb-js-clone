const search = function () {
    const input = document.querySelector('.search-block > input')
    const searchBtn = document.querySelector('.search-block > button')

    /* Не очень вариант, наверное много лишних данных, возвращает undefined после обновления страницы
    
        let inputValue
        input.addEventListener('input', (event) => {
            inputValue = event.target.value
        })
        searchBtn.addEventListener('click', () => {
            console.log(inputValue);
        })
    */

    searchBtn.addEventListener('click', () => {
        console.log(input.value);
    })
}

search()