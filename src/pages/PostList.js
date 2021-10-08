// import를 한다.
import React from "react";

// elements를 사용하기 위해 가져온다.
import { Grid } from "../elements";
import { Button } from "../elements";

// components를 불러온다.
import Post from "../components/Post";

// action 생성함수를 사용하기 위해 import를 해주었고, as하면 그 뒤에 별명을 지어주는 것이다.
import { actionCreators as postActions } from "../redux/modules/post";

// 리덕스 훅, useSelector는 store에 있는 값을 가져와서 사용할수 있도록 해주는 친구이다.
// action 생성함수를 사용하기 위해 import를 해주었다.
import { useSelector, useDispatch } from "react-redux";

import InfinityScroll from "../shared/InfinityScroll";

// PostList의 함수형 컴포넌트를 만들어 준다.
const PostList = (props) => {
  // dispatch 불러와서 사용한다.
  const dispatch = useDispatch();

  // useSelector를 이용해서 post_list를 가지고 온다.
  const post_list = useSelector((state) => state.post.list);

  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);

  const { history } = props;

  React.useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid bg={"white"} padding="20px 0px">
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {/* <Post /> */}
          {/* map을 사용한다. 개수만큼 불러올 것이다. post하나를 임의로 p라고 지정한다.*/}
          {post_list.map((p, idx) => {
            if (p.user_info.user_id === user_info?.uid) {
              // map을 사용하면 key값을 써줘야한다(...p를 해주면 post로 다 넘어간다는 뜻이다).
              return (
                <Grid bg="#ffffff" key={p.id}>
                  <Post key={p.id} {...p} is_me />
                </Grid>
              );
            } else {
              return (
                <Grid
                  key={p.id}
                  _onClick={() => {
                    history.push(`/post/${p.id}`);
                  }}
                >
                  <Post key={p.id} {...p} is_me />
                </Grid>
              );
            }
          })}
        </InfinityScroll>
        {""}
      </Grid>
    </React.Fragment>
  );
};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default PostList;
