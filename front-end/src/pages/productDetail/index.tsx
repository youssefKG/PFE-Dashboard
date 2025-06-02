import Breadcrumb from "../../components/common/breadcrumbs";
import EditProductButtons from "@/components/containers/EditProductButtons";
import EditProductImages from "@/components/containers/EditProductImages";
import ProductNotFound from "@/components/containers/ProductNotFound";
import EditProductInfo from "@/components/containers/EditProductInfo";
import useProductDetail from "@/hooks/useProductDetail";
import ProductStatsCards from "@/components/containers/ProductStatsCards";
import ProductReviews from "@/components/containers/ProductReviews";

const ProductDetail = () => {
  const {
    isEditing,
    saveProductChanges,
    handleChange,
    startEdit,
    cancelProductEditing,
    deleteImage,
    product,
    onDropNewImages,
    newImagesUrl,
    deleteNewImage,
    isSavingProductLoading,
    isDeletingProductLoading,
    deleteProduct,
  } = useProductDetail();

  return (
    <div className="flex flex-col h-screen gap-2 lg:p-14 p-4 py-6 mb-4">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">Dashboard</h1>
        </div>
        <Breadcrumb links={[{ value: "ProductDetail", to: "/" }]} />
      </div>
      {product ? (
        <div className="flex flex-col gap-6">
          <ProductStatsCards />
          <div>
            <div>
              <EditProductButtons
                startEdit={startEdit}
                isEditing={isEditing}
                cancelProductEditing={cancelProductEditing}
                saveProductChanges={saveProductChanges}
                isSavingProductLoading={isSavingProductLoading}
                isDeletingProductLoading={isDeletingProductLoading}
                deleteProduct={deleteProduct}
              />
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-5 mt-10 justify-center">
              <EditProductInfo
                handleChange={handleChange}
                isEditing={isEditing}
                product={product}
              />
              <EditProductImages
                deleteImage={deleteImage}
                images={product.images}
                isEditing={isEditing}
                newImagesUrl={newImagesUrl}
                onDropNewImages={onDropNewImages}
                deleteNewImage={deleteNewImage}
              />
            </div>
          </div>
          <ProductReviews />
        </div>
      ) : (
        <ProductNotFound />
      )}
    </div>
  );
};

export default ProductDetail;
