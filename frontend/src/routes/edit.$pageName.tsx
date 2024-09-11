import {createFileRoute} from '@tanstack/react-router'
import {useState} from "react";

export const Route = createFileRoute("/edit/$pageName")({
  component: Edit
})

type Link = {
  url: string,
  name: string
}

function Edit() {
  const {pageName} = Route.useParams();
  const [links, setLinks] = useState<Link[]>([]);

  const handleSaveProfileDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Pages/${pageName}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "photoUrl": formData.get("photoUrl"),
        "firstName": formData.get("firstName"),
        "lastName": formData.get("lastName"),
        "email": formData.get("email"),
        "phone": formData.get("phone"),
      })
    });

    if (!response.ok) {
      // TODO: show error message
      console.log(`Error updating profile details. Code: ${response.status}`);
      return;
    }

    // TODO: show success message
    console.log("Profile details updated!");
  }

  const handleAddNewLink = () => {
    setLinks(prev => [...prev, {name: "", url: ""}]);
  };

  const handleRemoveLink = (index: number) => {
    console.log("remove link: " + index);
    setLinks(prev => {
      return prev.filter((_, i) => i !== index);
    });
  }

  const handleLinkUrlChange = (index: number, value: string) => {
    setLinks(prev => {
      prev[index].url = value;
      return [...prev];
    });
  };

  const handleLinkNameChange = (index: number, value: string) => {
    setLinks(prev => {
      prev[index].name = value;
      return [...prev];
    });
  };

  return (
    <main className="h-screen flex gap-4 p-6">
      <section className="card bg-base-200 w-1/3">
        Preview
      </section>
      <div className="w-2/3 h-fit flex flex-col gap-4">
        <section className="card bg-base-200 p-8">
          <h2 className="font-medium text-2xl mb-8">Profile Details</h2>
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
        <section className="card bg-base-200 p-8">
          <h2 className="font-medium text-2xl mb-8">Links</h2>
          <button className="btn btn-primary btn-outline" onClick={handleAddNewLink}>+ Add new link</button>
          <div className="flex flex-col gap-4 mt-6">
            {links.map((link, i) => (
              <div key={i} className="card bg-base-300 p-6">
                <div className="flex items-center">
                  <h3 className="font-medium">Link #{i + 1}</h3>
                  <button className="btn btn-sm ml-auto btn-error" onClick={() => handleRemoveLink(i)}>Remove</button>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <label className="input input-bordered flex items-center gap-2">
                    URL
                    <input type="text" name="linkUrl" className="grow"
                           onChange={(e) => handleLinkUrlChange(i, e.target.value)}/>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    Name
                    <input type="text" name="linkName" className="grow"
                           onChange={(e) => handleLinkNameChange(i, e.target.value)}/>
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary w-fit mt-6">Save Changes</button>
        </section>
      </div>
    </main>
  );
}