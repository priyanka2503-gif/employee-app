import React from 'react';
import { Users, Plus, RefreshCw } from 'lucide-react';

export default function Navbar({ onAddClick, onRefresh, loading }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <div className="brand-icon">
            <Users size={24} />
          </div>
          <div>
            <h1 className="brand-title">EmployeeHub</h1>
            <p className="brand-subtitle">Employee Management System</p>
          </div>
        </div>

        <div className="navbar-actions">
          <button
            type="button"
            className="btn btn-secondary btn-icon"
            onClick={onRefresh}
            title="Refresh employees"
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? 'spin' : ''} />
            <span className="hide-on-mobile">Refresh</span>
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onAddClick}
          >
            <Plus size={18} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>
    </header>
  );
}
