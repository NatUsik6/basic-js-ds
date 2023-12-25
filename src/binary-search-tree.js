const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = addWithin(this._root, data)

    function addWithin(node, data) {
      if (node === null) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (node.data > data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    let node = hasWithin(this._root, data);

    return node !== null;

    function hasWithin(node, data) {
      if (node === null) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (node.data > data) {
        return hasWithin(node.left, data);
      } else {
        return hasWithin(node.right, data);
      }
    }
  }

  find(data) {
    return findWithin(this._root, data);

    function findWithin(node, data) {
      if (node === null) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (node.data > data) {
        return findWithin(node.left, data);
      }
      
      return findWithin(node.right, data);
    }
  }

  remove(data) {
    this._root = removeNode(this._root, data);

    function removeNode(node, data) {
      if (node === null) {
        return null;
      }

      if (node.data > data) {
        node.left = removeNode(node.left, data);
        return node;
      }

      if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      }

      if (node.left === null
        && node.right === null) {
        return null;
      }

      if (node.left === null) {
        node = node.right;
        return node;
      }

      if (node.right === null) {
        node = node.left;
        return node;
      }

      let minFromRight = node.right;

      while (minFromRight.left !== null) {
        minFromRight = minFromRight.left;
      }

      node.data = minFromRight.data;
      node.right = removeNode(node.right, minFromRight.data);

      return node;
    }
  }

  min() {
    if (this._root === null) {
      return null;
    }

    let node = this._root;

    while (node.left !== null) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (this._root === null) {
      return null;
    }

    let node = this._root;

    while (node.right !== null) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};