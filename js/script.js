document.addEventListener('DOMContentLoaded', function() {
    const allProducts = document.querySelectorAll(".product-card");
    const content = document.querySelector("#content");
    const btn = document.querySelector("#addToCart");
    const totalDisplay = document.querySelector("#total");
    let totalPrice = 0;
    let selectedItems = [];

    allProducts.forEach(function(item) {
        const selectBtn = item.querySelector('.select-btn');
        
        selectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const price = parseInt(item.getAttribute("price"));
            const title = item.querySelector('.card-title').textContent;
            const formattedPrice = (price / 10000).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });

            // Add to selection if not already selected
            if (!selectedItems.includes(title)) {
                totalPrice += price;
                selectedItems.push(title);
                
                // Create selected item element
                const itemElement = document.createElement('div');
                itemElement.className = 'selected-item d-flex justify-content-between align-items-center mb-2 p-2 bg-white rounded';
                itemElement.innerHTML = `
                    <span>${title}</span>
                    <span class="text-primary fw-bold">${formattedPrice}</span>
                `;
                content.appendChild(itemElement);
                
                // Update total display
                updateTotalDisplay();
                
                // Show checkout button if items are selected
                if (selectedItems.length > 0) {
                    btn.style.display = "inline-block";
                }
                
                // Visual feedback
                item.style.boxShadow = '0 0 0 3px rgba(13, 110, 253, 0.5)';
                setTimeout(() => {
                    item.style.boxShadow = '';
                }, 500);
            }
        });
    });

    btn.addEventListener('click', function() {
        // Create a sweet alert or modal for checkout
        const formattedTotal = (totalPrice / 10000).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        
        totalDisplay.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <span>Total:</span>
                <span class="fs-3">${formattedTotal}</span>
            </div>
            <div class="mt-2 text-muted">${selectedItems.length} items selected</div>
        `;
        
        // Scroll to total display
        totalDisplay.scrollIntoView({ behavior: 'smooth' });
    });

    function updateTotalDisplay() {
        const formattedTotal = (totalPrice / 10000).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        totalDisplay.textContent = `Current Total: ${formattedTotal}`;
    }
});
