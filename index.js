// let cartCount = 0;
// let products = [];

// function addToCart() {
//     cartCount++;
//     document.getElementById('cart-count').innerText = cartCount;
// }

// async function fetchProducts() {
//     const response = await fetch('https://fakestoreapi.com/products');
//     products = await response.json();
//     displayProducts(products);
// }

// function displayProducts(products) {
//     const productGrid = document.getElementById('product-grid');
//     productGrid.innerHTML = '';

//     products.forEach(product => {
//         const productCard = document.createElement('div');
//         productCard.className = 'product-card';
//         productCard.innerHTML = `
//             <img src="${product.image}" alt="${product.title}">
//             <h3>${product.title.substring(0, 12)}...</h3>
//             <p>${product.description.substring(0, 100)}...</p><hr>
//             <p>$${product.price}</p><hr>
//             <button onclick="addToCart()">Add to Cart</button>
//             <button onclick="viewDetails(${product.id})">Details</button>
//         `;
//         productGrid.appendChild(productCard);
//     });
// }

// function filterProducts(category) {
//     if (category === 'all') {
//         displayProducts(products);
//     } else {
//         const filteredProducts = products.filter(product => product.category === category);
//         displayProducts(filteredProducts);
//     }
// }

// function viewDetails(productId) {
//     alert('Product ID: ' + productId);
// }

// document.addEventListener('DOMContentLoaded', fetchProducts);

// //login//
// // Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {

    // Handle the login form submission
    const loginButton = document.querySelector('#login button');
    const emailInput = document.querySelector('#login input[type="email"]');
    const passwordInput = document.querySelector('#login input[type="text"]');

    loginButton.addEventListener('click', function() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic form validation
        if (email === '' || password === '') {
            alert('Please enter both your email and password.');
        } else {
            // Simulate login process
            alert(`Logging in with email: ${email}`);
            // Here you could add your actual login logic (e.g., sending data to a server)
        }
    });

    // Handle the register link click
    const registerLink = document.querySelector('#login p span');
    registerLink.addEventListener('click', function() {
        window.location.href = './register.html';
    });

    // Simulate cart functionality
    let cartCount = localStorage.getItem('cartCount') || 0;
    document.getElementById('cart-count').innerText = cartCount;

    // Example of adding an item to the cart (this is a placeholder logic)
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            localStorage.setItem('cartCount', cartCount);
            document.getElementById('cart-count').innerText = cartCount;
        });
    });
});
//regitor//
// Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {

    // Get form elements
    const registerButton = document.getElementById('register-btn');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const loginLink = document.getElementById('login-link');

    // Form validation function
    function validateForm() {
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Basic validation for empty fields
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            alert('All fields are required.');
            return false;
        }

        // Validate email format
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return false;
        }

        return true;
    }

    // Email format validation
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Handle registration button click
    registerButton.addEventListener('click', function() {
        if (validateForm()) {
            // Simulate registration process
            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();

            alert(`Registered with username: ${username} and email: ${email}`);
            // Here you can send the data to the server for actual registration (e.g., using fetch or AJAX)
        }
    });

    // Handle login link click
    loginLink.addEventListener('click', function() {
        window.location.href = './login.html'; // Redirect to login page
    });

});

// // //add to cart//


// // 
let products = [];
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];  // Initialize cart from localStorage or an empty array

// Fetch products from API
function cartApi() {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);  // Display the fetched products
        });
}

// Display products on the page
function displayProducts(products) {
    let productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';  // Clear the container

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title.substring(0, 11)}...</h3>
            <p>${product.description.substring(0, 100)}...</p><hr>
            <p>Price: $${product.price}</p><hr>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="Details(${product.id})">Details</button>
        `;
        productContainer.appendChild(productCard);
    });
}

// Add product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);  // Find the product by its ID
    const existingProduct = cart.find(p => p.id === productId);  // Check if the product is already in the cart

    if (existingProduct) {
        // If the product already exists in the cart, just increase the quantity
        existingProduct.quantity += 1;
    } else {
        // If the product is not in the cart, add it with quantity 1 and increment the cart count
        cart.push({ ...product, quantity: 1 });
        updateCartCount();  // Increment cart count only when a new product is added
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

// Update the cart count in the header
function updateCartCount() {
    const cartButton = document.querySelector("#buttons a[href='./cart.html'] button");
    const cartCount = cart.length;  // Calculate the count based on the number of unique items in the cart
    cartButton.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart(${cartCount})`;
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        displayProducts(products);  // Show all products if 'all' is selected
    } else {
        const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
        displayProducts(filteredProducts);  // Display only the filtered products
    }
}

// Event listener for DOMContentLoaded to fetch products when the page loads
document.addEventListener("DOMContentLoaded", () => {
    cartApi();  // Fetch products from API
    updateCartCount();  // Update the cart count based on localStorage
});