/**
 * i2GO Luxury Landing Page - Controller
 * Desenvolvido sob práticas modernas de arquitetura de software (ES6+).
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // ESTADO DA APLICAÇÃO (Single Source of Truth)
    // ==========================================
    const appState = {
        cartCount: 0,
        currentActiveImage: 'carregador.jpg'
    };

    // Mapeamento de Seletores DOM
    const DOM = {
        mainImage: document.getElementById('main-product-image'),
        thumbnails: document.querySelectorAll('.thumbnail-btn'),
        cartCounter: document.getElementById('cart-counter'),
        btnAddToCart: document.getElementById('add-to-cart-btn'),
        btnBuyNow: document.getElementById('buy-now-btn'),
        toastContainer: document.getElementById('toast-container')
    };

    // ==========================================
    // MÓDULO 1: GALERIA INTERATIVA
    // ==========================================
    const initGallery = () => {
        DOM.thumbnails.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                const button = e.currentTarget;
                const newImagePath = button.getAttribute('data-image');

                if (newImagePath === appState.currentActiveImage) return;

                // Suavização por troca de estado de opacidade (fade out)
                DOM.mainImage.classList.remove('active');

                // Atualização após início do fade-out
                setTimeout(() => {
                    DOM.mainImage.src = newImagePath;
                    DOM.mainImage.classList.add('active');
                    appState.currentActiveImage = newImagePath;
                }, 200); // Sincronizado com CSS transition de 0.4s

                // Atualiza estado visual das miniaturas
                DOM.thumbnails.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');
            });
        });
    };

    // ==========================================
    // MÓDULO 2: GERENCIADOR DO TOAST (FEEDBACK)
    // ==========================================
    const triggerToast = (message) => {
        // Criação de elemento temporário otimizado
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'alert');
        
        // Ícone elegante em SVG para enriquecer o visual
        toast.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 8 12 12 16 14"></polyline>
            </svg>
            <span>${message}</span>
        `;

        DOM.toastContainer.appendChild(toast);

        // Força renderização do navegador para aplicar animação de entrada
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Agendamento de remoção síncrona
        setTimeout(() => {
            toast.classList.remove('show');
            // Remove o elemento do DOM após a animação de saída terminar
            toast.addEventListener('transitionend', () => {
                toast.remove();
            });
        }, 3500);
    };

    // ==========================================
    // MÓDULO 3: GERENCIAMENTO DO CARRINHO (CART MODULE)
    // ==========================================
    const updateCartDOM = () => {
        DOM.cartCounter.textContent = appState.cartCount;
        
        // Pequena animação de escala no contador para feedback tátil visual
        DOM.cartCounter.style.transform = 'scale(1.25)';
        setTimeout(() => {
            DOM.cartCounter.style.transform = 'scale(1)';
        }, 150);
    };

    const handleAddToCart = () => {
        appState.cartCount += 1;
        updateCartDOM();
        triggerToast("Item exclusivo adicionado à sua seleção.");
    };

    const handleBuyNow = () => {
        triggerToast("Redirecionando para nosso checkout seguro premium...");
        // Simulação de transição para o gateway de pagamento de alta conversão
        setTimeout(() => {
            window.location.href = "#checkout-simulado"; 
        }, 1200);
    };

    // Inicializador de Eventos de Botão
    const bindEvents = () => {
        if (DOM.btnAddToCart) {
            DOM.btnAddToCart.addEventListener('click', handleAddToCart);
        }
        if (DOM.btnBuyNow) {
            DOM.btnBuyNow.addEventListener('click', handleBuyNow);
        }
    };

    // Inicialização da Aplicação
    const init = () => {
        initGallery();
        bindEvents();
    };

    init();
});
