import {createFileRoute} from '@tanstack/react-router'
import {fetchPage} from "../api/pages.ts";

export const Route = createFileRoute('/$pageName')({
  loader: async ({params: {pageName}}) => fetchPage(pageName),
  component: Page
})

function Page() {
  const page = Route.useLoaderData();
  const author = page.profileDetails;
  return (
    <main className="container max-w-lg mx-auto p-4 text-center">
      {page.resumeUrl &&
        <div className="text-end">
          <a href={page.resumeUrl} className="btn btn-neutral btn-sm">Resume</a>
        </div>}
      <section className="py-14">
        {author?.photoUrl &&
          <div className="avatar">
            <div className="w-24 rounded-full mb-6">
              <img src={author.photoUrl} alt=""/>
            </div>
          </div>
        }
        {author?.fullName &&
          <h1 className="text-xl font-semibold">{author.fullName}</h1>}
        {author?.title && <p className="text-sm font-medium mt-2">{author.title}</p>}
        {(author?.phone || author?.email) &&
          <div className="flex flex-col gap-2 justify-center items-center mt-4">
            <a className="badge badge-neutral" href={`tel:${author.phone}`}>{author.phone}</a>
            <a className="badge badge-neutral" href={`mailto:${author.email}`}>{author.email}</a>
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
























