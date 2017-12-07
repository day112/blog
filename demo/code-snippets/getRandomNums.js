
/**
 * 获取不重复的随机数组
 * 
 * @param {Number} len 数组长度
 * @param {Number} maxLen 最大随机数
 * 
 * @returns {Array} 随机数组
 */
function getRandomNums(len, maxLen){
  var randomNums = [] 
  var random = 0
  for (var index = 0; index < maxLen; index++) {
    random = Math.floor(Math.random()*maxLen)+1
    if(randomNums.indexOf(random) === -1){
      randomNums.push(random)
    }
    if(randomNums.length === len){
      return randomNums
    }
  }
}