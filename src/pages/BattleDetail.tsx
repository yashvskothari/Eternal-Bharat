import { Link, useParams } from "react-router";
import { Detail, MiniCard, MiniGrid, Prose } from "../components/Detail";
import { GoldList, NotFound } from "../components/ui";
import { battleById, battles, kingdomById, siblings, warriorById } from "../data";

export default function BattleDetail() {
  const { id = "" } = useParams();
  const b = battleById.get(id);
  if (!b) return <NotFound what="Battle" back="All Battles" backTo="/battles" />;
  const { prev, next } = siblings(battles, b.id);
  const linked = (b.warriors ?? []).map((w) => warriorById.get(w)).filter((w) => !!w);

  return (
    <Detail
      metaTitle={`${b.name} | Eternal Bharat`}
      metaDescription={b.description}
      badge="Historic Battle"
      name={b.name}
      subtitle={b.location}
      years={b.year}
      description={b.description}
      image={b.image}
      actions={[{ label: "All Battles", to: "/battles", primary: true }, { label: "References", href: "#references" }]}
      facts={[
        { label: "Year", value: b.year },
        { label: "Location", value: b.location },
        { label: "Result", value: b.result },
        { label: "Kingdom", value: b.kingdomId && kingdomById.has(b.kingdomId) ? <Link to={`/kingdoms/${b.kingdomId}`} className="link-gold">{b.kingdom}</Link> : b.kingdom || "—" },
        { label: "Commanders", value: b.commanders },
      ]}
      sections={[
        { id: "significance", title: "Historical Significance", body: <Prose>{b.significance}</Prose> },
        {
          id: "warriors", title: "Linked Warriors",
          body: linked.length ? (
            <MiniGrid>
              {linked.map((w) => (
                <MiniCard key={w.id} title={<Link to={`/warriors/${w.id}`} className="transition-colors hover:text-gold-light">{w.name}</Link>}>
                  <p>{w.title}</p>
                </MiniCard>
              ))}
            </MiniGrid>
          ) : <p className="text-muted">No linked warrior pages yet.</p>,
        },
        { id: "references", title: "Sources & References", body: b.references?.length ? <GoldList items={b.references} /> : null },
      ]}
      prev={prev && { to: `/battles/${prev.id}`, label: `← ${prev.name}` }}
      next={next && { to: `/battles/${next.id}`, label: `${next.name} →` }}
    />
  );
}
