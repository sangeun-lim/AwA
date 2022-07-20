package com.ssafy.AwA;

import com.ssafy.AwA.domain.user.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class AwAApplication {

	public static void main(String[] args) {
		SpringApplication.run(AwAApplication.class, args);
	}

}
