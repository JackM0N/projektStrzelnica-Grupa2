package edu.grupa2.strzelnica;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("edu.grupa2.strzelnica.*")
@EntityScan("edu.grupa2.strzelnica.*")
@ComponentScan(basePackages = { "edu.grupa2.strzelnica.*" })
public class StrzelnicaApplication {
	public static void main(String[] args) {
		SpringApplication.run(StrzelnicaApplication.class, args);
	}

}
