# Luma-75-3D-keyboard

A considered keyboard product experience, with a pearl, graphite and iris identity, floating glass navigation, translucent controls, and interactive 3D exploration.

## Run

Requires Node.js 20.9 or later.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run typecheck` and `npm run build` to validate. The production build exports to `out/`.

## Design and implementation

- `app/globals.css`: Luma design tokens, responsive layouts, glass surfaces, and reduced-motion styles.
- `components/Navbar.tsx`, `Logo.tsx`, `Footer.tsx`: identity and navigation.
- `slices/Hero/Scene.tsx`: the preserved entrance, scroll rotation, floating keycaps, and column wave.
- `components/Keyboard.tsx`: keyboard geometry and the Luma case/knob materials.
- `slices/BentoBox`: features with translucent captions.
- `slices/SwitchPlayground`: four interactive switches and real sound samples.
- `slices/ColorChanger`: six palettes and an accessible finish dock.
- `components/PurchasePreview.tsx`: product detail sheet, opened from the hero.
- `reference/homepage.json`: local product copy. No CMS credentials required.

All page assets are local. No checkout or payment service is connected.

## Preserved versions and attribution

The previous Nimbus baseline is in `backups/nimbus-before-luma.zip`; the earlier Keyform implementation is in `backups/keyform-before-nimbus.zip`.

The original models, textures, audio and animation foundation come from Alex Trost's Nimbus Keyboards reference: https://github.com/a-trost/nimbus-keyboards. Luma's visual identity, interface and copy are the customized direction built on that foundation. The reference's published content snapshot is retained in `reference/prismic-content.json` for provenance.
