FROM maven:3.9-eclipse-temurin-17 as builder

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app
COPY --from=builder /app/target/api-gateway-1.0.0.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "api-gateway-1.0.0.jar"]
