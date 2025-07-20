package idv.nj.controller.auth;

import idv.nj.controller.auth.request.LoginRequest;
import idv.nj.controller.auth.response.LoginResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RestController
@RequestMapping("/public/auth/")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();
        log.info("username: {}, password: {}", username, password);
        if (!username.equals("12345678")) {
            throw new RuntimeException("invalid username or password");
        }
        LoginResponse response = new LoginResponse();
        response.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzNDUiLCJhY2NvdW50IjoiYTEzNDU2OCIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.66GLG6XfJRv7s_Uj-hc85CVDV-8yz3QbP2pDn4GBzic");
        response.setSuccess(true);
        response.setErrorMsg("");
        return ResponseEntity.ok(response);
    }
}
