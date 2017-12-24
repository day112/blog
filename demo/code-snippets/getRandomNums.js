
/**
 * 获取不重复的随机数组
 * @param {Number} len 数组长度
 * @param {Number} maxLen 最大随机数
 * @returns {Array} 随机数组
 */
function getRandomNums (len, maxLen) {
  const randomNums = []
  let random = 0
  for (let index = 0; index < maxLen; index++) {
    random = Math.floor(Math.random() * maxLen) + 1
    if (randomNums.indexOf(random) === -1) {
      randomNums.push(random)
    }
    if (randomNums.length === len) {
      return randomNums
    }
  }
  return []
}

// eslint-disable-next-line
module.exports = getRandomNums
