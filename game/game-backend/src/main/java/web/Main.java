package web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication

@EntityScan("web.service.MemoryService")
public class Main {
	public static void main(final String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
