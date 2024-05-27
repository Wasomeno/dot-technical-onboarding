"use client";

import {
  getMovieByGenreQueryOptions,
  TMovieGenres,
} from "@/queryOptions/movies";

import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import SkeletonInput from "antd/es/skeleton/Input";

import React from "react";
import { MoviePosterCard } from "./movie-poster-card";
import Title from "antd/es/typography/Title";

export const MoviesSection: React.FC<{
  title: string;
  genreName: TMovieGenres;
}> = ({ title, genreName }) => {
  const movies = useQuery(getMovieByGenreQueryOptions({ genreName }));

  const skeleton = Array(8).fill(
    <Col xs={12} lg={3}>
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
      {movies.isLoading && (
        <Row justify="start" align="middle" gutter={[10, 10]}>
          {skeleton}
        </Row>
      )}
      {!movies.isLoading && (
        <Row justify="start" align="middle" gutter={[10, 10]}>
          {movies?.data?.results.map((movie) => (
            <MoviePosterCard key={movie.id} movie={movie} />
          ))}
        </Row>
      )}
    </div>
  );
};
