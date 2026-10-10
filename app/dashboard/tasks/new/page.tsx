import Link from "next/link";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { createTask } from "./actions";

type Props = {
  searchParams: Promise<{ projectId?: string }>;
};

export default async function NewTaskPage({ searchParams }: Props) {
  const { projectId } = await searchParams;
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const projects = await prisma.project.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="mx-auto max-w-xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-white">New task</h1>

        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Add a new task to your list
        </p>
      </header>

      <Card className="p-6">
        <form action={createTask}>
          <div className="mb-5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Add an optional description"
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="projectId">Project</Label>
            <Select
              id="projectId"
              name="projectId"
              defaultValue={
                projects.some((project) => project.id === projectId)
                  ? projectId
                  : ""
              }
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
            <Select id="priority" name="priority" defaultValue="MEDIUM">
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </Select>
          </div>

          <div className="mb-5">
            <Label htmlFor="status">Status</Label>
            <Select id="status" name="status">
              <option value="todo">Todo</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </Select>
          </div>

          <div className="mb-7">
            <Label htmlFor="dueDate">Due date</Label>
            <Input id="dueDate" name="dueDate" type="date" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" className="flex-1">
              Create task
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
