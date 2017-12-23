export function chunk(arr, n) {
    return arr.slice(0, (arr.length + n - 1)/n | 0)
        .map((c, i) => arr.slice(n * i, n * i + n));
}

export function dangerouslySetInnerHTML(html) {
    return element => {
      element.innerHTML = html
    }
}