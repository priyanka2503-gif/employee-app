import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import SearchBar from './components/SearchBar';
import EmployeeList from './components/EmployeeList';
import EmployeeModal from './components/EmployeeModal';
import ConfirmModal from './components/ConfirmModal';
import Toast from './components/Toast';
import employeeService from './api/employeeService';
import { AlertCircle, RefreshCw, ServerCrash } from 'lucide-react';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [sortBy, setSortBy] = useState('id-desc');

  // Modal states
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // null = add, object = edit
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  // Fetch employees
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getAll();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching employees:', err);
      const msg = err.response?.data?.message || err.message || 'Failed to connect to backend server';
      setError(msg);
      showToast('Could not load employees from server. Ensure backend is running.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Extract unique departments for filter dropdown
  const uniqueDepartments = useMemo(() => {
    const set = new Set();
    employees.forEach((emp) => {
      if (emp.department) set.add(emp.department);
    });
    return Array.from(set).sort();
  }, [employees]);

  // Filtered and sorted employees
  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    // Filter by department
    if (selectedDepartment !== 'ALL') {
      result = result.filter(
        (emp) => emp.department?.toLowerCase() === selectedDepartment.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (emp) =>
          emp.name?.toLowerCase().includes(q) ||
          emp.email?.toLowerCase().includes(q) ||
          emp.department?.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'id-asc':
          return (a.id || 0) - (b.id || 0);
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'department-asc':
          return (a.department || '').localeCompare(b.department || '');
        case 'id-desc':
        default:
          return (b.id || 0) - (a.id || 0);
      }
    });

    return result;
  }, [employees, searchQuery, selectedDepartment, sortBy]);

  // Add Employee Handler
  const handleOpenAddModal = () => {
    setSelectedEmployee(null);
    setIsEmployeeModalOpen(true);
  };

  // Edit Employee Handler
  const handleOpenEditModal = (emp) => {
    setSelectedEmployee(emp);
    setIsEmployeeModalOpen(true);
  };

  // Save Employee (Create or Update)
  const handleSaveEmployee = async (formData) => {
    try {
      setIsSubmitting(true);
      if (selectedEmployee && selectedEmployee.id) {
        // PUT /api/employees/{id}
        const updated = await employeeService.update(selectedEmployee.id, formData);
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === selectedEmployee.id ? updated : emp))
        );
        showToast(`Employee "${updated.name}" updated successfully!`, 'success');
      } else {
        // POST /api/employees
        const created = await employeeService.create(formData);
        setEmployees((prev) => [created, ...prev]);
        showToast(`Employee "${created.name}" created successfully!`, 'success');
      }
      setIsEmployeeModalOpen(false);
      setSelectedEmployee(null);
    } catch (err) {
      console.error('Error saving employee:', err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.email ||
        'Failed to save employee. Please try again.';
      showToast(errorMsg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Prompt
  const handlePromptDelete = (emp) => {
    setEmployeeToDelete(emp);
    setIsConfirmDeleteOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;
    try {
      setIsSubmitting(true);
      await employeeService.delete(employeeToDelete.id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== employeeToDelete.id));
      showToast(`Employee "${employeeToDelete.name}" deleted.`, 'info');
      setIsConfirmDeleteOpen(false);
      setEmployeeToDelete(null);
    } catch (err) {
      console.error('Error deleting employee:', err);
      const errorMsg = err.response?.data?.message || 'Failed to delete employee.';
      showToast(errorMsg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar
        onAddClick={handleOpenAddModal}
        onRefresh={fetchEmployees}
        loading={loading}
      />

      <main className="main-content">
        <div className="container">
          {/* Server Connection Error Alert */}
          {error && (
            <div className="alert-banner alert-warning">
              <ServerCrash size={20} className="alert-banner-icon" />
              <div className="alert-banner-text">
                <strong>Backend Server Disconnected:</strong> Could not reach{' '}
                <code>http://localhost:8081/api/employees</code>. Please ensure the Spring Boot
                backend is running.
              </div>
              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={fetchEmployees}
                disabled={loading}
              >
                <RefreshCw size={14} className={loading ? 'spin' : ''} />
                Retry
              </button>
            </div>
          )}

          {/* Statistics Dashboard */}
          <StatsCards
            employees={employees}
            filteredEmployees={filteredEmployees}
          />

          {/* Search, Filter, Sort Toolbar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            departments={uniqueDepartments}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Employee Records Table */}
          <EmployeeList
            employees={filteredEmployees}
            loading={loading}
            onEdit={handleOpenEditModal}
            onDelete={handlePromptDelete}
            onAddClick={handleOpenAddModal}
            searchQuery={searchQuery}
          />
        </div>
      </main>

      {/* Add / Edit Employee Modal */}
      <EmployeeModal
        isOpen={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        onSave={handleSaveEmployee}
        employee={selectedEmployee}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => {
          setIsConfirmDeleteOpen(false);
          setEmployeeToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        employeeName={employeeToDelete?.name}
        isSubmitting={isSubmitting}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
