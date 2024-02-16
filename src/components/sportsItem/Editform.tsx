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
// import { useSprotsItemMutation } from "@/Redux/Features/sportsItem/sportsItem";

// import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { useEditProductMutation } from "@/Redux/Features/sportsItem/sportsItem";
import { toast } from "sonner";
// import { Tproduct } from "./Sportsitems";

// // import { ReactNode } from "react";

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
  id: z.string(),
});

const Editproduct = () => {
  // const product:Tproduct = this?.props?.product

  // { product }: { product?: Tproduct }
  // const { name } = product;
  const location = useLocation();
  const product = location?.state?.product;
  //   console.log(product, "test");
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${product ? product?.name : ""}`,
      price: `${product ? product?.price : "$"}`,
      quantity: `${product ? product?.quantity : ""}`,
      brand: `${product ? product?.brand : ""}`,
      type: `${product ? product?.type : ""}`,
      material: `${product ? product?.material : ""}`,
      color: `${product ? product?.color : ""}`,
      condition: `${product ? product?.condition : ""}`,
      id: "",
    },
  });
  // 2. Define a submit handler.
  const [editProduct, { data, error }] = useEditProductMutation();
  console.log(data);
  if (error) {
    console.log(error);
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values, "test");
    toast.loading("please wait", { id: "edit" });
    values.id = product._id;
    await editProduct(values);
    if (error?.status) {
      return toast.error("something went wrong");
    }

    toast.success("Edited successfully", { id: "edit" });
    return navigate("/sports-items");

    // console.log(values, "test");
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

            <Button type="submit">Edit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Editproduct;
