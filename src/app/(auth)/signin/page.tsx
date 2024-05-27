import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";

const SignInPage = () => {
  return (
    <main
      style={{
        flex: "1 1 0%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
        padding: "2rem",
      }}
    >
      <div
        style={{
          flex: "1 1 0%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <h1
            style={{
              color: "white",
              margin: 0,
              lineHeight: 1.5,
              fontFamily: "sans-serif",
            }}
          >
            Sign In
          </h1>
          <p style={{ color: "white", margin: 0, fontFamily: "sans-serif" }}>
            Sign in with socials or credentials
          </p>
        </div>
        <Form name="basic" labelCol={{ span: 24 }} autoComplete="off">
          <FormItem name="username">
            <label style={{ color: "white", lineHeight: 2.5 }}>Email</label>
            <Input />
          </FormItem>

          <FormItem name="password">
            <label style={{ color: "white", lineHeight: 2.5 }}>Password</label>
            <Input />
          </FormItem>

          <Button type="default" style={{ width: "100%" }}>
            Sign In
          </Button>
        </Form>
      </div>
      <Row>
        <Col>
          <span
            style={{
              fontWeight: "bold",
              letterSpacing: "1px",
              fontSize: "1rem",
              color: "#E50914",
            }}
          >
            DOTFLIX
          </span>
        </Col>
      </Row>
    </main>
  );
};

export default SignInPage;
