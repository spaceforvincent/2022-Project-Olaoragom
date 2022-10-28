FROM openjdk:8-jdk-alpine
WORKDIR /var/jenkins_home/workspace/deploy
ARG JAR_FILE=build/libs/climbingBear-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} climbingBear-0.0.1-SNAPSHOT.jar
#RUN apt-get -y update
#RUN apt-get -y upgrade
EXPOSE 8080
ENTRYPOINT ["java","-jar","/climbingBear-0.0.1-SNAPSHOT.jar"]

