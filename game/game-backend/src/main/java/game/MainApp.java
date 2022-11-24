package game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication

@EntityScan("game.service.MemoryService")

public class  MainApp {
    public static void main(final String[] args) {
        SpringApplication.run(MainApp.class, args);
    }
}
