/* eslint-disable no-unused-vars */
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

export default function TaskCard({ task }) {
  const navigate = useNavigate()
  console.log(task)

  return (
    <Box
      p={4}
      rounded={'md'}
      shadow={'md'}
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Center mb={2}>
        <Text fontSize={'md'} fontWeight="medium" textDecor={'underline'}>
          Tugas {task.type}
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
            {task.subjectName}
          </Text>
        </Box>
        <Badge variant="solid" colorScheme="red">
          {task.completed ? 'Selesai' : 'Belum Selesai'}
        </Badge>
      </Flex>
      <Text fontWeight={600} textTransform={'capitalize'}>
        {task.title}
      </Text>
      <Box
        dangerouslySetInnerHTML={{ __html: task.description }}
        noOfLines={3}
      />
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
          {task.dueDate}
        </Text>
      </Flex>
    </Box>
  )
}
