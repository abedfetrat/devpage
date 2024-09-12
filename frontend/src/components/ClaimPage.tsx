import {useState} from "react";
import {useNavigate} from "@tanstack/react-router";
import {useMutation} from "@tanstack/react-query";
import {createPage} from "../api/pages.ts";
import Navbar from "./Navbar.tsx";

function ClaimPage() {
  const [pageName, setPageName] = useState("");
  const navigate = useNavigate();

  const {mutate, error} = useMutation({
    mutationFn: async () => createPage(pageName),
    onSuccess: () => {
      navigate({to: `/edit/${pageName}`});
    }
  });

  return (
    <>
      <Navbar/>
      <main className="grid place-items-center h-screen">
        <section className="prose text-center max-w-sm">
          <PageIcon/>
          <h2 className="font-medium text-xl">
            You don’t have a page yet. <br/>
            Claim your first page now.
          </h2>
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Page name</span>
              </div>
              <div className="input input-bordered flex items-center gap-2">
                devpage.com/
                <input
                  type="text"
                  className="grow"
                  placeholder="your-page-name"
                  onChange={e => setPageName(e.target.value)}/>
              </div>
            </label>
            <button className="btn btn-primary w-full mt-4" onClick={() => mutate()}>Claim page</button>
          </div>
          {error &&
            <div role="alert" className="alert alert-error mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{error.message}</span>
            </div>}
        </section>
      </main>
    </>
  )
}

const PageIcon = () => (
  <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" width="132" height="181" viewBox="0 0 132 181"
       fill="none">
    <rect x="1.5" y="1.5" width="104.506" height="153.434" rx="12.5" stroke="#474747" strokeWidth="3"/>
    <rect x="25.2827" y="25.2828" width="104.506" height="153.434" rx="12.5" stroke="#474747" strokeWidth="3"/>
  </svg>
);

export default ClaimPage;