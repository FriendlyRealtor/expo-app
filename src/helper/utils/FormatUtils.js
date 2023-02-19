export const money = price => {
  price += '';
  var prices = price.split(',');
  price = prices.join('');
  var conv = parseFloat(price);
  if (isNaN(conv)) return '';
  var data = conv
    .toFixed(2)
    .toString()
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    .replace('.00', '');
  return data;
};

export const cardNo = (cardNo, mode = 0) => {
  if (mode == 0) {
    // var data = cardNo.replace(/^(\d{4}){3}/g, "**** **** **** **** ");
    var data = cardNo.split(' ');
    var card = '';
    for (var i = 0; i < data.length - 1; i++) {
      card += '**** ';
    }
    card += data[data.length - 1];
    return card;
  } else {
    var data = cardNo.replace(/\d{4}(?=(\d+))/g, '$& ');
    return data;
  }
};
