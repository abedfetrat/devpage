export default function Navbar() {
  return (
    <div className="navbar bg-base-100 container mx-auto">
      <div className="">
        <a className="btn btn-ghost text-xl">devpage</a>
      </div>
      <p className="flex-1 font-medium text-sm pl-6">My Page</p>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-10 rounded-full">
              <span className="text-md">JD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}