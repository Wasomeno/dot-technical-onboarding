"use client";

import { Col, Row } from "antd";
import React from "react";

export const MoviesSection: React.FC<{
  title: string;
  movies?: Promise<any>;
}> = ({ title }) => {
  const skeleton = Array(6).fill(
    <Col span={4}>
      <div style={{ height: "8rem", width: "100%", backgroundColor: "grey" }} />
    </Col>
  );

  return (
    <div>
      <h5
        style={{
          lineHeight: 3,
          margin: 0,
          fontSize: "18px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {title}
      </h5>
      <Row justify="start" align="middle" gutter={10}>
        {skeleton}
      </Row>
    </div>
  );
};
