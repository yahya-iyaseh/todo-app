import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useReducer, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { register } from '../Redux/AuthReducer/Action';
import { REGISTER_SUCCESS } from '../Redux/AuthReducer/ActionType';

const initialState = {
  name: '',
  email: '',
  password: '',
  // username: '',
  phone: 0,
  gender: 'male',
  birthday: new Date(),
};

function Reducer(state, action) {
  switch (action.type) {
    case 'email': {
      return {
        ...state,
        email: action.payload,
      };
    }

    case 'password': {
      return {
        ...state,
        password: action.payload,
      };
    }

    case 'name': {
      return {
        ...state,
        name: action.payload,
      };
    }

    // case 'username': {
    //   return {
    //     ...state,
    //     username: action.payload,
    //   };
    // }

    case 'phone': {
      return {
        ...state,
        phone: action.payload,
      };
    }
    case 'gender': {
      return {
        ...state,
        gender: action.payload,
      };
    }

    case 'birthday': {
      return {
        ...state,
        birthday: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setter] = useReducer(Reducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpHandler = () => {
    dispatch(register(state))
      .then((r) => {
        if (r === REGISTER_SUCCESS) {
          navigate('/login', { replace: true });
        }
      })
      .catch((error) => {
        console.error('Signup Error:', error);
      });
  };
  return (
    <Flex
      minH={'100vh'}
      width="1500px"
      ml="-190px"
      align={'center'}
      justify={'center'}
      // bg={useColorModeValue('gray.50', 'gray.800')}
      bg="whiteAlpha.900"
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="Name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={state.name}
                    onChange={(e) =>
                      setter({ type: 'name', payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
              {/* <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={state.username}
                    onChange={(e) =>
                      setter({ type: 'username', payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box> */}
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={state.email}
                onChange={(e) =>
                  setter({ type: 'email', payload: e.target.value })
                }
              />
            </FormControl>
            <Box>
              <FormControl id="gender" isRequired>
                <RadioGroup defaultValue="male">
                  <Stack>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Box>
            <Box>
              <FormControl id="birthday">
                <FormLabel>Birthday</FormLabel>
                <DatePicker
                  selected={state.birthday}
                  onChange={(date) =>
                    setter({ type: 'birthday', payload: date })
                  }
                />
              </FormControl>
            </Box>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={state.password}
                  onChange={(e) =>
                    setter({ type: 'password', payload: e.target.value })
                  }
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Box>
              <FormControl id="phone" isRequired>
                <FormLabel>phone</FormLabel>
                <Input
                  type="number"
                  value={state.phone}
                  onChange={(e) =>
                    setter({ type: 'phone', payload: e.target.value })
                  }
                />
              </FormControl>
            </Box>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={signUpHandler} // Invoke the signUpHandler function
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <RouterLink to="/login" style={{ color: 'blue' }}>
                  Login
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
