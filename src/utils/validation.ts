/**
 * Email validation utility function
 * Validates email format and length according to RFC 5321
 */
export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  // Email format regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check length (max 254 characters per RFC 5321)
  if (email.length > 254) {
    return { valid: false, error: 'Email is too long (max 254 characters)' };
  }

  // Check if email is empty
  if (!email.trim()) {
    return { valid: false, error: 'Email is required' };
  }

  // Check email format
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true };
};

/**
 * Name validation utility function
 * Validates that name is not empty
 */
export const validateName = (name: string): { valid: boolean; error?: string } => {
  if (!name.trim()) {
    return { valid: false, error: 'Name is required' };
  }

  if (name.length > 100) {
    return { valid: false, error: 'Name is too long (max 100 characters)' };
  }

  return { valid: true };
};

/**
 * Form data validation
 * Validates entire form submission
 */
export const validateFormData = (email: string, name: string) => {
  const emailValidation = validateEmail(email);
  const nameValidation = validateName(name);

  if (!emailValidation.valid) {
    return { valid: false, error: emailValidation.error };
  }

  if (!nameValidation.valid) {
    return { valid: false, error: nameValidation.error };
  }

  return { valid: true };
};
