'use client'

import { useState } from 'react'
import { Box, Heading, Text, Img, Flex, HStack } from '@chakra-ui/react'
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

export default function BoardCard() {
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()

  return (
    <Box
      w="full"
      rounded={'sm'}
      overflow={'hidden'}
      bg="white"
      border={'1px'}
      borderColor="black"
    >
      <Box h={'200px'} borderBottom={'1px'} borderColor="black">
        <Img
          src={
            'https://images.unsplash.com/photo-1561089489-f13d5e730d72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FsY3VsdXN8ZW58MHx8MHx8fDA%3D'
          }
          roundedTop={'sm'}
          objectFit="cover"
          h="full"
          w="full"
          alt={'Blog Image'}
        />
      </Box>
      <Box p={4}>
        <Box
          bg="black"
          display={'inline-block'}
          px={2}
          py={1}
          color="white"
          mb={2}
        >
          <Text fontSize={'xs'} fontWeight="medium">
            Umum
          </Text>
        </Box>
        <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
          Kalkulus II
        </Heading>
        <Text color={'gray.500'} noOfLines={2}>
          Tugas Mata Kuliah Kalkulus II oleh dosen Bu Nur
        </Text>
      </Box>
      <HStack borderTop={'1px'} color="black">
        <Flex
          p={4}
          alignItems="center"
          justifyContent={'space-between'}
          roundedBottom={'sm'}
          cursor={'pointer'}
          w="full"
          onClick={(e) => {
            e.preventDefault()
            navigate(`/task`)
          }}
        >
          <Text fontSize={'md'} fontWeight={'semibold'}>
            View more
          </Text>
          <BsArrowUpRight />
        </Flex>
        <Flex
          p={4}
          alignItems="center"
          justifyContent={'space-between'}
          roundedBottom={'sm'}
          borderLeft={'1px'}
          cursor="pointer"
          onClick={() => setLiked(!liked)}
        >
          {liked ? (
            <BsHeartFill fill="red" fontSize={'24px'} />
          ) : (
            <BsHeart fontSize={'24px'} />
          )}
        </Flex>
      </HStack>
    </Box>
  )
}
