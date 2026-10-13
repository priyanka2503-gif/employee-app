import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departments = [],
  sortBy,
  onSortChange,
}) {
  return (
    <div className="search-filter-panel">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search employees by name, email, or department..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="filters-group">
        <div className="select-wrapper">
          <label htmlFor="dept-filter" className="sr-only">Department</label>
          <select
            id="dept-filter"
            className="filter-select"
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
          >
            <option value="ALL">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="select-wrapper">
          <label htmlFor="sort-filter" className="sr-only">Sort By</label>
          <select
            id="sort-filter"
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="id-desc">Newest First</option>
            <option value="id-asc">Oldest First</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="department-asc">Department (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
