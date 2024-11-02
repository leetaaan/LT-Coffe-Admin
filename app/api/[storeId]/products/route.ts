import { db } from "@/lib/firebase";
import { Products } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import {
  addDoc,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 400 });
    }

    const {
      name,
      price,
      images,
      isFeatured,
      isArchived,
      description,
      category,
      size,
      isCold,
      isHot,
    } = body;

    if (!name) {
      return new NextResponse("Product Name is missing", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }
    if (!category) {
      return new NextResponse("Category is missing", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is missing", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const store = await getDoc(doc(db, "stores", params.storeId));
    if (store.exists()) {
      let storeData = store.data();
      if (storeData?.userId !== userId) {
        return new NextResponse("Un-Authorized Access", { status: 500 });
      }
    }

    const productData = {
      name,
      price,
      images,
      isFeatured,
      description,
      isArchived,
      category,
      size,
      isCold,
      isHot,
      createdAt: serverTimestamp(),
    };

    const productRef = await addDoc(
      collection(db, "stores", params.storeId, "products"),
      productData
    );

    const id = productRef.id;

    await updateDoc(doc(db, "stores", params.storeId, "products", id), {
      ...productData,
      id,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ id, ...productData });
  } catch (error) {
    console.log(`products_POST:${error}`);
    return new NextResponse("Internal Server ERR", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const { searchParams } = new URL(req.url);

    const productRef = collection(
      doc(db, "stores", params.storeId),
      "products"
    );

    let productQuery;

    let queryContraints = [];

    if (searchParams.has("size")) {
      queryContraints.push(where("size", "==", searchParams.get("size")));
    }
    if (searchParams.has("category")) {
      queryContraints.push(
        where("category", "==", searchParams.get("category"))
      );
    }
    if (searchParams.has("isCold")) {
      queryContraints.push(
        where(
          "isCold",
          "==",
          searchParams.get("isCold") ===  "true" ? true : false
        )
      );
    }
    if (searchParams.has("isHot")) {
      queryContraints.push(
        where(
          "isHot",
          "==",
          searchParams.get("isHot") ===  "true" ? true : false
        )
      );
    }
    if (searchParams.has("isFeatured")) {
      const isFeatured = searchParams.get("isFeatured") === "true";
      queryContraints.push(where("isFeatured", "==", isFeatured));
    }
    if (searchParams.has("isArchived")) {
      queryContraints.push(
        where(
          "isArchived",
          "==",
          searchParams.get("isArchived") === "true" ? true : false
        )
      );
    }
    if (queryContraints.length > 0) {
      productQuery = query(productRef, and(...queryContraints));
    } else {
      productQuery = query(productRef);
    }

    const querySnapshot = await getDocs(productQuery);
    const productData: Products[] = querySnapshot.docs.map(
      (doc) => doc.data() as Products
    );

    return NextResponse.json(productData);
  } catch (error) {
    console.log(`products_GET:${error}`);
    return new NextResponse("Internal Server ERR", { status: 500 });
  }
};
