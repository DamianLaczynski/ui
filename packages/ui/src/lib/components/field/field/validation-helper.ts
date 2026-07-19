import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Maps validation errors to user-friendly error messages
 */
export function getValidationErrorMessage(
  errors: ValidationErrors | null,
  control: AbstractControl | null,
  label?: string,
): string {
  if (!errors || !control) {
    return '';
  }

  const fieldLabel = label || 'This field';
  const errorKeys = Object.keys(errors);

  if (errorKeys.length === 0) {
    return '';
  }

  // Get the first error (most relevant)
  const firstErrorKey = errorKeys[0];
  const errorValue = errors[firstErrorKey];

  switch (firstErrorKey) {
    case 'required':
      return `${fieldLabel} is required`;

    case 'email':
      return 'Please enter a valid email address';

    case 'minlength':
      const minLength = errorValue.requiredLength;
      const actualLength = errorValue.actualLength;
      return `${fieldLabel} must be at least ${minLength} characters long (currently ${actualLength})`;

    case 'maxlength':
      const maxLength = errorValue.requiredLength;
      const currentLength = errorValue.actualLength;
      return `${fieldLabel} must not exceed ${maxLength} characters (currently ${currentLength})`;

    case 'min':
      return `${fieldLabel} must be at least ${errorValue.min}`;

    case 'max':
      return `${fieldLabel} must not exceed ${errorValue.max}`;

    case 'pattern':
      return `${fieldLabel} format is invalid`;

    case 'url':
      return 'Please enter a valid URL';

    case 'date':
      return 'Please enter a valid date';

    case 'time':
      return 'Please enter a valid time';

    case 'datetime':
      return 'Please enter a valid date and time';

    case 'number':
      return 'Please enter a valid number';

    case 'integer':
      return 'Please enter a whole number';

    case 'positive':
      return 'Please enter a positive number';

    case 'negative':
      return 'Please enter a negative number';

    case 'range':
      return `${fieldLabel} must be between ${errorValue.min} and ${errorValue.max}`;

    case 'step':
      return `${fieldLabel} must be a multiple of ${errorValue.step}`;

    case 'dateRange':
      // For date range validation errors
      if (errorValue && typeof errorValue === 'object' && 'message' in errorValue) {
        return errorValue.message as string;
      }
      return 'Data rozpoczęcia nie może być późniejsza niż data zakończenia';

    case 'serverError':
      // Server-side validation error from API
      if (errorValue && typeof errorValue === 'object' && 'message' in errorValue) {
        return errorValue.message as string;
      }
      return `${fieldLabel} is invalid`;

    case 'passwordMismatch':
      return 'Passwords do not match.';

    case 'passwordPolicy':
      if (typeof errorValue === 'string') {
        return errorValue;
      }
      return `${fieldLabel} does not meet password policy requirements`;

    case 'custom':
      // If error has a message property, use it
      if (errorValue && typeof errorValue === 'object' && 'message' in errorValue) {
        return errorValue.message as string;
      }
      return `${fieldLabel} is invalid`;

    default:
      if (typeof errorValue === 'string') {
        return errorValue;
      }
      // For custom validators, check if they provide a message
      if (errorValue && typeof errorValue === 'object' && 'message' in errorValue) {
        return errorValue.message as string;
      }
      // Fallback to generic message
      return `${fieldLabel} is invalid`;
  }
}

/**
 * Checks if the control has been touched and has errors
 * Only shows validation errors after user interaction (touched), not on initial load
 */
export function shouldShowValidationError(control: AbstractControl | null): boolean {
  if (!control) {
    return false;
  }

  // Only show errors if the field has been touched (user interacted with it)
  // Don't show errors just because it's dirty (value changed programmatically)
  return control.touched && control.invalid;
}

/**
 * Validator for arrays that checks if the array has at least one element
 * Use this instead of Validators.required for array form controls
 */
export function arrayRequired(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (value === null || value === undefined) {
    return { required: true };
  }

  if (!Array.isArray(value)) {
    return { required: true };
  }

  if (value.length === 0) {
    return { required: true };
  }

  return null;
}
