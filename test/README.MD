

1. Pastikan terlebih dahulu mempunyai aplikasi postgresSQL

2. Navigate ke dalam application.properties(path: src/main/java/resources/application.properties)   
    spring.datasource.url= jdbc:postgresql://localhost:5432/<DB NAME>
    spring.datasource.username= <username postgres>
    spring.datasource.password= <password postgres>
    spring.jpa.hibernate.ddl-auto= create-drop
    server.error.include-message=always

3. Untuk run springboot,
    buka cmd,
    cd ke folder project spring boot (test)
    mvn dependency:tree
    mvn spring-boot:run

4. Buka aplikasi Postman
    Import file "Aplikasi Post Article.postman_collection.json"

5. Aplikasi API-SpringBoot dapat digunakan
 

