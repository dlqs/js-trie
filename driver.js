
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        main()
    }
}

var main = function() {
    const searchBox = document.getElementById('searchBox')
    var trie = new Trie()
    var text = document.getElementById('content').textContent
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") // remove punctuation
        .replace(/\n/g, " ") // remove newlines
        .split(" ")
    const t0 = performance.now()
    text.forEach(function(word) {
        trie.insert(word.toLowerCase())
    })
    const t1= performance.now()
    refreshTimeIndex(t1 - t0)

    searchBox.addEventListener("keyup", function(event) {
        if (event.keyCode !== 13) { // 13 is Enter
            return
        }
        event.preventDefault();
        var searchText = searchBox.value
        const t2 = performance.now()
        const res = trie.getSubTrie(searchText)
        const t3 = performance.now()
        refreshTimeSearch(t3 - t2)
        refreshList(res)
    })
    console.log('Main completed.')
}

var refreshList = function (arr) {
    document.getElementById("myList").innerHTML = ''
    arr.forEach(function (element) {
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(element.toString());         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("myList").appendChild(node);
    })
}

var refreshTimeIndex = function(i) {
    document.getElementById('timeIndex').textContent = i.toString()
}

var refreshTimeSearch = function(i) {
    document.getElementById('timeSearch').textContent = i.toString()
}
