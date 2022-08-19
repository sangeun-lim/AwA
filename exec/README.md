# 포팅매뉴얼

- JVM
    - java version "11.0.14" 2022-01-18 LTS
- 웹 서버
    - AWS EC2 (Ubuntu 20.04 LTS)
        - MobaXterm 접속 후 Session→SSh (Remote host : ubuntu@i7c101.p.ssafy.io / use private key에 pem키 첨부
- Intellij (Ultimate 22.1.3)
- Nginx (/etc/nginx/sites-available/myapp.conf)
    
    ```jsx
    server {
            listen 80 default_server;
            listen [::]:80 default_server;
    
            root /home/ubuntu/build;
    
            index index.html index.htm index.nginx-debian.html;
    
            server_name _;
    
            location / {
                    try_files $uri $uri/ =404;
            }
    }
    
    server {
            root /home/ubuntu/build;
    
            index index.html index.htm index.nginx-debian.html;
            server_name www.awa24.site awa24.site; # managed by Certbot
    
            location / {
                    # First attempt to serve request as file, then
                    # as directory, then fall back to displaying a 404.
                    try_files $uri $uri/ =404;
            }
    
            listen [::]:443 ssl ipv6only=on; # managed by Certbot
            listen 443 ssl; # managed by Certbot
            ssl_certificate /etc/letsencrypt/live/awa24.site/fullchain.pem; # managed by Certbot
            ssl_certificate_key /etc/letsencrypt/live/awa24.site/privkey.pem; # managed by Certbot
            include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
            ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    }
    
    #server {
     #location /api{
    #       include /etc/nginx/proxy_params;
            #proxy_pass http://i7c101.p.ssafy.io:8081/api/;
            #proxy_pass https://i7c101.p.ssafy.io:8081/api/;
    #       proxy_pass https://awa24.site:8081/api/;
    #       proxy_redirect off;
    #       charset utf-8;
    
    #       proxy_set_header X-Real_IP $remote_addr;
    #       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #       proxy_set_header X-Forwarded-Proto $scheme;
    #       proxy_set_header X-NginX-Proxy true;
    #  }
    #}
    
    # 80 포트로 접근시 443 포트로 리다이렉트 시켜주는 설정
    server {
               return 301 https://$host$request_uri;
             #  managed by Certbot
    
               listen 80;
               server_name awa24.site;
               return 404; # managed by Certbot
       }
    ```
    

- Backend Build
    - Git clone 이후 `./gradlew bootJar` 명령어 실행 시 build/libs/폴더 내 jar파일 생성
    - resource/application.yml
    
    ```jsx
    spring:
      datasource:
        url: jdbc:mariadb://i7c101.p.ssafy.io/AwA
        username: AwA
        password: tpwlslrnldudnj!#%
        driver-class-name: org.mariadb.jdbc.Driver
      security:
        oauth2:
          client:
            registration:
              google:
                client-id: 654989514571-ji9os6ujroj61ajmf3mviched2h7i3jh.apps.googleusercontent.com
                client-secret: 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
                scope:
                  - profile
                  - email
              naver:
                client-id: 3IlTyXUB0h2gwt4O1Lhv
                client-secret: 5ariPPNgVF
                redirect-uri: '{baseUrl}/{action}/oauth2/code/{registrationId}'
                authorization-grant-type: authorization_code
                client-name: Naver
                scope:
                  - name
                  - email
              kakao:
                authorization-grant-type: authorization_code
                client-id: 6aedbfc39ab1738bda8e5bbf952587ed
                client-secret: zVzwaD3ISM71jWvqc2uasloliMlbjHf5
                redirect-uri: "{baseUrl}/{action}/oauth2/code/{registrationId}"
                client-name: Kakao
                client-authentication-method: POST
                scope:
                  - profile_nickname
                  - account_email
            provider:
              naver:
                authorization-uri: https://nid.naver.com/oauth2.0/authorize
                token-uri: https://nid.naver.com/oauth2.0/token
                user-info-uri: https://openapi.naver.com/v1/nid/me
                user-name-attribute: response
              kakao:
                authorization-uri: https://kauth.kakao.com/oauth/authorize
                token-uri: https://kauth.kakao.com/oauth/token
                user-info-uri: https://kapi.kakao.com/v2/user/me
                user-name-attribute: id
    
        port:
      mvc:
        pathmatch:
          matching-strategy: ant_path_matcher
    
      jpa:
        hibernate:
          ddl-auto: update
          properties:
            hibernate:
              #show_sql: true
              format_sql: true
        #generate-ddl: true
    
      mail:
        host: smtp.gmail.com
        port: 587
        username: kimsejin159@gmail.com
        password: wcoonqgxuqzfloqg
        properties:
          mail.smtp.auth: true
          mail.smtp.starttls.enable: true
    
    logging:
      level:
        org.hibernate.sql: debug
        org.hibernate.type: trace
    
    server:
      port: 8081
      ssl:
        key-store: classpath:keystore.p12
        key-store-type: PKCS12
        key-store-password: tpwlslrnldudnj!#%
      http2:
        enabled: true
    ```
    
    - **resource/keystore.p12 파일 필요**
    
    [keystore](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/497921bf-2e76-454e-bc59-6f8b221a5c0d/Untitled.p12)
    
- DB 접속 정보
    - Heidi
        - 네트워크 유형 : MariaDb or MySQL (TCP/IP)
        - Library : libmariadb.dll
        - 호스트명 / IP : i7c101.p.ssafy.io
        - 사용자 : AwA
        - 암호 : tpwlslrnldudnj!#%
        - 포트 : 3306
        
- CI/CD
