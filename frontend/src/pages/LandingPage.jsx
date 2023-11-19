'use client'

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import Feature from '../components/Landing/Feature'
import Footer from '../components/Landing/Footer'
import Testimony from '../components/Landing/Testimony'

export default function LandingPage() {
  const navigate = useNavigate()
  return (
    <>
      {/* Hero Section */}
      <Container maxW={'5xl'} position={'relative'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 18 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Task management{' '}
            <Text as={'span'} color={'teal'}>
              made easy & fast
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            {`Simplify tasks, amplify results: Effortless task management for peak productivity. Set priorities, meet deadlines, and conquer with ease.`}
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'teal'}
              bg={'teal'}
              _hover={{ bg: 'teal.300' }}
              onClick={() => navigate('/auth')}
            >
              Get started
            </Button>
            <Button rounded={'full'} px={6}>
              Learn more
            </Button>
          </Stack>
          <Flex w={'full'} justify={'center'} bg={'gray.100'} rounded={'3xl'}>
            <Image
              height={{ sm: '24rem', lg: '28rem' }}
              mt={{ base: 12, sm: 16 }}
              src={'/Research paper-pana.svg'}
            />
          </Flex>
        </Stack>
      </Container>
      {/* Feature */}
      <Feature></Feature>

      {/* Testimonial */}
      <Testimony></Testimony>

      {/* Footer */}
      <Footer></Footer>
    </>
  )
}
