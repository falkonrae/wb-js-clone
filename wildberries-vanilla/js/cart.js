const cart = function () {
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart')
    const closeBtn = document.querySelector('.modal-close')
    const goodsContainer = document.querySelector('.long-goods-list')
    const cartTable = document.querySelector('.cart-table__goods')
    const cartTableTotal = document.querySelector('.card-table__total')
    const modalForm = document.querySelector('.modal-form')
    //Удаление из корзины
    const deleteCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.filter(good => {
            return good.id !== id
        })
        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }
    // Увеличить кол-во товара из корзины
    const plusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map(good => {
            if (good.id === id) {
                good.count++
            }
            return good
        })
        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }
    // Уменьшить кол-во товара из корзины
    const minusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'))

        const newCart = cart.map(good => {
            if (good.id === id && good.count > 0) {
                good.count--
            }
            return good
        })
        localStorage.setItem('cart', JSON.stringify(newCart))
        renderCartGoods(JSON.parse(localStorage.getItem('cart')))
    }

    //функция добавления итема в корзину
    const addToCart = (id) => {
        const goods = JSON.parse(localStorage.getItem('goods'))
        const clickedGood = goods.find(good => good.id === id)
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

        if (cart.some(good => good.id === clickedGood.id)) {
            //console.log('Увеличили количество имеющегося');
            cart.map(good => {
                if (good.id === clickedGood.id) {
                    good.count++
                }
                return good
            })
        } else {
            //console.log('Добавляем товар в корзину');
            clickedGood.count = 1
            cart.push(clickedGood)
        }
        //Сетим новый объект корзины в локал сторадж
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    // рендер корзины
    const renderCartGoods = (goods) => {
        cartTable.innerHTML = ''
        cartTableTotal.innerHTML = ''
        let total = +0
        goods.forEach(good => {
            total += (+good.price * +good.count)


            const tr = document.createElement('tr')
            tr.innerHTML = `
						<td>${good.name}</td>
						<td>${good.price}$</td>
						<td><button class="cart-btn-minus">-</button></td>
						<td>${good.count}</td>
						<td><button class="cart-btn-plus">+</button></td>
						<td>${+good.count * +good.price}$</td>
						<td><button class="cart-btn-delete"">x</button></td>
            `
            cartTable.append(tr)

            tr.addEventListener('click', (e) => {
                if (e.target.classList.contains('cart-btn-minus')) {
                    minusCartItem(good.id)
                } else if (e.target.classList.contains('cart-btn-plus')) {
                    plusCartItem(good.id)
                } else if (e.target.classList.contains('cart-btn-delete')) {
                    deleteCartItem(good.id)
                }
            })
        });
        console.log(total);
        const tr1 = document.createElement('tr')
        tr1.innerHTML = `
						<th colspan=" 5">Total:</th>
						<th class="card-table__total" colspan="2">${total}$</th>
            `
        cartTableTotal.append(tr1)
    }

    //отправка данных в сервер

    const sendForm = () => {
        const cartArray = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []
        const customerName = modalForm.querySelector('[name="nameCustomer"]').value;
        const customerPhone = modalForm.querySelector('[name="phoneCustomer"]').value;

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                cart: cartArray,
                name: customerName,
                phone: customerPhone
            })
        }).then(() => {
            cart.style.display = ''
        })
        localStorage.removeItem('cart')
        modalForm.reset();
    }

    //modalForm

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault()
        sendForm()
    })

    cartBtn.addEventListener('click', function () {
        const cartArray = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

        renderCartGoods(cartArray)

        cart.style.display = 'flex'
    })

    closeBtn.addEventListener('click', function () {
        cart.style.display = ''
    })

    cart.addEventListener('click', (event) => {
        if (!event.target.closest('.modal') && event.target.classList.contains('overlay')) {
            cart.style.display = ''
        }
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cart.style.display = ''
        }
    })

    if (goodsContainer) {
        goodsContainer.addEventListener('click', (event) => {

            if (event.target.closest('.add-to-cart')) {
                const buttonToCart = event.target.closest('.add-to-cart')
                const goodId = buttonToCart.dataset.id
                addToCart(goodId)

            }
        })
    }
}

cart()