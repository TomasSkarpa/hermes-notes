import Link from "next/link";
import { Flex, Text, VStack } from "@chakra-ui/react";
import SocialIcons from "../SocialIcons";

export default function Footer() {
  return (
    <VStack
      gap={4}
      align="center"
      pt={{ base: 8, md: 12 }}
      mt={{ base: 8, md: 12 }}
    >
      <SocialIcons />
      <Flex justifyContent="center" pt={4}>
        <Text data-cy="footer-text" mr={1} fontWeight="medium">
          Powered by
        </Text>
        <Link
          data-cy="author-link"
          href="https://github.com/TomasSkarpa"
          target="_blank"
          rel="noreferrer"
        >
          <Text
            data-cy="author-name"
            color="blue.500"
            _dark={{ color: "blue.400" }}
            fontWeight="semibold"
          >
            TomasSkarpa
          </Text>
        </Link>
      </Flex>
    </VStack>
  );
}
