package com.ssafy.AwA.config.security;

import com.ssafy.AwA.domain.user.User;
import com.ssafy.AwA.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);
//    private final UserService userService;
    private final UserRepository userRepository;


//    @Value("${springboot.jwt.secret}")
    private String secretKey = "secretKeyasdfasdfasdfasdfasdfdsafsadfasdfsadfasdfsadfsdafsdafsdafsadfasdfsadfsadfsadhgfkjsdahfkjsadhfkjh";
    private final long tokenValidMillisecond = 1000L*60; //*60해야 1시간
    private final long refreshTokenValidMillisecond = 1000L*60*60*24*14;

    @PostConstruct
    protected void init() {
        logger.info("[init] JwttoeknProvider 내 secretKey 초기화 시작");
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        logger.info("[init] JwttoeknProvider 내 secretKey 초기화 완료");
    }

    public String createToken(String userEmail, List<String> roles) {
        logger.info("[createToken] 토큰 생성 시작");
        Claims claims = Jwts.claims().setSubject(userEmail); //이메일
        claims.put("roles",roles); //권한
        Date now = new Date(); //날짜

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidMillisecond))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        logger.info("[createToken] 토큰생성완료");
        return token;
    }

    public String createRefreshToken(String userEmail, List<String> roles) {
        logger.info("[createRefreshToken] 리프레시 토큰 생성 시작");
        Claims claims = Jwts.claims().setSubject(userEmail); //이메일
        claims.put("roles",roles); //권한
        Date now = new Date(); //날짜

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenValidMillisecond))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        logger.info("[createRefreshToken] 리프레시 토큰생성완료");
        return token;
    }

    public Authentication getAuthentication(String token) {
        logger.info("[getAuthentication] 토큰 인증 정보 조회 시작");
        User user = userRepository.findByEmail(this.getUserEmail(token));
        //이메일로만 얘가 맞다고 판단하는게 맞는건가????
        logger.info("[getAuthentication] 토큰 인증 정보 조회 완료, User UserEmail : {}, User Role : {}", user.getEmail(),user.getRoles().get(0));
        System.out.println(user.getAuthorities() + "here");
        return new UsernamePasswordAuthenticationToken(user, "", user.getAuthorities());
    }

    public String getUserEmail(String token) {
        logger.info("[getUserEmail] 토큰 기반 회원 구별 정보 추출");
        String info = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
        logger.info("[getUserEmail] 토큰 기반 회원 구별 정보 추출 완료, info : {}", info);
        return info;
    }

    public String resolveToken(HttpServletRequest request) {
        logger.info("[resolveToken] HTTP 헤더에서 Token값 추출");
        return request.getHeader("X-AUTH-TOKEN");
    }

    public boolean validateToken(String token) {
        logger.info("[validateToken] 토큰 유효 체크 시작");
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            logger.info("[validateToken] 토큰 유효 체크 예외 발생");
            return false;
        }
    }
}
