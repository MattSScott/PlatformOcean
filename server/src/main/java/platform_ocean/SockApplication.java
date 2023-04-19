package platform_ocean;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = { "platform_ocean" })
public class SockApplication {

	public static void main(String[] args) {
		SpringApplication.run(SockApplication.class, args);
	}

}
