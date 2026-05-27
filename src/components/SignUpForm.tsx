import { useState } from 'react';
import './styles/SignUpForm.css';
import { FormData } from '../types';
import { validateFormData } from '../utils/validation';
import { useFormSubmit } from '../hooks/useFormSubmit';

export const SignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', name: '' });
  const [validationError, setValidationError] = useState<string | null>(null);
  const { submit, loading, error, success, reset } = useFormSubmit();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data
    const validation = validateFormData(formData.email, formData.name);
    if (!validation.valid) {
      setValidationError(validation.error || 'Validation failed');
      return;
    }

    // Submit form
    await submit(formData);

    // Clear form on success
    if (!error) {
      setFormData({ email: '', name: '' });
      // Reset success message after 3 seconds
      setTimeout(() => {
        reset();
      }, 3000);
    }
  };

  return (
    <div className="signup-form-wrapper">
      <div className="form-container">
        {/* Form Heading */}
        <h2 className="form-heading">
          We're not for everyone.
          <br />
          Get in early.
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form-group">
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              disabled={loading}
              className="form-input"
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-group">
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              disabled={loading}
              className="form-input"
              required
            />
          </div>

          {/* Error Messages */}
          {(validationError || error) && (
            <div className="form-error">
              {validationError || error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="form-success">
              ✓ Thank you! You're in.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="form-submit-btn"
          >
            {loading ? 'Submitting...' : 'I want in.'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
