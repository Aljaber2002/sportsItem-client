/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSprotsItemMutation } from "@/Redux/Features/sportsItem/sportsItem";

import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
// import { Tproduct } from "./Sportsitems";

// // import { ReactNode } from "react";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const imageHostingkey = "7c3e9198c61a32c179e859259d52dbcb";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  price: z.string(),
  quantity: z.string(),
  brand: z.string(),
  type: z.string(),
  material: z.string(),
  color: z.string(),
  condition: z.string(),
  image: z
    .any()
    .refine(
      (files) => {
        return Array.from(files).every((file) => file instanceof File);
      },
      { message: "Expected a file" }
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        ),
      "Only these types are allowed .jpg, .jpeg, .png and .webp"
    ),
});

const Addproduct = () => {
  // const product:Tproduct = this?.props?.product

  // { product }: { product?: Tproduct }
  // const { name } = product;
  const location = useLocation();
  const product = location?.state?.product;
  // console.log(product, "test");

  const [addProduct, { error, data }] = useSprotsItemMutation();
  const navigate = useNavigate();
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${product ? product?.name : ""}`,
      price: `${product ? product?.price : ""}`,
      quantity: `${product ? product?.quantity : ""}`,
      brand: `${product ? product?.brand : ""}`,
      type: `${product ? product?.type : ""}`,
      material: `${product ? product?.material : ""}`,
      color: `${product ? product?.color : ""}`,
      condition: `${product ? product?.condition : ""}`,
      image: `${product ? product?.image : ""}`,
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    toast.loading("please wait!!", { id: "unique" });
    const formData = new FormData();
    const image = values.image;

    formData.append("image", image);

    fetch(`https://api.imgbb.com/1/upload?key=${imageHostingkey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (result) => {
        // console.log(result);
        const image = result.data.url;
        values.image = image;
        const productResult = await addProduct(values);
        if (productResult?.error?.status) {
          return toast.error(`${result?.error?.data?.error}`, { id: "unique" });
        }
        toast.success("product created  successfully", { id: "unique" });
        navigate("/sports-items");

        // console.log(values);
      });
  };

  return (
    <>
      <h1 className="hidden md:block md:font-bold md:text-slate-700 md:text-2xl">
        Add product in your store
      </h1>
      <div
        style={{
          position: "absolute",
          marginTop: "100px",
          // marginBottom: "100px",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "2px solid slategray",
          padding: "30px",
          // backgroundColor:'slategray'
          borderRadius: "15px",
        }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quantity of product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>sports type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="football">football</SelectItem>
                      <SelectItem value="cricket">cricket</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>color</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>condition</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="new">new</SelectItem>
                      <SelectItem value="used">used</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              defaultValue={product?.image}
              control={form.control}
              name="image"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>choose picture</FormLabel>
                  <FormControl>
                    <Input
                      accept="image/*, application/pdf"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                      // {...field}
                      type="file"
                      name="image"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Addproduct;
