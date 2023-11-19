import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

// Replace test data with your own
const features = [
  {
    id: 1,
    title: 'Intuitive and User-Friendly',
    text: 'Simple and intuitive interface for easy and fast task management.',
  },
  {
    id: 2,
    title: 'Efficient Organization',
    text: 'Organize, prioritize, and manage tasks with high efficiency to boost productivity.',
  },
  {
    id: 3,
    title: 'Real-Time Notifications',
    text: 'Receive real-time notifications to stay updated on changes and deadlines.',
  },
  {
    id: 4,
    title: 'Wide Integrations',
    text: 'Deep integrations with various platforms for seamless data synchronization.',
  },
  {
    id: 5,
    title: 'Quick Search',
    text: 'Find tasks quickly using advanced search features for maximum efficiency.',
  },
  {
    id: 6,
    title: 'Performance Analytics',
    text: 'View performance statistics to evaluate and enhance overall productivity.',
  },
  {
    id: 7,
    title: 'Easy Task Prioritization',
    text: 'Set priorities and deadlines to approach tasks with focus and order.',
  },
  {
    id: 8,
    title: 'Responsive Design',
    text: 'Responsive design for an optimal user experience across various devices.',
  },
]

export default function Feature() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Optimizing Your Task Management</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          Simplify and speed up task management with an intuitive interface and
          advanced features.
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
