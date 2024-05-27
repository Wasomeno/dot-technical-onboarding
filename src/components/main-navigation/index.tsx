"use client";

import { ROUTES } from "@/constants/route";
import { Avatar, Col, Divider, Dropdown, Flex, Input, Row } from "antd";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useRef } from "react";
import { NavigationLink } from "../navigation-link";
import { Logo } from "../logo";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import Link from "next/link";

import "./style.css";

export const MainNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const session = useUser();

  const timeoutRef = useRef<NodeJS.Timeout>();

  const searchQuery = searchParams.get("search");

  function searchMovieByTitle(event: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeoutRef.current);
    const urlSearchParams = new URLSearchParams(searchParams);
    const value = event.target.value;

    if (value !== "") {
      urlSearchParams.set("search", event.target.value);
    } else {
      urlSearchParams.delete("search");
    }

    timeoutRef.current = setTimeout(
      () =>
        router.replace(`${pathname}?${urlSearchParams.toString()}`, {
          scroll: false,
        }),
      750
    );
  }

  return (
    <nav className="main-navigation">
      <Row
        align="middle"
        justify="space-between"
        style={{ width: "100%", height: "4rem" }}
      >
        <Col span={6} className="main-navigation__left-section">
          <Row style={{ width: "100%" }} justify="start" gutter={16}>
            <Col span={6} style={{ textAlign: "center" }}>
              <NavigationLink href={ROUTES.HOME}>Home</NavigationLink>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <NavigationLink href={ROUTES.MOVIES}>Movies</NavigationLink>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <NavigationLink href={ROUTES.TVSHOWS}>TV Shows</NavigationLink>
            </Col>
          </Row>
        </Col>
        <Col lg={6} xs={6}>
          <Flex justify="center">
            <NavigationLink href={ROUTES.HOME}>
              <Logo />
            </NavigationLink>
          </Flex>
        </Col>
        <Col lg={6} xs={16} className="main-navigation__right-section">
          <Row
            style={{ width: "100%" }}
            justify="end"
            align="middle"
            gutter={16}
          >
            <Col span={18} style={{ textAlign: "center" }}>
              <Input.Search
                width="100%"
                placeholder="Search movie by title"
                onChange={searchMovieByTitle}
                defaultValue={searchQuery ?? ""}
                className="search-input"
              />
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <SignedIn>
                {!session.isLoaded && !session.user ? (
                  <SkeletonAvatar active />
                ) : null}
                {session.isLoaded && session.user ? (
                  <Dropdown
                    className="menu-dropdown"
                    dropdownRender={(menu) => (
                      <div
                        style={{
                          backgroundColor: "black",
                          borderRadius: "12px",
                        }}
                      >
                        <div
                          style={{
                            color: "white",
                            padding: "5px 12px",
                          }}
                        >
                          <div>{session.user.username}</div>
                          <div style={{ opacity: "75%" }}>
                            {session.user.primaryEmailAddress?.emailAddress}
                          </div>
                        </div>

                        <Divider
                          style={{
                            margin: 0,
                            borderColor: "rgb(60, 60, 60)",
                          }}
                        />
                        {React.cloneElement(menu as React.ReactElement)}
                        <Divider style={{ margin: 0 }} />
                      </div>
                    )}
                    menu={{
                      items: [
                        {
                          key: "1",
                          label: <Link href={ROUTES.WATCHLIST}>Watchlist</Link>,
                        },

                        {
                          key: "4",
                          danger: true,
                          label: (
                            <SignOutButton>
                              <span>Sign Out</span>
                            </SignOutButton>
                          ),
                        },
                      ],
                    }}
                  >
                    <Avatar
                      src={
                        <Image
                          src={session.user.imageUrl}
                          alt="user-avatar"
                          width={50}
                          height={50}
                        />
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </Dropdown>
                ) : null}
              </SignedIn>
              <SignedOut>
                <NavigationLink href={ROUTES.SIGNIN}>Sign In</NavigationLink>
              </SignedOut>
            </Col>
          </Row>
        </Col>
      </Row>
    </nav>
  );
};
