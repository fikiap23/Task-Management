/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
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

const LinkItems = [
  { name: 'Home', icon: AiOutlineHome, path: '/' },
  { name: 'Tasks', icon: BiTask, path: '/subjects' },
  { name: 'Notes', icon: CiStickyNote, path: '/notes' },
  { name: 'Favourites', icon: AiOutlineStar, path: '/favourites' },
  { name: 'Tools', icon: PiToolboxLight, path: '/tools' },
  { name: 'Settings', icon: FiSettings, path: '/settings' },
]

const Navbar = ({ user }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const { toggleColorMode } = useColorMode()
  // if (window.innerWidth >= 768) {
  //   setDropdownOpen(false)
  // }

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className="w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <nav
        className={`${
          useColorMode().colorMode === 'light' ? 'bg-white' : 'bg-gray-800'
        } border-gray-200 dark:bg-gray-900 dark:border-gray-700`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <FcAddressBook size={40} className="h-6 sm:h-9" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              TaskPlus
            </span>
          </Link>
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
          <div
            className={`${
              isDropdownOpen ? 'block' : 'hidden'
            } w-full md:block md:w-auto`}
            id="navbar-dropdown"
          >
            {!isDropdownOpen && (
              <ul
                className={`${
                  useColorMode().colorMode === 'light'
                    ? 'bg-white'
                    : 'bg-gray-800'
                } ${
                  useColorMode().colorMode === 'light'
                    ? 'text-black'
                    : 'text-white'
                } flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 `}
              >
                <li className="flex items-center">
                  <button onClick={toggleColorMode}>
                    {useColorMode().colorMode === 'light' ? (
                      <MdDarkMode />
                    ) : (
                      <MdOutlineDarkMode />
                    )}
                  </button>
                </li>
                {!user && (
                  <>
                    <li>
                      <Link
                        to="/"
                        className="block py-2 pl-3 pr-4  bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                        aria-current="page"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/auth"
                        className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500  md:dark:hover:bg-transparent"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/auth"
                        className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500  md:dark:hover:bg-transparent"
                      >
                        Signup
                      </Link>
                    </li>
                  </>
                )}

                {user && (
                  <>
                    <li>
                      <span
                        className="block py-1
                     pl-3 pr-4 rounded bg-gray-800 text-white"
                      >
                        Welcome, {user.name}
                      </span>
                    </li>
                    <li>
                      <Flex alignItems={'center'}>
                        <Menu>
                          <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}
                          >
                            <Avatar size={'sm'} />
                          </MenuButton>
                          <MenuList>
                            <MenuItem>Link 1</MenuItem>
                            <MenuItem>Link 2</MenuItem>
                            <MenuDivider />
                            <MenuItem>Link 3</MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                    </li>
                  </>
                )}
              </ul>
            )}

            {isDropdownOpen && (
              <ul
                className={`${
                  useColorMode().colorMode === 'light'
                    ? 'bg-white'
                    : 'bg-gray-800'
                } ${
                  useColorMode().colorMode === 'light'
                    ? 'text-black'
                    : 'text-white'
                } flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 `}
              >
                <li className="flex items-center">
                  <button onClick={toggleColorMode}>
                    {useColorMode().colorMode === 'light' ? (
                      <MdDarkMode />
                    ) : (
                      <MdOutlineDarkMode />
                    )}
                  </button>
                </li>
                {!user && (
                  <>
                    <li>
                      <Link
                        to="/"
                        className="block py-2 pl-3 pr-4  bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                        aria-current="page"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/auth"
                        className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500  md:dark:hover:bg-transparent"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/auth"
                        className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500  md:dark:hover:bg-transparent"
                      >
                        Signup
                      </Link>
                    </li>
                  </>
                )}

                {user && (
                  <>
                    {LinkItems.map((item) => (
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
                    ))}
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
