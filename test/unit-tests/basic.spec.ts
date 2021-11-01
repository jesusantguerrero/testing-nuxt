import { sum } from "~/utils";
describe('Test basic isolated functions', () => {
  it('should sum to numbers', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(3, 3)).toEqual(6);
  });


});
