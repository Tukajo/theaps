/**
 * Interface of a generic Heap of type T.
 *
 * @See https://en.wikipedia.org/wiki/Heap_(data_structure)
 * @Author: Timothy J. Frisch
 */
export type HeapType<ElementType> = {
    peek: () => ElementType | undefined;
    pop: () => ElementType | undefined;
    push: (item: ElementType) => number;
    replace: (item: ElementType) => ElementType | undefined;
    size: () => number;
    isEmpty: () => boolean;
    clear: () => void;
    getHeap: () => ElementType[];
};
export type HeapComparator<ElementType> = (a: ElementType, b: ElementType) => number;

export class Heap<ElementType> implements HeapType<ElementType> {
    private readonly comparator: (a: ElementType, b: ElementType) => number;
    private readonly heap: ElementType[];

    constructor(items?: ElementType[], heapComparator?: HeapComparator<ElementType>) {
        this.heap = [];
        this.comparator = heapComparator || ((a: ElementType, b: ElementType) => (a < b ? -1 : a > b ? 1 : 0));
        if (items) {
            for (let i = 0; i < items.length; i++) {
                this.push(items[i]);
            }
        }
    }

    peek(): ElementType | undefined {
        return this.heap.length > 0 ? this.heap[0] : undefined;
    }

    pop = (): ElementType | undefined => {
        if (this.heap.length === 0) {
            return undefined;
        }
        const top = this.heap[0];
        const last = this.heap.pop()!;
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.siftDown(0);
        }
        return top;
    };

    push = (item: ElementType): number => {
        this.heap.push(item);
        this.siftUp(this.heap.length - 1);
        return this.heap.length;
    };

    replace(item: ElementType): ElementType | undefined {
        if (this.heap.length === 0) {
            this.push(item);
            return undefined;
        }
        const top = this.heap[0];
        this.heap[0] = item;
        this.siftDown(0);
        return top;
    }

    size(): number {
        return this.heap.length;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    clear(): void {
        this.heap.length = 0;
    }

    getHeap(): ElementType[] {
        return this.heap;
    }

    private siftUp = (pos: number): void => {
        let current = pos;
        while (current > 0) {
            const parent = Math.floor((current - 1) / 2);
            if (this.comparator(this.heap[current], this.heap[parent]) < 0) {
                this.swap(current, parent);
                current = parent;
            } else {
                break;
            }
        }
    };

    private siftDown = (pos: number): void => {
        let current = pos;
        const length = this.heap.length;
        while (current < length) {
            let smallest = current;
            const left = 2 * current + 1;
            const right = 2 * current + 2;

            if (left < length && this.comparator(this.heap[left], this.heap[smallest]) < 0) {
                smallest = left;
            }
            if (right < length && this.comparator(this.heap[right], this.heap[smallest]) < 0) {
                smallest = right;
            }

            if (smallest !== current) {
                this.swap(current, smallest);
                current = smallest;
            } else {
                break;
            }
        }
    };

    private swap(index: number, otherIndex: number): void {
        const temp = this.heap[index];
        this.heap[index] = this.heap[otherIndex];
        this.heap[otherIndex] = temp;
    }
}
