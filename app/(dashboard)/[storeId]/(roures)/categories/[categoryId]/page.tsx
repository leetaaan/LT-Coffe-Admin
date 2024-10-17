import { db } from "@/lib/firebase";
import { Category } from "@/types-db";
import { doc, getDoc } from "firebase/firestore";
import { CategoryForm } from "./components/billboard-form";

const CategoryPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const category = (
    await getDoc(
      doc(db, "stores", params.storeId, "categories", params.categoryId)
    )
  ).data() as Category;

  return <div className="flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category}/>
    </div>
  </div>;
};

export default CategoryPage;
