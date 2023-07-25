import { Box, Select } from "@chakra-ui/react";
import { NONE_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants";
import { SectionType, SelectorProps, ToSupportedLanguage } from "../types/types.ts";

export const Selector = ({ onChange, value, type }: SelectorProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as ToSupportedLanguage)
  }

  return (
    <Box w='full'>
      <Select
        color='white'
        borderColor={'#303030'}
        bg="transparent"
        _hover={{ bg: '#202020', borderColor: '#505050' }}
        _focus={{ bg: '#303030', color: 'white' }}
        size='lg'
        value={value}
        onChange={handleOnChange}
        css={'option { background-color: #303030; margin: 12px; border-radius: 0;}'}
      >
        {type === SectionType.source && <option className='option'
          value={NONE_LANGUAGE} selected >Select a language...</option>}
        {Object.entries(SUPPORTED_LANGUAGES).map((
          [key, literal]) => (
          <option
            className='option'
            key={key}
            value={key}
          >
            {literal}
          </option>
        ))}
      </Select>
    </Box >
  )
}