FROM openjdk:8-jdk-alpine
VOLUME /tmp
EXPOSE 8484
ADD ./out/artifacts/gateway_jar/gateway.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/ ./urandom","-jar","/app.jar"]
