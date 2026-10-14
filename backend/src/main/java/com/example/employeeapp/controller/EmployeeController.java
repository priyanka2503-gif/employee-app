package com.example.employeeapp.controller;

import com.example.employeeapp.model.Employee;
import com.example.employeeapp.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // GET /api/employees (with optional search query)
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees(@RequestParam(required = false) String search) {
        List<Employee> employees = employeeService.getAllEmployees(search);
        return ResponseEntity.ok(employees);
    }

    // GET /api/employees/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    // POST /api/employees
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody Employee employee) {
        Employee createdEmployee = employeeService.createEmployee(employee);
        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    // PUT /api/employees/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @Valid @RequestBody Employee employeeDetails) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
        return ResponseEntity.ok(updatedEmployee);
    }

    // DELETE /api/employees/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        Map<String, Object> response = new HashMap<>();
        response.put("deleted", true);
        response.put("message", "Employee with id " + id + " has been successfully deleted");
        return ResponseEntity.ok(response);
    }
}
