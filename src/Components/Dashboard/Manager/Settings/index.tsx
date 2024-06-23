const SettingComponent = () => {
  return (
    <>
      <div className="flex h-[100%] space-x-5">
        <button className="bg-neutral-50 rounded-[2rem] shadow w-[20rem] h-[30%] hover:bg-gray-200">
          <span className="text-[1.2rem]">Account Information</span>
        </button>
        <button className="bg-neutral-50 rounded-[2rem] shadow w-[20rem] h-[30%] hover:bg-gray-200">
          <span className="text-[1.2rem]">Change Password</span>
        </button>
      </div>
    </>
  );
};

export default SettingComponent;
