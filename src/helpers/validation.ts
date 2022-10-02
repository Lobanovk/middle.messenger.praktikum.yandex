

type ValidationRules = {
  names: { rule: RegExp, error: string }[],
  email: { rule: RegExp, error: string }[],
  login: { rule: RegExp, error: string }[],
}

export const Rules: ValidationRules = {
  names: [
    {
      rule: /^[A-Z,А-Я][a-z,а-я,\-]*/gm,
      error: "Значение должно начинаться с заглавной буквы. Нельзя использовать цифры и спецсимволы, кроме дефиса"
    }
  ],
  email: [
    {
      rule: /[a-z,A-Z,\-]*@[a-z,A-Z]{2,6}\.[a-z,A-Z]{2,4}/gm,
      error: "Нельзя использовать цифры и спецсимволы, кроме дефиса",

    }
  ],
  login: [
    {
      rule: /\d{3,20}/gm,
      error: "Логин не должен состоять только из цифр. "
    },
    {
      rule: /[\d,a-z,A-Z,\-,_]{3,20}/gm,
      error: "Используются недопустимые спецсимволы"
    }
  ]
}

export function validation({ value, rule }: { value: string, rule: keyof ValidationRules}) {
  let error: string = "";
  Rules[rule].forEach(validRule => {
      const validationValue = value.match(validRule.rule);
      if (validationValue?.[0] !== value) {
        error += validRule.error;
      }
  })

  return error;
}