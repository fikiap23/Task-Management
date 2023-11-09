/* eslint-disable react/prop-types */
import {
  Box,
  Text,
  Badge,
  Flex,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react'
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons'
import Sidebar from '../components/Sidebar/Sidebar'

const DetailTaskPage = () => {
  const status = 'beres' // Ganti status sesuai dengan data Anda

  return (
    <Flex>
      <Box width={'300px'} className="hidden md:block  ">
        <Sidebar />
      </Box>
      <Box
        p={4}
        boxShadow="lg"
        borderRadius="md"
        backgroundColor={useColorModeValue('white', 'gray.800')}
        width="100%"
      >
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          {'Buat program untuk menghitung jumlah kata dalam sebuah kalimat.'}
        </Text>
        <Text fontSize="md" mb={2}>
          <span className="font-bold">Mata Kuliah:</span>{' '}
          {'Algoritma Pemrograman'}
        </Text>
        <Text fontSize="md" mb={2}>
          <span className="font-bold">Jenis Tugas:</span> {'Tugas Individu'}
        </Text>
        <Text fontSize="md" fontWeight="bold" mb={2}>
          Deskripsi:{' '}
        </Text>
        <Text fontSize="md" mb={2}>
          {`Salah satu tanda kalau kita sudah dewasa adalah mampu berdamai dengan diri sendiri, dengan masa yang telah berlalu, dengan hal-hal yang tak perlu ditanggapi, dengan arti kebahagiaan yang tak ditentukan oleh orang lain. Tentu semua butuh waktu, namun kalau kita hanya berdiam diri semua akan sama saja. 

Meratapi keterpurukan, mendengarkan perkataan buruk, definisi bahagia versi orang lain, semuanya tak akan selesai, hanya akan memunculkan riuh-riuh di kepala, dan membuatmu tak fokus.

Berjalanlah pelan, fokuslah pada tujuan, raihlah mimpi, juga bahagia yang diperoleh atas usaha sendiri, bersama ketenangan hati.  

Bangunlah saat fajar, muhasabahlah saat senja. Percayalah, dunia tersenyum lebih lebar kepadamu`}
        </Text>
        <Flex alignItems="center">
          <Text fontSize="md" mb={2}>
            Status:
            <Spacer />
            <Badge
              colorScheme={status === 'beres' ? 'green' : 'red'}
              ml={2}
              fontSize="0.8em"
            >
              {status}
            </Badge>
            {status === 'beres' ? (
              <CheckCircleIcon color="green" ml={2} boxSize={6} />
            ) : (
              <CloseIcon color="red" ml={2} boxSize={6} />
            )}
          </Text>
        </Flex>
        <Text fontSize="md" mb={2}>
          Deadline: {'2022-12-31'}
        </Text>
      </Box>
    </Flex>
  )
}

export default DetailTaskPage
