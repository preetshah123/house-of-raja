/**
 * Email validation utility function
 * Validates email format and length according to RFC 5321
 */
export declare const validateEmail: (email: string) => {
    valid: boolean;
    error?: string;
};
/**
 * Name validation utility function
 * Validates that name is not empty
 */
export declare const validateName: (name: string) => {
    valid: boolean;
    error?: string;
};
/**
 * Form data validation
 * Validates entire form submission
 */
export declare const validateFormData: (email: string, name: string) => {
    valid: boolean;
    error: string | undefined;
} | {
    valid: boolean;
    error?: undefined;
};
