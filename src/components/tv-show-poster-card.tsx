import { TVSHOW_API_URL } from "@/constants/common";
import { useTVShowPreviewURL } from "@/utils/common";
import { Col } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const TVShowPosterCard: React.FC<{ tvShow: any }> = ({ tvShow }) => {
  const tvShowPreviewURL = useTVShowPreviewURL(tvShow.id);

  return (
    <Col key={tvShow.id} lg={3} xs={12}>
      <Link href={tvShowPreviewURL} replace scroll={false}>
        <div
          style={{
            height: "16rem",
            width: "100%",
            backgroundColor: "grey",
            position: "relative",
          }}
        >
          <Image
            src={TVSHOW_API_URL.IMAGE(tvShow.poster_path)}
            alt={tvShow.name}
            quality={25}
            fill
          />
        </div>
      </Link>
    </Col>
  );
};
