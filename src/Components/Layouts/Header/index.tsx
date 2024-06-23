import { useLocation } from "react-router-dom";
import { useGetManagerProfileQuery } from "../../../redux/api/slices/manager-api-slice";
import { useGetDriverProfileQuery } from "../../../redux/api/slices/driver-api-slice";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";

const Header = () => {
  const location = useLocation();
  const { data } = useGetManagerProfileQuery(null);
  const { data: driver } = useGetDriverProfileQuery(null);
  // const token = useSelector((state: RootState) => {
  //   return state.auth.token;
  // });

  return (
    <>
      <div className="pt-[1.8rem] w-full bg-[#F2F2FB] pb-4 pe-[4rem] ps-[1.5rem]  flex justify-between items-center">
        <div className="flex w-[50%]">
          <div className="flex-1">
            <a href="/" className="flex">
              <img
                src="/assets/fleeets.png"
                alt="Logo"
                className="logo"
                width="100"
                height="100"
              />
            </a>
          </div>
          <div className="flex-1 ps-[3.5rem] ">
            {location.pathname.includes("/manager/vehicles") && (
              <span className="text-[25px]">Vehicles</span>
            )}
            {location.pathname.includes("/manager/drivers") && (
              <span className="text-[25px]">Drivers</span>
            )}
            {location.pathname.includes("/manager/settings") && (
              <span className="text-[25px]">Settings</span>
            )}
            {location.pathname.includes("/driver/settings") && (
              <span className="text-[25px]">Settings</span>
            )}
            {location.pathname.includes("/driver/trips") && (
              <span className="text-[25px]">Trips</span>
            )}
            {location.pathname.includes("/driver/maintenance") && (
              <span className="text-[25px]">Maintenance</span>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex flex-col text-right">
            {location.pathname.includes("driver/") ? (
              <span className="font-bold">{driver && driver.name}</span>
            ) : (
              <span className="font-bold">{data && data.name}</span>
            )}
            {location.pathname.includes("driver/") ? (
              <span className="text-[12px] font-semibold text-neutral-400">
                Driver
              </span>
            ) : (
              <span className="text-[12px] font-semibold text-neutral-400">
                Fleet Manager
              </span>
            )}
          </div>
          <div className="rounded-lg ms-2">
            <img src="/assets/culogo.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
