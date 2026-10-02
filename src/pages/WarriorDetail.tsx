import { Link, useParams } from "react-router";
import { Detail, MiniCard, MiniGrid, Prose } from "../components/Detail";
import { Img } from "../components/Img";
import { GoldList, MaybeLink, NotFound } from "../components/ui";
import { StoryTimeline } from "../components/Timeline";
import { battleById, kingdomById, siblings, warriorById, warriors } from "../data";
import type { Fort } from "../types";

export function FortCards({ forts }: { forts: Fort[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-6">
      {forts.map((f) => (
        <article key={f.name} className="card overflow-hidden">
          {f.image && <div className="aspect-16/10 overflow-hidden bg-surface"><Img src={f.image} alt={f.name} className="size-full object-cover" /></div>}
          <div className="p-6">
            <h3 className="mb-2 text-lg">{f.name}</h3>
            {f.description && <p className="text-[0.93rem] text-muted">{f.description}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function WarriorDetail() {
  const { id = "" } = useParams();
  const w = warriorById.get(id);
  if (!w) return <NotFound what="Warrior" back="All Warriors" backTo="/warriors" />;
  const { prev, next } = siblings(warriors, w.id);

  return (
    <Detail
      metaTitle={`${w.name} | Eternal Bharat`}
      metaDescription={w.description}
      badge="Legendary Warrior"
      name={w.name}
      subtitle={w.title}
      years={w.years}
      description={w.description}
      image={w.image}
      actions={[{ label: "View Timeline", href: "#timeline", primary: true }, { label: "References", href: "#references" }]}
      facts={[
        { label: "Kingdom", value: w.kingdomId && kingdomById.has(w.kingdomId) ? <Link to={`/kingdoms/${w.kingdomId}`} className="link-gold">{w.kingdom}</Link> : w.kingdom },
        { label: "Capital", value: w.capital },
        { label: "Dynasty", value: w.dynasty },
        { label: "Reign", value: w.reign },
        { label: "Born", value: w.born },
        { label: "Died", value: w.died },
      ]}
      sections={[
        { id: "biography", title: "Biography", body: <Prose>{w.biography}</Prose> },
        { id: "kingdom", title: "Kingdom", body: <Prose>{w.kingdomDescription}</Prose> },
        { id: "campaigns", title: "Military Campaigns", body: w.campaigns?.length ? <GoldList items={w.campaigns} /> : null },
        {
          id: "battles", title: "Major Battles",
          body: w.battles?.length ? (
            <MiniGrid>
              {w.battles.map((b) => (
                <MiniCard key={b.name} title={<MaybeLink to={`/battles/${b.id}`} exists={!!b.id && battleById.has(b.id)} className="transition-colors hover:text-gold-light">{b.name}</MaybeLink>}>
                  <p><strong className="font-semibold text-white">Year:</strong> {b.year}</p>
                  {b.outcome && <p>{b.outcome}</p>}
                </MiniCard>
              ))}
            </MiniGrid>
          ) : null,
        },
        { id: "forts", title: "Important Forts", body: w.forts?.length ? <FortCards forts={w.forts} /> : null },
        { id: "timeline", title: "Timeline", body: w.timeline?.length ? <StoryTimeline events={w.timeline} /> : null },
        { id: "achievements", title: "Achievements", body: w.achievements?.length ? <GoldList items={w.achievements} /> : null },
        { id: "legacy", title: "Legacy", body: <Prose>{w.legacy}</Prose> },
        { id: "references", title: "Sources & References", body: w.references?.length ? <GoldList items={w.references} /> : null },
      ]}
      prev={prev && { to: `/warriors/${prev.id}`, label: `← ${prev.name}` }}
      next={next && { to: `/warriors/${next.id}`, label: `${next.name} →` }}
    />
  );
}
