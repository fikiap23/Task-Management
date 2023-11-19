'use client'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Button,
  Checkbox,
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
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react'
import { useState } from 'react'

import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../../atoms/authAtom'
import userAtom from '../../atoms/userAtom'
import useShowToast from '../../hooks/useShowToast'

export default function LoginCard() {
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const [showPassword, setShowPassword] = useState(false)
  const setUser = useSetRecoilState(userAtom)
  const [loading, setLoading] = useState(false)

  const [inputs, setInputs] = useState({
    identifier: '',
    password: '',
  })
  const showToast = useShowToast()
  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await fetch('/v1/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })
      const data = await res.json()
      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }
      localStorage.setItem('user-taskmanajemen', JSON.stringify(data))
      setUser(data)
    } catch (error) {
      showToast('Error', error, 'error')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email address or Username</FormLabel>
            <Input
              placeholder="Enter username or email"
              value={inputs.identifier}
              onChange={(e) =>
                setInputs((inputs) => ({
                  ...inputs,
                  identifier: e.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Enter password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs((inputs) => ({
                    ...inputs,
                    password: e.target.value,
                  }))
                }
                type={showPassword ? 'text' : 'password'}
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
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            >
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button
              colorScheme={'teal'}
              variant={'solid'}
              onClick={handleLogin}
              isLoading={loading}
            >
              Sign in
            </Button>
          </Stack>
          <Stack>
            <Text align={'center'}>
              {"Don't have an account?"}{' '}
              <Link
                color={'blue.500'}
                onClick={() => {
                  setAuthScreen('signup')
                }}
              >
                Sign Up
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Flex>
      <Box flex={1} className="hidden md:block h-screen">
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={'/Research paper-bro.png'}
          h="full"
        />
      </Box>
    </Stack>
  )
}
