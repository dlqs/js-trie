var TrieNode = (function () {
    function TrieNode(char) {
        this.char = char;
        this.children = {};
        this.freq = 0;
    }
    TrieNode.prototype.addChild = function (newNode) {
        this.children[newNode.char] = newNode;
    };
    TrieNode.prototype.getChildChar = function (char) {
        return this.children[char];
    };
    TrieNode.prototype.hasChildChar = function (char) {
        return char in this.children;
    };
    return TrieNode;
}());
var Trie = (function () {
    function Trie() {
        this.root = null;
    }
    Trie.prototype.insert = function (str) {
        if (str.length === 0) {
            return;
        }
        if (this.root === null) {
            this.root = new TrieNode('');
        }
        this._insert(str, this.root);
    };
    Trie.prototype._insert = function (str, node) {
        if (str.length === 0) {
            node.freq++;
            return;
        }
        var charToAdd = str.charAt(0);
        if (!node.hasChildChar(charToAdd)) {
            var newNode = new TrieNode(charToAdd);
            node.addChild(newNode);
        }
        this._insert(str.slice(1), node.getChildChar(charToAdd));
    };
    Trie.prototype.contains = function (str) {
        if (str.length === 0)
            return false;
        return this._contains(str, this.root);
    };
    Trie.prototype._contains = function (str, node) {
        if (str.length === 0) {
            return node.freq > 0;
        }
        var charToCheck = str.charAt(0);
        if (!node.hasChildChar(charToCheck)) {
            return false;
        }
        return this._contains(str.slice(1), node.getChildChar(charToCheck));
    };
    Trie.prototype.getSubTrie = function (str) {
        if (str.length === 0)
            return [];
        return this._getSubtrie(str, str, this.root, []);
    };
    Trie.prototype._getSubtrie = function (prefix, str, node, arr) {
        if (str.length === 0) {
            if (node.freq > 0) {
                arr.push(prefix);
            }
            var children = node.children;
            for (var _i = 0, _a = Object.keys(children); _i < _a.length; _i++) {
                var key = _a[_i];
                this._getSubtrie(prefix + key, str.slice(1), children[key], arr);
            }
        }
        var charToCheck = str.charAt(0);
        if (!node.hasChildChar(charToCheck)) {
            return arr;
        }
        return this._getSubtrie(prefix, str.slice(1), node.getChildChar(charToCheck), arr);
    };
    return Trie;
}());
//# sourceMappingURL=trieMap.js.map