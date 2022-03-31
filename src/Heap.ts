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
    replace: (item: ElementType) => number;
    size: () => number;
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

    peek(): ElementType {
        return this.heap[0];
    }

    pop = (): ElementType | undefined => {
        if (this.heap.length === 0) {
            return undefined;
        }
        const item = this.heap[0];
        this.heap.shift();
        this.float(this.size());
        return item;
    };

    push = (item: ElementType): number => {
        this.heap.push(item);
        return this.float(this.size());
    };

    // TODO - Implement replace
    replace(_item: ElementType): number {
        return 0;
    }

    size(): number {
        return this.heap.length - 1;
    }

    getHeap(): ElementType[] {
        return this.heap;
    }

    private float = (pos: number): number => {
        const parent = Math.floor(pos - 1 / 2);
        if (parent < 0) {
            return 0;
        }
        if (this.comparator(this.heap[pos], this.heap[parent]) < 0) {
            this.swap(pos, parent);
            return this.float(parent);
        }
        return pos;
    };

    private swap(index: number, parentIndex: number): void {
        const temp = this.heap[index];
        this.heap[index] = this.heap[parentIndex];
        this.heap[parentIndex] = temp;
    }
}
