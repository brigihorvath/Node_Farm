module.exports = function (el, template) {
  let output = template
    .replace(/{%PRODUCTNAME%}/g, el.productName)
    .replace(/{%IMAGE%}/g, el.image)
    .replace(/{%FROM%}/g, el.from)
    .replace(/{%QUANTITY%}/g, el.quantity)
    .replace(/{%PRICE%}/g, el.price)
    .replace(/{%DESCRIPTION%}/g, el.description)
    .replace(/{%NUTRIENTS%}/g, el.nutrients)
    .replace(/{%ID%}/g, el.id);

  if (!el.organic) output = output.replace(/{%NOT-ORGANIC%}/g, 'not-organic');
  return output;
};
