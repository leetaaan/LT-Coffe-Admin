"use client";

import { useParams, useRouter } from "next/navigation";
import { ApiAlert } from "./api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface ApiListProps {
  entityName: string;
  entituNameId: string;
}
const ApiList = ({ entityName, entituNameId }: ApiListProps) => {
  const router = useRouter();
  const origin = useOrigin();
  const params = useParams();

  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/${entituNameId}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/${entituNameId}`}
      />
    </>
  );
};

export default ApiList;
