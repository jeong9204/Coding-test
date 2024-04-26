class Node {
  constructor(value = "", end = false) {
    this.value = value;
    this.end = end;
    this.child = new Map();
    this.includesWords = [];
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }
  insert(string) {
    let cur_node = this.root;

    for (const char of string) {
      if (!cur_node.child.has(char)) {
        cur_node.child.set(char, new Node(cur_node.value + char));
      }
      cur_node = cur_node.child.get(char);
      cur_node.includesWords.push(string);
    }
    cur_node.end = true;
  }
  min_len(string) {
      let cur_node = this.root;
      let len = 0
      for(const char of string) {
          cur_node = cur_node.child.get(char)
          len++
          if(cur_node.includesWords.length === 1) return len
      }
      return len
  }
}

function solution(words) { 
    const trie = new Trie()
    words.forEach(item => trie.insert(item))
    return words.map(item => trie.min_len(item)).reduce((a, b) => a + b)
}