const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link')
    const viewAllBtn = document.querySelector('.more')

    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list')

        goodsContainer.innerHTML = ""

        goods.forEach(good => {
            const goodBlock = document.createElement('div')

            goodBlock.classList.add('col-lg-3')
            goodBlock.classList.add('col-sm-6')

            goodBlock.innerHTML = `
                <div class="goods-card">
					<span class="label ${good.label ? null : 'd-none'}">${good.label}</span></span>
					<img src="./db/${good.img}" alt="${good.name}" class="goods-image">
					<h3 class="goods-title">${good.name}</h3>
					<p class="goods-description">${good.description}</p>
					<button class="button goods-card-btn add-to-cart" data-id="${good.id}">
					<span class="button-price">$${good.price}</span>
					</button>
				</div>`

            goodsContainer.append(goodBlock)

        })
    }
    const getData = (value, category) => {
        fetch('./db/db.json')
            .then((res) => res.json())
            .then((data) => {
                const array = category ? data.filter((item) => item[category] === value) : data
                //category ? console.log('have') : console.log('don\'t')                ;

                localStorage.setItem('goods', JSON.stringify(array))
                if (window.location.pathname !== "/wildberries-source/goods.html") {
                    window.location.href = 'goods.html'
                } else {
                    renderGoods(array)
                }


            })
    }

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault
            const linkValue = link.textContent
            const category = link.dataset.field
            getData(linkValue, category)
            //console.log(linkValue);
            //console.log(category);
        })
    })

    if (localStorage.getItem('goods') && window.location.pathname === "/wildberries-source/goods.html") {
        renderGoods(JSON.parse(localStorage.getItem('goods')))
    }

    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            event.preventDefault
            getData()
        })
    }

    //localStorage.setItem('goods', JSON.stringify([1,2,3,4,5]))
    //const goods = JSON.parse(localStorage.getItem('goods'))
    //console.log(localStorage);
    //localStorage.removeItem('goodsData')
    //console.log(localStorage);

}


getGoods()
