/**
 * 数组内是否包含元素
 * @author 黄金超
 * @param  {[type]}  arr [description]
 * @param  {[type]}  val [description]
 * @return {Boolean}     [description]
 */
function isInArray (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return true
    }
  }
}

/**
 * 字典里的空值转成空字符串
 * @author 黄金超
 * @param  {[JsonObject]} json [description]
 * @return {[JsonObject]}      [description]
 */
function safeJson (json) {
  let dic = json
  for (var key in json) {
    if (json[key] === null || json[key] === undefined) {
      dic[key] = ''
    }
  }
  return dic
}

/**
 * 字典赋值时间，如果字段不存在或null就不对这个字段进行赋值
 * @author 黄金超
 * @param  {[type]} oldDic [description]
 * @param  {[type]} newDic [description]
 * @return {[type]}        [description]
 */
function safeKeyValueAssign (oldDic, newDic) {
  let dic = oldDic
  for (var key in newDic) {
    if (newDic[key] !== null && newDic[key] !== undefined) {
      dic[key] = newDic[key]
    }
  }
  return dic
}

const common = {
  isInArray: isInArray,
  safeJson: safeJson,
  safeKeyValueAssign
}

export default common
