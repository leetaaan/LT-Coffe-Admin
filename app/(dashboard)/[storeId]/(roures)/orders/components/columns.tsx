"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CellActions } from "./cell-actions";
import CellImage from "./cell-image";
import { cn } from "@/lib/utils";

export type OrdersColumns = {
  id: string;
  phone: string;
  address: string;
  products: string;
  totalPrice: string;
  images: string[];
  // orderItems: Products[];
  // userId: string;
  isPaid: boolean;
  createdAt: string;
  order_status: string;
};

export const columns: ColumnDef<OrdersColumns>[] = [
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => (
      <div className="grid grid-cols-2 gap-2">
        <CellImage data={row.original.images} />
      </div>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "address",
  },
  {
    accessorKey: "totalPrice",
    header: "Amount",
  },
  {
    accessorKey: "order_status",
    header: "order_status",
    cell: ({ row }) => {
      const { order_status } = row.original;
      return (
        <p
          className={cn(
            "text-base font-semibold",
            (order_status === "Đã giao" && "text-emerald-500") ||
              (order_status === "Đang giao" && "text-orange-500") ||
              (order_status === "Đang xử lý" && "text-yellow-500") ||
              (order_status === "Hủy" && "text-red-500")
          )}
        >
          {order_status}
        </p>
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: "Payment Status",
    cell: ({ row }) => {
      const { isPaid } = row.original;
      return (
        <p
          className={cn(
            "text-base font-semibold",
            isPaid ? "text-emerald-500" : "text-red-500"
          )}
        >
          {isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
        </p>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
