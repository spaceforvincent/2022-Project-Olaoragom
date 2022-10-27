FROM openjdk:8
ARG JAR_FILE=build/libs/*.jar
COPY build.gradle .
ENTRYPOINT ["java","-jar","/app.jar"]