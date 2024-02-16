import { useGetSaleshistoryQuery } from "@/Redux/Features/sportsItem/sportsItem";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
type BackendData = {
  [key: string]: number;
};

const SalesHistory = () => {
  const [interval, setInterval] = useState("yearly");

  const { data, error } = useGetSaleshistoryQuery({ interval: interval });

  const mainData = data?.result as BackendData;
  if (!mainData) {
    return <div>No data available</div>;
  }
  const test = Object.entries(mainData);

  if (error) {
    console.log(error);
  }
  // console.log(interval);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-2">
        Sales History of {interval}
      </h1>
      <div className="flex justify-center ">
        <span className="mx-4 my-2">
          <Button onClick={() => setInterval("yearly")}>Yearly</Button>
        </span>
        <span className="mx-4 my-2">
          <Button onClick={() => setInterval("monthly")}>Monthly</Button>
        </span>
        <span className="mx-4 my-2">
          <Button onClick={() => setInterval("weekly")}>Weekly</Button>
        </span>
        <span className="mx-4 my-2">
          <Button onClick={() => setInterval("daily")}>Daily</Button>
        </span>
      </div>
      <div className="flex justify-center">
        <span className="mx-4 my-3 text-2xl">Date</span>
        <span className="mx-4 my-3 text-2xl">Quantity</span>
      </div>
      <div className="">
        {test.map((ele) => (
          <p className="flex justify-center border border-slate-900 p-2 my-2">
            <span className="mx-[30px]">{ele[0]}</span>
            <span className="mx-[30px]">{ele[1]}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default SalesHistory;
