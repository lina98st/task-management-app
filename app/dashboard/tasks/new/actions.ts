
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {
  TaskStatus,
  TaskPriority,
} from "@/app/generated/prisma/client";

export async function createTask(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const statusValue = String(formData.get("status") ?? "todo");
  const priorityValue = String(formData.get("priority") ?? "MEDIUM");
  const projectId = String(formData.get("projectId") ?? "").trim();
  const dueDateValue = String(formData.get("dueDate") ?? "");

  if (!title) {
    throw new Error("Title is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const statusMap: Record<string, TaskStatus> = {
    todo: TaskStatus.TODO,
    "in-progress": TaskStatus.IN_PROGRESS,
    done: TaskStatus.DONE,
  };

  const priorityMap: Record<string, TaskPriority> = {
    LOW: TaskPriority.LOW,
    MEDIUM: TaskPriority.MEDIUM,
    HIGH: TaskPriority.HIGH,
  };

  if (projectId) {
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: user.id,
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }
  }

  await prisma.task.create({
    data: {
      title,
      description: description || null,
      status: statusMap[statusValue] ?? TaskStatus.TODO,
      priority: priorityMap[priorityValue] ?? TaskPriority.MEDIUM,
      dueDate: dueDateValue ? new Date(dueDateValue) : null,
      userId: user.id,
      projectId: projectId || null,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard/projects");

  if (projectId) {
    revalidatePath(`/dashboard/projects/${projectId}`);
    redirect(`/dashboard/projects/${projectId}`);
  }

  redirect("/dashboard/tasks");
}
