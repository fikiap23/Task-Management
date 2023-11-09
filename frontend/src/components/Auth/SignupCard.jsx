'use client'

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
} from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../../atoms/authAtom'

export default function SignupCard() {
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign up and get started </Heading>
          <Flex gap={2}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="username">
              <FormLabel>username</FormLabel>
              <Input type="text" />
            </FormControl>
          </Flex>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <FormControl id="repassword">
            <FormLabel> Type password again</FormLabel>
            <Input type="repassword" />
          </FormControl>
          <Stack spacing={6}>
            <Button colorScheme={'blue'} variant={'solid'}>
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
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
          h="full"
        />
      </Box>
    </Stack>
  )
}
