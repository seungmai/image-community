// import를 한다.
import React from "react";

// elements를 사용하기 위해 가져온다.
import { Grid, Text, Image } from "../elements";

import Card from "../components/Card";
import { realtime } from "../shared/firebase";

// 리덕스 훅, useSelector는 store에 있는 값을 가져와서 사용할수 있도록 해주는 친구이다.
// action 생성함수를 사용하기 위해 import를 해주었다.
import { useSelector } from "react-redux";

// Notification의 함수형 컴포넌트를 만들어 준다.
const Notification = (props) => {
  // useSelector를 이용해서 state > user > is_login을 가져온다.
  const user = useSelector((state) => state.user.user);

  const [noti, setNoti] = React.useState([]);
  React.useEffect(() => {
    if (!user) {
      return;
    }

    const notiDB = realtime.ref(`noti/${user.uid}/list`);

    const _noti = notiDB.orderByChild("insert_dt");

    _noti.once("value", (snapshot) => {
      if (snapshot.exists()) {
        let _data = snapshot.val();

        let _noti_list = Object.keys(_data)
          .reverse()
          .map((s) => {
            return _data[s];
          });
        console.log(_noti_list);

        setNoti(_noti_list);
      }
    });
  }, [user]);

  return (
    <React.Fragment>
      <Grid padding="16px" bg="#EFF6FF">
        {noti.map((n, idx) => {
          return <Card ket={`noti_${idx}`} {...n} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default Notification;
