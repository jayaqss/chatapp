import React, { useState } from 'react';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';

const Login = () => {
  // States
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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

  const submitHandler = () => {};

  const guestUserHandler = () => {
    setEmail('guest@example.com');
    setPassword('123456');
  };

  return (
    <VStack spacing="16px">
      <FormControl id="email" isRequired>
        <FormLabel>
          <b>Email</b>
        </FormLabel>
        <Input placeholder="Enter Your Email" onChange={emailHandler}></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>
          <b>Password</b>
        </FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            onChange={passwordHandler}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={showPasswordHandler}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ margin: 15 }}
        onClick={submitHandler}
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
