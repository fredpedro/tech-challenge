const checkout = require('./cart');

test('Scenario 1: 3 x Unlimited 1GB, 1 x Unlimited 5GB', () => {
    let items = new Set();
    items.add({product_code: 'ult_small', quantity: 3});
    items.add({product_code: 'ult_large', quantity: 1});

    expect(checkout(items)).toBe('94.70');
});

test('Scenario 2: 2 x Unlimited 1 GB, 4 x Unlimited 5 GB', () => {
    let items = new Set();
    items.add({product_code: 'ult_small', quantity: 2});
    items.add({product_code: 'ult_large', quantity: 4});

    expect(checkout(items)).toBe('209.40');
});

test('Scenario 3: 1 x Unlimited 1 GB, 2 X Unlimited 2 GB', () => {
    let items = new Set();
    items.add({product_code: 'ult_small', quantity: 1});
    items.add({product_code: 'ult_medium', quantity: 2});

    expect(checkout(items)).toBe('84.70');
});

test('Scenario 4: 1 x Unlimited 1 GB, 1 x 1 GB Data-pack, "I<3AMAYSIM" Promo Applied', () => {
    let items = new Set();
    items.add({product_code: 'ult_small', quantity: 1});
    items.add({product_code: '1gb', quantity: 1});

    expect(checkout(items,['I<3AMAYSIM'])).toBe('31.32');
});