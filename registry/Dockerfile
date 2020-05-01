FROM openjdk:8-jdk-alpine
VOLUME /tmp
EXPOSE 8761
ADD ./out/artifacts/registry_jar/registry.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/ ./urandom","-jar","/app.jar"]
