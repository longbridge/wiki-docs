export const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    document.body.appendChild(script)
    script.onload = resolve
    script.onerror = reject
  })
}

let highlightIsLoaded = false
export const loadHighlight = async () => {
  if (!highlightIsLoaded) {
    await loadScript('https://assets.lbkrs.com/uploads/c6e6f6e9-78ab-42f1-942d-111bdb58d758/index.umd.js')
  }
  highlightIsLoaded = true
  const xHighlights = document.querySelectorAll('.doc-highlight')
  xHighlights.forEach((xHighlight) => {
    document.body.removeChild(xHighlight)
  })

  setTimeout(() => {
    const newHighlightDom = document.createElement('x-highlight')
    newHighlightDom.setAttribute('container', '.wiki-article-content')
    newHighlightDom.className = 'doc-highlight'

    document.body.appendChild(newHighlightDom)
  }, 0)
}
