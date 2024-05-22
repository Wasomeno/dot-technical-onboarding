"use client";

import { Col, Flex, Row } from "antd";
import Link from "next/link";
import React from "react";

export const MainNavigation = () => {
  return (
    <nav
      style={{
        display: "flex",
        width: "100vw",
        position: "sticky",
        top: 0,
        paddingInline: "1rem",
      }}
    >
      <Row
        align="middle"
        justify="space-between"
        style={{ width: "100%", height: "4rem" }}
      >
        <Col span={6}>
          <Row style={{ width: "100%" }} justify="start" gutter={16}>
            <Col span={6} style={{ textAlign: "center" }}>
              <Link href="">Home</Link>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <Link href="">Movies</Link>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <Link href="">TV Shows</Link>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Flex justify="center">
            <span
              style={{
                fontWeight: "bold",
                letterSpacing: "1px",
                fontSize: "2rem",
                color: "#E50914",
              }}
            >
              DOTFLIX
            </span>
          </Flex>
        </Col>
        <Col span={6}>
          <Row style={{ width: "100%" }} justify="end" gutter={16}>
            <Col span={6} style={{ textAlign: "center" }}>
              <Link href="">Search</Link>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <Link href="">Sign In</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </nav>
  );
};
