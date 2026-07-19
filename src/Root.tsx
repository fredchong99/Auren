// @ts-nocheck
import { useEffect, useState } from "react";
import Landing from "./Landing";
import AurenMvp from "./Mvp";

export default function Root() {
  const [view, setView] = useState("landing");
  useEffect(() => { window.scrollTo(0, 0); }, [view]);
  return view === "landing"
    ? <Landing onTry={() => setView("demo")} />
    : <AurenMvp onExit={() => setView("landing")} />;
}
