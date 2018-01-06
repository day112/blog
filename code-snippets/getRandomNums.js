/*
 * @Author: hua03 
 * @Date: 2018-01-04 09:38:19 
 * @Last Modified by:   hua03 
 * @Last Modified time: 2018-01-04 09:38:19 
 */

function getRandomNums(len, maxLen) {
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
