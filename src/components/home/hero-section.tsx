"use client";

import { MOVIE_API_URL, TVSHOW_API_URL } from "@/constants/common";
import { getPopularMovies } from "@/queryOptions/movies";
import { getPopularTVShows } from "@/queryOptions/tv-shows";
import { useQuery } from "@tanstack/react-query";
import { Carousel, Space, Tag } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import React from "react";

import "./style.css";
import SkeletonImage from "antd/es/skeleton/Image";

export const HeroSection = () => {
  const movies = useQuery(getPopularMovies());
  const tvShows = useQuery(getPopularTVShows());

  return (
    <Carousel arrows infinite={false} autoplay={false}>
      <div>
        {movies.isLoading && !movies.data ? (
          <SkeletonButton active className="carousel__item__skeleton" />
        ) : null}
        {!movies.isLoading && movies.data ? (
          <div className="carousel__item">
            <Image
              src={MOVIE_API_URL.IMAGE(movies.data.results[0].backdrop_path)}
              alt={movies.data.results[0].title}
              style={{ opacity: "50%", objectFit: "cover" }}
              fill
            />
            <Space
              direction="vertical"
              size="small"
              className="carousel__item__info-section "
            >
              <Tag>Top #1 Movie</Tag>
              <Title level={1} className="carousel__item__title">
                {movies.data.results[0].title}
              </Title>
              <Paragraph
                className="carousel__item__description"
                ellipsis={{ rows: 2 }}
              >
                {movies.data.results[0].overview}
              </Paragraph>
            </Space>
          </div>
        ) : null}
      </div>

      <div>
        {tvShows.isLoading && !tvShows.data ? (
          <SkeletonButton active className="carousel__item__skeleton" />
        ) : null}

        {!tvShows.isLoading && tvShows.data ? (
          <div className="carousel__item">
            <Image
              src={TVSHOW_API_URL.IMAGE(tvShows.data.results[0].backdrop_path)}
              alt={tvShows.data.results[0].name}
              style={{ opacity: "50%", objectFit: "cover" }}
              fill
            />
            <Space
              direction="vertical"
              className="carousel__item__info-section"
            >
              <Tag color="">Top #1 TV Show</Tag>
              <Title level={1} className="carousel__item__title">
                {tvShows.data.results[0].name}
              </Title>
              <Paragraph
                ellipsis={{ rows: 2 }}
                className="carousel__item__description"
              >
                {tvShows.data.results[0].overview}
              </Paragraph>
            </Space>
          </div>
        ) : null}
      </div>
    </Carousel>
  );
};
