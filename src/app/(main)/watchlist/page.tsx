import { AddWatchlistModal } from "@/components/watchlist/add-watchlist-modal";
import { EditWatchlistModal } from "@/components/watchlist/edit-watchlist-modal";
import { WatchlistList } from "@/components/watchlist/watchlist-list";
import { ROUTES } from "@/constants/route";
import { PlusOutlined } from "@ant-design/icons";
import { currentUser } from "@clerk/nextjs/server";
import { Button, Flex } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function WatchlistPage() {
  const session = await currentUser();

  if (!session) {
    redirect(ROUTES.SIGNIN);
  }

  return (
    <Flex flex="1 1 0%" vertical style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={1} className="title___level-one">
          Watchlist
        </Title>
        <Link href={"?add=true"} scroll={false} replace>
          <Button size="middle" icon={<PlusOutlined />}>
            Watchlist
          </Button>
        </Link>
      </div>
      <WatchlistList />
      <AddWatchlistModal />
      <EditWatchlistModal />
    </Flex>
  );
}
