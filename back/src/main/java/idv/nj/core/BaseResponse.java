package idv.nj.core;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BaseResponse {
    private boolean success;
    private String errorMsg;
}
