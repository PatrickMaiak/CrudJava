package com.patrick.crud.api_crud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com/patrick/crud/api_crud/Controllers", "com/patrick/crud/api_crud/Service", "com/patrick/crud/api_crud/Entity","com/patrick/crud/api_crud/Config" })
public class ApiCrudApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiCrudApplication.class, args);
	}

}
