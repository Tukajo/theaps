import { Heap } from './Heap';
import type { HeapType, HeapComparator } from './Heap';

// Attach Heap and default onto Heap constructor for seamless CJS destructuring
(Heap as unknown as Record<string, unknown>).Heap = Heap;
(Heap as unknown as Record<string, unknown>).default = Heap;

export { Heap };
export type { HeapType, HeapComparator };
export default Heap;
