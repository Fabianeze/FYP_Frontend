// import { useDispatch } from "react-redux";
// import { COLORS } from "../../constants/theme";
// import { handleInput } from "../../redux/slices/input";

interface ISearchbarProps {
  placeholder: string;
}
const Searchbar = ({ placeholder }: ISearchbarProps) => {
  //const dispatch = useDispatch();
  return (
    <>
      <div className="flex h-[45px]">
        <div style={{ flex: 1, borderColor: "#FFFFFF" }} className="flex ">
          <input
            style={{
              outline: "none",
              fontSize: "15px",
            }}
            className="w-full rounded-s-[2.5rem] ps-4  flex"
            placeholder={placeholder}
            onChange={(e) => {
              // dispatch(handleInput(e.target.value));
            }}
          />
        </div>
        <button className="bg-[#470A34] flex justify-center w-[80px] ms-2  rounded-e-[2.5rem] items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="white"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Searchbar;
