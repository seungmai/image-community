// import를 한다.
import React from "react";

// elements를 사용하기 위해 가져온다.
import { Text, Input, Grid, Button } from "../elements";

// 쿠키)1. Cookie.js에서 getCookie, setCookie, deleteCookie를 불러온다.
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

// action 생성함수를 사용하기 위해 import를 해주었다.
import { useDispatch } from "react-redux";

// action 생성함수를 사용하기 위해 import를 해주었고, as하면 그 뒤에 별명을 지어주는 것이다.
import { actionCreators as userActions } from "../redux/modules/user";

import { emailCheck } from "../shared/common";

// Login의 함수형 컴포넌트를 만들어 준다.
const Login = (props) => {
  // dispatch 불러와서 사용한다.
  const dispatch = useDispatch();

  // id, pwd를 사용하기 위해 가져온다.
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  // 쿠키)2. 로그인함수를 만들어 준다.
  const login = () => {
    // 아이디와 비밀번호가 비어있으면 alert을 띄워준다.
    if (id === "" || pwd === "") {
      window.alert("아이디 혹은 비밀번호를 입력해주세요!");
      return;
    }

    // 이메일형식이 맞지않으면 false 맞으면 true를 띄어준다.
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다.");
      return;
    }
    // 리덕스에 설정해 둔 loginFB이라는 action생성함수를 불러와서 사용한다.
    // loginFB에 설정해 둔 id, pwd를 받아온다.
    dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              // setId라는 state를 추가한다.
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            // 로그인할 때, password를 입력해 password에 비밀번호가 안보이도록 설정한다.
            type="password"
            _onChange={(e) => {
              // setPwd라는 state를 추가한다.
              setPwd(e.target.value);
            }}
            // 엔더하면 로그인
            value={pwd}
            is_submit
            onSubmit={login}
          />
        </Grid>

        <Button
          text="로그인하기"
          _onClick={() => {
            console.log("로그인 했어!");
            login();
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Login;
