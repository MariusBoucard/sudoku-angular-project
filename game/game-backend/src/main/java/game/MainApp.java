package game;

import game.service.MemoryService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EntityScan("game.service.MemoryService")
public class MainApp {
    @Bean
public MemoryService memo() {
    return new MemoryService ();
}
    public static void main(final String[] args) {
        SpringApplication.run(MainApp.class, args);
    }
}
