import { sum } from "~/utils";
import { IForm, validateForm } from "~/utils/index";
describe('Test basic isolated functions', () => {
  it('should sum to numbers', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(3, 3)).toEqual(6);
  });


  it('Should verify if the action form is valid', () => {
    const action: IForm = {
      name: '',
      pictures: ['data:example', 'data:example2']
    }
    expect(validateForm(action)).toBe(false);
    action.name = 'testing car';
    expect(validateForm(action)).toBe(true);
  });
});
