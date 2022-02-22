import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  // States
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  // Handler functions
  const showPasswordHandler = () => {
    setShow(!show);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const guestUserHandler = () => {
    setEmail("guest@example.com");
    setPassword("123456");
  };

  return (
    <VStack spacing="16px">
      <FormControl id="email" isRequired>
        <FormLabel>
          <b>Email</b>
        </FormLabel>
        <Input
          value={email}
          placeholder="Enter Your Email"
          onChange={emailHandler}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>
          <b>Password</b>
        </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={passwordHandler}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={showPasswordHandler}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ margin: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button colorScheme="red" width="100%" onClick={guestUserHandler}>
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
