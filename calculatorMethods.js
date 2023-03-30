class calculatorMethods {
  constructor(nums) {
    this.nums = nums
  }

  mean() {
    return nums.reduce((a, b) => a + b) / nums.length
  }

  median() {
    nums = nums.sort((a, b) => a - b)
    const mid = Math.floor(nums.length / 2)
    return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
  }

  mode() {
    let modeMap = {}
    let maxItem = nums[0], count = 1;
    for (let i = 0; i < nums.length; i++) {
      let item = nums[i]
      if (!modeMap[item]) {
        modeMap[item] = 1
      } else {
        modeMap[item]++
      }
      if (modeMap[item] > count) {
        maxItem = item
        count = modeMap[item]
      }
    }
    return maxItem
  }

}


module.exports = calculatorMethods
