// Aguarda o carregamento completo do HTML
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Variáveis de Estado e Elementos do DOM
    let cartCount = 0;
    const cartCounterEl = document.getElementById('cart-counter');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');
    const toastContainer = document.getElementById('toast-container');
    
    // Elementos da Galeria
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-btn');

    // 2. Lógica da Galeria de Imagens
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove a classe 'active' de todas as miniaturas
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Adiciona a classe 'active' à miniatura clicada
            this.classList.add('active');
            
            // Troca a imagem principal usando o atributo 'data-image'
            const newImageSrc = this.getAttribute('data-image');
            
            // Efeito de transição suave (opcional)
            mainImage.style.opacity = '0.5';
            setTimeout(() => {
                mainImage.src = newImageSrc;
                mainImage.style.opacity = '1';
            }, 150);
        });
    });

    // 3. Sistema de Notificação (Toast)
    function showToast(message) {
        toastContainer.textContent = message;
        toastContainer.classList.add('show');
        
        // Remove o toast após 3 segundos
        setTimeout(() => {
            toastContainer.classList.remove('show');
        }, 3000);
    }

    // 4. Lógica do Carrinho
    addToCartBtn.addEventListener('click', () => {
        cartCount++;
        cartCounterEl.textContent = cartCount;
        showToast('Produto adicionado ao carrinho!');
    });

    buyNowBtn.addEventListener('click', () => {
        showToast('Processando pagamento de forma segura...');
    });
});
