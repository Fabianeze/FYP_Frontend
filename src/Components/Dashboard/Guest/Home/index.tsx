const GuestDashboardComponent = () => {
  return (
    <>
      <div className="flex space-y-4 flex-col h-full">
        <div className="bg-[#470A34] flex flex-col h-[5rem] h-[20%] rounded-lg w-full">
          <div className="ps-4 pt-3 flex-1 ">
            <span className="text-[20px] text-[#FFFFFF] ">
              Welcome Mokwunye Onyebuchi
            </span>
          </div>

          <div className="flex-1 align-end">
            <span className="text-[13px] text-[#FFFFFF]">
              Remember always check the plate numbers
            </span>
          </div>
        </div>
        <div className=" flex space-x-2 h-[80%] w-full">
          <div className="h-full bg-neutral-50 rounded-lg flex-1">
            <div className="ps-3">
              <span className="text-[22px]">Trips</span>
            </div>
          </div>
          <div className="h-full bg-neutral-50 rounded-lg flex-1">
            <div className="ps-3">
              <span className="text-[22px]">Maintenance</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestDashboardComponent;
