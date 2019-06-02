import { Trie } from './trieMap'

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        main()
    }
}

const TEXTFILE = 'shakespeare.txt'

const main = async () => {
    await loadContent()
    const searchBox = <HTMLInputElement>document.getElementById('searchBox')
    const trie = new Trie()

    const text = document.getElementById('content').textContent
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()—"”'’?]/g,'') // remove punctuation
        .replace(/\n/g, ' ') // remove newlines
        .split(' ')

    const t0 = performance.now()
    text.forEach((word) => {
        trie.insert(word.toLowerCase())
    })
    const t1= performance.now()
    refreshTimeIndex(t1 - t0)

    searchBox.addEventListener("keyup", (event) => {
        if (event.keyCode !== 13) { // 13 is Enter
            return
        }
        event.preventDefault();
        const searchText = searchBox.value
        const t2 = performance.now()
        const res = trie.getSubTrie(searchText)
        const t3 = performance.now()
        refreshTimeSearch(t3 - t2)
        refreshList(res)
    })
    console.log('Main completed.')
}

const refreshList = (arr: string[]) => {
    document.getElementById("myList").innerHTML = ''
    arr.forEach((element) => {
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(element.toString());         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("myList").appendChild(node);
    })
}

const refreshTimeIndex = (i: number) => {
    document.getElementById('timeIndex').textContent = i.toString()
}

const refreshTimeSearch = (i: number) =>  {
    document.getElementById('timeSearch').textContent = i.toString()
}

const loadContent = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', TEXTFILE, true)
        xhr.onload = function () {
            if (this.status === 200) {
                document.getElementById('content').textContent  = xhr.responseText
                resolve()
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                })
            }
        }
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText
            })
        }
        xhr.send(null)
    })
}