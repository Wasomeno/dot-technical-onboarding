import { Flex } from "antd";
import Title from "antd/es/typography/Title";

export default function Home() {
  return (
    <main style={{ flex: "1 1 0%", display: "flex" }}>
      <Flex align="center" justify="center" flex="1 1 0%">
        <Title>Movie App Initial Page</Title>
      </Flex>
    </main>
  );
}
