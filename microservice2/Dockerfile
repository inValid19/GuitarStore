FROM openjdk:8-jdk-alpine
VOLUME /tmp
EXPOSE 9898
ADD ./out/artifacts/microservice2_jar/microservice2.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/ ./urandom","-jar","/app.jar"]
