import {
  Component,
  createEffect,
  createResource,
  For,
  Match,
  on,
  Suspense,
  Switch,
} from "solid-js";

import { Pokemon, Type } from "../../interfaces/interfaces";
import { colorBackground, typeToColor } from "../../utils/utils";

interface pokeCard {
  pokemon: Pokemon;
}

const PokeCard: Component<{ url: any }> = (props) => {
  const [pokemon, { refetch }] = createResource(
    async (): Promise<Pokemon> => (await fetch(props.url())).json()
  );

  createEffect(
    on(
      props.url,
      () => {
        refetch();
      },
      { defer: true }
    )
  );

  return (
    <Switch>
      <Match when={pokemon.state === "refreshing"}>
        <img class="h-40 w-40" src="./pokeLoad.gif" />
      </Match>
      <Match when={pokemon.state === "ready"}>
        <div class="relative flex flex-col overflow-hidden bg-white rounded-lg h-96 w-72 shadow-2xl">
          <div
            class={`absolute ${colorBackground(
              pokemon()?.types as Type[]
            )} rounded-full w-full h-full -translate-y-1/2`}
          />
          <div class="flex flex-col justify-around items-center h-full z-10">
            <div
              class="flex items-center justify-center self-end gap-1 px-2
        py-1 mx-5 my-5 bg-white rounded-full shadow-md"
            >
              <p class="font-medium text-sm">HP</p>
              <p class="font-bold">{pokemon()?.stats[0]?.base_stat ?? null}</p>
            </div>
            <Suspense fallback={<p>Loading</p>}>
              <img
                class="w-44 h-44"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  pokemon()?.id
                }.png`}
              />
            </Suspense>
            <h1 class="capitalize font-semibold tracking-wide text-lg">
              {pokemon()?.name}
            </h1>
            <div class="flex gap-2">
              <For each={pokemon()?.types}>
                {(pokeType) => <PokeType pokeType={pokeType?.type?.name} />}
              </For>
            </div>
            <div class="flex justify-around w-full">
              <Stats
                label="Attack"
                stats={pokemon()?.stats[1]?.base_stat ?? null}
              />
              <Stats
                label="Defense"
                stats={pokemon()?.stats[2]?.base_stat ?? null}
              />
              <Stats
                label="Speed"
                stats={pokemon()?.stats[5]?.base_stat ?? null}
              />
            </div>
          </div>
        </div>
      </Match>
    </Switch>
  );
};

export default PokeCard;

const Stats: Component<{ stats: number | null; label: string }> = (props) => (
  <div class="flex flex-col  items-center">
    <p class="font-bold">{props.stats}</p>
    <p class="font-medium tracking-wide capitalize">{props.label}</p>
  </div>
);

const PokeType: Component<{ pokeType: string }> = (props) => {
  const typeColors = typeToColor(props?.pokeType);

  return (
    <p
      class={`${typeColors?.bg} ${typeColors?.fg} px-3 py-1 rounded-full text-slate-100 font-semibold capitalize shadow-md tracking-wider`}
    >
      {props?.pokeType}
    </p>
  );
};
