// import를 한다.
import React from "react";
import styled from "styled-components";

// Spinner의 함수형 컴포넌트를 만들어 준다.
const Spinner = (props) => {
  const { type, size, is_dim } = props;

  return (
    <React.Fragment>
      <SpinnerWrap type={type} is_dim={is_dim}>
        <SpinnerSvg size={size} />
      </SpinnerWrap>
    </React.Fragment>
  );
};

// props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
// 첫째, defaultProps를 설정한다.
Spinner.defaultProps = {
  type: "inline", // inline, page
  is_dim: false,
  size: 60,
};

// 셋째, styled-components를 사용한다.
const SpinnerWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  ${(props) =>
    props.type === "page"
      ? `position: fixed;
        height: 95vh;
        top: 0;
        left: 0;
        padding: 0;
        zIndex: 9999;`
      : ``}
  ${(props) =>
    props.is_dim
      ? `
     background: rgba(0,0,0,0.4); 
     height: 100vh;
  `
      : ``}
`;

const SpinnerSvg = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("https://s3.ap-northeast-2.amazonaws.com/bucketlist.me/D6BA7E66-5A99-46E8-8D64-1FF6F1C0351C.jpeg");
  background-size: var(--size);
`;

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Spinner;
