import { Box, Button, Text } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../Constants";

// eslint-disable-next-line react/prop-types
const LanguageSelector = ({ selectedLanguage, onSelect }) => {
  const language = Object.entries(LANGUAGE_VERSIONS);
  const ActiveColor = "blue.400";
  return (
    <Box margin={4}>
      <Menu isLazy>
        <MenuButton as={Button}>{selectedLanguage}</MenuButton>
        <MenuList bg="#1E1E1E">
          {language.map(([language, version]) => (
            <MenuItem
              key={language}
              onClick={() => onSelect(language)}
              color={language === selectedLanguage ? ActiveColor : ""}
              bg={language === selectedLanguage ? "gray.900" : "transparent"}
              _hover={{
                color: ActiveColor,
                bg: "gray.900",
              }}
            >
              {language}
              &nbsp;
              <Text as="span" color="gray.500" fontSize="sm">
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
