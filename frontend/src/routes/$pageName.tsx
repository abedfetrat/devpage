import {createFileRoute} from '@tanstack/react-router'
import {Page as PageType} from "../types";

export const Route = createFileRoute('/$pageName')({
  loader: async ({params: {pageName}}) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Pages/${pageName}`);
    if (!response.ok) {
      if (response.status == 404) {
        throw new Error(`Page '${pageName}' was not found.`);
      } else {
        throw new Error(`Error getting data for page ${pageName}`);
      }
    }
    return (await response.json()) as PageType;
  },
  component: Page
})

function Page() {
  const page = Route.useLoaderData();
  const author = page.profileDetails;
  return (
    <main className="container max-w-lg mx-auto py-20 text-center">
      <section>
        {author?.photoUrl &&
          <div className="avatar">
            <div className="w-24 rounded-full mb-6">
              <img src={author.photoUrl} alt=""/>
            </div>
          </div>
        }
        {author?.fullName &&
          <h1 className="text-xl font-bold">{author.fullName}</h1>}
        {author?.title && <p className="text-sm font-semibold mt-2">{author.title}</p>}
        {(author?.phone || author?.email) &&
          <div className="flex flex-col gap-2 justify-center mt-4 text-sm font-medium">
            <a href={`tel:${author.phone}`}>{author.phone}</a>
            <a href={`mailto:${author.email}`}>{author.email}</a>
          </div>
        }
        {author?.bio && <p className="text-sm mt-6">{author.bio}</p>}
        {page.links &&
          <ul className="flex flex-col gap-4 mt-8">
            {page.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target={"_blank"}
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-block">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>}
      </section>
    </main>
  );
}
























