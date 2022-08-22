import shuffleArray from '../../utils/shuffleArray';

describe('shuffleArray', () => {
  test('shuffleArray has correct output', () => {
    jest.spyOn(global.Math, 'random')
      .mockReturnValueOnce(.5)
      .mockReturnValueOnce(.9)
      .mockReturnValueOnce(.1);
  
    const array = [1, 2, 3];
    const expectedShuffle = shuffleArray(array);
    
    expect(expectedShuffle.length).toBe(3);
    expect(expectedShuffle).toEqual([3, 1, 2]);
  });
});
