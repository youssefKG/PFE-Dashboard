import Breadcrumb from "../../components/common/breadcrumbs";

const ProductDetail = () => {
  return (
    <div className="flex flex-col gap-2 p-2  py-6 mb-16">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex flex-col gap-2 ">
          <div>
            <h1 className="font-extrabold text-2xl">Product Detail</h1>
          </div>
          <Breadcrumb links={[{ value: "Category", to: "/category" }]} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
