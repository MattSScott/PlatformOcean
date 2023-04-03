package com.sock_debug.sock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = { "com.sock_debug" })
public class SockApplication {

	public static void main(String[] args) {
		SpringApplication.run(SockApplication.class, args);
	}

}
