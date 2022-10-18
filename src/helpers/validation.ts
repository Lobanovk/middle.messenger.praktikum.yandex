
export type ValidationKeys = "names" | "login" | "email" | "password" | "repeatPassword" | "phone" | "message"
const validationRules: Record<ValidationKeys, (...args: string[]) => string> = {
  names: (value: string) => {
    const firstLetterIsUpper = value.match(/^[A-ZА-Я]/gm);
    if (firstLetterIsUpper?.[0] !== value[0]) {
      return "Первая буква должна быть заглавной"
    }
    const validValue = value.match(/^[A-ZА-Я][a-zа-я\-]*/gm);
    if (value !== validValue?.[0]) {
      return "Нельзя использовать цифры, спецсимволы, пробелы, кроме дефиса"
    }
    return "";
  },
  login: (value: string) => {
    if (value.length < 3 || value.length > 20) {
      return "Логин должен быть от 3 до 20 символов";
    }
    const onlyDigitalValue = value.match(/\d*$/gm);
    if (onlyDigitalValue?.[0] === value) {
      return "Логин не может состоять только из одних цифр";
    }
    const validValue = value.match(/[\da-zA-Z\-_]*/gm);
    if (validValue?.[0] !== value) {
      return "Нельзя использовать спецсимволы и пробелы, кроме дефиса и нижнего подчеркивания";
    }
    return "";
  },
  email: (value: string) => {
    const validValue = value.match(/[a-zA-Z\-\d]*@[a-zA-Z]{2,6}\.[a-zA-Z]{2,4}/gm);
    if (value !== validValue?.[0]) {
      return "Неверный формат email";
    }
    return ""
  },
  password: (value: string) => {
    if (value.length < 8 || value.length > 40) {
      return "Пароль должен быть от 8 до 40 симловов";
    }
    const validValue = value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm)
    if (value !== validValue?.[0]) {
      return "Нельзя использовать спецсимволы. Необходима хотя бы одна заглавная буква и цифра"
    }
    return ""
  },
  repeatPassword: (value, value2) => {
    const error = validationRules.password(value2);
    if (error) return error;
    if (value !== value2) {
      return "Введённые пароли не совпадают";
    }
    return ""
  },
  phone: (value: string) => {
    const validValue = value.match(/^\+?\d{10,15}$/gm);
    if (validValue?.[0] !== value) {
      return "Телефон должен быть от 10 до 15 символов. Необходимо использовать только цифры"
    }
    return ""
  },
  message: (value: string) => {
    if (value.length === 0) {
      return "Сообщение не должно быть пустым";
    }
    return "";
  }
}

export function validation(type: ValidationKeys, ...args: string[]): string {
  return validationRules[type](...args);
}