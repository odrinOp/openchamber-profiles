export type PathOptions = { caseInsensitive?: boolean };

/** Absolute POSIX path or Windows drive path. `~` is not expanded. */
export const isAbsolutePath = (input: string): boolean => {
  const p = input.trim();
  return p.startsWith('/') || /^[A-Za-z]:[\\/]/.test(p);
};

/** Normalize separators, duplicate and trailing slashes. Root stays `/`. */
export const normalizePath = (input: string, options: PathOptions = {}): string => {
  let p = input.trim().replace(/\\/g, '/').replace(/\/{2,}/g, '/');
  if (p.length > 1 && p.endsWith('/')) p = p.replace(/\/+$/, '');
  if (p === '') p = input.trim().startsWith('/') ? '/' : '';
  return options.caseInsensitive ? p.toLowerCase() : p;
};

export const samePath = (a: string, b: string, options: PathOptions = {}): boolean =>
  normalizePath(a, options) === normalizePath(b, options);
