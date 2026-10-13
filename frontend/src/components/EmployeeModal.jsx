import React, { useState, useEffect } from 'react';
import { X, User, Mail, Building, Check, Loader2 } from 'lucide-react';

const DEPARTMENT_PRESETS = [
  'Engineering',
  'Marketing',
  'Human Resources',
  'Finance',
  'Operations',
  'Product',
  'Sales',
  'Customer Support',
];

export default function EmployeeModal({ isOpen, onClose, onSave, employee, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
  });
  const [errors, setErrors] = useState({});

  const isEdit = Boolean(employee && employee.id);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        department: employee.department || 'Engineering',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        department: 'Engineering',
      });
    }
    setErrors({});
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {isEdit ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <p className="modal-subtitle">
              {isEdit
                ? `Update details for ${employee.name}`
                : 'Enter employee information to add to the system'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="emp-name" className="form-label">
                Full Name <span className="text-danger">*</span>
              </label>
              <div className="input-with-icon">
                <User size={18} className="field-icon" />
                <input
                  id="emp-name"
                  type="text"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  autoFocus
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label htmlFor="emp-email" className="form-label">
                Email Address <span className="text-danger">*</span>
              </label>
              <div className="input-with-icon">
                <Mail size={18} className="field-icon" />
                <input
                  id="emp-email"
                  type="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="e.g. john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Department */}
            <div className="form-group">
              <label htmlFor="emp-department" className="form-label">
                Department <span className="text-danger">*</span>
              </label>
              <div className="input-with-icon">
                <Building size={18} className="field-icon" />
                <select
                  id="emp-department"
                  className={`form-input ${errors.department ? 'input-error' : ''}`}
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                >
                  {DEPARTMENT_PRESETS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              {errors.department && (
                <span className="error-message">{errors.department}</span>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check size={18} />
                  <span>{isEdit ? 'Update Employee' : 'Create Employee'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
