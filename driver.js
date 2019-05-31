
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        main()
    }
}

var main = function() {
    const searchBox = document.getElementById('searchBox')
    var trie = new Trie()
    var text = document.getElementById('content').textContent.split(' ')
    console.time('trieloadstart')
    text.forEach(function(word) {
        trie.insert(word)
    })
    console.timeEnd('trieloadstart')

    searchBox.addEventListener("keyup", function(event) {
        if (event.keyCode !== 13) { // 13 is Enter
            return
        }
        event.preventDefault();
        var searchText = searchBox.value
        console.time('triecontainsstart')
        const res = trie.contains(searchText)
        console.timeEnd('triecontainsstart')
        console.log(res)
    })
    console.log('Main completed.')
}
