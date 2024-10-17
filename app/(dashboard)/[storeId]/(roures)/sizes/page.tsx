import { db } from "@/lib/firebase";
import { getDocs, collection, doc } from "firebase/firestore";
import { format} from "date-fns"
import { SizeClient } from "./components/client";
import { Category, Size } from "@/types-db";
import { SizesColumns } from "./components/columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizesData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "sizes"))
  ).docs.map((doc) => doc.data()) as Size[];
  
  const formattedSizes : SizesColumns[] = sizesData.map(item => ({
    id: item.id,
    name:item.name,
    value: item.value,
    createdAt: item.createdAt ? format(item.createdAt.toDate(), "dd-MM-yyyy") : ""
  }))
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
