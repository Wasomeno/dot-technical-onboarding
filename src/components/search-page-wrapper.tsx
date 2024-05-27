"use client";

import { searchQueryOptions } from "@/queryOptions/search";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Flex, Space } from "antd";
import SkeletonInput from "antd/es/skeleton/Input";
import Title from "antd/es/typography/Title";
import { useSearchParams } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { MoviePosterCard } from "./movie-poster-card";
import { TVShowPosterCard } from "./tv-show-poster-card";

export const SearchPageWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search");

  const isSearch = searchQuery != null;

  const results = useQuery(searchQueryOptions(searchQuery as string));

  const skeleton = Array(24).fill(
    <Col lg={3} xs={12}>
      <SkeletonInput
        active
        style={{ height: "16rem", width: "100%", backgroundColor: "grey" }}
      />
    </Col>
  );

  return isSearch ? (
    <Flex flex="1 1 0%" gap={12} vertical style={{ padding: "1rem" }}>
      {results.isLoading && (
        <Row justify="start" align="middle" gutter={[10, 10]}>
          {skeleton}
        </Row>
      )}
      {!results.isLoading && results.data
        ? results?.data[0].results.length && (
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Title level={5} style={{ color: "white", margin: 0 }}>
                Movies
              </Title>
              <Row justify="start" align="middle" gutter={[10, 10]}>
                {results.data[0].results.map((movie) => (
                  <MoviePosterCard key={movie.id} movie={movie} />
                ))}
              </Row>
            </Space>
          )
        : null}

      {!results.isLoading && results.data
        ? results?.data[1].results.length && (
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Title level={5} style={{ color: "white", margin: 0 }}>
                TV Shows
              </Title>
              <Row justify="start" align="middle" gutter={[10, 10]}>
                {results.data[1].results.map((show) => (
                  <TVShowPosterCard key={show.id} tvShow={show} />
                ))}
              </Row>
            </Space>
          )
        : null}
      {!results.isLoading && results.data ? (
        !results.data[0].results.length && !results.data[1].results.length ? (
          <Flex flex="1 1 0%" justify="center" align="center">
            <span style={{ color: "white", fontFamily: "sans-serif" }}>
              No matches Found
            </span>
          </Flex>
        ) : null
      ) : null}
    </Flex>
  ) : (
    children
  );
};
