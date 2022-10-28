FROM openjdk:8-jdk-alpine
WORKDIR /var/jenkins_home/workspace/deploy/BE/climbingBear
ARG JAR_FILE=./build/libs/climbingBear-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
#RUN apt-get -y update
#RUN apt-get -y upgrade
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]

