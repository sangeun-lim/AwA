package com.ssafy.AwA;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@RequiredArgsConstructor
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedOrigins("http://localhost:3000", "https://awa24.site:443", "https://www.awa24.site:443", "http://awa24.site", "http://www.awa24.site")
                .allowedOrigins("https://i7c101.p.ssafy.io:8081/", "http://i7c101.p.ssafy.io:8081/")
                .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE")
                .exposedHeaders("X-AUTH-TOKEN")
                .exposedHeaders("RefreshToken");

    }
}