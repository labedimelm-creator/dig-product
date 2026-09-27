const KEY = 'taleb-riyada-events-v1';
/** Local event adapter. Connect a real analytics provider here later; no events are remotely visible now. */
export function track(name, properties = {}) {
  const event = { name, at: new Date().toISOString(), properties };
  try {
    const events = JSON.parse(localStorage.getItem(KEY) || '[]');
    events.push(event);
    localStorage.setItem(KEY, JSON.stringify(events.slice(-500)));
    window.dispatchEvent(new CustomEvent('prototype:event', { detail: event }));
    console.info('[validation event: local only]', event);
    // Future provider hook: send `event` only after choosing a provider and updating privacy disclosure.
  } catch (error) {
    console.warn('Local validation event could not be saved', error);
  }
}
export function readEvents() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } }
export function clearEvents() { localStorage.removeItem(KEY); }
