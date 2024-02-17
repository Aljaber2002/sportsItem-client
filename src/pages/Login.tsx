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
import { jwtDecode } from "jwt-decode";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { useLoginMutation } from "@/Redux/Features/login/LoginAPi";
import { useAppDispatch } from "@/Redux/hook";
import { userInfo } from "@/Redux/Features/login/LoginSlice";
// import { ReactNode } from "react";
type Tdecode = {
  username: string;
  iat: number;
  exp: number;
};

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  password: z.string(),
});
// const formStyle = {

// }

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.loading("please wait!!", { id: "unique" });

    console.log(values);
    const result: any = await login(values);
    console.log(await login(values));

    if (result?.error?.status) {
      return toast.error(`${result?.error?.data?.error}`, { id: "unique" });
    }

    toast.success("user login successfully", { id: "unique" });
    const decode: Tdecode = jwtDecode(result.data.accesstoken);
    console.log(decode);
    dispatch(
      userInfo({
        username: decode.username,
        accessToken: result.data.accesstoken,
      })
    );

    return navigate("/sports-items");
  };

  return (
    <>
      <h1 className="text-center my-5 font-bold text-slate-700 text-4xl">
        please Login!!
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
                    Didn't have an account?please{" "}
                    <Link to="/register">
                      <span className="text-black font-bold">Register</span>
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Login;
