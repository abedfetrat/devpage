import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute("/edit/$pageName")({
  component: Edit
})

function Edit() {
  const {pageName} = Route.useParams();
  
  function handleSaveProfileDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    
    console.log(formData.get("photoUrl"));
  }

  return (
    <main className="h-screen flex gap-4 p-6">
      <section className="card bg-base-200 w-1/3">
      </section>
      <section className="card bg-base-200 w-2/3 h-fit p-8">
        <h2 className="font-medium text-2xl mb-6">Profile Details</h2>
        <form onSubmit={handleSaveProfileDetails}>
          <div className="flex flex-col gap-4">
            <label className="input input-bordered flex items-center gap-2">
              Photo URL
              <input type="text" name="photoUrl" className="grow"/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              First Name
              <input type="text" name="firstName" className="grow"/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Last Name
              <input type="text" name="lastName" className="grow"/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Email
              <input type="email" name="email" className="grow"/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Phone
              <input type="tel" name="phone" className="grow"/>
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-6">Save Changes</button>
        </form>
      </section>
    </main>
  );
}