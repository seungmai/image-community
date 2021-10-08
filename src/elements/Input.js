// import를 한다.
import React from "react";
import styled from "styled-components";

// elements를 사용하기 위해 가져온다.
import { Text, Grid } from "./index";

// Input의 함수형 컴포넌트를 만들어 준다.
const Input = (props) => {
  // 둘째, defaultProps에서 설정해준 값을 가져온다.
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
  } = props;

  // 만약 multiLine가 true이면 이것을 띄어준다.
  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        {is_submit ? (
          <ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
          />
        ) : (
          <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
        )}
      </Grid>
    </React.Fragment>
  );
};

// props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
// 첫째, defaultProps를 설정한다.
Input.defaultProps = {
  // textarea를 반환해주는 것이다.
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  // 비밀번호 안보이도록 설정하기위해 type을 만들어 주었다.
  type: "text",
  value: "",
  is_submit: false,
  onSubmit: () => {},
  // api를 이용해 계속 바뀔 텍스트를 위해 _onChange를 사용한다.
  // 함수표현식의 단축형
  _onChange: () => {},
};

// 셋째, styled-components를 사용한다.
const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Input;
