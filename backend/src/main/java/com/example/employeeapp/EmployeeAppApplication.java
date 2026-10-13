// package com.example.employeeapp;

// import com.example.employeeapp.model.Employee;
// import com.example.employeeapp.repository.EmployeeRepository;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.context.annotation.Bean;

// @SpringBootApplication
// public class EmployeeAppApplication {

//     public static void main(String[] args) {
//         SpringApplication.run(EmployeeAppApplication.class, args);
//     }

//     @Bean
//     public CommandLineRunner initData(EmployeeRepository repository) {
//         return args -> {
//             if (repository.count() == 0) {
//                 repository.save(new Employee("Alice Johnson", "alice.johnson@example.com", "Engineering"));
//                 repository.save(new Employee("Bob Smith", "bob.smith@example.com", "Marketing"));
//                 repository.save(new Employee("Charlie Davis", "charlie.davis@example.com", "Human Resources"));
//                 repository.save(new Employee("Diana Prince", "diana.prince@example.com", "Finance"));
//                 repository.save(new Employee("Evan Wright", "evan.wright@example.com", "Operations"));
//                 System.out.println("Initialized database with 5 sample employee records.");
//             }
//         };
//     }
// }

package com.example.employeeapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmployeeAppApplication.class, args);
    }
}