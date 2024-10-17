import { db } from "@/lib/firebase";
import { Category } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 400 });
    }

    const { name } = body;
    if (!name) {
      return new NextResponse("Category Name is missing", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!params.categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    const store = await getDoc(doc(db, "stores", params.storeId));
    if (store.exists()) {
      let storeData = store.data();
      if (storeData?.userId !== userId) {
        return new NextResponse("Un-Authorized Access", { status: 500 });
      }
    }

    const categoryRef = await getDoc(
      doc(db, "stores", params.storeId, "categories", params.categoryId)
    );
    if (categoryRef.exists()) {
      await updateDoc(
        doc(db, "stores", params.storeId, "categories", params.categoryId),
        {
          ...categoryRef.data(),
          name,
          updatedAt: serverTimestamp(),
        }
      );
    } else {
      return new NextResponse("Category Not Found", { status: 404 });
    }

    const category = (
      await getDoc(
        doc(db, "stores", params.storeId, "categories", params.categoryId)
      )
    ).data() as Category;

    return NextResponse.json({ category });
  } catch (error) {
    console.log(`Category_POST:${error}`);
    return new NextResponse("Internal Server ERR", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!params.categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }

    const store = await getDoc(doc(db, "stores", params.storeId));
    if (store.exists()) {
      let storeData = store.data();
      if (storeData?.userId !== userId) {
        return new NextResponse("Un-Authorized Access", { status: 500 });
      }
    }

    const categoryRef = doc(
      db,
      "stores",
      params.storeId,
      "categories",
      params.categoryId
    );

    await deleteDoc(categoryRef);

    return NextResponse.json({ msg: "Category Deleted" });
  } catch (error) {
    console.log(`Category_POST:${error}`);
    return new NextResponse("Internal Server ERR", { status: 500 });
  }
};
