"use client";

import { Heading } from "@/components/heading";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { OrdersColumns, columns } from "./columns";

interface OrderClientProps {
  data: OrdersColumns[];
}

export const OrderClient = ({ data }: OrderClientProps) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage orders for your store"
        />
      </div>

      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
