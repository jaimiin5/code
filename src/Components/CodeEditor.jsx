import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import {
  Box,
  HStack,
  Tag,
  Text,
  Tooltip,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Output from "./Output";
import { CODE_SNIPPETS } from "../Constants";

const CodeEditor = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [sourceCode, setSourceCode] = useState(CODE_SNIPPETS[selectedLanguage]);
  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setSelectedLanguage(language);
    setSourceCode(CODE_SNIPPETS[language]);
  };

  const Stack = useBreakpointValue({ base: VStack, md: HStack });
  const width = useBreakpointValue({ base: "100%", md: "50%" });
  
  return (
    <Stack h="100vh">
      <Box w={width}>
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onSelect={onSelect}
        />
        <Box
          borderTop="1px solid"
          borderRadius={7}
          paddingTop={3}
          borderColor="#9a9a9c"
          position="relative"
        >
          <Editor
            value={sourceCode}
            onChange={(value) => {
              setSourceCode(value);
            }}
            onMount={onMount}
            height="calc(100vh - 90px)"
            width={width === "100%" ? "100%" : `calc(50vw - 12px)`}
            theme="vs-dark"
            defaultLanguage={selectedLanguage}
            defaultValue={CODE_SNIPPETS[selectedLanguage]}
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: width === "100%" ? 12 : 13.6,
              cursorStyle: "line",
              wordWrap: "on",
            }}
          />
        </Box>
      </Box>
      <Box w={width} display="flex" flexDirection="column">
        <Text
          marginTop="15px"
          marginBottom="19px"
          marginLeft="20px"
          fontSize="md"
        >
          <Tooltip label="Output will auto generate">
            <Tag h={9}>OUTPUT</Tag>
          </Tooltip>
        </Text>
        <Output sourceCode={sourceCode} selectedLanguage={selectedLanguage} />
      </Box>
    </Stack>
  );
};

export default CodeEditor;
