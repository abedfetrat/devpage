import {createFileRoute} from '@tanstack/react-router'
import {useRef, useState} from "react";

type ProfileDetails = {
  photoUrl: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string
}

type Page = {
  uniqueName: string,
  userId: string,
  profileDetails: ProfileDetails,
  links: Link[]
}
export const Route = createFileRoute("/edit/$pageName")({
  component: Edit,
  loader: async ({params: {pageName}}) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Pages/${pageName}`);
    if (!response.ok) {
      throw new Error(`Error getting data for page ${pageName}`);
    }
    return (await response.json()) as Page;
  }
})

type Link = {
  url: string,
  name: string
}

function Edit() {
  const page = Route.useLoaderData();
  const {pageName} = Route.useParams();
  const [links, setLinks] = useState<Link[]>(page.links ?? []);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pageUrl = `${import.meta.env.VITE_APP_URL}/${pageName}`;
  const updatePreview = () => {
    if (iframeRef.current) {
      iframeRef.current.src = pageUrl;
    }
  };
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
    updatePreview();
  }

  const handleSaveLinks = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Pages/${pageName}/links`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "links": links
      })
    });

    if (!response.ok) {
      // TODO: show error message
      console.log(`Error updating page links. Code: ${response.status}`);
      return;
    }

    // TODO: show success message
    console.log("Page links updated!");
    updatePreview();
  };

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
      <section className="card bg-base-200 w-1/3 grid place-items-center p-12">
        <div
          className="w-full max-w-[375px] aspect-[375/667] border-[6px] rounded-[32px] border-base-300 overflow-hidden">
          <iframe ref={iframeRef} src={pageUrl} width="375" height="667"
                  className="w-full h-full"></iframe>
        </div>
      </section>
      <div className="w-2/3 h-fit flex flex-col gap-4">
        <section className="card bg-base-200 p-8">
          <h2 className="font-medium text-2xl mb-8">Profile Details</h2>
          <form onSubmit={handleSaveProfileDetails}>
            <div className="flex flex-col gap-4">
              <label className="input input-bordered flex items-center gap-2">
                Photo URL
                <input type="text" name="photoUrl" defaultValue={page.profileDetails?.photoUrl} className="grow"/>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                First Name
                <input type="text" name="firstName" defaultValue={page.profileDetails?.firstName} className="grow"/>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Last Name
                <input type="text" name="lastName" defaultValue={page.profileDetails?.lastName} className="grow"/>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Email
                <input type="email" name="email" defaultValue={page.profileDetails?.email} className="grow"/>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Phone
                <input type="tel" name="phone" defaultValue={page.profileDetails?.phone} className="grow"/>
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
                           onChange={(e) => handleLinkUrlChange(i, e.target.value)}
                           defaultValue={link.url}
                    />
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    Name
                    <input type="text" name="linkName" className="grow"
                           onChange={(e) => handleLinkNameChange(i, e.target.value)}
                           defaultValue={link.name}/>
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary w-fit mt-6" onClick={handleSaveLinks}>Save Changes</button>
        </section>
      </div>
    </main>
  );
}