import { FadeIn } from "@/components/FadeIn";
import {
  cafeDaTardeObjectStyle,
  getCafeDaTardeImageBySlug,
} from "@/lib/cafe-da-tarde-images";
import {
  CAFE_DA_TARDE_MENU_GROUP_LABELS,
  getCafeDaTardeMenuByGroup,
  type CafeDaTardeMenuGroup,
} from "@/lib/cafe-da-tarde-menu";

const MENU_GROUPS: CafeDaTardeMenuGroup[] = ["salgados", "sucos"];

type CafeDaTardeMenuProps = {
  schedule: string;
};

export function CafeDaTardeMenu({ schedule }: CafeDaTardeMenuProps) {
  return (
    <section
      id="cardapio-cafe-da-tarde"
      className="cdt-menu-section cdt-section-bridge border-t border-hairline/60 bg-surface py-10 md:py-14"
    >
      <div className="mx-auto max-w-2xl px-5 md:max-w-3xl md:px-10">
        <FadeIn className="mb-8 md:mb-10">
          <p className="section-eyebrow mb-3">Cardápio</p>
          <h2 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
            O que pedir
          </h2>
          <p className="mt-3 font-garamond text-base italic text-foreground-muted md:text-lg">
            {schedule}
          </p>
        </FadeIn>

        <div className="flex flex-col gap-8 md:gap-10">
          {MENU_GROUPS.map((group, groupIndex) => (
            <FadeIn key={group} delay={0.04 * groupIndex}>
              <h3 className="section-eyebrow border-b border-hairline pb-3">
                {CAFE_DA_TARDE_MENU_GROUP_LABELS[group]}
              </h3>
              <ul className="cdt-menu-list mt-4 flex flex-col gap-4">
                {getCafeDaTardeMenuByGroup(group).map((item) => {
                  const thumb = item.imageSlug
                    ? getCafeDaTardeImageBySlug(item.imageSlug)
                    : null;

                  return (
                    <li key={item.name} className="flex gap-3">
                      {thumb ? (
                        <img
                          src={thumb.src}
                          alt=""
                          aria-hidden
                          loading="lazy"
                          decoding="async"
                          style={cafeDaTardeObjectStyle(thumb)}
                          className="cdt-menu-thumb mt-0.5 shrink-0 object-cover"
                        />
                      ) : null}
                      <div className="flex min-w-0 flex-1 items-baseline gap-3">
                        <div className="min-w-0">
                          <p className="font-display text-base text-foreground">{item.name}</p>
                          <p className="mt-0.5 font-garamond text-sm italic leading-relaxed text-foreground-muted">
                            {item.description}
                          </p>
                        </div>
                        <span
                          aria-hidden
                          className="mb-1 min-w-3 flex-1 self-end border-b border-dotted border-hairline"
                        />
                        <span className="shrink-0 font-display text-sm text-accent">
                          {item.price}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </FadeIn>
          ))}
        </div>

        <p className="mt-8 font-garamond text-xs italic text-foreground-muted/70 md:mt-10">
          Valores sujeitos a alteração — consulte no café
        </p>
      </div>
    </section>
  );
}
