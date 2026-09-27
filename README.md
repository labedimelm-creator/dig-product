# طالب ورياضة — validation MVP

A lightweight, deterministic browser prototype and validation page. It has no external services, accounts, backend, payment processor, or remotely connected analytics. Plans are heuristic suggestions, not proof of academic or sports outcomes.

## Setup

Requires Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the URL printed by Vite. The server binds to `0.0.0.0` and permits the preview host.

## Build

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host. No backend or environment variables are required. Font loading uses Google Fonts with local system fallbacks.

## Configuration

Edit **`src/config.js`** only for the public validation offer:

- `WHATSAPP_NUMBER`: founder's public WhatsApp number in international digits only, e.g. `213...`; leave blank until the founder supplies and tests the correct number.
- `PRODUCT_NAME`: displayed product name.
- `PRICE_DZD`: proposed test price (currently 500).
- `PREORDER_STATUS`: early-validation disclosure.
- `DELIVERY_DEADLINE`: update this date before launching the payment test. Confirm that the founder can meet it; the UI displays it as a proposed deadline, not a guarantee.
- `REFUND_WORDING`: refund conditions shown before contact.

The WhatsApp button builds a `wa.me` URL from `WHATSAPP_NUMBER` and opens a prefilled message in a new tab. The visitor must manually press Send. With a blank number, the CTA clearly reports that contact is not configured and does not pretend to open the founder's chat.

Price and wording in the prototype are rendered from this config. Actual payment is intentionally unavailable; a WhatsApp message is not a purchase.

## Validation workflow

1. Conduct **20 interviews** with eligible university students who train at least twice weekly and have experienced an exam period while continuing to train. Record concrete past behavior, incidents, consequences, current solutions, and objections.
2. Analyze those interviews without changing the precommitted thresholds.
3. Contact **40 additional eligible prospects**, separate from the interviewees, with the locked offer and price.
4. Only run the 500 DZD refundable preorder test after the founder has verified a real payment and refund process, configured the correct WhatsApp contact, and confirmed the delivery deadline. Until then, use interviews and prototype/contact feedback only.
5. Apply the prior decision rules: CONTINUE at 5+ verified payments out of 40 and other required conditions; PIVOT at 2–4 or repeated pain with consistent rejection of the offer; KILL at 0–1 if the test was valid; PAUSE if the experiment was invalid.

## Event tracking

Events are defined through `track()` in **`src/tracking.js`**:

- `landing_view`
- `prototype_start`
- `prototype_complete`
- `plan_generated`
- `day_adjusted`
- `validation_cta_clicked`
- `whatsapp_clicked`

They are saved only in the current browser's local storage (`taleb-riyada-events-v1`) and printed in the developer console. **Prototype events are not remotely visible unless a real analytics provider is connected.** The provider integration point is commented in `src/tracking.js`; connect one only after deciding data handling and updating the privacy disclosure. Local events are not reliable unique visitors or verified purchases.

## Main files

- `src/main.js`: landing page, prototype screens, deterministic schedule and changed-day behavior.
- `src/config.js`: public contact and offer configuration.
- `src/tracking.js`: local-only event adapter.
- `styles.css`: responsive design.
- `index.html`: document shell and validation dialog.

## QA checklist

- [ ] Test at 320–390px and desktop widths; check no horizontal overflow.
- [ ] Landing: “جرّب الـPrototype” opens/scrolls to the demo; “شارك في الاختبار” opens the validation explanation.
- [ ] Configure a test WhatsApp number; the button opens the correct `wa.me` destination and prefills the message; confirm user must press Send.
- [ ] Leave WhatsApp number blank; verify the UI states that contact is not configured and does not claim a message was sent.
- [ ] Prototype welcome: next/back and fictional example work.
- [ ] Empty exams and incomplete subject/date/workload show a Darija error; invalid/past dates are rejected.
- [ ] Add/remove exams, trainings and commitments; verify no-trainings and no-commitments plans remain usable.
- [ ] Conflicting same-day fixed commitments and sessions show a clear error.
- [ ] Generated week includes study, fixed commitments, training, sleep and buffer where applicable.
- [ ] Test each “تبدّل نهاري” reason and confirm an explanation appears.
- [ ] Test keyboard navigation, date/time inputs, modal close and mobile scrolling.
- [ ] Confirm event names in local storage; no events are remotely visible.
- [ ] Confirm no payment is requested or accepted.
