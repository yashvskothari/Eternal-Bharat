import { useParams } from "react-router";
import { Detail, MiniCard, MiniGrid, Prose } from "../components/Detail";
import { GoldList, MaybeLink, NotFound } from "../components/ui";
import { KingdomChronicle } from "../components/Timeline";
import { battleById, kingdoms, siblings, kingdomById, warriorById } from "../data";
import { FortCards } from "./WarriorDetail";

export default function KingdomDetail() {
  const { id = "" } = useParams();
  const k = kingdomById.get(id);
  if (!k) return <NotFound what="Kingdom" back="All Kingdoms" backTo="/kingdoms" />;
  const { prev, next } = siblings(kingdoms, k.id);
  const rulers = (k.rulers ?? []).map((r) => warriorById.get(r)).filter((r) => !!r);

  return (
    <Detail
      metaTitle={`${k.name} | Eternal Bharat`}
      metaDescription={k.description}
      badge="Historic Kingdom"
      name={k.name}
      subtitle={k.dynasty}
      years={k.period}
      description={k.description}
      image={k.mapImage}
      imageFit="contain"
      actions={[{ label: "View Timeline", href: "#timeline", primary: true }, { label: "All Kingdoms", to: "/kingdoms" }]}
      facts={[
        { label: "Capital", value: k.capital },
        { label: "Dynasty", value: k.dynasty },
        { label: "Period", value: k.period },
        { label: "Region", value: k.region },
        { label: "Founded", value: k.founded },
      ]}
      sections={[
        { id: "overview", title: "Overview", body: <Prose>{k.overview}</Prose> },
        {
          id: "rulers", title: "Rulers",
          body: rulers.length ? (
            <MiniGrid>
              {rulers.map((w) => (
                <MiniCard key={w.id} title={<MaybeLink to={`/warriors/${w.id}`} exists className="transition-colors hover:text-gold-light">{w.name}</MaybeLink>}>
                  <p>{w.title}</p>
                </MiniCard>
              ))}
            </MiniGrid>
          ) : <p className="text-muted">No linked rulers yet.</p>,
        },
        {
          id: "battles", title: "Major Battles",
          body: k.battles?.length ? (
            <MiniGrid>
              {k.battles.map((b) => (
                <MiniCard key={b.name} title={<MaybeLink to={`/battles/${b.id}`} exists={!!b.id && battleById.has(b.id)} className="transition-colors hover:text-gold-light">{b.name}</MaybeLink>}>
                  <p><strong className="font-semibold text-white">Year:</strong> {b.year || ""}</p>
                </MiniCard>
              ))}
            </MiniGrid>
          ) : null,
        },
        {
          id: "forts", title: "Famous Forts",
          subtitle: "The strongholds that protected the kingdom and witnessed its greatest moments.",
          body: k.forts?.length ? <FortCards forts={k.forts} /> : null,
        },
        { id: "timeline", title: "Timeline", body: k.timeline?.length ? <KingdomChronicle events={k.timeline} dynasty={k.dynasty || k.name} period={k.period || ""} /> : null },
        { id: "achievements", title: "Achievements", body: k.achievements?.length ? <GoldList items={k.achievements} /> : null },
        { id: "legacy", title: "Legacy", body: <Prose>{k.legacy}</Prose> },
        { id: "references", title: "Sources & References", body: k.references?.length ? <GoldList items={k.references} /> : null },
      ]}
      prev={prev && { to: `/kingdoms/${prev.id}`, label: `← ${prev.name}` }}
      next={next && { to: `/kingdoms/${next.id}`, label: `${next.name} →` }}
    />
  );
}
