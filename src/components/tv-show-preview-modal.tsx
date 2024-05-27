"use client";

import { TVSHOW_API_URL } from "@/constants/common";
import { getTVShowByIdQueryOptions } from "@/queryOptions/tv-shows";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Modal, Row, Skeleton, Tag } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import SkeletonImage from "antd/es/skeleton/Image";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const TVShowPreviewModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const showId = searchParams.get("showId");
  const isOpen = showId !== null;

  const show = useQuery(getTVShowByIdQueryOptions({ id: showId as string }));

  function closeModal() {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.delete("showId");
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
          <Button iconPosition="end" icon={<ArrowRightOutlined />}>
            View Details
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
        {show.isLoading || !show.data ? (
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

        {!show.isLoading && show.data ? (
          <Image
            src={TVSHOW_API_URL.IMAGE(show.data?.backdrop_path)}
            alt={show.data?.name}
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
          {show.isLoading || !show.data ? (
            <SkeletonButton active style={{ backgroundColor: "gray" }} />
          ) : null}

          {!show.isLoading && show.data ? (
            <Title level={3} style={{ color: "white", margin: 0 }}>
              {`${show.data?.name} (${new Date(
                show.data?.first_air_date
              ).getFullYear()})`}
            </Title>
          ) : null}

          <span>{show.data?.episode_run_time} Minutes</span>
          <Row>
            {show.isLoading
              ? Array(3).fill(
                  <SkeletonButton
                    active
                    style={{
                      width: "5rem",
                      height: "22px",
                      marginRight: "0.75rem",
                      backgroundColor: "gray",
                    }}
                  />
                )
              : show.data?.genres.map((genre) => (
                  <Tag key={genre.id} color="#E50914">
                    {genre.name}
                  </Tag>
                ))}
          </Row>
        </Flex>
      </div>
      <div style={{ padding: "0 20px 0 20px" }}>
        <Title level={4} style={{ color: "white" }}>
          Cast
        </Title>
        {show.isLoading ? (
          <Skeleton active />
        ) : (
          <Paragraph style={{ color: "white" }}>
            {show.data?.credits.cast.map((cast) => cast.name).join(", ")}
          </Paragraph>
        )}
      </div>
    </Modal>
  );
};
