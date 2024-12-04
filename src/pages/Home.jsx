import Navbar from "../components/Navbar";
import NotesList from "../components/NotesList";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <NotesList />
    </div>
  );
}
