import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { AlertDialogFooter } from "../ui/alert-dialog";
import { Tproduct } from "@/pages/sports-tems/Sportsitems";
import { useSellProductMutation } from "@/Redux/Features/sportsItem/sportsItem";
import { toast } from "sonner";

// import { toast } from "sonner";

const SellDialog = ({ product }: { product: Tproduct }) => {
  const [quantity, setQuantity] = useState("");
  const [buyerName, setbuyerName] = useState("");
  // const [error, setError] = useState("");
  // const [open, setOpen] = useState(false);

  const [sell, { error }] = useSellProductMutation();
  if (error) {
    console.log(error);
  }
  // console.log(data);

  const handleSell = async () => {
    // console.log(parseInt(product.quantity))
    if (buyerName && quantity) {
      const mainQuantity = parseInt(quantity);
      if (!/^-?\d*\.?\d+$/.test(quantity)) {
        return toast.error("quantity should have stay number value", {
          id: "test",
        });
      }
      if (mainQuantity > parseInt(product.quantity)) {
        return toast.error("your given quantity not available in out store", {
          id: "test",
        });
      }

      console.log({ buyerName, mainQuantity, productId: product._id });
      await sell({ buyerName, mainQuantity, productId: product._id });
      return toast.success("selled", { id: "test" });
    }
    toast.error("please give provided information", {
      id: "test",
    });
    // toast.error("please give the provided information");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-slate-900 text-white">
          sell
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>sell product</DialogTitle>
          <DialogDescription>
            give the buyer name and quantity to be sold
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor=" Quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="name"
              onBlur={(e) => setQuantity(e.target.value)}
              //   defaultValue="quantity to be sold"
              placeholder="quantity to be sold"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="BuyerName" className="text-right">
              BuyerName
            </Label>
            <Input
              id="username"
              //   defaultValue="Buyer name"
              onChange={(e) => setbuyerName(e.target.value)}
              placeholder="Buyer name"
              className="col-span-3"
            />
          </div>
        </div>
        <AlertDialogFooter>
          {quantity && buyerName ? (
            <DialogClose asChild>
              <Button onClick={handleSell} type="submit">
                sell
              </Button>
            </DialogClose>
          ) : undefined}
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SellDialog;
