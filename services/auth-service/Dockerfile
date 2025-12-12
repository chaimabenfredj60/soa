FROM maven:3.9-eclipse-temurin-17 as builder

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests=true

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app
RUN apk add --no-cache curl

COPY --from=builder /app/target/auth-service-1.0.0.jar .

EXPOSE 8081

HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
    CMD curl -f http://localhost:8081/health || exit 1

ENTRYPOINT ["java", "-jar", "auth-service-1.0.0.jar"]
