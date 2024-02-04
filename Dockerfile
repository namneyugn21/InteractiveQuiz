FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17.0.10_7-jdk
COPY --from=build /target/quizapp-0.0.1-SNAPSHOT.jar quizapp.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "quizapp.jar"]