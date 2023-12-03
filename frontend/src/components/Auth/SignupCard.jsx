'use client'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link,
  Box,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { useState } from 'react'

import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../../atoms/authAtom'
import useShowToast from '../../hooks/useShowToast'

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    repassword: '',
  })
  const [loading, setLoading] = useState(false)
  const showToast = useShowToast()

  const handleSignup = async () => {
    setLoading(true)
    try {
      const response = await fetch('/v1/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })
      const data = await response.json()
      // console.log(data)
      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }

      localStorage.setItem('user-posivibes', JSON.stringify(data))
      setAuthScreen('login')
      showToast('Success', 'Account created successfully', 'success')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign up and get started </Heading>
          <Flex gap={2}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                value={inputs.name}
                placeholder="Fullname"
              />
            </FormControl>
            <FormControl id="username" isRequired>
              <FormLabel>username</FormLabel>
              <Input
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                value={inputs.username}
                type="text"
                placeholder="Username"
              />
            </FormControl>
          </Flex>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              value={inputs.email}
              type="email"
              placeholder="Email address"
            />
          </FormControl>

          <FormControl id="phoneNumber" isRequired>
            <FormLabel>whatsapp number (For Notification)</FormLabel>
            <Input
              onChange={(e) =>
                setInputs({ ...inputs, phoneNumber: e.target.value })
              }
              value={inputs.phoneNumber}
              type="number"
              placeholder="628xxxxxxxxx"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                value={inputs.password}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
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
          <FormControl id="repassword" isRequired>
            <FormLabel>Type password again</FormLabel>
            <InputGroup>
              <Input
                onChange={(e) =>
                  setInputs({ ...inputs, repassword: e.target.value })
                }
                value={inputs.repassword}
                type={showRePassword ? 'text' : 'password'}
                placeholder="Type password again"
              />
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() =>
                    setShowRePassword((showRePassword) => !showRePassword)
                  }
                >
                  {showRePassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={6}>
            <Button
              colorScheme={'blue'}
              variant={'solid'}
              onClick={handleSignup}
              isLoading={loading}
            >
              Sign Up
            </Button>
          </Stack>
          <Stack>
            <Text align={'center'}>
              {'Already have an account?'}{' '}
              <Link
                color={'blue.500'}
                onClick={() => {
                  setAuthScreen('login')
                }}
              >
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Flex>
      <Box flex={1} className="hidden md:block h-screen">
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={'/Research paper-rafiki.png'}
          h="full"
        />
      </Box>
    </Stack>
  )
}
