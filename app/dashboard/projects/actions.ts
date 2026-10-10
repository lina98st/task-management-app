"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getCurrentUser() {
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

  return user;
}

export async function createProject(formData: FormData) {
  const user = await getCurrentUser();

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name) {
    throw new Error("Project name is required");
  }

  await prisma.project.create({
    data: {
      name,
      description: description || null,
      userId: user.id,
    },
  });

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");

  redirect("/dashboard/projects");
}

export async function updateProject(projectId: string, formData: FormData) {
  const user = await getCurrentUser();

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: user.id,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name) {
    throw new Error("Project name is required");
  }

  await prisma.project.update({
    where: {
      id: project.id,
    },
    data: {
      name,
      description: description || null,
    },
  });

  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/projects/${project.id}`);
  revalidatePath("/dashboard");

  redirect("/dashboard/projects");
}

export async function deleteProject(projectId: string) {
  const user = await getCurrentUser();

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: user.id,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  await prisma.project.delete({
    where: {
      id: project.id,
    },
  });

  revalidatePath("/dashboard/projects");
  revalidatePath("/dashboard");
}