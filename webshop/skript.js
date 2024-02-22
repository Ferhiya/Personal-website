const products = [
    { id: 1, name: 'Hoodie', price: 39.99 },
    { id: 2, name: 'Long Sleeve Shirt', price: 29.99 },
    { id: 3, name: 'Joggers', price: 34.99 },
    // Add more products as needed
];

const renderProducts = () => {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productDiv);
    });
};

const addToCart = (productId) => {
    // Implement adding the product to the cart
    console.log(`Product with ID ${productId} added to cart`);
};

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
