import {createFileRoute} from '@tanstack/react-router'
import {useRef, useState} from "react";
import {Link} from "../types.ts";
import {supabase} from "../supabaseClient.ts";
import {fetchPage, updatePageLinks, updatePageProfileDetails} from "../api/pages.ts";

export const Route = createFileRoute("/edit/$pageName")({
  component: Edit,
  loader: async ({params: {pageName}}) => fetchPage(pageName)
})

function Edit() {
  const page = Route.useLoaderData();
  const {pageName} = Route.useParams();
  const [links, setLinks] = useState<Link[]>(page.links ?? []);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pageUrl = `${import.meta.env.VITE_APP_URL}/${pageName}`;
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const updatePreview = () => {
    if (iframeRef.current) {
      iframeRef.current.src = pageUrl;
    }
  };
  const handleSaveProfileDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let photoUrl = page.profileDetails?.photoUrl;
    if (selectedPhoto) {
      const {data, error} = await supabase.storage
        .from('avatars')
        .upload(`public/${selectedPhoto.name}`, selectedPhoto, {upsert: true})

      if (error) {
        // TODO: handle error
        console.log(error.message);
      } else {
        const {data: urlData} = supabase.storage.from("avatars").getPublicUrl(data?.path);
        photoUrl = urlData.publicUrl;
      }
    }

    console.log(photoUrl);

    const formData = new FormData(e.target as HTMLFormElement);

    await updatePageProfileDetails(pageName, {
      photoUrl: photoUrl,
      fullName: formData.get("fullName") as string,
      title: formData.get("title") as string,
      bio: formData.get("bio") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string
    });

    updatePreview();
  }

  const handleSaveLinks = async () => {
    await updatePageLinks(pageName, links);
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
      <section className="card bg-base-200 w-1/3">
        <div className="p-6 text-right">
          <button className="btn btn-primary btn-outline w-fit btn-sm"
                  onClick={() => navigator.clipboard.writeText(pageUrl)}>Copy share link
          </button>
        </div>
        <div className="grid place-items-center h-full p-12">
          <div
            className="w-full max-w-[375px] aspect-[375/667] border-[6px] rounded-[32px] border-base-300 overflow-hidden">
            <iframe ref={iframeRef} src={pageUrl} width="375" height="667"
                    className="w-full h-full"></iframe>
          </div>
        </div>
      </section>
      <div className="w-2/3 h-fit flex flex-col gap-4">
        <section className="card bg-base-200 p-8">
          <h2 className="font-medium text-2xl mb-8">Profile Details</h2>
          <form onSubmit={handleSaveProfileDetails}>
            <div className="flex flex-col gap-4">
              <div>
                <p>Photo</p>
                <div className="flex gap-6 mt-2">
                  <div className="avatar">
                    <div className="w-24 rounded bg-base-300">
                      <img src={selectedPhoto ? URL.createObjectURL(selectedPhoto) : page.profileDetails?.photoUrl}
                           alt=""/>
                    </div>
                  </div>
                  <input type="file" className="file-input file-input-bordered w-full max-w-xs"
                         onChange={(e) => setSelectedPhoto(e.target.files && e.target.files[0])}/>
                </div>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                Full Name
                <input type="text" name="fullName" defaultValue={page.profileDetails?.fullName} className="grow"/>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Title
                <input type="text" name="title" defaultValue={page.profileDetails?.title} className="grow"/>
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text"></span>
                </div>
                <textarea name="bio" defaultValue={page.profileDetails?.bio} className="textarea textarea-bordered h-24"
                          placeholder="Bio"></textarea>
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