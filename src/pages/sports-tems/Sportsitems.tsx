/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSportsItemQuery } from "@/Redux/Features/sportsItem/sportsItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import React, { useState } from "react";
import ItemCard from "./itemCard";
import BulkDeleteDialog from "@/components/sportsItem/BulkDeleteDialog";
import { toast } from "sonner";
// import Search from "@/components/sportsItem/Search";
type Tproducts = {
  success?: boolean;
  message?: string;
  user?: Tproduct[];
};
export type Tproduct = {
  name: string;
  price: any;
  quantity: string;
  brand: string;
  type: string;
  size?: string;
  color: string;
  material: string;
  condition: string;
  image: string;
  _id: string;
  status: "active" | "inactive";
};

const Sportsitems = () => {
  const [products, setProducts] = useState({});
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [type, setType] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});

  const { data, error } = useGetSportsItemQuery(query);

  if (error?.data?.message) {
    console.log(error);
    toast.error(`${error?.data?.message}`, { id: "test" });
  }

  const storeProsuct: Tproducts = data;
  const mainStoreProduct = storeProsuct?.user as Tproduct[];
  const test: Tproducts = products;

  const mainProduct = test?.user;
  // console.log(mainProduct);

  const colors = mainProduct?.map((product: Tproduct) => product.color);
  const newColor = new Set(colors);
  const finalColors = Array.from(newColor);
  const names = mainProduct?.map((product: Tproduct) => product.name);
  const newName = new Set(names);
  const finalnames = Array.from(newName);
  const Brands = mainProduct?.map((product: Tproduct) => product.brand);
  const newBrand = new Set(Brands);
  const finalBrand = Array.from(newBrand);
  const Material = mainProduct?.map((product: Tproduct) => product.material);
  const newMaterial = new Set(Material);
  const finalMaterials = Array.from(newMaterial);

  // console.log(colors);
  fetch("http://localhost:5000/sports-items/total-list")
    .then((res) => res.json())
    .then((result) => setProducts(result));

  const handleQuery = async () => {
    toast.loading("please wait", { id: "test" });
    console.log();
    const query = {
      name: name,
      price: price,

      condition: condition,
      color: color,
      material: material,
      type: type,
      brand: brand,
      searchQuery: search,
    };
    if (Object.keys(query).length) {
      setTimeout(() => {
        toast.dismiss("test");
      }, 3000);
      // if (error?.message) {
      //   return toast.error(`${error?.message}`, { id: "test" });
      // }

      return setQuery(query);
    }

    setQuery({});
  };
  const handleCancel = () => {
    window.location.reload();
  };
  return (
    <div className="grid  grid-cols-4 gap-4">
      <div className="">
        <div className="my-2">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              onBlur={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="search by exac product info"
            />
            <Button onClick={handleQuery} type="submit">
              Search
            </Button>
          </div>

          <h1 className="text-2xl my-2">Filter by name</h1>
          <RadioGroup
            onValueChange={(value) => setName(value)}
            defaultValue="comfortable"
          >
            {finalnames.map((name: string) => (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={name} id={name} />
                <Label htmlFor="r1">{name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className=" my-2">
          <h1 className="text-2xl my-2">Filter by Brand name</h1>
          <RadioGroup
            onValueChange={(value) => setBrand(value)}
            defaultValue="comfortable"
          >
            {finalBrand.map((name: string) => (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={name} id={name} />
                <Label htmlFor="r1">{name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className=" my-2">
          <h1 className="text-2xl my-2">Filter by color</h1>
          <RadioGroup
            onValueChange={(value) => setColor(value)}
            defaultValue="comfortable"
          >
            {finalColors.map((name: string) => (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={name} id={name} />
                <Label htmlFor="r1">{name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className=" my-2">
          <h1 className="text-2xl my-2">Filter by Material</h1>
          <RadioGroup
            onValueChange={(value) => setMaterial(value)}
            defaultValue="comfortable"
          >
            {finalMaterials.map((name: string) => (
              <div key={name} className="flex items-center space-x-2">
                <RadioGroupItem value={name} id={name} />
                <Label htmlFor="r1">{name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className=" my-2">
          <h1 className="text-2xl my-2">Filter by price Range</h1>
          <Input onBlur={(e) => setPrice(e.target.value)}></Input>
        </div>
        <div className=" my-2">
          <h1 className="text-2xl my-2">Filter by sports type</h1>
          <div>
            <RadioGroup
              onValueChange={(value) => setType(value)}
              defaultValue="comfortable"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="football" id="football" />
                <Label htmlFor="r1">football</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cricket" id="cricket" />
                <Label htmlFor="r1">cricket</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="my-2">
          <h1 className="text-2xl my-2">Filter by condition</h1>
          <div>
            <RadioGroup
              onValueChange={(value) => setCondition(value)}
              defaultValue="comfortable"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="r1">new</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="used" id="used" />
                <Label htmlFor="r1">used</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="my-3">
          <Button className="mx-3" onClick={handleQuery}>
            Apply
          </Button>
          <Button onClick={handleCancel}>cancel</Button>
        </div>
      </div>
      <div className="col-span-3">
        {/* <Button>Bulk Delete</Button> */}
        {mainStoreProduct?.length === 0 ? (
          <h1 className="text-red-600 font-bold m-5 text-3xl">
            There is no product in the store
          </h1>
        ) : (
          <>
            <div className="flex justify-center">
              <span>
                <BulkDeleteDialog
                  mainStoreProduct={mainStoreProduct}
                ></BulkDeleteDialog>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mainStoreProduct?.map((product: Tproduct) => (
                // <h1>hello</h1>
                <ItemCard product={product}></ItemCard>
              ))}
            </div>
          </>
        )}

        {/* <h1>this is product section</h1> */}
      </div>
    </div>
  );
};

export default Sportsitems;
