import { useState } from 'react';
import './styles/SignUpForm.css';
import { FormData } from '../types';
import { validateFormData } from '../utils/validation';
import { useFormSubmit } from '../hooks/useFormSubmit';

export const SignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', name: '' });
  const [validationError, setValidationError] = useState<string | null>(null);
  const { submit, loading, error, success } = useFormSubmit();

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
  };

  return (
    <div className="signup-form-wrapper">
      <div className="form-container">
        <div className='form-text-wrapper'>
          <h2 className="form-heading">
            We're not for everyone.
          </h2>
          <span className='form-subtext'>
            Get in early.
          </span>
        </div>
        {/* Error Messages */}
        {(validationError || error) && (
          <div className="form-error">
            {validationError || error}
          </div>
        )}

        {success && (
          <div className="form-success">
            Thank you, you're in!
          </div>
        )}

        {/* Form */}
        {!success && !error && !validationError && (
          <form onSubmit={handleSubmit}>
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="form-submit-btn"
            >
              {loading ? 'Submitting...' : 'I want in.'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;
