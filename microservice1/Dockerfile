FROM openjdk:8-jdk-alpine
VOLUME /tmp
EXPOSE 8989
ADD ./out/artifacts/webservice1_jar/webservice1.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/ ./urandom","-jar","/app.jar"]
