import {
  Component,
  createResource,
  createSignal,
  For,
  JSXElement,
  lazy,
  Show,
} from "solid-js";
import { PokeResult } from "./interfaces/interfaces";

const PokeCard = lazy(() => import("./components/pokeCard/PokeCard"));

const App: Component = () => {
  const [url, setUrl] = createSignal<string>("");

  const [list] = createResource(async () =>
    (await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")).json()
  );

  const PokeSelect = (ele: PokeResult): JSXElement => (
    <option value={ele.url}>{ele.name}</option>
  );

  return (
    <main class="flex flex-col items-center bg-slate-200 w-screen h-screen">
      <div class="my-3 h-10 flex items-center gap-3">
        <label for="pokemon-select">Choose Pokemon:</label>
        <Show when={list()?.results} fallback={<p>Loading</p>}>
          <select
            class="p-2 bg-slate-100 rounded-lg"
            name="pokemon"
            id="pokemon-select"
            onInput={(e) => {
              e.preventDefault();
              setUrl(e.currentTarget?.value);
            }}
          >
            <option value="">Choose Pokemon</option>
            <For each={list().results}>{PokeSelect}</For>
          </select>
        </Show>
      </div>
      <div class="flex h-full items-center justify-center">
        <Show when={url() !== ""}>
          <PokeCard url={url} />
        </Show>
      </div>
    </main>
  );
};

export default App;
