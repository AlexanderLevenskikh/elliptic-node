import { handler } from './index';

describe('handler test', () => {
   describe('prime', () => {
       it('multiplication. Non-null, decimal, not on curve', () => {
           const inputObj = {
               module: '97',
               a: '2',
               b: '3',
               factor: '2',
               x: '3',
               y: '5',
           };

           expect(handler(inputObj)).toEqual('Точка не лежит на кривой.');
       });

       it('multiplication. Non-null, decimal', () => {
           const inputObj = {
               module: '97',
               a: '2',
               b: '3',
               factor: '2',
               x: '3',
               y: '6',
           };

           expect(handler(inputObj)).toEqual('10: (80, 10)\r\n16: (0x50, 0xA)');
       });

       it('multiplication. Non-null, hex', () => {
           const inputObj = {
               module: '0x61',
               a: '0x2',
               b: '0x3',
               factor: '2',
               x: '0x3',
               y: '0x6',
           };

           expect(handler(inputObj)).toEqual('10: (80, 10)\r\n16: (0x50, 0xA)');
       });

       it('multiplication. Non-null, inf result', () => {
           const inputObj = {
               module: '0x61',
               a: '0x2',
               b: '0x3',
               factor: '5',
               x: '0x3',
               y: '0x6',
           };

           expect(handler(inputObj)).toEqual('10: Inf\r\n16: Inf');
       });

       it('multiplication. null, inf result', () => {
           const inputObj = {
               module: '0x61',
               a: '0x2',
               b: '0x3',
               factor: '5',
               x: null,
               y: null,
           };

           expect(handler(inputObj)).toEqual('10: Inf\r\n16: Inf');
       });

       it('addition. Non-null, decimal, A not on curve', () => {
           const inputObj = {
               module: '97',
               a: '2',
               b: '3',
               x1: '3',
               y1: '5',
               x2: '3',
               y2: '6',
           };

           expect(handler(inputObj)).toEqual('Точка А не лежит на кривой.');
       });

       it('addition. Non-null, decimal, B not on curve', () => {
           const inputObj = {
               module: '97',
               a: '2',
               b: '3',
               x1: '3',
               y1: '6',
               x2: '3',
               y2: '5',
           };

           expect(handler(inputObj)).toEqual('Точка В не лежит на кривой.');
       });

       it('addition. Non-null, decimal', () => {
           const inputObj = {
               module: '97',
               a: '2',
               b: '3',
               x1: '3',
               y1: '6',
               x2: '3',
               y2: '6',
           };

           expect(handler(inputObj)).toEqual('10: (80, 10)\r\n16: (0x50, 0xA)');
       });

       it('addition. Non-null, hex', () => {
           const inputObj = {
               module: '0x61',
               a: '0x2',
               b: '0x3',
               x1: '0x3',
               y1: '0x6',
               x2: '0x3',
               y2: '0x6',
           };

           expect(handler(inputObj)).toEqual('10: (80, 10)\r\n16: (0x50, 0xA)');
       });

       it('addition. Non-null, inf result', () => {
           const inputObj = {
               module: '0x61',
               a: '0x2',
               b: '0x3',
               x1: '3',
               y1: '91',
               x2: '0x3',
               y2: '0x6',
           };

           expect(handler(inputObj)).toEqual('10: Inf\r\n16: Inf');
       });

       it('addition. null, inf result', () => {
           const inputObj = {
               module: '0x61',
               a: '0x2',
               b: '0x3',
               x1: null,
               y1: null,
               x2: '0x3',
               y2: '0x6',
           };

           expect(handler(inputObj)).toEqual('10: (3, 6)\r\n16: (0x3, 0x6)');
       });
   });

   describe('bit', () => {
       it('multiplication. Non-null, not on curve', () => {
           const inputObj = {
               module: [ 4, 1, 0 ], // x^4 + x + 1
               a: [ 0 ], // 1
               b: [ 2, 1, 0 ], // x^2 + x + 1
               factor: '2',
               x: [ 1 ], // x
               y: [ 2, 0 ], // x^2 + 1
           };

           expect(handler(inputObj)).toEqual('Точка не лежит на кривой.');
       });

       it('multiplication. Non-null', () => {
           const inputObj = {
               module: [ 4, 1, 0 ], // x^4 + x + 1
               a: [ 0 ], // 1
               b: [ 2, 1, 0 ], // x^2 + x + 1
               factor: '2',
               x: [ 1, 0 ], // x + 1
               y: [ 2, 0 ], // x^2 + 1
           };

           expect(handler(inputObj)).toEqual('(1, x^2)');
       });

       it('multiplication. Non-null, inf result', () => {
           const inputObj = {
               module: [ 4, 1, 0 ], // x^4 + x + 1
               a: [ 0 ], // 1
               b: [ 2, 1, 0 ], // x^2 + x + 1
               factor: '14',
               x: [ 1, 0 ], // x + 1
               y: [ 2, 0 ], // x^2 + 1
           };

           expect(handler(inputObj)).toEqual('Inf');
       });

       it('addition. Non-null, A not on curve', () => {
           const inputObj = {
               module: [ 4, 1, 0 ], // x^4 + x + 1
               a: [ 0 ], // 1
               b: [ 2, 1, 0 ], // x^2 + x + 1
               x1: [ 1 ], // x
               y1: [ 2, 0 ], // x^2 + 1
               x2: [ 1, 0 ], // x + 1
               y2: [ 2, 0 ], // x^2 + 1
           };

           expect(handler(inputObj)).toEqual('Точка А не лежит на кривой.');
       });

       it('addition. Non-null, B not on curve', () => {
           const inputObj = {
               module: [ 4, 1, 0 ], // x^4 + x + 1
               a: [ 0 ], // 1
               b: [ 2, 1, 0 ], // x^2 + x + 1
               x1: [ 1, 0 ], // x + 1
               y1: [ 2, 0 ], // x^2 + 1
               x2: [ 1 ], // x
               y2: [ 2, 0 ], // x^2 + 1
           };

           expect(handler(inputObj)).toEqual('Точка В не лежит на кривой.');
       });

       it('addition. Non-null', () => {
           const inputObj = {
               module: [ 4, 1, 0 ], // x^4 + x + 1
               a: [ 0 ], // 1
               b: [ 2, 1, 0 ], // x^2 + x + 1
               x1: [ 1, 0 ], // x + 1
               y1: [ 2, 0 ], // x^2 + 1
               x2: [ 1, 0 ], // x + 1
               y2: [ 2, 0 ], // x^2 + 1
           };

           expect(handler(inputObj)).toEqual('(1, x^2)');
       });

       it('addition. Non-null, inf result', () => {
           const inputObj = {
               module: [ 4, 1, 0 ], // x^4 + x + 1
               a: [ 0 ], // 1
               b: [ 2, 1, 0 ], // x^2 + x + 1
               x1: [ 1, 0 ], // x + 1
               y1: [ 2, 1 ], // x^2 + 1
               x2: [ 1, 0 ], // x + 1
               y2: [ 2, 0 ], // x^2 + 1
           };

           expect(handler(inputObj)).toEqual('Inf');
       });
   });
});
