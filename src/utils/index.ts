// index

function closeToNumber(v, m) {
  // eslint-disable-next-line no-param-reassign
  v = +v;
  // eslint-disable-next-line no-param-reassign
  m = +m;
  return {
    closet: Math.abs(v - m) <= 0.001,
    le: v - m < 0,
    ge: v - m > 0,
    eq: v - m === 0,
  };
}

function formatNumber(num, precision = 2, pad = false) {
  // 1. 可能是字符串，转换为浮点数
  // 2. 乘以100 小数点向右移动两位
  // 3. Math.round 进行四舍五入
  // 4. 除以100 小数点向左移动两位 实现保留小数点后两位
  const d = 10 ** precision;
  const value = Math.round(parseFloat(num) * d) / d;
  // 去掉小数点 存为数组
  const arrayNum = value.toString().split(".");
  if (arrayNum.length > 1) {
    // 小数点右侧 如果小于两位 则补一个0
    if (arrayNum[1].length < precision) {
      return pad
        ? `${arrayNum[0]}.${Array.from({
            length: precision - arrayNum[1].length,
          })
            .fill("0")
            .join("")}`
        : value.toString();
    }
    return value.toString();
  }

  return pad
    ? `${value}.${Array.from({ length: precision }).fill("0").join("")}`
    : value.toString();
}

export { closeToNumber, formatNumber };
