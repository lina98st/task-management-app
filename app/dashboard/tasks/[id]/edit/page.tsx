import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { updateTask } from "../../actions";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return null;
  }

  const task = await prisma.task.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!task) {
    notFound();
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Edit task</h1>

        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Update your task details
        </p>
      </header>

      <Card className="p-6">
        <form action={updateTask.bind(null, task.id)}>
          <div className="mb-5">
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              name="title"
              type="text"
              defaultValue={task.title}
              required
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={task.description ?? ""}
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="projectId">Project</Label>

            <Select
              id="projectId"
              name="projectId"
              defaultValue={task.projectId ?? ""}
            >
              <option value="">No project</option>

              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="mb-5">
            <Label htmlFor="priority">Priority</Label>

            <Select id="priority" name="priority" defaultValue={task.priority}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </Select>
          </div>

          <div className="mb-5">
            <Label htmlFor="status">Status</Label>

            <Select
              id="status"
              name="status"
              defaultValue={
                task.status === "IN_PROGRESS"
                  ? "in-progress"
                  : task.status === "DONE"
                    ? "done"
                    : "todo"
              }
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </Select>
          </div>

          <div className="mb-7">
            <Label htmlFor="dueDate">Due date</Label>

            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              defaultValue={
                task.dueDate ? task.dueDate.toISOString().split("T")[0] : ""
              }
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" className="flex-1">
              Save changes
            </Button>

            <Link href="/dashboard/tasks">
              <Button variant="secondary">Cancel</Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
