"use client";

import {
  getTVShowsByGenreQueryOptions,
  TTVShowGenres,
} from "@/queryOptions/tv-shows";
import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import SkeletonInput from "antd/es/skeleton/Input";
import React from "react";
import { TVShowPosterCard } from "./tv-show-poster-card";
import Title from "antd/es/typography/Title";

export const TVShowsSection: React.FC<{
  title: string;
  genreName: TTVShowGenres;
}> = ({ title, genreName }) => {
  const shows = useQuery(getTVShowsByGenreQueryOptions({ genreName }));

  const skeleton = Array(8).fill(
    <Col lg={3} xs={12}>
      <SkeletonInput
        active
        style={{ height: "16rem", width: "100%", backgroundColor: "grey" }}
      />
    </Col>
  );

  return (
    <div>
      <Title
        level={5}
        style={{
          lineHeight: 3,
          margin: 0,
          color: "white",
        }}
      >
        {title}
      </Title>
      {shows.isLoading && (
        <Row justify="start" align="middle" gutter={[10, 10]}>
          {skeleton}
        </Row>
      )}
      {!shows.isLoading && (
        <Row justify="start" align="middle" gutter={[10, 10]}>
          {shows.data?.results?.map((tvShow) => (
            <TVShowPosterCard key={tvShow.id} tvShow={tvShow} />
          ))}
        </Row>
      )}
    </div>
  );
};
