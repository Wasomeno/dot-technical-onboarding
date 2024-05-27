import { Logo } from "@/components/logo";
import { SignIn } from "@clerk/nextjs";
import { Col, Flex, Row } from "antd";
import React from "react";

const SignInPage = () => {
  return (
    <Flex
      flex="1 1 0%"
      justify="center"
      align="center"
      vertical
      style={{
        padding: "2rem",
      }}
    >
      <Flex flex="1 1 0%" justify="center" align="center">
        <SignIn />;
      </Flex>
      <Row>
        <Col>
          <Logo size="small" />
        </Col>
      </Row>
    </Flex>
  );
};

export default SignInPage;
