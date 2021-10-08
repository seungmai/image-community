// import를 한다.
import React from "react";

// elements를 사용하기 위해 가져온다.
import { Grid, Image, Text } from "../elements";

// history를 사용하기 위해 history를 가져온다.
import { history } from "../redux/configureStore.js";

// Card의 함수형 컴포넌트를 만들어준다.
const Card = (props) => {
  // 둘째, defaultProps에서 설정해준 값을 가져온다.
  const { image_url, user_name, post_id } = props;

  return (
    <Grid
      _onClick={() => {
        history.push(`/post/${post_id}`);
      }}
      padding="16px"
      is_flex
      bg="#ffffff"
      margin="8px 0px"
    >
      <Grid width="auto" margin="0px 8px 0px 0px">
        <Image size={85} shape="square" src={image_url} />
      </Grid>
      <Grid>
        <Text>
          <b>{user_name}</b>님이 게시글에 댓글을 남겼습니다
        </Text>
      </Grid>
    </Grid>
  );
};

// props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
// 첫째, defaultProps를 설정한다.
Card.defaultProps = {
  image_url: "",
  user_name: "",
  post_id: null,
};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Card;
