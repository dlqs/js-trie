class TrieNode {
    constructor(char) {
        this.char = char
        this.children = {}
        this.freq = 0
    }
    addChild(newNode) {
        this.children[newNode.char] = newNode
    }
    getChildChar(char) {
        return this.children[char]
    }
    hasChildChar(char) {
        return char in this.children
    }
}
class Trie {
    constructor() {
        this.root = null
    }
    // Inserts a string into the trie
    insert(str) {
        if (str.length === 0) {
            return
        }
        if (this.root === null) {
            this.root = new TrieNode('')
        }
        this._insert(str, this.root)
    }

    _insert(str, node) {
        if (str.length === 0) {
            // finished parsing all characters
            node.freq++
            return
        }
        const charToAdd = str.charAt(0)
        if (!node.hasChildChar(charToAdd)) {
            // create the child
            const newNode = new TrieNode(charToAdd)
            node.addChild(newNode)
        }
        this._insert(str.slice(1), node.getChildChar(charToAdd))
    }

    contains(str) {
        if (str.length === 0) return false
        return this._contains(str, this.root)
    }

    _contains(str, node) {
        if (str.length === 0) { // non-empty string
            return node.freq > 0
        }
        const charToCheck = str.charAt(0)
        if (!node.hasChildChar(charToCheck)) {
            return false
        }
        return this._contains(str.slice(1), node.getChildChar(charToCheck))
    }
}

