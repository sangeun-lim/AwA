package com.ssafy.AwA;

import com.ssafy.AwA.domain.user.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableJpaAuditing
@EnableSwagger2
@SpringBootApplication
public class AwAApplication {
	@Bean
	public BCryptPasswordEncoder encoder(){
		return new BCryptPasswordEncoder();
	}
	public static void main(String[] args) {
		SpringApplication.run(AwAApplication.class, args);
	}
}
