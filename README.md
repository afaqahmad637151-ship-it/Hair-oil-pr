# Gen Z Care — Store
```
npm install
npm run dev
```
Edit **src/config.js** for price, delivery charge, WhatsApp number (country code, no "+"), payment text.
Hero/product image: `public/images/genz-product.jpeg` (your supplied photo, already placed).

## Not generated (no image/video tools here)
Place your own files at:
- `public/images/genz-hero.webp`, `genz-ingredients.webp`, `genz-campaign.webp`
- `public/videos/genz-main-ad.mp4` (15–20s), `public/videos/genz-product-showcase.mp4` (8–12s)
Until videos exist, the player shows a "Video file not added yet" notice.
Prompt tip: upload the bottle photo to a video tool (Veo/Runway/Kling) as reference; ask for "dark black-and-gold luxury product ad, slow push-in, floating herbal leaves, golden particles, keep label unchanged, no extra text."

## Checkout
Orders are handed to WhatsApp only. No payments or order storage are active. To go live, replace `order()` in App.jsx with a call to your backend/gateway (e.g. JazzCash, Easypaisa, Stripe).

## Needed from the client
Price, delivery charges/areas, WhatsApp number, payment methods, full ingredient list, usage instructions, return policy, brand story, contact/social links, real testimonials, and confirmation of the label claims (see note).
