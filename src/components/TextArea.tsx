import { Box, Textarea } from "@chakra-ui/react";
import { SectionType, TextAreaProps } from "../types/types";

export default function TextArea({ type, placeholder, value, onChange }: TextAreaProps) {

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <Box w='full'>
      <Textarea
        focusBorderColor="transparent"
        autoFocus={type === SectionType.source}
        variant={'filled'}
        border={'1px'}
        borderColor={'#303030'}
        bg="transparent"
        _hover={{ bg: '#202020', borderColor: '#505050', color: 'white' }}
        _focus={{ bg: '#303030', color: 'white' }}
        placeholder={placeholder}
        size={'md'}
        value={value}
        onChange={handleOnChange}
      />
    </Box>
  )
}