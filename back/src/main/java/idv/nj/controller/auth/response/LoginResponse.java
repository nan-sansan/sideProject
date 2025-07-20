package idv.nj.controller.auth.response;

import idv.nj.core.BaseResponse;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponse extends BaseResponse {
    private String token;
}
