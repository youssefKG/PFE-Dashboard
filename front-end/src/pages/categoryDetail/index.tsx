import Breadcrumb from "../../components/common/breadcrumbs";
import ProductStatsCards from "@/components/containers/ProductStatsCards";
import CategoryInfo from "./components/categoryInfo";
import useCategoryDetail from "./hooks/useCategoryDetail";
import {
  CategoryMedia,
  EditCategoryButtons,
  RelatedCategoryProducts,
} from "./components";

const CategoryDetail = () => {
  const {
    isEditing,
    category,
    handleCategoryFormChanges,
    startEditing,
    cancelEditing,
    saveNewChanges,
    onDropNewImage,
    isRelatedProductLoading,
    relatedProducts,
    isDeletingCategortLoading,
    deleteCategory,
    isSavingNewChangesLoading,
  } = useCategoryDetail();

  return (
    <div className="flex flex-col mb-12 h-screen gap-5 lg:p-14 p-4 py-6 ">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">Dashboard</h1>
        </div>
        <Breadcrumb links={[{ value: "ProductDetail", to: "/" }]} />
      </div>
      <ProductStatsCards />
      {category ? (
        <div className="flex flex-col gap-6">
          <EditCategoryButtons
            cancelEditing={cancelEditing}
            startEditing={startEditing}
            isEditing={isEditing}
            saveNewChanges={saveNewChanges}
            isSavingCategoryLoading={isSavingNewChangesLoading}
            isDeletingCategortLoading={isDeletingCategortLoading}
            deleteCategory={deleteCategory}
          />
          <div className="flex gap-4 flex-row ">
            <CategoryInfo
              isEditing={isEditing}
              category={category}
              handleCategoryFormChanges={handleCategoryFormChanges}
            />
            <CategoryMedia
              onDropNewImage={onDropNewImage}
              isEditing={isEditing}
              imageUrl={category.imageUrl}
            />
          </div>
        </div>
      ) : null}
      <RelatedCategoryProducts
        isRelatedProductLoading={isRelatedProductLoading}
        relatedProducts={relatedProducts}
      />
    </div>
  );
};

export default CategoryDetail;
