export function validateName(name: string) {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string) {
  const phoneRegex = /^[0-9]*$/;
  return phoneRegex.test(phone);
}
