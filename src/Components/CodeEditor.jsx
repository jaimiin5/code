import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { Box, HStack } from "@chakra-ui/react";
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

  return (
    <Box>
      <HStack>
        <Box w="50%">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onSelect={onSelect}
          />
          <Editor
            value={sourceCode}
            onChange={(value) => {
              setSourceCode(value);
            }}
            onMount={onMount}
            height="90vh"
            width="50vw"
            theme="vs-dark"
            //Cobalt, Night Owl
            defaultLanguage={selectedLanguage}
            defaultValue={CODE_SNIPPETS[selectedLanguage]}
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 15,
              cursorStyle: "line",
              wordWrap: "on",
            }}
          />
        </Box>
        <Output sourceCode={sourceCode} selectedLanguage={selectedLanguage} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
