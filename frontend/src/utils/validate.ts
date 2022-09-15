/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
const phoneNumberRegex = /^[6-9]\d{9}$/;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validate: any = {
  name(name: string): boolean {
    return !!(name && name.length > 1);
  },
  email(email: string): boolean {
    return !!(email && emailRegex.test(email));
  },
  password(password: string): boolean {
    return !!(password && password.length >= 6);
  },
  // Rgex to check only for numbers
  numeric(value: string): boolean {
    const regex = /(^$)|(^\d+$)/;
    return !!(value && regex.test(value));
  },
  url(value: string): boolean {
    const urlRegEx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!{0}'()*+,;=.]+$/;
    const validURLRegex = new RegExp(urlRegEx, 'i');
    return !!(value && validURLRegex.test(value));
  },
  /**
   * Returns true only if a value is not empty
   */
  required(val: string): boolean {
    if (Array.isArray(val)) {
      return !!val.length;
    }
    switch (typeof val) {
      case 'string':
        return !!val.trim();
      case 'number':
        return Number.isFinite(val);
      default:
        return !!val;
    }
  },
  phoneNumber(val: string): boolean {
    /**
      Regex resource: https://regex101.com/r/B56uoR/2
     */
    return !!(val && phoneNumberRegex.test(val));
  },
};

export default validate;
