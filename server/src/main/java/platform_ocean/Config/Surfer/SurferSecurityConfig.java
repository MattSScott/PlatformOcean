package platform_ocean.Config.Surfer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import platform_ocean.Service.Surfer.SurferService;

@Configuration
@EnableWebSecurity
public class SurferSecurityConfig {

    @Autowired
    private SurferService surfServ;

    @Autowired
    private SurferPasswordEncoder encrypter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().disable().authorizeHttpRequests()
                .requestMatchers("/PlatformOcean/**", "/registry/**", "/history/**", "/plugins/**", "/discover")
                .permitAll();
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(daoAuthProv());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthProv() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(encrypter.getEncoder());
        provider.setUserDetailsService(surfServ);
        return provider;
    }
}
