/**
 * @param {string} url
 * @param {RequestInit & { timeout?: number }} [init]
 */
export async function fetchJson(url, init = {}) {
  const { timeout = 5000, signal: outerSignal, ...rest } = init
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const signal = outerSignal
      ? AbortSignal.any([outerSignal, controller.signal])
      : controller.signal
    const res = await fetch(url, { ...rest, signal })
    if (!res.ok)
      throw new Error(`HTTP ${res.status}`)
    return await res.json()
  }
  finally {
    clearTimeout(timer)
  }
}

/**
 * JSONP（第三方如百度 sugrec 仅提供 JSONP，浏览器无法用 fetch 读跨域脚本回调体）
 * @param {string} url 已含查询串的完整 URL，将追加 &callback=全局函数名
 * @param {{ timeout?: number }} [options]
 */
export function jsonp(url, { timeout = 5000 } = {}) {
  if (!url) {
    console.error('jsonp 至少需要一个 url 参数')
    return Promise.reject(new TypeError('missing url'))
  }
  return new Promise((resolve, reject) => {
    const cbName = `__jsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`
    const script = document.createElement('script')
    script.type = 'text/javascript'

    const timer = setTimeout(() => {
      cleanup()
      reject(new Error('JSONP timeout'))
    }, timeout)

    function cleanup() {
      clearTimeout(timer)
      delete window[cbName]
      script.remove()
    }

    window[cbName] = (result) => {
      cleanup()
      resolve(result)
    }

    const sep = url.includes('?') ? '&' : '?'
    script.src = `${url}${sep}callback=${encodeURIComponent(cbName)}`
    script.onerror = () => {
      cleanup()
      reject(new Error('JSONP script error'))
    }
    document.head.appendChild(script)
  })
}

export async function getSearchPrompt(wd) {
  try {
    const data = await jsonp(
      `https://www.baidu.com/sugrec?p=3&json=1&prod=pc&wd=${encodeURIComponent(wd)}`,
    )
    return data.g?.map(e => e.q)
  }
  catch (error) {
    console.warn(error)
    return error
  }
}
