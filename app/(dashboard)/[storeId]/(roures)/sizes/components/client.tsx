"use client";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizesColumns, columns } from "./columns";
import ApiList from "@/components/api-list";

interface SizeClientProps {
  data: SizesColumns[];
}

export const SizeClient = ({ data }: SizeClientProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>

      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />

      <Heading title="API" description="Api calls for sizes"/>
      <Separator/>
      <ApiList entityName="sizes" entituNameId="sizeId"/>
    </>
  );
};
