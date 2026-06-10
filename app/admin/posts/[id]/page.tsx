import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { PostEditForm } from "./PostEditForm";

const prisma = new PrismaClient();

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return <PostEditForm post={post} />;
}
