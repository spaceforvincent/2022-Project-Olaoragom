FROM openjdk:8-jdk-alpine
ARG JAR_FILE=build/libs/climbingBear-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} climbingBear.jar
ENTRYPOINT ["java","-jar","/climbingBear.jar"]
