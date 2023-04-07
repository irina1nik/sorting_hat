import clsx from "clsx";
import Balancer from "react-wrap-balancer";
import HouseCard from "./HouseCard";

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />;

type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            AI
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

const findHouse = (text: string) => {
  const regex = /(Ravenclaw|Hufflepuff|Gryffindor|Slytherin)/;
  const matches = text.match(regex);
  if (matches && matches.length > 0) {
    return matches[0];
  }
  return null; // return null if no matching substring found
};

export function ChatLine({ role = "assistant", content }: ChatGPTMessage) {
  if (!content) {
    return null;
  }
  const formatteMessage = convertNewLines(content);
  const hogwartzHouse = findHouse(content);

  return (
    <div
      className={
        role != "assistant" ? "float-right clear-both" : "float-left clear-both"
      }
    >
      <div className="float-right mb-5 rounded-lg bg-zinc-800 px-4 py-5 shadow-lg ring-1 ring-zinc-700 sm:px-6">
        <div className="flex space-x-3">
          <div className="flex-1 gap-4">
            <p className="font-large text-sm text-zinc-400 font-semibold mb-2">
              {role == "assistant" ? "AI" : "You"}
            </p>
            <p className="text font-normal">{formatteMessage}</p>
            {hogwartzHouse && role == "assistant" && (
              <HouseCard house={hogwartzHouse} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
