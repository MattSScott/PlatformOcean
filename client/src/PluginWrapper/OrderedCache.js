class ListNode {
  constructor(data = null) {
    self.data = data;
    self.next = null;
    self.prev = null;
  }
}

class OrderedCache {
  constructor() {
    self.messageMapper = {};
    self.head = ListNode();
    self.tail = self.head;
    self.firstEntry = true;
  }

  getMostRecent() {
    if (self.head) {
      return self.head.data;
    }
    return null;
  }

  insertData(data) {
    node = ListNode(data);
    self.messageMapper[data.messageID] = node;
    node.prev = self.tail;
    self.tail.next = node;
    self.tail = self.tail.next;
    if (self.firstEntry) {
      self.head = self.head.next;
      self.firstEntry = false;
    }
  }

  deleteData(messageID) {
    node = self.messageMapper[messageID];
    lNode = node.prev;
    rNode = node.next;
    lNode.next = rNode;
    rNode.prev = lNode;
    delete self.messageMapper[messageID];
  }
}
