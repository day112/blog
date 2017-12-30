var processor = {
  timeoutId: null,
  perfomProcessing: function () {

  },
  process: function () {
    clearTimeout(this)

    var that = this
    this.timeoutId = setTimeout(function () {
      that.perfomProcessing()
    }, 100)
  }
}

function throttle (method, context) {
  clearTimeout(method.tid)
  method.tid = setTimeout(function () {
    method.call(context)
  }, 100)
}
