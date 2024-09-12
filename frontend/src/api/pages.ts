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

export async function createPage(pageName: string) {
  const response = await fetch(`${API_URL}/Pages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "pageName": pageName,
      "userId": "someUserId"
    })
  });

  if (!response.ok) {
    if (response.status == 409) {
      throw new Error("That name is already in use. Try another");
    } else {
      throw new Error(`Error creating page. Try again`);
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

export async function updatePageResumeUrl(pageName: string, resumeUrl: string) {
  const response = await fetch(`${API_URL}/Pages/${pageName}/resumeUrl?resumeUrl=${resumeUrl}`, {
    method: "PUT"
  });

  if (!response.ok) {
    throw new Error(`Error updating resume URL for page '${pageName}`);
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

export async function removePageResumeUrl(pageName: string) {
  const response = await fetch(`${API_URL}/Pages/${pageName}/resumeUrl`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error(`Error removing resume URL for page '${pageName}`);
  }
}