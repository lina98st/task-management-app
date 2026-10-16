import Link from "next/link";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { updateProject } from "../../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Edit project</h1>
        <p className="mt-2 text-gray-400">Update your project details.</p>
      </div>

      <form
        action={updateProject.bind(null, project.id)}
        className="space-y-5 rounded-xl border border-gray-700 p-6"
      >
        <div>
          <label htmlFor="name" className="mb-2 block font-medium">
            Project name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={project.name}
            className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-2"
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
            defaultValue={project.description ?? ""}
            className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-2"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-violet-500 px-4 py-2 font-medium text-white hover:bg-violet-600"
          >
            Save changes
          </button>

          <Link
            href={`/dashboard/projects/${project.id}`}
            className="rounded-lg border border-gray-700 px-4 py-2 hover:bg-gray-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
