const withPromotions = true;

// set product variables
const inventory = new Map([
    ['ult_small', 
    {
        'product_name': 'Unlimited 1GB',
        'price': 24.90
    }
    ],
    ['ult_medium',
     {
        'product_name': 'Unlimited 2GB',
        'price': 29.90
     }   
    ],
    ['ult_large',
    {
        'product_name': 'Unlimited 5GB',
        'price': 44.90
    }
    ],
    ['1gb',
    {
        'product_name': '1 GB Data-pack',
        'price': 9.90
    }
    ]
]);

// set promotion conditions
function applyPromotions(cart, pCode, pName, price, qty){
    // 3 for 2 
    if (pCode == 'ult_small' && qty >= 3)
    {
        const bundles = Math.trunc(qty/3);
        const fullPrice = qty % 3;
        
        let amount = 0
        amount += (bundles * 2) * price;
        amount += fullPrice * price;
        cart.add({
            item: pName,
            quantity: qty,
            amount: amount
        });
    }
    else if (pCode == 'ult_medium') {
        cart.add({
            item: pName,
            quantity: qty,
            amount: qty * price
        });

        // add additional 1GB
        cart.add({
            item: '1 GB Data-pack',
            quantity: qty,
            amount: 0
        });
    }
    else if (pCode == 'ult_large' && qty >= 3)
    {
        cart.add({
            item: pName,
            quantity: qty,
            amount: qty * 39.90
        });
    }
    else {
        cart.add({
            item: pName,
            quantity: qty,
            amount: price * qty
        });
    }
    return cart;
}

function applyDiscountCodes(discountCodes, amountTotal) {
    discountCodes.forEach(discountCode => {
        if (discountCode == 'I<3AMAYSIM') {
            amountTotal -= (amountTotal * .1);
        }
    });

    return amountTotal;
}

function checkout(items, discountCodes) {
    let cart = new Set();
    let amountTotal = 0;

    // build cart
    for (let item of items) {
        const qty = item.quantity;
        const pCode = item.product_code
        const pName = inventory.get(item.product_code)['product_name']
        const price = inventory.get(item.product_code)['price']

        if (withPromotions) {
            applyPromotions(cart, pCode, pName, price, qty);
        }
        else {
            cart.add({
                item: pName,
                quantity: qty,
                amount: price * qty
            });
        }
    }

  

    console.log('Checkout items')   
    cart.forEach(item => {
        console.log(`${item.quantity} x ${item.item}`);  
        amountTotal += item.amount;
    });

    if (discountCodes) {
        amountTotal = applyDiscountCodes(discountCodes, amountTotal);
    }

    console.log(`Total ${amountTotal.toFixed(2)}`);
    
    return amountTotal.toFixed(2);
}
module.exports = checkout;
