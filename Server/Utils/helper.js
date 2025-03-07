/** @format */

const getDeliveryFees = totalCost => {
    let deliveryFee = 0;
    switch (true) {
        case totalCost < 700:
            deliveryFee = 200;
            break;
        case totalCost < 2000:
            deliveryFee = 500;
            break;
        case totalCost < 10000:
            deliveryFee = 700;
            break;
        case totalCost < 50000:
            deliveryFee = 1500;
            break;

        default:
            deliveryFee = 0;
    }
    return deliveryFee;
};

console.log(getDeliveryFees(2500));

module.exports = {
    getDeliveryFees
};
