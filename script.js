// script.js

// Prevent unwanted events
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('dragstart', e => e.preventDefault());

// Prevent Android/Chrome share menu
document.addEventListener('gesturestart', e => e.preventDefault());

// Prevent default behavior on long press
document.addEventListener('touchstart', e => {
    if (e.touches.length > 1) e.preventDefault();
}, { passive: false });

// Prevent pinch zoom
document.addEventListener('gesturechange', e => e.preventDefault());
document.addEventListener('gestureend', e => e.preventDefault());

// Store selection
const stores = document.querySelectorAll('.store');
stores.forEach(store => {
    store.addEventListener('click', () => {
        stores.forEach(s => s.classList.remove('active'));
        store.classList.add('active');
    });
});

// Initialize all sliders
function initializeSliders() {
    // Hot Combo Slider
    const comboSlider = document.getElementById('comboSlider');
    const comboDotsContainer = document.getElementById('comboDots');
    const comboPrevBtn = document.getElementById('comboPrevBtn');
    const comboNextBtn = document.getElementById('comboNextBtn');
    let comboCurrentIndex = 0;
    const comboCount = document.querySelectorAll('.combo-item').length;

    function updateComboSlider() {
        const slideWidth = comboSlider.offsetWidth;
        comboSlider.scrollTo({
            left: comboCurrentIndex * slideWidth,
            behavior: 'smooth'
        });

        const comboDots = document.querySelectorAll('.combo-dot');
        comboDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === comboCurrentIndex);
        });

        if (comboPrevBtn) comboPrevBtn.disabled = comboCurrentIndex === 0;
        if (comboNextBtn) comboNextBtn.disabled = comboCurrentIndex === comboCount - 1;
    }

    if (comboPrevBtn) {
        comboPrevBtn.addEventListener('click', () => {
            if (comboCurrentIndex > 0) {
                comboCurrentIndex--;
                updateComboSlider();
            }
        });
    }

    if (comboNextBtn) {
        comboNextBtn.addEventListener('click', () => {
            if (comboCurrentIndex < comboCount - 1) {
                comboCurrentIndex++;
                updateComboSlider();
            }
        });
    }

    // Attach event for dots
    comboDotsContainer.addEventListener('click', (e) => {
        const dot = e.target.closest('.combo-dot');
        if (dot) {
            const index = Array.from(comboDotsContainer.children).indexOf(dot);
            comboCurrentIndex = index;
            updateComboSlider();
        }
    });

    // Handle native scroll events on the slider
    let isScrolling;
    comboSlider.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const slideWidth = comboSlider.offsetWidth;
            const scrollPosition = comboSlider.scrollLeft;
            const newIndex = Math.round(scrollPosition / slideWidth);

            if (newIndex !== comboCurrentIndex) {
                comboCurrentIndex = newIndex;
                updateComboSlider();
            }
        }, 100);
    });

    // Touch swipe detection
    let startX, startScroll;
    comboSlider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startScroll = comboSlider.scrollLeft;
    }, { passive: true });

    // Main Dishes Slider
    const mainDishSlider = document.getElementById('mainDishSlider');
    const mainDotsContainer = document.getElementById('mainDots');
    const mainPrevBtn = document.getElementById('mainPrevBtn');
    const mainNextBtn = document.getElementById('mainNextBtn');
    let mainCurrentIndex = 0;
    const mainDishCount = document.querySelectorAll('#mainDishSlider .food-item').length;
    const mainVisibleCount = 2;
    const mainMaxIndex = Math.ceil(mainDishCount / mainVisibleCount) - 1;

    function updateMainDishSlider() {
        const slideWidth = mainDishSlider.offsetWidth;
        mainDishSlider.scrollTo({
            left: mainCurrentIndex * slideWidth,
            behavior: 'smooth'
        });

        const mainDots = document.querySelectorAll('#mainDots .combo-dot');
        mainDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === mainCurrentIndex);
        });

        mainPrevBtn.disabled = mainCurrentIndex === 0;
        mainNextBtn.disabled = mainCurrentIndex >= mainMaxIndex;
    }

    if (mainPrevBtn) {
        mainPrevBtn.addEventListener('click', () => {
            if (mainCurrentIndex > 0) {
                mainCurrentIndex--;
                updateMainDishSlider();
            }
        });
    }

    if (mainNextBtn) {
        mainNextBtn.addEventListener('click', () => {
            if (mainCurrentIndex < mainMaxIndex) {
                mainCurrentIndex++;
                updateMainDishSlider();
            }
        });
    }

    // Attach event for dots
    if (mainDotsContainer) {
        mainDotsContainer.addEventListener('click', (e) => {
            const dot = e.target.closest('.combo-dot');
            if (dot) {
                const index = Array.from(mainDotsContainer.children).indexOf(dot);
                mainCurrentIndex = index;
                updateMainDishSlider();
            }
        });
    }

    // Handle native scroll events
    let isMainScrolling;
    mainDishSlider.addEventListener('scroll', () => {
        clearTimeout(isMainScrolling);
        isMainScrolling = setTimeout(() => {
            const slideWidth = mainDishSlider.offsetWidth;
            const scrollPosition = mainDishSlider.scrollLeft;
            const newIndex = Math.round(scrollPosition / slideWidth);

            if (newIndex !== mainCurrentIndex) {
                mainCurrentIndex = newIndex;
                updateMainDishSlider();
            }
        }, 100);
    });

    // Side Dishes Slider
    const sideSlider = document.getElementById('sideSlider');
    const sideDotsContainer = document.getElementById('sideDots');
    const sidePrevBtn = document.getElementById('sidePrevBtn');
    const sideNextBtn = document.getElementById('sideNextBtn');
    let sideCurrentIndex = 0;
    const sideCount = document.querySelectorAll('#sideSlider .food-item').length;
    const sideVisibleCount = 2;
    const sideMaxIndex = Math.ceil(sideCount / sideVisibleCount) - 1;

    function updateSideSlider() {
        const slideWidth = sideSlider.offsetWidth;
        sideSlider.scrollTo({
            left: sideCurrentIndex * slideWidth,
            behavior: 'smooth'
        });

        const sideDots = document.querySelectorAll('#sideDots .combo-dot');
        sideDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === sideCurrentIndex);
        });

        sidePrevBtn.disabled = sideCurrentIndex === 0;
        sideNextBtn.disabled = sideCurrentIndex >= sideMaxIndex;
    }

    if (sidePrevBtn) {
        sidePrevBtn.addEventListener('click', () => {
            if (sideCurrentIndex > 0) {
                sideCurrentIndex--;
                updateSideSlider();
            }
        });
    }

    if (sideNextBtn) {
        sideNextBtn.addEventListener('click', () => {
            if (sideCurrentIndex < sideMaxIndex) {
                sideCurrentIndex++;
                updateSideSlider();
            }
        });
    }

    // Attach event for dots
    if (sideDotsContainer) {
        sideDotsContainer.addEventListener('click', (e) => {
            const dot = e.target.closest('.combo-dot');
            if (dot) {
                const index = Array.from(sideDotsContainer.children).indexOf(dot);
                sideCurrentIndex = index;
                updateSideSlider();
            }
        });
    }

    // Handle native scroll events
    let isSideScrolling;
    sideSlider.addEventListener('scroll', () => {
        clearTimeout(isSideScrolling);
        isSideScrolling = setTimeout(() => {
            const slideWidth = sideSlider.offsetWidth;
            const scrollPosition = sideSlider.scrollLeft;
            const newIndex = Math.round(scrollPosition / slideWidth);

            if (newIndex !== sideCurrentIndex) {
                sideCurrentIndex = newIndex;
                updateSideSlider();
            }
        }, 100);
    });

    // Drinks Slider
    const drinkSlider = document.getElementById('drinkSlider');
    const drinkDotsContainer = document.getElementById('drinkDots');
    const drinkPrevBtn = document.getElementById('drinkPrevBtn');
    const drinkNextBtn = document.getElementById('drinkNextBtn');
    let drinkCurrentIndex = 0;
    const drinkCount = document.querySelectorAll('#drinkSlider .food-item').length;
    const drinkVisibleCount = 2;
    const drinkMaxIndex = Math.ceil(drinkCount / drinkVisibleCount) - 1;

    function updateDrinkSlider() {
        const slideWidth = drinkSlider.offsetWidth;
        drinkSlider.scrollTo({
            left: drinkCurrentIndex * slideWidth,
            behavior: 'smooth'
        });

        const drinkDots = document.querySelectorAll('#drinkDots .combo-dot');
        drinkDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === drinkCurrentIndex);
        });

        drinkPrevBtn.disabled = drinkCurrentIndex === 0;
        drinkNextBtn.disabled = drinkCurrentIndex >= drinkMaxIndex;
    }

    if (drinkPrevBtn) {
        drinkPrevBtn.addEventListener('click', () => {
            if (drinkCurrentIndex > 0) {
                drinkCurrentIndex--;
                updateDrinkSlider();
            }
        });
    }

    if (drinkNextBtn) {
        drinkNextBtn.addEventListener('click', () => {
            if (drinkCurrentIndex < drinkMaxIndex) {
                drinkCurrentIndex++;
                updateDrinkSlider();
            }
        });
    }

    // Attach event for dots
    if (drinkDotsContainer) {
        drinkDotsContainer.addEventListener('click', (e) => {
            const dot = e.target.closest('.combo-dot');
            if (dot) {
                const index = Array.from(drinkDotsContainer.children).indexOf(dot);
                drinkCurrentIndex = index;
                updateDrinkSlider();
            }
        });
    }

    // Handle native scroll events
    let isDrinkScrolling;
    drinkSlider.addEventListener('scroll', () => {
        clearTimeout(isDrinkScrolling);
        isDrinkScrolling = setTimeout(() => {
            const slideWidth = drinkSlider.offsetWidth;
            const scrollPosition = drinkSlider.scrollLeft;
            const newIndex = Math.round(scrollPosition / slideWidth);

            if (newIndex !== drinkCurrentIndex) {
                drinkCurrentIndex = newIndex;
                updateDrinkSlider();
            }
        }, 100);
    });

    // Call slider update functions
    updateComboSlider();
    updateMainDishSlider();
    updateSideSlider();
    updateDrinkSlider();
}

// Cart functionality
const cart = {};
const cartCount = document.getElementById('cartCount');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const closeCartBtn = document.getElementById('closeCartBtn');
const confirmOrderBtn = document.getElementById('confirmOrderBtn');

// Use event delegation for quantity and quick-add buttons
function initializeCartEvents() {
    // Event delegation for plus/minus and quick-add buttons
    document.body.addEventListener('click', (e) => {
        const plusBtn = e.target.closest('.quantity-btn.plus');
        const minusBtn = e.target.closest('.quantity-btn.minus');
        const quickAddBtn = e.target.closest('.quick-add-btn');

        if (plusBtn) {
            e.stopPropagation();
            const itemId = plusBtn.getAttribute('data-item-id');
            const itemType = plusBtn.getAttribute('data-item-type') || 'combo'; // Handle combo
            const quantityElement = document.getElementById(`qty-${itemId}`);

            let itemElement = document.querySelector(`.food-item[data-item-id="${itemId}"]`);
            let itemName, itemPrice;

            if (itemType === 'combo') {
                itemElement = document.querySelector(`.quick-add-btn[data-combo-id="${itemId}"]`);
                itemName = itemElement.getAttribute('data-combo-name');
                itemPrice = parseInt(itemElement.getAttribute('data-combo-price'));
            } else {
                itemName = itemElement.querySelector('.food-title').textContent;
                itemPrice = parseInt(itemElement.getAttribute('data-price'));
            }

            if (!cart[itemId]) {
                cart[itemId] = {
                    name: itemName,
                    price: itemPrice,
                    quantity: 0,
                    type: itemType
                };
            }

            cart[itemId].quantity++;
            if (quantityElement) quantityElement.textContent = cart[itemId].quantity;
            updateCartCount();
            updateCartModal();
            saveCart();
        }

        if (minusBtn) {
            e.stopPropagation();
            const itemId = minusBtn.getAttribute('data-item-id');
            const quantityElement = document.getElementById(`qty-${itemId}`);

            if (cart[itemId] && cart[itemId].quantity > 0) {
                cart[itemId].quantity--;
                if (quantityElement) quantityElement.textContent = cart[itemId].quantity;

                if (cart[itemId].quantity === 0) {
                    delete cart[itemId];
                }

                updateCartCount();
                updateCartModal();
                saveCart();
            }
        }

        if (quickAddBtn) {
            e.stopPropagation();
            const comboId = quickAddBtn.getAttribute('data-combo-id');
            const comboName = quickAddBtn.getAttribute('data-combo-name');
            const comboPrice = parseInt(quickAddBtn.getAttribute('data-combo-price'));

            addComboToCart(comboId, comboName, comboPrice);
        }
    });

    // Open cart modal
    cartBtn.addEventListener('click', () => {
        updateCartModal();
        cartModal.style.display = 'flex';
    });

    // Close cart modal
    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Confirm order
    confirmOrderBtn.addEventListener('click', () => {
        Object.keys(cart).forEach(itemId => {
            const quantityElement = document.getElementById(`qty-${itemId}`);
            if (quantityElement) {
                quantityElement.textContent = '0';
            }
        });

        Object.keys(cart).forEach(key => delete cart[key]);
        updateCartCount();
        saveCart();

        cartModal.style.display = 'none';

        setTimeout(() => {
            document.getElementById('thankYouModal').style.display = 'flex';
        }, 300);
    });
}

function updateCartCount() {
    let totalItems = 0;
    Object.values(cart).forEach(item => {
        totalItems += item.quantity;
    });
    cartCount.textContent = totalItems;
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
}

function updateCartModal() {
    cartItems.innerHTML = '';
    const totalItems = Object.keys(cart).length;

    if (totalItems === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Giỏ hàng trống!</div>';
        confirmOrderBtn.disabled = true;
        return;
    }

    confirmOrderBtn.disabled = false;
    let totalPrice = 0;

    Object.entries(cart).forEach(([itemId, item]) => {
        if (item.quantity > 0) {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-quantity">
                        SL:
                        <div class="quantity-controls">
                            <div class="quantity-btn minus" data-item-id="${itemId}">-</div>
                            <div class="quantity" id="cart-qty-${itemId}">${item.quantity}</div>
                            <div class="quantity-btn plus" data-item-id="${itemId}">+</div>
                        </div>
                    </div>
                </div>
                <div class="cart-item-price">${formatPrice(itemTotal)}</div>
            `;

            cartItems.appendChild(cartItemElement);
        }
    });

    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `
        <div>Tổng cộng:</div>
        <div>${formatPrice(totalPrice)}</div>
    `;

    cartItems.appendChild(totalElement);
}

function addComboToCart(comboId, comboName, comboPrice) {
    if (!cart[comboId]) {
        cart[comboId] = {
            name: comboName,
            price: comboPrice,
            quantity: 0,
            type: "combo"
        };
    }
    cart[comboId].quantity++;
    const quantityElement = document.getElementById(`qty-${comboId}`);
    if (quantityElement) {
        quantityElement.textContent = cart[comboId].quantity;
    }
    updateCartCount();
    updateCartModal();
    saveCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('pizzaTimeCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('pizzaTimeCart');
    if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        Object.keys(parsedCart).forEach(itemId => {
            cart[itemId] = parsedCart[itemId];
            const quantityElement = document.getElementById(`qty-${itemId}`);
            if (quantityElement) {
                quantityElement.textContent = parsedCart[itemId].quantity;
            }
        });
        updateCartCount();
        updateCartModal();
    }
}

// Initialize after DOM and dynamic elements are created
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    initializeSliders();
    initializeCartEvents();

    // Close thank you modal
    document.getElementById('closeThankYouBtn').addEventListener('click', () => {
        document.getElementById('thankYouModal').style.display = 'none';
    });
});

// Additional features (progress bar, back-to-top, sticky header, animations)
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.height = '3px';
progressBar.style.backgroundColor = '#e81c23';
progressBar.style.zIndex = '1000';
progressBar.style.width = '0%';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercentage + '%';
});

const header = document.querySelector('header');
const originalHeaderOffset = header.offsetTop;

window.addEventListener('scroll', () => {
    if (window.pageYOffset > originalHeaderOffset) {
        header.style.position = 'sticky';
        header.style.top = '0';
        header.style.zIndex = '90';
    } else {
        header.style.position = 'static';
    }
});

const backToTopBtn = document.createElement('div');
backToTopBtn.innerHTML = '↑';
backToTopBtn.style.position = 'fixed';
backToTopBtn.style.bottom = '20px';
backToTopBtn.style.left = '20px';
backToTopBtn.style.width = '40px';
backToTopBtn.style.height = '40px';
backToTopBtn.style.borderRadius = '50%';
backToTopBtn.style.backgroundColor = '#333';
backToTopBtn.style.color = 'white';
backToTopBtn.style.display = 'flex';
backToTopBtn.style.alignItems = 'center';
backToTopBtn.style.justifyContent = 'center';
backToTopBtn.style.cursor = 'pointer';
backToTopBtn.style.opacity = '0';
backToTopBtn.style.transition = 'opacity 0.3s';
backToTopBtn.style.zIndex = '90';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '0.7';
    } else {
        backToTopBtn.style.opacity = '0';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        animation: fadeIn 0.5s forwards;
    }
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
    .loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

console.log('Page initialized in: ' + (performance.now() / 1000).toFixed(2) + 's');