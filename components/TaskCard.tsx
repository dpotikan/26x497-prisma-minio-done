import {
  GetTaskFileErrorResponse,
  GetTaskFileOKResponse,
} from "@/app/api/task/file/route";
import {
  DeleteTaskBody,
  DeleteTaskErrorResponse,
  DeleteTaskOKResponse,
} from "@/app/api/task/route";
import { Button, Group, Paper, Text } from "@mantine/core";
import { Task } from "@prisma/client";
import axios from "axios";
import { FC } from "react";

type Props = Pick<Task, "title" | "id" | "fileName"> & {
  refetchTasks: Function;
};

export const TaskCard: FC<Props> = ({ title, id, fileName, refetchTasks }) => {
  async function callDeleteTask() {
    try {
      axios.delete<{}, DeleteTaskOKResponse, DeleteTaskBody>("/api/task", {
        data: { id },
      });
      refetchTasks();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response?.data as DeleteTaskErrorResponse;
        alert(data.message);
      }
    }
  }

  async function callGetTaskFile() {
    try {
      const response = await axios.get<GetTaskFileOKResponse>(
        `/api/task/file?taskId=${id}`
      );
      window.open(response.data.url);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response?.data as GetTaskFileErrorResponse;
        alert(data.message);
      }
    }
  }

  return (
    <Paper withBorder my="xs" p="md">
      <Group position="apart">
        <Text>{title}</Text>
        <Group>
          {fileName && (
            <Button color="gray" variant="outline" onClick={callGetTaskFile}>
              View file
            </Button>
          )}

          <Button color="red" variant="outline" onClick={callDeleteTask}>
            Delete
          </Button>
        </Group>
      </Group>
    </Paper>
  );
};
