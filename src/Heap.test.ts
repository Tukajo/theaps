import { Heap, HeapComparator } from './Heap';

test('Test basic heap, largest priority', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const comparator: HeapComparator<number> = (a: number, b: number) => b - a;
    const heap = new Heap<number>(original, comparator);
    expect(heap.size()).toBe(original.length - 1);
    expect(heap.push(5)).toBe(5);
    expect(heap.size()).toBe(original.length);
    expect(heap.push(6)).toBe(7);
    expect(heap.size()).toBe(original.length + 1);
    let curr = heap.pop();
    let next = heap.pop();
    let prev = 11;
    while (next !== undefined) {
        expect(curr).toBeLessThanOrEqual(prev);
        expect(curr).toBeGreaterThanOrEqual(next);
        prev = curr || 0;
        curr = next;
        next = heap.pop();
    }
});

test('Min heap returns the correct elements in order', () => {
    const original = [5, 4, 6, 6, 7, 8, 9, 1, 2, 3];
    const comparator: HeapComparator<number> = (a: number, b: number) => a - b;
    const heap = new Heap<number>(original, comparator);
    let curr = heap.pop();
    let next = heap.pop();
    let prev = 0;
    while (next !== undefined) {
        expect(curr).toBeGreaterThanOrEqual(prev);
        expect(curr).toBeLessThanOrEqual(next);
        prev = curr || 0;
        curr = next;
        next = heap.pop();
    }
});

test('Test max heap', () => {
    const original = [2, 3, 1, 6, 8, 1, 9, 4, 5, 7];
    const comparator: HeapComparator<number> = (a: number, b: number) => b - a;
    const heap = new Heap<number>(original, comparator);
    expect(heap.peek()).toBe(9);
    const indexInserted = heap.push(12);
    const underlyingHeap = heap.getHeap();
    expect(indexInserted).toBe(heap.size());
    expect(underlyingHeap[indexInserted]).toBe(12);
});

test('Test min heap', () => {
    const original = [2, 3, 1, 6, 8, 1, 9, 4, 5, 7];
    const comparator: HeapComparator<number> = (a: number, b: number) => a - b;
    const heap = new Heap<number>(original, comparator);
    expect(heap.peek()).toBe(1);
    const insertedAt = heap.push(0);
    expect(heap.peek()).toBe(0);
    expect(insertedAt).toBe(heap.size());
});

test('Test finds largest two values.', () => {
    const unsortedArray = Array(500)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100));
    const sortedArray = [...unsortedArray].sort((a, b) => b - a);
    const largestTwo = sortedArray.slice(0, 2);

    const comparator: HeapComparator<number> = (a: number, b: number) => b - a;
    const heap = new Heap<number>(unsortedArray, comparator);
    expect(heap.pop()).toBe(largestTwo[0]);
    expect(heap.pop()).toBe(largestTwo[1]);
});

test('Empty heap returns undefined on pop and peek', () => {
    const heap = new Heap<number>();
    expect(heap.size()).toBe(-1);
    expect(heap.peek()).toBeUndefined();
    expect(heap.pop()).toBeUndefined();
});

test('Default comparator produces min heap with pop in ascending order', () => {
    const items = [42, 13, 88, 7, 25, 0, 100, -5];
    const heap = new Heap<number>(items);
    const sorted: number[] = [];
    while (heap.peek() !== undefined) {
        sorted.push(heap.pop()!);
    }
    expect(sorted).toEqual([-5, 0, 7, 13, 25, 42, 88, 100]);
});

test('Handles interleaved push and pop operations correctly', () => {
    const heap = new Heap<number>([], (a, b) => b - a); // max heap
    heap.push(10);
    heap.push(30);
    heap.push(20);
    expect(heap.peek()).toBe(30);
    expect(heap.pop()).toBe(30);
    heap.push(25);
    heap.push(5);
    expect(heap.peek()).toBe(25);
    expect(heap.pop()).toBe(25);
    expect(heap.pop()).toBe(20);
    expect(heap.pop()).toBe(10);
    expect(heap.pop()).toBe(5);
    expect(heap.pop()).toBeUndefined();
});
