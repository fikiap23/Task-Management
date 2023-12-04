/* eslint-disable react/prop-types */
'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { GrTask } from 'react-icons/gr'
import { SiConvertio } from 'react-icons/si'
import { FaPeopleGroup } from 'react-icons/fa6'
import { RiCalendarTodoFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const toolsData = [
  {
    heading: 'Random Group Generator',
    icon: <Icon as={FaPeopleGroup} w={10} h={10} color={'green.400'} />,
    description:
      'Easily create random groups for your tasks or projects, fostering collaboration and diversity.',
    href: '/tools/groups-generate',
  },
  {
    heading: 'Image to PDF Converter',
    icon: <Icon as={SiConvertio} w={10} h={10} color={'red.400'} />,
    description:
      'Convert images to PDF seamlessly, making it convenient to manage visual content.',
    href: '/tools/img-to-pdf',
  },
  {
    heading: 'Class Schedule (Login to try)',
    icon: <Icon as={RiCalendarTodoFill} w={10} h={10} color={'purple.400'} />,
    description:
      'Keep track of your daily classes, locations, and professors with a personalized class schedule.',
    href: '/auth',
  },
  {
    heading: 'Daily Planner (Login to try)',
    icon: <Icon as={GrTask} w={10} h={10} color={'blue.400'} />,
    description:
      'Plan your day effectively by organizing tasks, deadlines, and personal activities in one place.',
    href: '/auth',
  },
]

const Card = ({ heading, description, icon, href }) => {
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
        <Link to={href}>
          <Button variant={'link'} colorScheme={'blue'} size={'sm'} href={href}>
            Try it now
          </Button>
        </Link>
      </Stack>
    </Box>
  )
}

export default function Tools() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Task Management Tools
        </Heading>
        <Text colorScheme={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Explore a variety of powerful tools designed to enhance your task
          management experience. From generating random groups to converting
          images to PDF, our tools are here to simplify your workflow.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          {toolsData.map((tool, index) => (
            <Card key={index} {...tool} />
          ))}
        </Flex>
      </Container>
    </Box>
  )
}
