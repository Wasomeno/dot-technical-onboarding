import { ROUTES } from "@/constants/route";
import { HomeFilled } from "@ant-design/icons";
import { Flex, Space } from "antd";
import Link from "next/link";
import React from "react";
import { IoIosTv } from "react-icons/io";
import { MdMovieCreation } from "react-icons/md";

import "./style.css";

export const MobileNavigation = () => {
  return (
    <Flex justify="space-evenly" align="center" className="mobile-navigation">
      <Link href={ROUTES.HOME}>
        <Space direction="vertical" align="center" size={5}>
          <HomeFilled style={{ color: "#e50914" }} />
          <span style={{ color: "white", fontSize: "16px" }}>Home</span>
        </Space>
      </Link>
      <Link href={ROUTES.MOVIES}>
        <Space direction="vertical" align="center" size={5}>
          <MdMovieCreation style={{ color: "#e50914" }} />
          <span style={{ color: "white", fontSize: "16px" }}>Movies</span>
        </Space>
      </Link>
      <Link href={ROUTES.TVSHOWS}>
        <Space direction="vertical" align="center" size={5}>
          <IoIosTv style={{ color: "#e50914" }} />
          <span style={{ color: "white", fontSize: "16px" }}>TV Shows</span>
        </Space>
      </Link>
    </Flex>
  );
};
