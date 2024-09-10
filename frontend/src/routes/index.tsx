import {createFileRoute} from "@tanstack/react-router";
import ClaimPage from "../components/ClaimPage.tsx";

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  return (<ClaimPage />)
}