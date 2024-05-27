"use client";

import {
  getWatchlistListQueryOptions,
  getWatchlistQueryOptions,
} from "@/queryOptions/watchlist";
import { useUser } from "@clerk/nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal, Flex, Button, Form, Input, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Field, FieldArray, Formik, FormikProps } from "formik";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import * as yup from "yup";

const addWatchlistSchema = yup.object().shape({
  inputFields: yup
    .array()
    .of(
      yup.object().shape({
        name: yup
          .string()
          .min(2, "Too Short!")
          .max(30, "Too Long!")
          .required("Required"),
      })
    )
    .required("Must have fields")
    .min(1, "Minimum of 1 field"),
});

type AddWatchlistFormData = yup.InferType<typeof addWatchlistSchema>;

export const EditWatchlistModal = () => {
  const session = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryClient = useQueryClient();

  const watchlistId = searchParams.get("id");

  const watchlistQueryOptions = {
    ...getWatchlistQueryOptions(
      session.user?.primaryEmailAddress?.emailAddress ?? "",
      Number(watchlistId)
    ),
    enabled: session.isLoaded && session.isSignedIn,
  };

  const watchlist = useQuery(watchlistQueryOptions);

  const watchlistList = useQuery({
    ...getWatchlistListQueryOptions(
      session.user?.primaryEmailAddress?.emailAddress ?? ""
    ),
    enabled: session.isLoaded && session.isSignedIn,
  });

  const isOpen = searchParams.get("edit") !== null;

  function closeModal() {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.delete("edit");
    urlSearchParams.delete("id");
    router.replace(`${pathname}?${urlSearchParams}`);
  }

  function edit(id: number, data: Record<string, string>) {
    const filteredWatchlist = watchlistList.data?.filter(
      (test) => test.id !== id
    );

    let editWatchlist = watchlist.data;

    editWatchlist = { id, name: data.name };

    localStorage.setItem(
      `${session.user?.primaryEmailAddress?.emailAddress}.watchlist`,
      JSON.stringify([...(filteredWatchlist as []), editWatchlist])
    );
    queryClient.invalidateQueries({
      queryKey: [watchlistQueryOptions.queryKey[0]],
    });
  }

  return (
    <Modal
      open={isOpen}
      centered
      title={<div style={{ height: "2rem" }} />}
      onCancel={closeModal}
      styles={{
        header: {
          background: "black",
        },
        body: {
          padding: "1rem",
          height: "20rem",
        },
        content: {
          backgroundColor: "#000",
          color: "white",
          padding: 0,
          overflow: "hidden",
          border: "1px solid rgb(60, 60, 60)",
          overflowY: "scroll",
        },
      }}
      footer={<></>}
    >
      {!watchlist.isPending && watchlist.data && (
        <Formik
          initialValues={{ inputFields: [{ name: watchlist.data?.name }] }}
          validationSchema={addWatchlistSchema}
          onSubmit={(values) => {
            edit(Number(watchlistId), { name: values.inputFields[0].name });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
          }: FormikProps<AddWatchlistFormData>) => (
            <Form labelCol={{ span: 24 }} onFinish={handleSubmit}>
              <FieldArray name="inputFields">
                {() => (
                  <Space style={{ width: "100%" }} direction="vertical">
                    {values.inputFields.map((field, index) => (
                      <FormItem
                        key={index}
                        label="Name"
                        validateStatus={
                          errors.inputFields &&
                          errors.inputFields[index] &&
                          touched.inputFields &&
                          touched.inputFields[index]
                            ? "error"
                            : ""
                        }
                      >
                        <Field name={`inputFields.${index}.name`}>
                          {({ field }: { field: any }) => (
                            <Input
                              {...field}
                              placeholder="Input watchlist name"
                            />
                          )}
                        </Field>
                      </FormItem>
                    ))}
                  </Space>
                )}
              </FieldArray>
              <Flex align="center" justify="end">
                <Button iconPosition="end" onClick={() => handleSubmit()}>
                  Submit
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};
