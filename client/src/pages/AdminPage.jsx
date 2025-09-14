import { useEffect, useState } from "react";
import { PlusCircle, ShoppingBasket, BarChart2 } from "lucide-react";
import AnalyticsTab from "../components/AnalyticsTab";
import ProductsList from "../components/ProductsList";
import CreateProductForm from "../components/CreateProductsForm";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";



export default function DashboardTabs() {
  const [active, setActive] = useState("products");
  const {user} = useUserStore();
 const navigate = useNavigate();  
  const tabs = [
    { id: "create", label: "Create Product", icon: PlusCircle },
    { id: "products", label: "Products", icon: ShoppingBasket },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
  ];

  
  useEffect(() => {
    if ( user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="h-full flex flex-col gap-2 items-center px-3 py-3 overflow-y-auto scrollbar-hide">
      <h1 className="text-sky-500 text-3xl font-bold mt-5 mb-2">Admin Dashboard</h1>

      <div className="flex gap-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition 
              ${
                active === id
                  ? "bg-sky-500 text-white shadow-md"
                  : "bg-white text-sky-500 hover:bg-sky-50 border border-sky-200"
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="w-full mt-4">
        {active === "create" && <CreateProductForm />}
        {active === "products" && <ProductsList />}
        {active === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
}
