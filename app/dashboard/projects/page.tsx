import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { createProject, deleteProject } from "./actions";
import Link from "next/link";

export default async function ProjectsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
    include: {
      _count: {
        select: {
          tasks: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-2 text-gray-400">Create and manage your projects.</p>
      </div>

      <form action={createProject} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block font-medium">
            Project name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-2"
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-2"
            placeholder="Enter project description"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-white px-4 py-2 font-medium text-black"
        >
          Create project
        </button>
      </form>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <p className="text-gray-400">No projects yet.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border border-gray-700 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="text-xl font-semibold hover:text-violet-400"
                  >
                    {project.name}
                  </Link>

                  {project.description && (
                    <p className="mt-2 text-gray-400">{project.description}</p>
                  )}

                  <p className="mt-3 text-sm text-gray-400">
                    {project._count.tasks}{" "}
                    {project._count.tasks === 1 ? "task" : "tasks"}
                  </p>
                </div>

                <form action={deleteProject.bind(null, project.id)}>
                  <button
                    type="submit"
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
