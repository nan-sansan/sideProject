package idv.nj.controller.auth.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
