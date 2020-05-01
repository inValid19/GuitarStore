package com.example.webservice1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
@EnableCircuitBreaker
public class Webservice1Application {

	public static void main(String[] args) {
		//SpringApplication.run(Webservice1Application.class, args);

		ConfigurableApplicationContext context = SpringApplication.run(Webservice1Application.class, args);
		UserRepository userRepository = (UserRepository) context.getBean("userRepository");
		userRepository.save(new User(11, "n1", "pass", "type"));
	}

}
