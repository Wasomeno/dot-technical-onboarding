"use client";

import { MOVIE_API_URL } from "@/constants/common";
import { getMovieByIdQueryOptions } from "@/queryOptions/movies";
import { StarOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Modal, Row, Tag } from "antd";
import SkeletonImage from "antd/es/skeleton/Image";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const MoviePreviewModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const movieId = searchParams.get("movieId");
  const isOpen = movieId !== null;

  const movie = useQuery(getMovieByIdQueryOptions({ id: movieId as string }));

  function closeModal() {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.delete("movieId");
    router.replace(`${pathname}?${urlSearchParams.toString()}`, {
      scroll: false,
    });
  }

  return (
    <Modal
      width="750px"
      onCancel={closeModal}
      centered
      open={isOpen}
      footer={
        <Flex align="center" justify="end" style={{ padding: "2rem" }}>
          <Button
            type="default"
            disabled={movie.isLoading}
            iconPosition="start"
            icon={<StarOutlined />}
          >
            Add To Watchlist
          </Button>
        </Flex>
      }
      styles={{
        content: {
          backgroundColor: "#000",
          color: "white",
          padding: 0,
          overflow: "hidden",
        },
      }}
    >
      <div style={{ position: "relative", height: "20rem", lineHeight: 2 }}>
        {movie.isLoading && !movie.data ? (
          <SkeletonImage
            active
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: "0px",
              objectFit: "cover",
              backgroundColor: "gray",
            }}
          />
        ) : null}

        {!movie.isLoading && movie.data ? (
          <Image
            src={MOVIE_API_URL.IMAGE(movie.data?.backdrop_path)}
            alt={movie.data?.title}
            style={{
              objectFit: "cover",
              opacity: "60%",
            }}
            quality={50}
            fill
          />
        ) : null}

        <Flex
          style={{ position: "absolute", left: 20, bottom: 10 }}
          vertical
          gap={4}
        >
          {!movie.isLoading && movie.data ? (
            <Title level={3} style={{ color: "white", margin: 0 }}>
              {`${movie.data?.title} (${new Date(
                movie.data?.release_date
              ).getFullYear()})`}
            </Title>
          ) : null}

          {!movie.isLoading && movie.data ? (
            <span>{movie.data.runtime} Minutes</span>
          ) : null}
          <Row>
            {!movie.isLoading &&
              movie.data?.genres.map((genre) => (
                <Tag key={genre.id} color="#E50914">
                  {genre.name}
                </Tag>
              ))}
          </Row>
        </Flex>
      </div>

      {!movie.isLoading ? (
        <div style={{ padding: "0 20px 0 20px" }}>
          <Title level={4} style={{ color: "white" }}>
            Overview
          </Title>
          <Paragraph style={{ color: "white" }}>
            {movie.data?.overview}
          </Paragraph>
        </div>
      ) : null}

      {!movie.isLoading ? (
        <div style={{ padding: "0 20px 0 20px" }}>
          <Title level={4} style={{ color: "white" }}>
            Cast
          </Title>
          <Paragraph style={{ color: "white" }}>
            {movie.data?.credits.cast.map((cast) => cast.name).join(", ")}
          </Paragraph>
        </div>
      ) : null}
    </Modal>
  );
};
