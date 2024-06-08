import DeepEqual from 'deep-equal';

import type { log } from '../types';

class LogNode {
  public next: LogNode | null = null;
  public value: log;

  constructor(data: log) {
    this.value = data;
  }
}

interface ILinkedLogs {
  append(data: log): void;
  clearFirst(): void;
  getAllLogsInArray(): log[];
}

class LinkedLogs implements ILinkedLogs {
  private head: LogNode | null = null;

  append(data: log) {
    const node = new LogNode(data);

    if (!this.head) {
      this.head = node;
    } else {
      const getLast = (node: LogNode): LogNode => {
        return node.next ? getLast(node.next) : node;
      };

      const lastNode = getLast(this.head);

      if (
        lastNode.value.type === data.type &&
        DeepEqual(lastNode.value.value, data.value)
      ) {
        lastNode.value.repeats += 1;
        lastNode.value.duration = data.duration;
      } else {
        lastNode.next = node;
      }
    }
  }

  clearFirst(): void {
    this.head = null;
  }

  getAllLogsInArray(): log[] {
    const array: log[] = [];
    let currentNode: LogNode | null = this.head;

    while (currentNode) {
      array.push(currentNode?.value);
      currentNode = currentNode.next;
    }

    return array;
  }
}

export default LinkedLogs;
