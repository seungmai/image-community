// 세션통합 느낌

// import를 한다.
import React from "react";
// user정보를 보기위해 import를 해준다.
import { useSelector } from "react-redux";
// apiKey를 불러온다(apiKey가 있어야 세션을 가져온다).
import { apiKey } from "./firebase";

// Permit의 함수형 컴포넌트를 만들어 준다.
const Permit = (props) => {
  const is_login = useSelector((state) => state.user.user);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_session && is_login) {
    // props에 자식노드있으면 그대로 넘겨주는것
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  return null;
};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Permit;
