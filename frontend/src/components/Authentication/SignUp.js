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

const SignUp = () => {
  // States
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [picture, setPicture] = useState();

  // Handler functions
  const showPasswordHandler = () => {
    setShow(!show);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const postDetails = (pics) => {};

  const pictureHandler = (e) => {
    postDetails(e.target.files[0]);
  };

  const submitHandler = () => {};

  return (
    <VStack spacing="16px">
      <FormControl id="first-name" isRequired>
        <FormLabel>
          <b>Name</b>
        </FormLabel>
        <Input placeholder="Enter Your Name" onChange={nameHandler}></Input>
      </FormControl>

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

      <FormControl id="password" isRequired>
        <FormLabel>
          <b>Confirm Password</b>
        </FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Confirm Password"
            onChange={confirmPasswordHandler}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={showPasswordHandler}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="picture">
        <FormLabel>
          <b>Upload Your Picture</b>
        </FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={pictureHandler}
        ></Input>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ margin: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
