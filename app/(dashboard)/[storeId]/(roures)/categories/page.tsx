import { db } from "@/lib/firebase";
import { getDocs, collection, doc } from "firebase/firestore";
import { format} from "date-fns"
import { CategoryClient } from "./components/client";
import { Category } from "@/types-db";
import { CategoryColumns } from "./components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categorieData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "categories"))
  ).docs.map((doc) => doc.data()) as Category[];
  
  const formattedCategories : CategoryColumns[] = categorieData.map(item => ({
    id: item.id,
    name: item.name,
    createdAt: item.createdAt ? format(item.createdAt.toDate(), "dd-MM-yyyy") : ""
  }))
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
