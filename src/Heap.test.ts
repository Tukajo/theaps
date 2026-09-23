import { Heap, HeapComparator } from './Heap';

test('Test basic max-heap extraction order', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const comparator: HeapComparator<number> = (a: number, b: number) => b - a;
    const heap = new Heap<number>(original, comparator);
    expect(heap.size()).toBe(10);
    expect(heap.peek()).toBe(10);

    const popped: number[] = [];
    while (!heap.isEmpty()) {
        popped.push(heap.pop()!);
    }
    expect(popped).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
});

test('Test default comparator creates min-heap in ascending order', () => {
    const original = [5, 4, 6, 6, 7, 8, 9, 1, 2, 3];
    const heap = new Heap<number>(original);
    expect(heap.peek()).toBe(1);

    const popped: number[] = [];
    while (heap.peek() !== undefined) {
        popped.push(heap.pop()!);
    }
    expect(popped).toEqual([1, 2, 3, 4, 5, 6, 6, 7, 8, 9]);
});

test('Binary heap property invariant holds for internal array', () => {
    const items = [2, 3, 1, 6, 8, 1, 9, 4, 5, 7, 0, 12, 11];
    const heap = new Heap<number>(items);
    const arr = heap.getHeap();

    for (let i = 0; i < arr.length; i++) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < arr.length) {
            expect(arr[i]).toBeLessThanOrEqual(arr[left]);
        }
        if (right < arr.length) {
            expect(arr[i]).toBeLessThanOrEqual(arr[right]);
        }
    }
});

test('replace() replaces root element and sifts down', () => {
    const heap = new Heap<number>([10, 20, 30, 40, 50], (a, b) => a - b);
    expect(heap.peek()).toBe(10);
    const oldRoot = heap.replace(35);
    expect(oldRoot).toBe(10);
    expect(heap.size()).toBe(5);
    expect(heap.peek()).toBe(20);

    const emptyHeap = new Heap<number>();
    const res = emptyHeap.replace(99);
    expect(res).toBeUndefined();
    expect(emptyHeap.size()).toBe(1);
    expect(emptyHeap.peek()).toBe(99);
});

test('Empty heap returns undefined on pop and peek', () => {
    const heap = new Heap<number>();
    expect(heap.size()).toBe(0);
    expect(heap.isEmpty()).toBe(true);
    expect(heap.peek()).toBeUndefined();
    expect(heap.pop()).toBeUndefined();
});

test('Stress test: 1000 random numbers produce strictly sorted order', () => {
    const randomArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 5000));
    const comp: HeapComparator<number> = (a, b) => a - b;
    const heap = new Heap<number>(randomArray, comp);

    const result: number[] = [];
    while (!heap.isEmpty()) {
        result.push(heap.pop()!);
    }

    const expected = [...randomArray].sort((a, b) => a - b);
    expect(result).toEqual(expected);
});

test('Interleaved push and pop maintains priority correctly', () => {
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
    expect(heap.isEmpty()).toBe(true);
});
