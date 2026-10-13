import React from 'react';
import { Users, Briefcase, Award, Filter } from 'lucide-react';

export default function StatsCards({ employees = [], filteredEmployees = [] }) {
  const totalEmployees = employees.length;
  
  // Department breakdown
  const departmentCounts = employees.reduce((acc, emp) => {
    const dept = emp.department || 'Unassigned';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const departmentCount = Object.keys(departmentCounts).length;
  
  // Find top department
  let topDept = 'N/A';
  let topDeptMax = 0;
  for (const [dept, count] of Object.entries(departmentCounts)) {
    if (count > topDeptMax) {
      topDeptMax = count;
      topDept = dept;
    }
  }

  const isFiltering = filteredEmployees.length !== totalEmployees;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon-wrapper bg-blue-subtle">
          <Users size={22} className="text-blue" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Total Employees</span>
          <span className="stat-value">{totalEmployees}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper bg-purple-subtle">
          <Briefcase size={22} className="text-purple" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Departments</span>
          <span className="stat-value">{departmentCount}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper bg-emerald-subtle">
          <Award size={22} className="text-emerald" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Top Department</span>
          <span className="stat-value" title={topDept}>
            {topDept.length > 14 ? topDept.slice(0, 14) + '...' : topDept}
          </span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper bg-amber-subtle">
          <Filter size={22} className="text-amber" />
        </div>
        <div className="stat-content">
          <span className="stat-label">
            {isFiltering ? 'Showing Filtered' : 'Active View'}
          </span>
          <span className="stat-value">
            {filteredEmployees.length} {isFiltering && <small className="stat-muted">/ {totalEmployees}</small>}
          </span>
        </div>
      </div>
    </div>
  );
}
