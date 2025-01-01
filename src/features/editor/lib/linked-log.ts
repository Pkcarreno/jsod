import DeepEqual from 'deep-equal';

import type { Log } from '../types';
import { addLogDecorators } from '../utils/log-decorator';

class LogNode {
  public next: LogNode | null = null;
  public value: Log;

  constructor(data: Log) {
    this.value = data;
  }
}

interface BaseLinkedLog {
  append(data: Log): void;
  clearFirst(): void;
  getAllLogsInArray(): Log[];
}

class LinkedLogs implements BaseLinkedLog {
  private head: LogNode | null = null;

  append(data: Log) {
    const decoratedData = addLogDecorators(data);
    const node = new LogNode(decoratedData);

    if (!this.head) {
      this.head = node;
    } else {
      const getLast = (node: LogNode): LogNode => {
        return node.next ? getLast(node.next) : node;
      };

      const lastNode = getLast(this.head);

      if (
        lastNode.value.type === decoratedData.type &&
        DeepEqual(lastNode.value.value, decoratedData.value)
      ) {
        lastNode.value.repeats += 1;
        lastNode.value.duration = decoratedData.duration;
      } else {
        lastNode.next = node;
      }
    }
  }

  clearFirst(): void {
    this.head = null;
  }

  getAllLogsInArray(): Log[] {
    const array: Log[] = [];
    let currentNode: LogNode | null = this.head;

    while (currentNode) {
      array.push(currentNode?.value);
      currentNode = currentNode.next;
    }

    return array;
  }
}

export default LinkedLogs;
