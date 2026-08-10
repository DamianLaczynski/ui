type Meridiem = 'am' | 'pm';

function hour24From12(h12: number, meridiem: Meridiem): number {
  if (meridiem === 'am') {
    return h12 === 12 ? 0 : h12;
  }
  return h12 === 12 ? 12 : h12 + 12;
}

export function parseFlexibleTimeToHhmm(fragment: string): string | null {
  const t = fragment.trim().replace(/\s+/g, ' ');
  let m = t.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])\.?$/);
  if (m) {
    const h12 = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    const meridiem: Meridiem = m[3].toLowerCase() === 'pm' ? 'pm' : 'am';
    if (h12 < 1 || h12 > 12 || min > 59) {
      return null;
    }
    const h24 = hour24From12(h12, meridiem);
    return `${String(h24).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  }
  m = t.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (m) {
    const h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    if (h <= 23 && min <= 59) {
      return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
    }
  }
  return null;
}

export function formatHhmmForDisplay(hhmm: string, use24HourFormat: boolean): string {
  const raw = hhmm.trim();
  if (!raw || use24HourFormat) {
    return hhmm;
  }
  const normalized = parseFlexibleTimeToHhmm(raw);
  if (!normalized) {
    return hhmm;
  }
  const parts = /^(\d{2}):(\d{2})$/.exec(normalized);
  if (!parts) {
    return hhmm;
  }
  const hour = parseInt(parts[1], 10);
  const minute = parseInt(parts[2], 10);
  const date = new Date(2000, 0, 1, hour, minute);
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function extractDateAndFlexibleTimeSegments(inputValue: string): {
  datePart: string;
  timePart: string;
} | null {
  const v = inputValue.trim();
  if (!v) {
    return null;
  }
  if (v.includes('T')) {
    const i = v.indexOf('T');
    const datePart = v.slice(0, i).trim();
    const timePart = v.slice(i + 1).trim();
    return datePart && timePart ? { datePart, timePart } : null;
  }

  const anchored = /\d{1,2}:\d{2}(?::\d{2})?(\s*[AaPp][Mm]\.?)?\s*$/i.exec(v);
  if (anchored && anchored.index !== undefined && anchored.index > 0) {
    const datePart = v.slice(0, anchored.index).trim();
    const timePart = anchored[0].trim();
    if (datePart && timePart) {
      return { datePart, timePart };
    }
  }

  const parts = v.split(/\s+/);
  if (parts.length < 2) {
    return null;
  }

  return { datePart: parts[0], timePart: parts.slice(1).join(' ') };
}
