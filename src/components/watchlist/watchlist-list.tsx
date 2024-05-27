"use client";

import { ROUTES } from "@/constants/route";
import { getWatchlistListQueryOptions } from "@/queryOptions/watchlist";
import { useUser } from "@clerk/nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Flex, Space, Button, Row, Col, Card } from "antd";
import SkeletonButton from "antd/es/skeleton/Button";
import Link from "next/link";
import React from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

export const WatchlistList = () => {
  const session = useUser();
  const queryClient = useQueryClient();

  const watchlistListQueryOptions = {
    ...getWatchlistListQueryOptions(
      session.user?.primaryEmailAddress?.emailAddress as string
    ),
    enabled: session.isLoaded && session.isSignedIn,
  };
  const watchlistList = useQuery(watchlistListQueryOptions);

  function deleteWatchlist(id: number) {
    const filteredWatchlist = watchlistList.data?.filter(
      (watchlist) => watchlist.id !== id
    );

    localStorage.setItem(
      `${session.user?.primaryEmailAddress?.emailAddress}.watchlist`,
      JSON.stringify(filteredWatchlist)
    );

    queryClient.invalidateQueries({
      queryKey: [watchlistListQueryOptions.queryKey[0]],
    });
  }

  return (
    <Flex
      style={{ border: "1px solid rgb(60,60,60)", borderRadius: "12px" }}
      flex="1 1 0%"
    >
      {watchlistList.isPending && (
        <Row style={{ padding: "1rem", width: "100%" }} gutter={[10, 10]}>
          <Col style={{ color: "white", height: "fit-content" }} xl={6} xs={24}>
            <SkeletonButton
              active
              style={{
                backgroundColor: "gray",
                height: "120px",
              }}
            />
          </Col>
        </Row>
      )}

      {!watchlistList.isPending && watchlistList.data?.length ? (
        <Row style={{ padding: "1rem", width: "100%" }} gutter={[10, 10]}>
          {watchlistList.data?.map((watchlist) => (
            <Col
              key={watchlist.id}
              style={{ color: "white", height: "fit-content" }}
              xl={6}
              xs={24}
            >
              <Card
                title={watchlist.name}
                bordered={false}
                extra={
                  <Space>
                    <Link href={`?edit=true&id=${watchlist.id}`}>
                      <Button type="text" icon={<BiPencil />} />
                    </Link>
                    <Button
                      type="text"
                      icon={<BiTrash />}
                      onClick={() => deleteWatchlist(watchlist.id)}
                    />
                  </Space>
                }
              >
                3 Items
              </Card>
            </Col>
          ))}
        </Row>
      ) : null}

      {!watchlistList.isPending && !watchlistList.data?.length ? (
        <Flex flex="1 1 0%" justify="center" align="center">
          <Space
            direction="vertical"
            align="center"
            size="middle"
            style={{ textAlign: "center", maxWidth: "90%" }}
          >
            <span style={{ color: "gray" }}>Create your watchlist</span>
          </Space>
        </Flex>
      ) : null}
    </Flex>
  );
};
