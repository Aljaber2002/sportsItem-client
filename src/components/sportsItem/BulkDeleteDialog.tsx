// import React from "react";
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
import { useBulkDeleteMutation } from "@/Redux/Features/sportsItem/sportsItem";
import { toast } from "sonner";
import { Tproduct } from "@/pages/sports-tems/Sportsitems";
// import { Tproduct } from "@/pages/sports-tems/Sportsitems";
// import { useSelectForDeleteMutation } from "@/Redux/Features/sportsItem/sportsItem";

const BulkDeleteDialog = ({
  mainStoreProduct,
}: {
  mainStoreProduct: Tproduct[];
}) => {
  //   const [item, setItem] = useState([]);
  const status = mainStoreProduct?.map((item: Tproduct) => item.status);

  const [isDelete] = useBulkDeleteMutation();
  //   console.log(data);
  // console.log(data);
  const handleBulkDelete = () => {
    // console.log(status);
    isDelete(null);
    return status.includes("inactive")
      ? toast.success("Deleted")
      : toast.error("There is no item to delete");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-slate-800 text-white" variant="outline">
          Bulk Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="font-bold text-red-600">
            you want to delete all of your selected Items
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleBulkDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BulkDeleteDialog;
