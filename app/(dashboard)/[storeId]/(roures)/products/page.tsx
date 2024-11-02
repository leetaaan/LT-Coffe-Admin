import { db } from "@/lib/firebase";
import { getDocs, collection, doc } from "firebase/firestore";
import { format } from "date-fns";
import { ProductClient } from "./components/client";
import { Products } from "@/types-db";
import { ProductsColumns } from "./components/columns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const productsData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "products"))
  ).docs.map((doc) => doc.data()) as Products[];

  const formattedProducts: ProductsColumns[] = productsData.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatter.format(item.price),
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    category: item.category,
    description: item.description,
    size: item.size,
    isCold: item.isCold,
    isHot: item.isHot,
    images: item.images,
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "dd-MM-yyyy")
      : "",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
