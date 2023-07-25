import { Button, Flex, HStack, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import { Selector } from './components/Selector'
import TextArea from './components/TextArea'
import { SwitchIcon } from './components/Icons'
import { useReducerHook } from './hooks/useReducerHook'
import { SectionType } from './types/types.ts'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const {
    source,
    target,
    sourceText,
    translation,
    INTERCHANGE_LANG,
    SET_SOURCE_LANG,
    SET_SOURCE_TEXT,
    SET_TARGET_LANG,
    SET_TRANSLATION,
  } = useReducerHook();

  const handleClick = async () => {
    const encodedParams = new URLSearchParams()
    encodedParams.set('source_language', source)
    encodedParams.set('target_language', target)
    encodedParams.set('text', sourceText)
    try {
      SET_TRANSLATION('Translating...')
      const options = {
        url: import.meta.env.VITE_TXT_TRANSLATOR2_URL,
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': import.meta.env.VITE_TXT_TRANSLATOR2_API_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_TXT_TRANSLATOR2_HOST
        },
        data: encodedParams
      }
      const result = await axios.request(options)
      SET_TRANSLATION(result.data.data.translatedText)
      toast.success('Translated!')
    } catch (error) {
      SET_TRANSLATION('')
      toast.error(`ERROR: ${error.response.data.message}!`)
    }
  };

  return (
    <Flex as='main'
      flexDir="column"
      w="100%"
      minH="100vh"
      color="white"
      alignItems="center"
      justifyContent="start"
      bg='#131313'
      pb="10"
    >
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          success: {
            duration: 2500,
          },
          error: {
            duration: 2500,
          }
        }}
      />
      <HStack my="10">
        <Text fontSize='2xl'>Translator</Text>
      </HStack>
      <Stack
        maxW={"880px"}
        w="full"
        h="fit-content"
        justifyContent="center"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <HStack w="full" h="fit-content" py="7">
          <VStack w="full" spacing={4} mx={10}>
            <Selector
              type={SectionType.source}
              value={source}
              onChange={SET_SOURCE_LANG}
            />
            <TextArea
              type={SectionType.source}
              placeholder="Enter your text"
              value={sourceText}
              onChange={SET_SOURCE_TEXT}
            />
          </VStack>
        </HStack>
        <HStack w="fit-content" h="fit-content" mx='auto' py="7">
          <IconButton
            transform={'auto'}
            rotate={{ base: 90, md: 0 }}
            onClick={INTERCHANGE_LANG}
            color="#A0A0A0"
            borderColor={"#303030"}
            bg="transparent"
            _hover={{ bg: "#202020", borderColor: "#505050", color: "white" }}
            _disabled={{
              bg: "transparent",
              borderColor: "#990F02",
              color: "#990F02",
              cursor: "not-allowed",
            }}
            w="fit-content"
            aria-label="Interchange Language"
            size="lg"
            icon={<SwitchIcon />}
          />
        </HStack>
        <HStack w="full" h="fit-content" py="7">
          <VStack w="full" spacing={4} mx={10}>
            <Selector
              type={SectionType.target}
              value={target}
              onChange={SET_TARGET_LANG}
            />
            <TextArea
              type={SectionType.target}
              placeholder="Translation"
              value={translation}
              onChange={SET_TRANSLATION}
            />
          </VStack>
        </HStack>
      </Stack>
      <HStack>
        <Button
          color="#d9d9d9"
          border={'1px'}
          borderColor={'#303030'}
          bg="transparent"
          _hover={{ bg: "#303030", borderColor: "#505050", color: "white" }}
          _disabled={{
            bg: "transparent",
            borderColor: "#990F02",
            color: "#990F02",
            cursor: "not-allowed",
          }}
          onClick={handleClick}
        >
          Go Translate</Button>
      </HStack>
    </Flex>
  )
}

export default App