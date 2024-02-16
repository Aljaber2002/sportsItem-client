import React from "react";
import { Tproduct } from "./Sportsitems";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import SelectDialog from "@/components/sportsItem/AlertDialog";
import SellDialog from "@/components/sportsItem/SellDialog";

const ItemCard = ({ product }: { product: Tproduct }) => {
  const navigate = useNavigate();

  //   console.log(product);
  const {
    name,
    price,
    quantity,
    type,
    condition,
    material,
    status,
    brand,
    color,
    image,
  } = product;

  const handleCreateVariant = (product: Tproduct) => {
    return navigate("/add-item", { state: { product } });
  };
  const handleEdit = (product: Tproduct) => {
    return navigate("/edit-product", { state: { product } });
  };
  return (
    <>
      {parseInt(quantity) > 0 ? (
        <>
          <div
            className={`${
              status === "inactive"
                ? "card w-96 bg-base-100 p-2 mt-2  border border-red-600"
                : "card w-96 bg-base-100"
            } `}
          >
            <figure className="px-10 pt-10">
              <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-[20px] font-bold">{name}</h2>
              <p>
                <span className="mx-[10px]">Brand : {brand}</span>
                <span>color: {color}</span>
              </p>
              <p>
                <span className="mx-[10px] font-bold">
                  quantity: {quantity}
                </span>

                <span>condition:{condition}</span>
              </p>
              <p>
                <span className="mx-[10px]">type: {type}</span>
                <span>material:{material}</span>
                <span className="mx-[10px] font-bold">price: {price}</span>
              </p>

              <div className="card-actions mt-2">
                {/* <button className="b">Buy Now</button> */}
                <span>
                  {" "}
                  <Button onClick={() => handleCreateVariant(product)}>
                    create Variant
                  </Button>
                </span>
                <span>
                  {" "}
                  <Button onClick={() => handleEdit(product)}>Edit</Button>
                </span>
                <span>
                  {" "}
                  {/* <Button >select</Button> */}
                  <SelectDialog product={product}></SelectDialog>
                </span>
                <span>
                  {" "}
                  {/* <Button >select</Button> */}
                  {/* <Button>sell</Button> */}
                  <SellDialog product={product}></SellDialog>
                </span>
              </div>
            </div>
          </div>
        </>
      ) : undefined}
    </>
  );
};

export default ItemCard;
