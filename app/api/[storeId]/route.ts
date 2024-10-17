import { db, storage } from "@/lib/firebase";
import { Store } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    const { name } = body;
    if (!name) {
      return new NextResponse("Store Name is missing", { status: 400 });
    }

    const docRef = doc(db, "stores", params.storeId);
    await updateDoc(docRef, { name });
    const store = (await getDoc(docRef)).data() as Store;

    return NextResponse.json(store);
  } catch (error) {
    console.log(`Stores_POST:${error}`);
    return new NextResponse("Internal Server ERR", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const docRef = doc(db, "stores", params.storeId);

    //billboard
    const billboardsQuerySnapshot = await getDocs(
      collection(db, `stores/${params.storeId}/billboards`)
    );

    billboardsQuerySnapshot.forEach(async (billboardDoc) => {
      await deleteDoc(billboardDoc.ref);

      const imageUrl = billboardDoc.data().imageUrl;
      if (imageUrl) {
        const imagesRef = ref(storage, imageUrl);
        await deleteObject(imagesRef);
      }
    });

    //categories
    const categoriesQuerySnapshot = await getDocs(
      collection(db, `stores/${params.storeId}/categories`)
    );

    categoriesQuerySnapshot.forEach(async (categoryDoc) => {
      await deleteDoc(categoryDoc.ref);
    });

    //sizes
    const sizesQuerySnapshot = await getDocs(
      collection(db, `stores/${params.storeId}/sizes`)
    );

    sizesQuerySnapshot.forEach(async (sizeDoc) => {
      await deleteDoc(sizeDoc.ref);
    });

    //kitchens
    const kitchensQuerySnapshot = await getDocs(
      collection(db, `stores/${params.storeId}/kitchens`)
    );

    kitchensQuerySnapshot.forEach(async (kitchenDoc) => {
      await deleteDoc(kitchenDoc.ref);
    });

    //cuisines
    const cuisinesQuerySnapshot = await getDocs(
      collection(db, `stores/${params.storeId}/cuisines`)
    );

    cuisinesQuerySnapshot.forEach(async (cuisineDoc) => {
      await deleteDoc(cuisineDoc.ref);
    });

    //product
    const productsQuerySnapshot = await getDocs(
      collection(db, `stores/${params.storeId}/products`)
    );

    productsQuerySnapshot.forEach(async (productDoc) => {
      await deleteDoc(productDoc.ref);

      const imagesArray = productDoc.data().images;
      if (imagesArray && Array.isArray(imagesArray)) {
        await Promise.all(
          imagesArray.map(async (image) => {
            const imagesRef = ref(storage, image.url);
            await deleteObject(imagesRef);
          })
        );
      }
    });

    //order
    const ordersQuerySnapshot = await getDocs(
      collection(db, `stores/${params.storeId}/orders`)
    );

    ordersQuerySnapshot.forEach(async (orderDoc) => {
      await deleteDoc(orderDoc.ref);
      const ordersItemArray = orderDoc.data().orderItems;
      if (ordersItemArray && Array.isArray(ordersItemArray)) {
        await Promise.all(
          ordersItemArray.map(async (orderItem) => {
            const itemImagesArray = orderItem.images;
            if (itemImagesArray && Array.isArray(itemImagesArray)) {
              await Promise.all(
                itemImagesArray.map(async (image) => {
                  const imagesRef = ref(storage, image.url);
                  await deleteObject(imagesRef);
                })
              );
            }
          })
        );
      }
    });

    await deleteDoc(docRef);

    return NextResponse.json({
      msg: "Store and all of its sub-collections deleted",
    });
  } catch (error) {
    console.log(`Stores_POST:${error}`);
    return new NextResponse("Internal Server ERR", { status: 500 });
  }
};
