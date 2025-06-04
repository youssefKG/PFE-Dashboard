import Breadcrumb from "@/components/common/breadcrumbs";

const OrderDetail = () => {
  return (
    <div className="flex flex-col h-screen gap-2 lg:p-6 p-2 py-6 mb-4">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">Order detail</h1>
        </div>
        <Breadcrumb links={[{ value: "Order detail", to: "/" }]} />
      </div>
    </div>
  );
};

export default OrderDetail;
