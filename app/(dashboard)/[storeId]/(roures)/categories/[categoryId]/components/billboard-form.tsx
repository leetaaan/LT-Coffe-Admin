"use client";

import { ApiAlert } from "@/components/api-alert";
import { Heading } from "@/components/heading";
import ImageUpload from "@/components/image-upload";
import { AlerModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { storage } from "@/lib/firebase";
import { Category } from "@/types-db";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { deleteObject, ref } from "firebase/storage";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CategoriesProps {
  initialData: Category;
}
const formSchema = z.object({
  name: z.string().min(1),
});
export const CategoryForm = ({ initialData }: CategoriesProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit a Category" : "Create a new Category";
  const toastMessage = initialData ? "Category Updated" : "Category Created";
  const action = initialData ? "Save changes" : "Create Category";

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }

      toast.success(toastMessage);
      router.push(`/${params.storeId}/categories`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      router.push(`/${params.storeId}/categories`);
      toast.success("Category Deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      <AlerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="flex items-center justify-center">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isLoading}
            variant={"destructive"}
            size={"icon"}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Your billboard name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit" size={"sm"}>
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};
