/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "@/Redux/Features/create-user/api";
import { toast } from "sonner";
// import { ReactNode } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string(),
  password: z.string(),
});
// const formStyle = {

// }

const Register = () => {
  const [register] = useCreateUserMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",

      username: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.loading("creating user", { id: "unique" });

    console.log(values);
    const result: any = await register(values);
    console.log(await register(values));
    // if (isLoading) {
    //   toast.loading("creating account");
    // }
    if (result?.error?.status) {
      // console.log(error, "test");
      return toast.error(`${result?.error?.data?.error}`, { id: "unique" });
    }

    toast.success("created account successfully", { id: "unique" });
    navigate("/login");
  };

  return (
    <>
      <h1 className="text-center my-5 font-bold text-slate-700 text-4xl">
        Register!!
      </h1>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "2px solid slategray",
          padding: "20px",
          // backgroundColor:'slategray'
          borderRadius: "15px",
        }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormDescription className="mt-3">
                    Already have an account?please{" "}
                    <Link to="/login">
                      <span className="text-black font-bold">login</span>
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Register</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Register;
