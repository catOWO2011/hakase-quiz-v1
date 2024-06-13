import { Header } from "../components"
import PageContent from "./PageContent"

export default function AppLayout() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <PageContent />
    </div>
  )
}