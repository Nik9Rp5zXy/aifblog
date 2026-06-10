import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { ProjectEditForm } from "./ProjectEditForm";

const prisma = new PrismaClient();

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return <ProjectEditForm project={project} />;
}
