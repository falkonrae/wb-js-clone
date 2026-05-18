const cart = function () {
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart')
    const closeBtn = document.querySelector('.modal-close')

    //console.dir(cart);
    //cartBtn.onclick = function(){
    //   console.log('click');
    //}

    cartBtn.addEventListener('click', function () {
        cart.style.display = 'flex'
    })

    closeBtn.addEventListener('click', function () {
        cart.style.display = ''
    })
}

