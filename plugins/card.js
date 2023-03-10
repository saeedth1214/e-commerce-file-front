export default (context, inject) => {
  inject("formatMoney", (money) => {
    return new Intl.NumberFormat().format(money);
  });
  inject("calculateRebate", (item) => {
    if (!item.percentage) {
      return item.rebate / 1000;
    }
    return item.rebate;
  });
  inject("applyVoucher", (amount, voucher) => {
    if (voucher.percentage) {
      return (1 - voucher.rebate / 100) * amount;
    }
    return amount - voucher.rebate;
  });
};
