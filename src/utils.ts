export function classNames(
  ...props: (string | Record<string, any>)[]
) {
  const className: string[] = [];

  props.map((c) => {
    // === if prop is a string ===
    if (typeof c === "string") return className.push(c);

    // === if prop is an object ===
    Object.keys(c).map((key) => {
      if (c[key]) className.push(key);
    });
  });

  return className.join(" ");
}
