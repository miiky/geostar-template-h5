let tools = {}

tools.isWeixn = function () {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

tools.isIOS = function () {
  let u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}
/**
 * 判断一个string是否为空
 * @param {*} value
 */
tools.isEmpty = value => {
  if (!value || value === undefined || value == 'undefined' || value == '') {
    return true
  }
  return false
}

/**
 * 开发输出log
 * @param {消息} msg
 */
tools.log = msg => {
  if (_isDev && console && console.log) {
    console.log(msg)
  }
}

/**
 *  存储数据到localstorage中
 * @param {* 键 } key
 * @param {* 值 } value
 */
tools.saveToLocal = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 从localstorage中获取存储的值
 * @param {*键 } key
 */
tools.loadFromLocal = key => {
  let localStorageName = window.localStorage.getItem(key)
  try {
    if (localStorageName) {
      return JSON.parse(localStorageName)
    } else {
      return ''
    }
  } catch (e) {
    return ''
  }
}

/**
 * 从localstorage中删除存储元素
 * @param {*} name
 */
tools.removeFromLocal = name => {
  window.localStorage.removeItem(name)
}

/**
 * 
 * @param {时间的毫秒数} time 
 */
tools.specialTime = (time) => {
  //当前时间
  let _now = new Date().getTime()
  //时间差
  let _interval = _now - time
  // （1）小于等于5分钟  显示刚刚
  // （2）大于5分钟，小于60分钟 显示X分钟前
  // （3）大于等于60分钟，小于24小时 显示X小时前
  // （4）大于等于24小时，小于48小时 显示昨天
  // （5）大于等于48小时，小于72小时 显示前天
  // （6）大于等于72小时，小于96小时 显示3天前
  // （7）大于等于96小时，小于120小时 显示4天前
  // （8）大于等于144小时，小于168小时 显示5天前
  // （9）大于等于168小时，小于192小时 显示6天前
  // （10）大于等于192小时，小于216小时 显示7天前
  // （11）大于等于216小时 显示年-月-日
  if (_interval <= 5 * 60 * 1000) {
    return '刚刚'
  } else if (_interval < 60 * 60 * 1000) {
    return Number.parseInt(_interval / 1000 / 60) + '分钟前'
  } else if (_interval < 24 * 60 * 60 * 1000) {
    return Number.parseInt(_interval / 1000 / 60 / 60) + '小时前'
  } else if (_interval < 48 * 60 * 60 * 1000) {
    return '昨天'
  } else if (_interval < 72 * 60 * 60 * 1000) {
    return '前天'
  } else if (_interval < 96 * 60 * 60 * 1000) {
    return '3天前'
  } else if (_interval < 144 * 60 * 60 * 1000) {
    return '4天前'
  } else if (_interval < 168 * 60 * 60 * 1000) {
    return '5天前'
  } else if (_interval < 192 * 60 * 60 * 1000) {
    return '6天前'
  } else if (_interval < 216 * 60 * 60 * 1000) {
    return '7天前'
  } else {
    let _month = new Date(time).getMonth() + 1
    let _day = new Date(time).getUTCDate()
    return _month + '月' + _day + '日'
  }
}

tools.getAvatarColor = (name) => {
  let colors = [
    '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
    '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
    '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
    '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
  ]
  let num = name.codePointAt(0) % 20
  return {
    backgroundColor: colors[num]
  }
}

/**
 * 一键粘贴
 * @param  {String} id [需要粘贴的内容]
 * @param  {String} attr [需要 copy 的属性，默认是 innerText，主要用途例如赋值 a 标签上的 href 链接]
 *
 * range + selection
 *
 * 1.创建一个 range
 * 2.把内容放入 range
 * 3.把 range 放入 selection
 *
 * 注意：参数 attr 不能是自定义属性
 * 注意：对于 user-select: none 的元素无效
 * 注意：当 id 为 false 且 attr 不会空，会直接复制 attr 的内容
 */
tools.copy = (text) => {
  let target = null;
  target = document.createElement('div');
  target.id = 'tempTarget';
  target.style.opacity = '0';
  target.innerText = text;
  document.body.appendChild(target);

  try {
    let range = document.createRange();
    range.selectNode(target);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    console.log('复制成功')
  } catch (e) {
    console.log('复制失败')
  }
}
/**
 * 判断颜色是否为亮色
 */
tools.isLightColor = (r, g, b) => {
  return 0.213 * r + 0.715 * g + 0.072 * b > 255 / 2
}

export default tools