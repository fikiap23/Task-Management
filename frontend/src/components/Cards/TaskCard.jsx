/* eslint-disable react/prop-types */

import {
  Box,
  Text,
  Flex,
  Button,
  Badge,
  useColorModeValue,
  Center,
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'

export default function TaskCard() {
  const navigate = useNavigate()

  return (
    <Box
      p={4}
      rounded={'md'}
      shadow={'md'}
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Center mb={2}>
        <Text fontSize={'md'} fontWeight="medium" textDecor={'underline'}>
          Tugas Individu
        </Text>
      </Center>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Box
          bg="black"
          display={'inline-block'}
          px={2}
          py={1}
          color="white"
          mb={2}
        >
          <Text fontSize={'xs'} fontWeight="medium">
            Sosio Informatika
          </Text>
        </Box>
        <Badge variant="solid" colorScheme="red">
          Belum Selesai
        </Badge>
      </Flex>
      <Text fontWeight={600}>{'Bikin Makalah Teknologi Terbaru'}</Text>
      <Text color={'gray.600'}>
        {'Buat 5 teknologi yang ingin kamu pelajari sekarang '}
      </Text>
      <Flex mt={2} alignItems={'center'} justifyContent={'space-between'}>
        <Button
          colorScheme="green"
          variant="solid"
          onClick={(e) => {
            e.preventDefault()
            navigate(`/task/1`)
          }}
        >
          Detail
        </Button>
        <Text fontStyle={'italic'} fontSize={'xs'}>
          Deadline: 1 Januari 2022, 10:00
        </Text>
      </Flex>
    </Box>
  )
}
