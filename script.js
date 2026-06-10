let cartCount = 0;
const cartCountEl = document.getElementById('cart-count');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

function showNotification(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function addToCart() {
    cartCount++;
    cartCountEl.textContent = cartCount;
    showNotification("Produto adicionado ao carrinho com sucesso!");
}

function buyNow() {
    showNotification("Redirecionando para a página de checkout...");
    setTimeout(() => {
        alert("Simulação de finalização de compra bem-sucedida!");
    }, 1000);
}

function viewCart() {
    alert(`Você possui ${cartCount} produto(s) no seu carrinho.`);
}
