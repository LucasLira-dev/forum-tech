
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { myProfileService } from "@/services/myProfileService";
import TopicCreateForm from "../../../../components/TopicCreateForm/topicCreateForm";

export default async function CreateTopicPage() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) redirect("/login");

  const profile = await myProfileService
    .getMyProfile(session.accessToken)
    .catch(() => null);

  if (!profile || !profile.userName) {
    redirect("/myprofile"); // pode ser /myprofile/setup, etc.
  }

  return <TopicCreateForm />;
}