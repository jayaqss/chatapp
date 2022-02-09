import { Box } from "@chakra-ui/layout";
// import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats />}
        {/* {user && <Chatbox />} */}
      </Box>
    </div>
  );
};

export default Chatpage;
