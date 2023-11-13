/* eslint-disable react/prop-types */
'use client'

import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { BiTask } from 'react-icons/bi'
import { AiOutlineHome, AiOutlineStar } from 'react-icons/ai'
import { CiStickyNote } from 'react-icons/ci'
import { FiSettings } from 'react-icons/fi'
import { PiToolboxLight } from 'react-icons/pi'
import LogoutButton from '../Auth/LogoutButton'
import { useSetRecoilState } from 'recoil'
import userAtom from '../../atoms/userAtom'
import useShowToast from '../../hooks/useShowToast'

const LinkItems = [
  { name: 'Home', icon: AiOutlineHome },
  { name: 'Tasks', icon: BiTask },
  { name: 'Notes', icon: CiStickyNote },
  { name: 'Favourites', icon: AiOutlineStar },
  { name: 'Tools', icon: PiToolboxLight },
  { name: 'Settings', icon: FiSettings },
]

export default function Sidebar() {
  const { onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  const setUser = useSetRecoilState(userAtom)
  const showToast = useShowToast()
  const handleLogout = async () => {
    try {
      const res = await fetch('/v1/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }

      localStorage.removeItem('user-taskmanajemen')
      setUser(null)
      showToast('Success', 'Logged out successfully', 'success')
    } catch (error) {
      showToast('Error', error, 'error')
    }
  }
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={link.onClick}>
          {link.name}
        </NavItem>
      ))}
      <Flex
        mt="20"
        align="center"
        p="2"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        onClick={handleLogout}
      >
        <LogoutButton />
      </Flex>
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}
