"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CategoryColumns, columns } from "./columns";
import ApiList from "@/components/api-list";

interface CategoryClientProps {
  data: CategoryColumns[];
}

export const CategoryClient = ({ data }: CategoryClientProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Category (${data.length})`}
          description="Manage Category for your store"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>

      <Separator />
      <DataTable searchKey="label" columns={columns} data={data}/>

      <Heading title="API" description="Api calls for categories"/>
      <Separator/>
      <ApiList entityName="categories" entituNameId="billboardId"/>
    </>
  );
};
