import {useState} from "react";

function ClaimPage() {
  const [pageName, setPageName] = useState("");

  const handleSubmit = () => {
    // TODO: handle claim
    console.log(pageName);
  };

  return (
    <main className="grid place-items-center h-screen">
      <section className="prose text-center">
        <PageIcon/>
        <h2 className="font-medium text-xl">
          You don’t have a page yet. <br/>
          Claim your first page now.
        </h2>
        <div className="max-w-xs">
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
          <button className="btn btn-primary w-full mt-4" onClick={handleSubmit}>Claim page</button>
        </div>
      </section>
    </main>
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