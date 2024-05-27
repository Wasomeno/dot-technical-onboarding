import { MOVIE_API_URL } from "@/constants/common";
import { useMovieShowPreviewURL } from "@/utils/common";
import { Col } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const MoviePosterCard: React.FC<{ movie: any }> = ({ movie }) => {
  const moviePreviewURL = useMovieShowPreviewURL(movie.id);

  return (
    <Col key={movie.id} xs={12} lg={3}>
      <Link href={moviePreviewURL} replace scroll={false}>
        <div
          style={{
            height: "16rem",
            width: "100%",
            backgroundColor: "grey",
            position: "relative",
          }}
        >
          <Image
            src={MOVIE_API_URL.IMAGE(movie.poster_path)}
            alt={movie.title}
            quality={25}
            fill
          />
        </div>
      </Link>
    </Col>
  );
};
