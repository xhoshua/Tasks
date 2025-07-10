
function redc<T, U>(
  array: T[], 
  callback: (accumulator: U, currentValue: T, index: number, array: T[]) => U, 
  initialValue: U
): U {
  let accumulator = initialValue;
  
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  
  return accumulator;
}

const numbers = [1, 2, 3, 4];
const sum = redc(
  numbers,
  (acc, num) => acc + num,
  0
);
console.log('Sum:', sum); 

const arrays = [[1, 2], [3, 4], [5, 6]];
const flattened = redc(
  arrays,
  (acc, arr) => [...acc, ...arr],
  [] as number[]
);
console.log('Flattened:', flattened); 

const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const fruitCount = redc(
  fruits,
  (acc, fruit) => ({
    ...acc,
    [fruit]: (acc[fruit] || 0) + 1
  }),
  {} as Record<string, number>
);
console.log('Fruit Count:', fruitCount); 