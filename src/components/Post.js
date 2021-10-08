// import를 한다.
import React, { Children } from "react";
import styled from "styled-components";

// elements를 사용하기 위해 가져온다.
import { Grid, Image, Text, Button } from "../elements";

import HeartButton from "./HeartButton";

// history를 사용하기 위해 history를 가져온다.
import { history } from "../redux/configureStore";

import { useDispatch, useSelector } from "react-redux";

// action 생성함수를 사용하기 위해 import를 해주었고, as하면 그 뒤에 별명을 지어주는 것이다.
import { actionCreators as postActions } from "../redux/modules/post";

// Post의 함수형컴포넌트를 만들어준다.
const Post = React.memo((props) => {
  const dispatch = useDispatch();
  const like_cnt = props.like_id.length;

  const likeadd = () => {
    dispatch(postActions.addHeartFB(props.id));
  };

  return (
    <React.Fragment>
      <Grid>
        {/* 상단 */}
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && (
              <Button
                width="auto"
                margin="4px"
                padding="4px"
                _onClick={() => {
                  history.push(`/write/${props.id}`);
                }}
              >
                수정
              </Button>
            )}
          </Grid>
        </Grid>

        {/* 이미지 */}
        <Grid padding="16px">
          <Image
            shape="rectangle"
            src={props.image_url}
            _onClick={() => {
              history.push(`post/${props.id}`);
            }}
          />
        </Grid>

        {/* 텍스트 */}
        <Grid padding="0 16px">
          <Text>{props.contents}</Text>
        </Grid>

        {/* 좋아요 */}
        <Grid is_flex padding="16px">
          <Text margin="0px" bold>
            {like_cnt}명이 좋아합니다
          </Text>

          <HeartBtn
            onClick={() => {
              likeadd(props.id);
            }}
          >
            <i class="fas fa-heart"></i>
          </HeartBtn>

          {/* 빈 하트 */}

          <HeartBtn
            onClick={() => {
              likeadd(props.id);
            }}
          >
            <i className="far fa-heart"></i>
          </HeartBtn>
        </Grid>

        {/* 댓글바 */}
        <Grid padding="0 16px">
          <Text margin="0px" bold>
            댓글 {props.comment_cnt}개
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
//props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
Post.defaultProps = {
  user_info: {
    user_id: "",
    user_name: "이승민",
    user_profile:
      "https://s3.ap-northeast-2.amazonaws.com/bucketlist.me/D6BA7E66-5A99-46E8-8D64-1FF6F1C0351C.jpeg",
  },
  // 게시글에 붙어있는 이미지
  image_url:
    "https://blogfiles.pstatic.net/MjAyMTAxMDZfMTQg/MDAxNjA5OTM5OTIwNTQ5.0ZOIiV91rAzjOSHsXwEJnzX6LX_us60c4B2uKiMuOeAg.WkuBtZPP9a5hLXBeVUsMcGTIi93FMSQvRy_yAZ8jEQog.JPEG.dltmdals3785/IMG_1060.JPG",
  cotents: "강아지와 주인입니다:)",
  comment_cnt: 35,
  insert_dt: "2021-09-20 10:00:00",
  is_me: false,
  add_like: false,
  add_like: 0,
  like_cnt: 0,
};

const HeartBtn = styled.button`
  border: none;
  background: white;
  font-size: 20px;
`;

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Post;
