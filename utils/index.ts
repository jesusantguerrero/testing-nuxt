export const sum = (a: number, b: number): number => {
  return a + b;
}

export interface IForm {
  name: string;
  pictures: string[];
}

export const validateForm = (form: IForm) => {
  return form.pictures.length > 0 && form.name.length > 0 && false;
};
