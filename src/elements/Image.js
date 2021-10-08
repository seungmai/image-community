// import를 한다.
import React from "react";
import styled from "styled-components";

// Image의 함수형 컴포넌트를 만들어 준다.
const Image = (props) => {
  // 둘째, defaultProps에서 설정해준 값을 가져온다.
  const { shape, src, size, _onClick } = props;

  // 넷째, children은 스타일을 담당하는 친구가 아니기 때문에 styles안에서 관리한다.
  const styles = {
    src: src,
    size: size,
  };

  // shape가 circle이면 ImageCircle을 호출한다.
  if (shape === "circle") {
    return <ImageCircle {...styles} onClick={_onClick}></ImageCircle>;
  }

  // shape가 rectangle AspectInner 호출한다.
  if (shape === "rectangle") {
    return (
      // AspectOutter안에 AspectInner를 넣어준다.
      <AspectOutter>
        <AspectInner {...styles} onClick={_onClick}></AspectInner>
      </AspectOutter>
    );
  }
  return (
    <React.Fragment>
      {/* ImageDefault 밖에서도 우리가 만들어 준 styles을 사용할 수 있도록 스프레드 문법을 사용하여 합쳐준다.*/}
      <ImageDefault {...styles} onClick={_onClick}></ImageDefault>
    </React.Fragment>
  );
};

// props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
// 첫째, defaultProps를 설정한다.
Image.defaultProps = {
  shape: "circle",
  src: "https://s3.ap-northeast-2.amazonaws.com/bucketlist.me/D6BA7E66-5A99-46E8-8D64-1FF6F1C0351C.jpeg",
  size: 36,
  _onClick: () => {},
};

// 셋째, styled-components를 사용한다.
const ImageDefault = styled.div`
  // css에서도 변수를 사용할 수 있다.
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const AspectOutter = styled.div`
  width: auto;
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Image;
