  /* eslint-disable react/prop-types */
  import { Box, Spinner, Text, useToast } from "@chakra-ui/react";
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
    const debouncedRunCode = useCallback(debounce(runCode, 4000), [
      sourceCode,
      selectedLanguage,
    ]);

    // Effect to add the content change listener
    useEffect(() => {
      debouncedRunCode();

      return () => debouncedRunCode.cancel();
    }, [debouncedRunCode]);

    return (
      <Box w="50%" height='90vh'>
        <Text mb={3} fontSize="lg">
          Output
        </Text>
        <Box
          color={isError ? "red.600" : ""}
          height="90vh"
          p={4}
          border="1px solid"
          borderRadius={7}
          borderColor="#333"
        >
          {output ? output.map((line, i) => <Text key={i}>{line}</Text>) : ""}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70vh"
          >
            {isLoading && <Spinner size="xl" />}
          </Box>
        </Box>
      </Box>
    );
  };

  export default Output;
