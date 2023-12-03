/* eslint-disable react/prop-types */
'use client'

import { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  HStack,
  Button,
  Spinner,
} from '@chakra-ui/react'
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import useShowToast from '../../hooks/useShowToast'
import subjectsAtom from '../../atoms/subjectAtom'
import { useRecoilState } from 'recoil'

export default function BoardCard({ subject }) {
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()
  const [subjects, setSubjects] = useRecoilState(subjectsAtom)
  const showToast = useShowToast()
  const subjectId = subject._id
  const [loading, setLoading] = useState(false)

  const deleteSubject = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete this subject?'))
        return

      setLoading(true)
      const response = await fetch(`/v1/api/subjects/${subjectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error(errorMessage.message || 'Failed to delete subject')
      }

      showToast('Success', 'Subject deleted successfully', 'success')
      setSubjects(subjects.filter((s) => s._id !== subjectId))
      setLoading(false)
    } catch (error) {
      showToast('Error', error.message, 'error')
      setLoading(false)
    }
  }

  return (
    <>
      {loading && (
        <Flex justifyContent={'center'} width={'full'}>
          <Spinner size={'xl'} />
        </Flex>
      )}

      {!loading && (
        <Box
          w={{ base: '100%', md: '250px' }}
          rounded={'sm'}
          overflow={'hidden'}
          bg="white"
          border={'1px'}
          borderColor="black"
        >
          <Box
            h={'200px'}
            borderBottom={'1px'}
            borderColor="black"
            position={'relative'}
          >
            <Button
              position={'absolute'}
              top={0}
              right={0}
              colorScheme="red"
              rounded={'full'}
              onClick={deleteSubject}
            >
              X
            </Button>
            <Img
              src={
                subject.banner
                  ? subject.banner
                  : 'https://cdn.pixabay.com/photo/2015/07/27/20/16/book-863418_640.jpg'
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
              bg={subject.type_subject === 'Umum' ? 'black' : 'green.500'}
              display={'inline-block'}
              px={2}
              py={1}
              color="white"
              mb={2}
            >
              <Text fontSize={'xs'} fontWeight="medium">
                {subject.type_subject}
              </Text>
            </Box>
            <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
              {subject.name}
            </Heading>
            <Text color={'black'} fontSize={'md'} noOfLines={2}>
              Dosen: {subject.dosen}
            </Text>
          </Box>
          <HStack borderTop={'1px'} color="black">
            <Flex
              p={4}
              alignItems="center"
              justifyContent={'space-between'}
              roundedBottom={'sm'}
              cursor={'pointer'}
              w="50%"
              onClick={(e) => {
                e.preventDefault()
                navigate(`/tasks/${subjectId}`)
              }}
            >
              <Text
                fontSize={'md'}
                fontWeight={'semibold'}
                onClick={() => {
                  navigate(`/tasks/${subjectId}`)
                }}
              >
                See tasks
              </Text>
            </Flex>
            <Flex
              p={4}
              alignItems="center"
              justifyContent={'space-between'}
              roundedBottom={'sm'}
              w="50%"
              borderLeft={'1px'}
              cursor="pointer"
              onClick={(e) => {
                e.preventDefault()
                navigate(`/notes/${subjectId}`)
              }}
            >
              <Text
                fontSize={'md'}
                fontWeight={'semibold'}
                onClick={() => {
                  navigate(`/notes/${subjectId}`)
                }}
              >
                See notes
              </Text>
            </Flex>
          </HStack>
        </Box>
      )}
    </>
  )
}
