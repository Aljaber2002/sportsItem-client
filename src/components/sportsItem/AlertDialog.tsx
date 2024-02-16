import React from "react";
import {
  AlertDialogAction,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Tproduct } from "@/pages/sports-tems/Sportsitems";
import { useSelectForDeleteMutation } from "@/Redux/Features/sportsItem/sportsItem";

const SelectDialog = ({ product }: { product: Tproduct }) => {
  const [tergatedItem, { error }] = useSelectForDeleteMutation();
  //   console.log(data);
  if (error) {
    console.log(error);
  }
  const handleSelect = () => {
    return tergatedItem({ id: product._id });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-slate-800 text-white" variant="outline">
          select
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            you want to select {product?.name} for deleting?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleSelect}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SelectDialog;
