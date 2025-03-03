/** @format */

const fs = require("fs");
const path = require("path");

let products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "products.json"), "utf8")
);

console.log(products.length);
//console.log(products);
const findProducts = (property, value) => {
    let result;

    if (!property || !value) result = products;
    else result = products.filter(product => product[property] == value);

    return result;
};
const findOneProduct = (property, value) => {
    return products.find(product => product[property] == value);
};
const updateProducts = (
    queryProperty,
    queryValue,
    updateProperty,
    updateValue
) => {
    let query = products.filter(
        product => product[queryProperty] == queryValue
    );
    query.forEach(product => {
        product[updateProperty] = updateValue;
    });
    console.log("selected documents updated");
    return;
};
const updateOneProduct = (
    queryProperty,
    queryValue,
    updateProperty,
    updateValue
) => {
    let query = products.find(product => product[queryProperty] == queryValue);
    query[updateProperty] = updateValue;

    console.log("selected documents updated");
    return;
};

module.exports = {
    findOneProduct,
    findProducts
};
