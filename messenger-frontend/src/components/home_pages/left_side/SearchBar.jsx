const SearchBar = () => {
  return (
    <form className="flex items-center gap-2 w-full">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full w-full h-7"
      />
    </form>
  );
};

export default SearchBar;
