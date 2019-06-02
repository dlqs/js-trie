var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        main();
    }
};
var TEXTFILE = 'shakespeare.txt';
var loadContent = function () {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', TEXTFILE, true);
        xhr.onload = function () {
            if (this.status === 200) {
                document.getElementById('content').textContent = xhr.responseText;
                resolve();
            }
            else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(null);
    });
};
var main = function () { return __awaiter(_this, void 0, void 0, function () {
    var searchBox, trie, text, t0, t1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, loadContent()];
            case 1:
                _a.sent();
                searchBox = document.getElementById('searchBox');
                trie = new Trie();
                text = document.getElementById('content').textContent
                    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()—"”'’?]/g, '')
                    .replace(/\n/g, ' ')
                    .split(' ');
                t0 = performance.now();
                text.forEach(function (word) {
                    trie.insert(word.toLowerCase());
                });
                t1 = performance.now();
                refreshTimeIndex(t1 - t0);
                searchBox.addEventListener("keyup", function (event) {
                    if (event.keyCode !== 13) {
                        return;
                    }
                    event.preventDefault();
                    var searchText = searchBox.value;
                    var t2 = performance.now();
                    var res = trie.getSubTrie(searchText);
                    var t3 = performance.now();
                    refreshTimeSearch(t3 - t2);
                    refreshList(res);
                });
                console.log('Main completed.');
                return [2];
        }
    });
}); };
var refreshList = function (arr) {
    document.getElementById("myList").innerHTML = '';
    arr.forEach(function (element) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(element.toString());
        node.appendChild(textnode);
        document.getElementById("myList").appendChild(node);
    });
};
var refreshTimeIndex = function (i) {
    document.getElementById('timeIndex').textContent = i.toString();
};
var refreshTimeSearch = function (i) {
    document.getElementById('timeSearch').textContent = i.toString();
};
//# sourceMappingURL=driver.js.map