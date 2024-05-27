"use client";
import {
  getWatchlistListQueryOptions,
  getWatchlistQueryOptions,
} from "@/queryOptions/watchlist";
import { useUser } from "@clerk/nextjs";
import { EmailAddress } from "@clerk/nextjs/server";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Modal, Flex, Button, Form, Input, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Field, FieldArray, Formik, FormikProps } from "formik";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

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

export const AddWatchlistModal = () => {
  const session = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const queryOptions = {
    ...getWatchlistListQueryOptions(
      session.user?.primaryEmailAddress?.emailAddress ?? ""
    ),
    enabled: session.isLoaded && session.isSignedIn,
  };

  const watchlistList = useQuery(queryOptions);

  const isOpen = searchParams.get("add") !== null;

  function closeModal() {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.delete("add");
    router.replace(`${pathname}?${urlSearchParams}`);
  }

  function add(data: Array<Record<string, string>>) {
    const latestWatchlistId = Math.max(
      ...(watchlistList.data?.map((watchlist) => watchlist.id) ?? [0])
    );

    const newData = data.map((field) => ({
      ...field,
      id: latestWatchlistId + 1,
    }));

    localStorage.setItem(
      `${session.user?.primaryEmailAddress?.emailAddress}.watchlist`,
      JSON.stringify([...(watchlistList.data ?? []), ...newData])
    );

    queryClient.invalidateQueries({ queryKey: [queryOptions.queryKey[0]] });
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
      <Formik
        initialValues={{ inputFields: [{ name: "" }] }}
        validationSchema={addWatchlistSchema}
        onSubmit={(values) => {
          add(values.inputFields);
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
              {({ push, remove }) => (
                <Space style={{ width: "100%" }} direction="vertical">
                  <Flex justify="end">
                    <Button size="middle" onClick={() => push({ name: "" })}>
                      Add Field
                    </Button>
                  </Flex>
                  {values.inputFields.map((field, index) => (
                    <FormItem
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
    </Modal>
  );
};
