import Breadcrumb from "@/components/common/breadcrumbs";
import CustomersTable from "./components/customersTable";
import CustomersFilter from "./components/customersFilter";
import useCustomers from "./hooks";
import CustomersPagination from "./components/customersPagination";

const Customers = () => {
  const { isLoading, searchTerm, handleChangeSearchTerm, customers } =
    useCustomers();
  return (
    <div className="flex  flex-col gap-12 p-12 py-6 mb-4">
      <div className="flex flex-col gap-2 ">
        <div>
          <h1 className="font-extrabold text-2xl">Customers</h1>
        </div>
        <Breadcrumb links={[{ value: "Customers", to: "/" }]} />
      </div>
      <div className="flex gap-4 flex-col">
        <CustomersFilter
          searchTerm={searchTerm}
          handleChange={handleChangeSearchTerm}
        />
        <CustomersTable customers={customers} isLoading={isLoading} />
      </div>
      <CustomersPagination />
    </div>
  );
};

export default Customers;
