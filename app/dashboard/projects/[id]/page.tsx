import Link from "next/link";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const { id } = await params;

  const project = await prisma.project.findFirst({
    where: {
      id,
      user: {
        email: session.user.email,
      },
    },
    include: {
      tasks: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const completed = project.tasks.filter(
    (task) => task.status === "DONE",
  ).length;

  const progress = project.tasks.length
    ? Math.round((completed / project.tasks.length) * 100)
    : 0;

  const columns = [
    { status: "TODO", title: "To do" },
    { status: "IN_PROGRESS", title: "In progress" },
    { status: "DONE", title: "Done" },
  ] as const;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/projects"
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Back to projects
        </Link>

        <div className="mt-4 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">{project.name}</h1>

          <Link
            href={`/dashboard/tasks/new?projectId=${project.id}`}
            className="rounded-lg bg-violet-500 px-4 py-2 font-medium text-white hover:bg-violet-600"
          >
            New task
          </Link>
        </div>

        {project.description && (
          <p className="mt-2 text-gray-400">{project.description}</p>
        )}
      </div>

      <div className="rounded-lg border border-gray-700 p-5">
        <div className="flex justify-between">
          <h2 className="font-semibold">Project progress</h2>
          <span>{progress}%</span>
        </div>

        <div className="mt-4 h-2 rounded-full bg-gray-800">
          <div
            className="h-2 rounded-full bg-violet-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-gray-400">
          {completed} of {project.tasks.length} tasks completed
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {columns.map((column) => {
          const tasks = project.tasks.filter(
            (task) => task.status === column.status,
          );

          return (
            <section
              key={column.status}
              className="rounded-lg border border-gray-700 p-4"
            >
              <h2 className="mb-5 font-semibold">
                {column.title} ({tasks.length})
              </h2>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <Link
                    key={task.id}
                    href={`/dashboard/tasks/${task.id}/edit`}
                    className="block rounded-lg border border-gray-700 p-4 hover:border-violet-500"
                  >
                    <h3 className="font-medium">{task.title}</h3>

                    {task.description && (
                      <p className="mt-2 text-sm text-gray-400">
                        {task.description}
                      </p>
                    )}

                    <p className="mt-3 text-xs font-medium">
                      Priority: {task.priority.toLowerCase()}
                    </p>
                  </Link>
                ))}

                {tasks.length === 0 && (
                  <p className="text-sm text-gray-400">No tasks yet.</p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
