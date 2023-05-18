package platform_ocean.Config.FileServer;

import java.io.File;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class FileServerConfig implements WebMvcConfigurer {
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		String currentPath = new File(".").getAbsolutePath();
		String resourcePath = "file:///" + currentPath + "/plugins/";
		registry.addResourceHandler("/plugs/**").addResourceLocations(resourcePath);
//		registry.addResourceHandler("/plugs/**").addResourceLocations("file:/plugins/");
//		registry.addResourceHandler("/public/**").addResourceLocations("file:/public/");
	}
}