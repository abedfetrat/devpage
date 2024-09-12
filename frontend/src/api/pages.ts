import {Link, Page, ProfileDetails} from "../types.ts";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchPage(pageName: string) {
  const response = await fetch(`${API_URL}/Pages/${pageName}`);
  if (!response.ok) {
    if (response.status == 404) {
      throw new Error(`Page '${pageName}' was not found.`);
    } else {
      throw new Error(`Error getting data for page ${pageName}`);
    }
  }
  return (await response.json()) as Page;
}

export async function updatePageProfileDetails(pageName: string, details: ProfileDetails) {
  const response = await fetch(`${API_URL}/Pages/${pageName}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(details)
  });

  if (!response.ok) {
    throw new Error(`Error updating profile details for page '${pageName}`);
  }

  return (await response.json()) as Page;
}

export async function updatePageLinks(pageName: string, links: Link[]) {
  const response = await fetch(`${API_URL}/Pages/${pageName}/links`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "links": links
    })
  });

  if (!response.ok) {
    throw new Error(`Error updating links for page '${pageName}'`);
  }

  return (await response.json()) as Page;
}