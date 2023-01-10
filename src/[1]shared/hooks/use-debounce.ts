import { useEffect, useMemo } from "react";

function debounce<A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number
): [(args: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> =>
      new Promise((resolve) => {
          if (timer) {
              clearTimeout(timer);
          }

          timer = setTimeout(() => {
              resolve(fn(args));
          }, ms);
      });

  const teardown = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
}

interface Props<A, R> {
  fn: (args: A) => R,
  ms: number,
}

export const useDebouncedCallback = <A = void, R = void>(
  props: Props<A, R>,
  deps: any[],
): ((args: A) => Promise<R>) => {
  const { fn, ms = 300 } = props;
  const [debouncedFun, teardown] = useMemo(() => {
      return debounce<A, R>(fn, ms);
  },
  // eslint-disable-next-line
  [...deps, fn, ms]
  );

  useEffect(() => () => teardown(), [teardown]);

  return debouncedFun;
};