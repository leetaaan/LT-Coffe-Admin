import { db } from "@/lib/firebase";
import { getDocs, collection, doc } from "firebase/firestore";
import { format } from "date-fns";
import { OrderClient } from "./components/client";
import { Orders } from "@/types-db";
import { OrdersColumns } from "./components/columns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const ordersData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "orders"))
  ).docs.map((doc) => doc.data()) as Orders[];

  const formattedOrders: OrdersColumns[] = ordersData.map((item) => ({
    id: item.id,
    isPaid: item.isPaid,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map(item => item.name).join(", "),
    order_status: item.order_status,
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        if (item && item.qty !== undefined) {
          return total + Number(item.price * item.qty);
        }
        return total;
      }, 0)
    ),
    images: item.orderItems.map((item) => item.images[0].url),

    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "dd-MM-yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
