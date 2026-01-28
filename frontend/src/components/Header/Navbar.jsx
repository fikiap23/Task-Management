/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  useColorMode,
  Icon,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'
import { FcAddressBook } from 'react-icons/fc'
import { AiOutlineHome, AiOutlineStar } from 'react-icons/ai'
import { CiStickyNote } from 'react-icons/ci'
import { FiSettings } from 'react-icons/fi'
import { PiToolboxLight } from 'react-icons/pi'
import { BiTask } from 'react-icons/bi'

const LINK_ITEMS = [
  { name: 'Home', icon: AiOutlineHome, path: '/' },
  { name: 'Tasks', icon: BiTask, path: '/subjects' },
  { name: 'Notes', icon: CiStickyNote, path: '/notes' },
  { name: 'Favourites', icon: AiOutlineStar, path: '/favourites' },
  { name: 'Tools', icon: PiToolboxLight, path: '/tools' },
  { name: 'Settings', icon: FiSettings, path: '/settings' },
]

const Navbar = ({ user }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  const isLightMode = colorMode === 'light'

  return (
    <div className="w-full dark:bg-gray-800">
      <nav className={`${isLightMode ? 'bg-white' : 'bg-gray-800'}`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <FcAddressBook size={40} className="h-6 sm:h-9" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              TaskPlus
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleDropdown}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded={isDropdownOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navigation menu */}
          <div
            className={`${isDropdownOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
            id="navbar-dropdown"
          >
            <ul
              className={`${isLightMode ? 'bg-white' : 'bg-gray-800'} ${isLightMode ? 'text-black' : 'text-white'} flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0`}
            >
              {/* Dark mode toggle */}
              <li className="flex items-center">
                <button
                  onClick={toggleColorMode}
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Toggle dark mode"
                >
                  {isLightMode ? (
                    <MdDarkMode size={20} />
                  ) : (
                    <MdOutlineDarkMode size={20} />
                  )}
                </button>
              </li>

              {/* Guest navigation */}
              {!user && (
                <>
                  <li>
                    <Link
                      to="/"
                      className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/auth"
                      className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:text-white"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/auth"
                      className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:text-white"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}

              {/* Authenticated user navigation */}
              {user && (
                <>
                  {/* Mobile navigation links */}
                  {isDropdownOpen &&
                    LINK_ITEMS.map((item) => (
                      <li key={item.path}>
                        <Link to={item.path} style={{ textDecoration: 'none' }}>
                          <Flex
                            align="center"
                            p="4"
                            borderRadius="lg"
                            role="group"
                            cursor="pointer"
                            _hover={{
                              bg: 'cyan.400',
                              color: 'white',
                            }}
                          >
                            <Icon
                              mr="4"
                              fontSize="16"
                              _groupHover={{
                                color: 'white',
                              }}
                              as={item.icon}
                            />
                            {item.name}
                          </Flex>
                        </Link>
                      </li>
                    ))}

                  {/* Desktop user menu */}
                  {!isDropdownOpen && (
                    <>
                      <li>
                        <span className="block py-1 pl-3 pr-4 rounded bg-gray-800 text-white dark:bg-gray-700">
                          Welcome, {user.name}
                        </span>
                      </li>
                      <li>
                        <Flex alignItems="center">
                          <Menu>
                            <MenuButton
                              as={Button}
                              rounded="full"
                              variant="link"
                              cursor="pointer"
                              minW={0}
                            >
                              <Avatar size="sm" name={user.name} />
                            </MenuButton>
                            <MenuList>
                              <MenuItem>Profile</MenuItem>
                              <MenuItem>Account Settings</MenuItem>
                              <MenuDivider />
                              <MenuItem>Logout</MenuItem>
                            </MenuList>
                          </Menu>
                        </Flex>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
