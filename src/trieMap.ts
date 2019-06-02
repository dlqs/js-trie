class TrieNode {
    char: string
    children: { [index: string]: TrieNode }
    freq: number
    constructor(char: string) {
        this.char = char
        this.children = {}
        this.freq = 0
    }
    addChild(newNode: TrieNode) {
        this.children[newNode.char] = newNode
    }
    getChildChar(char: string) {
        return this.children[char]
    }
    hasChildChar(char: string) {
        return char in this.children
    }
}
class Trie {
    root: TrieNode
    constructor() {
        this.root = null
    }
    // Inserts str into the trie
    insert(str: string) {
        if (str.length === 0) {
            return
        }
        if (this.root === null) {
            this.root = new TrieNode('')
        }
        this._insert(str, this.root)
    }

    _insert(str: string, node: TrieNode) {
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

    // Return a boolean if the str exists as terminal word
    contains(str: string) {
        if (str.length === 0) return false
        return this._contains(str, this.root)
    }

    _contains(str: string, node: TrieNode) : boolean {
        if (str.length === 0) { // non-empty string
            return node.freq > 0
        }
        const charToCheck = str.charAt(0)
        if (!node.hasChildChar(charToCheck)) {
            return false
        }
        return this._contains(str.slice(1), node.getChildChar(charToCheck))
    }

    // Return sub-tree whose root(s) is str
    getSubTrie(str: string) : string[] {
        if (str.length === 0) return []
        return this._getSubtrie(str, str, this.root, [])
    }

    _getSubtrie(prefix: string, str: string, node: TrieNode, arr: string[]) : string[] {
        if (str.length === 0) {
            // matched, DFS to return all terminals in this sub trie
            if (node.freq > 0) {
                arr.push(prefix)
            }
            const children = node.children
            for (let key of Object.keys(children)) {
                this._getSubtrie(prefix + key, str.slice(1), children[key], arr)
            }
        }
        const charToCheck = str.charAt(0)
        if (!node.hasChildChar(charToCheck)) {
            return arr
        }
        return this._getSubtrie(prefix, str.slice(1), node.getChildChar(charToCheck), arr)
    }
}

//const trie = new Trie()
//trie.insert('bash')
//trie.insert('babe')
//trie.insert('baby')
//trie.insert('baa')
//trie.insert('bb')
//
//console.log(trie.getSubTrie('bab'))
//console.log(trie.getSubTrie('b'))
