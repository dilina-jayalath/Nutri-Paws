# Step 1: Use Maven with OpenJDK 17 to build the project
FROM maven:3.8.3-openjdk-17 AS build


# Step 2: Set working directory inside the container
WORKDIR /home/app


# Step 3: Copy Maven project files
COPY pom.xml .


# Step 4: Download dependencies first for better caching
RUN mvn dependency:go-offline -B


# Step 5: Copy source code
COPY src ./src


# Step 6: Build the project and package it as a JAR
RUN mvn clean package -DskipTests


# Step 7: Use a lightweight JDK image for runtime
FROM openjdk:17-jdk-slim


# Step 8: Set the working directory for runtime
WORKDIR /app


# Step 9: Copy the JAR file from the build stage
COPY target/todo-0.0.1-SNAPSHOT.jar app.jar
# Step 10: Expose port 8080
EXPOSE 8080


# Step 11: Run the Spring Boot application
ENTRYPOINT ["java","-jar","app.jar"]
