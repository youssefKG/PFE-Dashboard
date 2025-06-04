import Breadcrumb from "@/components/common/breadcrumbs";
import CustomerGeneralInfomation from "./components/customerGeneralInfomation";
import EditCustomeButtons from "./components/EditCustomerButtons";
import useCustomerDetail from "./hooks/useCustomerDetail";
import { ClipLoader } from "react-spinners";
import CustomerOrders from "./components/customerOrders";

const CustomerDetail = () => {
  const {
    isEditing,
    cancelEditing,
    saveChanges,
    isSavingChangesLoading,
    deleteCustomer,
    startEditing,
    isDeletingCustomerLoading,
    isLoading,
    handleInputChanges,
    customer,
    isCustomerOrdersLoading,
    orders,
  } = useCustomerDetail();
  return (
    <div className="flex flex-col h-screen gap-2 lg:p-6 p-2 py-6 mb-4">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">Customer detail</h1>
        </div>
        <Breadcrumb links={[{ value: "Customer detail", to: "/" }]} />
      </div>
      {!isLoading ? (
        <div className="flex flex-col gap-4 mt-12">
          <EditCustomeButtons
            deleteCutomer={deleteCustomer}
            isSavingChangesLoading={isSavingChangesLoading}
            cancelEditing={cancelEditing}
            startEditing={startEditing}
            isEditing={isEditing}
            saveChanges={saveChanges}
            isDeletingCustomerLoading={isDeletingCustomerLoading}
          />
          <CustomerGeneralInfomation
            customer={customer}
            isEditing={isEditing}
            handleInputChanges={handleInputChanges}
          />
        </div>
      ) : (
        <div className="flex justify-center my-12">
          <ClipLoader size={40} color="black" />
        </div>
      )}
      <CustomerOrders
        orders={orders}
        isCustomerOrdersLoading={isCustomerOrdersLoading}
      />
    </div>
  );
};

export default CustomerDetail;
