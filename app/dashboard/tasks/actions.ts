
"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTask(taskId: string) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId: user.id,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  await prisma.task.delete({
    where: {
      id: task.id,
    },
  });

  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");

  if (task.projectId) {
    revalidatePath(`/dashboard/projects/${task.projectId}`);
  }
}

export async function updateTask(taskId: string, formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId: user.id,
    },
  });

  if (!task) {
    throw new Error("Task not found");
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

  const statusMap = {
    todo: "TODO",
    "in-progress": "IN_PROGRESS",
    done: "DONE",
  } as const;

  const priorityMap = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
  } as const;

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

  await prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      title,
      description: description || null,
      status: statusMap[statusValue as keyof typeof statusMap] ?? "TODO",
      priority:
        priorityMap[priorityValue as keyof typeof priorityMap] ?? "MEDIUM",
      projectId: projectId || null,
      dueDate: dueDateValue ? new Date(dueDateValue) : null,
    },
  });

  revalidatePath("/dashboard/tasks");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");

  if (task.projectId) {
    revalidatePath(`/dashboard/projects/${task.projectId}`);
  }

  if (projectId) {
    revalidatePath(`/dashboard/projects/${projectId}`);
    redirect(`/dashboard/projects/${projectId}`);
  }

  redirect("/dashboard/tasks");
}
