import React from 'react';
import { Edit2, Trash2, Mail, Building, User, AlertCircle, Plus } from 'lucide-react';

const DEPARTMENT_COLORS = {
  Engineering: { bg: '#EEF2FF', text: '#4338CA', border: '#C7D2FE' },
  Marketing: { bg: '#FDF2F8', text: '#BE185D', border: '#FBCFE8' },
  'Human Resources': { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
  HR: { bg: '#ECFDF5', text: '#047857', border: '#A7F3D0' },
  Finance: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
  Operations: { bg: '#F5F3FF', text: '#6D28D9', border: '#DDD6FE' },
  Sales: { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  Product: { bg: '#F0FDFA', text: '#0F766E', border: '#99F6E4' },
};

const AVATAR_COLORS = [
  '#4F46E5', '#06B6D4', '#10B981', '#F59E0B', 
  '#EC4899', '#8B5CF6', '#3B82F6', '#14B8A6'
];

function getAvatarColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function DepartmentBadge({ department }) {
  const style = DEPARTMENT_COLORS[department] || {
    bg: '#F3F4F6',
    text: '#374151',
    border: '#E5E7EB',
  };

  return (
    <span
      className="department-badge"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        borderColor: style.border,
      }}
    >
      <Building size={12} className="inline-icon" />
      {department}
    </span>
  );
}

export default function EmployeeList({
  employees,
  loading,
  onEdit,
  onDelete,
  onAddClick,
  searchQuery,
}) {
  if (loading) {
    return (
      <div className="table-card">
        <div className="skeleton-container">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-row">
              <div className="skeleton skeleton-avatar"></div>
              <div className="skeleton skeleton-text skeleton-long"></div>
              <div className="skeleton skeleton-text skeleton-medium"></div>
              <div className="skeleton skeleton-badge"></div>
              <div className="skeleton skeleton-actions"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrap">
          {searchQuery ? <AlertCircle size={36} /> : <User size={36} />}
        </div>
        <h3>{searchQuery ? 'No matching employees' : 'No employees added yet'}</h3>
        <p>
          {searchQuery
            ? `We couldn't find any employees matching "${searchQuery}". Try a different keyword.`
            : 'Get started by creating your first employee record.'}
        </p>
        {!searchQuery && (
          <button type="button" className="btn btn-primary" onClick={onAddClick}>
            <Plus size={18} />
            <span>Add First Employee</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-responsive">
        <table className="employee-table">
          <thead>
            <tr>
              <th className="th-id">ID</th>
              <th className="th-employee">Employee</th>
              <th className="th-email">Email</th>
              <th className="th-dept">Department</th>
              <th className="th-actions text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const avatarColor = getAvatarColor(emp.name);
              const initials = getInitials(emp.name);

              return (
                <tr key={emp.id} className="employee-row">
                  <td className="td-id">
                    <span className="id-badge">#{emp.id}</span>
                  </td>

                  <td className="td-employee">
                    <div className="employee-cell">
                      <div
                        className="avatar"
                        style={{ backgroundColor: avatarColor }}
                        aria-hidden="true"
                      >
                        {initials}
                      </div>
                      <div className="employee-info">
                        <span className="employee-name">{emp.name}</span>
                        <span className="mobile-only mobile-email">{emp.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="td-email">
                    <a
                      href={`mailto:${emp.email}`}
                      className="email-link"
                      title={`Send email to ${emp.name}`}
                    >
                      <Mail size={14} className="inline-icon" />
                      {emp.email}
                    </a>
                  </td>

                  <td className="td-dept">
                    <DepartmentBadge department={emp.department} />
                  </td>

                  <td className="td-actions text-right">
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="btn-action btn-edit"
                        title={`Edit ${emp.name}`}
                        onClick={() => onEdit(emp)}
                      >
                        <Edit2 size={16} />
                        <span className="action-text">Edit</span>
                      </button>

                      <button
                        type="button"
                        className="btn-action btn-delete"
                        title={`Delete ${emp.name}`}
                        onClick={() => onDelete(emp)}
                      >
                        <Trash2 size={16} />
                        <span className="action-text">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>Showing {employees.length} {employees.length === 1 ? 'employee' : 'employees'}</span>
      </div>
    </div>
  );
}
