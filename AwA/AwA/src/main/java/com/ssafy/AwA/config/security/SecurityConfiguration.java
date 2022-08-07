package com.ssafy.AwA.config.security;

import com.ssafy.AwA.auth.PrincipalOauth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public SecurityConfiguration(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.httpBasic().disable() //UI를 사용하는 것을 기본값으로 가진 시큐리티 설정을 비활성화
                .csrf().disable() //csrf보안은 REST API에서 필요없어서 끔... 맞나?
                .sessionManagement()
                .sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS) //REST API 기반 애플리케이션의 동작 방식 설정, 지금 JWT토큰으로 인증처리, 세션 사용안해서 STATELESS로 설정
                .and()
                .authorizeRequests()//애플리케이션에 들어오는 요청에 대한 사용권한 체크
                .antMatchers(HttpMethod.POST, "/artwork").authenticated()
                .antMatchers(HttpMethod.PUT,"/artwork").authenticated()
                .antMatchers(HttpMethod.DELETE,"/artwork").authenticated()
                //.antMatchers("/auth/userinfo").hasRole("ADMIN")
//                .antMatchers("/auth/sign-in", "/auth/sign-up").permitAll() //antPattern을 통해 권한 설정 특정 경로에 모두 허용
//                .antMatchers(HttpMethod.GET, "/artwork").permitAll() //artwork로 시작하는 경로의 GET요청은 모두 허용
//                .antMatchers(HttpMethod.GET, "/profile").permitAll()
//                .antMatchers("**exception**").permitAll() //exception이란 단어가 들어간 경로는 모두 허용
                //.antMatchers("/").permitAll()
                .anyRequest().permitAll() //기타 요청은 인증된 권한을 가진 사용자에게 허용
                .and()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())//권한을 확인하는 과정에서 통과하지 못하는 예외가 발생하면 예외 전달 (ex 로그인 안했을 때 들어갈 수 없는곳 들어가면 로그인페이지로)
                .and()
                .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint()) //인증 과정에서 예외가 발생할 경우 예외 전달. (Response로 클라이언트에게 전달) 책 403쪽
                .and()

                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class) //어느 필터앞에 설정할 것인지.
                // oauth2 로그인관련
                .oauth2Login()
//                .loginPage("/auth/sns-sign-in") // 인증이 필요한 url 접근시 명시된 url로 이동
                .defaultSuccessUrl("http://i7c101.p.ssafy.io:8080/")
//                .failureUrl("/auth/sns-sign-in") // 실패시 명시된 url로 이동
                .userInfoEndpoint()
                .userService(principalOauth2UserService);
    }

    //인증과 인가가 필요 없는 리소스 접근 home, preview, artwork 리스트 같은거 볼 때 등록하거나 수정하는건 위에 권한 설정
    //swagger 예외 처리해야함.
    @Override
    public void configure(WebSecurity webSecurity) throws Exception {
        webSecurity.ignoring().antMatchers("/", "/preview",
                //swagger
                "/v2/api-docs","/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**", "/sign-api/exception" ,"**swagger**");
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedOrigin("http://i7c101.p.ssafy.io:8080/");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.addExposedHeader("*"); // 모든걸 허용함

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
