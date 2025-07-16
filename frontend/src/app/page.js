import Header from "@/components/Header";
import ActivitiesListHome from "@/components/ActivitiesListHome";
export default function Home() {
  return (
    <>
      <Header />
      <main className="px-8">
        <h2 className="font-heading mb-5 text-3xl">Nos activités</h2>
        <ActivitiesListHome />
      </main>
    </>
  );
}
