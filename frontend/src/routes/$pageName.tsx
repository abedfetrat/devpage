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
    <div data-theme={page.settings?.theme} className="h-full min-h-screen">
      <main className="container max-w-lg mx-auto p-4 text-center">
        {page.resumeUrl &&
          <div className="text-end">
            <a
              href={page.resumeUrl}
              target={"_blank"}
              rel="noopener noreferrer"
              className="btn btn-neutral btn-sm">
              Resume
            </a>
          </div>}
        <section className="py-14">
          {author?.photoUrl &&
            <div className="avatar">
              <div className="w-28 rounded-full mb-6">
                <img src={author.photoUrl} alt=""/>
              </div>
            </div>
          }
          {author?.fullName &&
            <h1 className="text-2xl font-semibold">{author.fullName}</h1>}
          {author?.title && <p className="text-md font-medium mt-2">{author.title}</p>}
          {(author?.phone || author?.email) &&
            <div className="flex flex-col gap-2 justify-center items-center mt-4">
              <a className="flex gap-4 items-center badge badge-neutral p-4" href={`tel:${author.phone}`}>
                <svg
                className="w-6 h-6 fill-primary"  
                  xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                  <path
                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                </svg>
                {author.phone}
              </a>
              <a className="flex gap-4 items-center badge badge-neutral p-4" href={`mailto:${author.email}`}>
                <svg
                  className="w-6 h-6 fill-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <path
                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                </svg>
                {author.email}
              </a>
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
    </div>
  );
}
























