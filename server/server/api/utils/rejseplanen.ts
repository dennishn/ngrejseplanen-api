export const parseRefId = (ref: string): string => {
    const decodedRef = decodeURIComponent(ref);
    return decodedRef.split('?ref=').pop().split('?date').shift();
};

export const makeUtcDate = (date: string, time: string): string => {
  let d = date.split('.');

  let y = `20${d[2]}`;
  let m = d[1];
  let dd = d[0];

  let t = time += ':00';
  return `${y}-${m}-${dd}T${t}Z`;
};
