// import를 한다.
import React from "react";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";

// NotiBadge의 함수형 컴포넌트를 만들어준다.
const NotiBadge = (props) => {
  const [is_read, setIsRead] = React.useState(true);
  const user_id = useSelector((state) => state.user.user.uid);
  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.update({ read: true });
    props._onClick();
  };

  React.useEffect(() => {
    const notiDB = realtime.ref(`noti/${user_id}`);

    notiDB.on("value", (snapshot) => {
      console.log(snapshot.val());

      setIsRead(snapshot.val().read);
    });
    return () => notiDB.off();
  }, []);

  return (
    <React.Fragment>
      <Badge
        color="secondary"
        variant="dot"
        invisible={is_read}
        onClick={notiCheck}
      >
        <NotificationsIcon />
      </Badge>
    </React.Fragment>
  );
};

// props가 없어서 오류가 난다던가 아니면 화면이 없어서 깨져버리는 일이 없다.
// 첫째, defaultProps를 설정한다.
NotiBadge.defaultProps = {
  _onClick: () => {},
};

// export를 통해 밖에서도 사용할 수 있도록 설정해 둔다.
export default NotiBadge;
