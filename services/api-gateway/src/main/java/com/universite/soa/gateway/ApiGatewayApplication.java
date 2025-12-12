package com.universite.soa.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-service", r -> r
                        .path("/api/auth/**")
                        .uri("http://auth-service:8081"))
                .route("student-service", r -> r
                        .path("/api/students/**")
                        .uri("http://student-service:3000"))
                .route("course-service", r -> r
                        .path("/api/courses/**")
                        .uri("http://course-service:8082"))
                .route("grade-service", r -> r
                        .path("/api/grades/**")
                        .uri("http://grade-service:8000"))
                .route("billing-service", r -> r
                        .path("/api/billing/**")
                        .uri("http://billing-service:5000"))
                .build();
    }
}
