package platform_ocean.Config.MultithreadingUtils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.scheduling.SchedulingTaskExecutor;

@Configuration
@EnableAsync
public class ThreadpoolConfig {

	@Bean
	public SchedulingTaskExecutor taskExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setQueueCapacity(100);
		executor.setMaxPoolSize(2);
		executor.setCorePoolSize(2);
		executor.setThreadNamePrefix("poolThread-");
		executor.initialize();
		return executor;
	}
}