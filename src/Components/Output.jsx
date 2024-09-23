/* eslint-disable react/prop-types */
import { Box, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

const Output = ({ sourceCode, selectedLanguage }) => {
  const [output, setOutput] = useState();
  const [isError, setIsError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const runCode = async () => {
    setIsLoading(true);
    if (sourceCode === "") {
      setOutput([]);
      setIsError(false);
      setIsLoading(false);
      return;
    }
    try {
      const { run: result } = await executeCode(selectedLanguage, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
      if (result) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
        position: "top",
      });
      setIsLoading(false);
    }
  };

  // Debounce function to avoid running on every keystroke
  const debouncedRunCode = useCallback(debounce(runCode, 2000), [
    sourceCode,
    selectedLanguage,
  ]);

  // Effect to add the content change listener
  useEffect(() => {
    debouncedRunCode();

    return () => debouncedRunCode.cancel();
  }, [debouncedRunCode]);

  return (
    <Box>
      <Box
        color={isError ? "red.400" : ""}
        height="calc(100vh - 75px)"
        p={4}
        borderTop="1px solid"
        borderLeft="1px solid"
        borderRadius={7}
        borderColor="#9a9a9c"
        position="relative"
      >
        {isLoading ? (
          <Flex justify="center" align="center" height="100%" width="100%">
            <Spinner size="xl" thickness="2px" />
          </Flex>
        ) : (
          <Box overflowY="auto" position="absolute" top={4} left={4}>
            {output &&
              output.map((line, i) => (
                <Text fontSize="sm" key={i}>
                  {line}
                </Text>
              ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Output;
