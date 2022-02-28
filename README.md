# Sozai

UI framework with vuetify-like material components built with Svelte

![scuffed logo](https://user-images.githubusercontent.com/50760816/156042159-65aa794f-38bc-4cbc-9848-59063e4eeca7.png)


## Usage

I made the library to be as easy to setup as possible. No preprocessors for css or js are required.

First, we install sozai with npm

```
npm i sozai
```

Then, we surround the main component with `<SozaiApp />`

```svelte
<!-- App.svelte -->
<script>
  import { SozaiApp } from 'sozai';
</script>

<SozaiApp>
  <!-- Put your app in here! -->
</SozaiApp>
```

And boom, we've set up a sozai app. No need to mess around with the bundler to correctly setup purgecss or postcss!

## Testimonies

!["sozai gud" - Kento Nishi](https://user-images.githubusercontent.com/50760816/156039788-95cc8261-bf76-42e2-bfd7-24aee908a3f8.png)

-- [@KentoNishi](https://github.com/KentoNishi) (named as one of the top 300 scholars in the 81st Regeneron Science Talent Search—the nation's oldest and most prestigious science and mathematics competition for high school seniors)


## Motivation

I mainly have worked on [LiveTL](https://github.com/LiveTL/LiveTL) which upon rewriting in svelte a year ago, has used a svelte material ui framework. Our journey took the following steps.

1. We find [svelte-material-ui](https://github.com/hperrin/svelte-material-ui) as the most popular material toolkit for svelte around the time v2 was in beta. I struggled to set it up and after a day of messing with bundler configs, gave up 😢
2. We find [svelte-materialify](https://github.com/TheComputerM/svelte-materialify) and start to use it as it initially required no setup. It is also, in our opinion, the best-looking svelte material toolkit. However to use the full library, we needed to setup css preprocessors which was annoying but doable.
3. A few months after we successfully rewrite LiveTL using svelte-materialify, we realize that svelte-materialify is buggy af and bugs out on conditional renders and randomly started flickering.
4. A few months later, we plan to integrate with another project which adds the requirement that the bundle size be small for LiveTL. Unfortunately, svelte-materialify does not tree-shake and produces massive bundles.
5. We swap out the svelte-materialify components with [smelte](https://github.com/matyunya/smelte) and immediately see a drop in bundle size. However, the build time has increased due to needing to use purgecss in order to not end up with megabytes long css files. Months later, one of the other three core LiveTL devs and I are fed up with tailwind (smelte forces you to add tailwind to your app). In addition, smelte seems to be unmaintained.
6. I say fck it, I'm making my own toolkit.

## Comparison

Everything has pros and cons, let's compare sozai to the other svelte material design frameworks.

|Framework | Pros | Cons | Verdict |
|----------|------|------|---------|
| [sozai](https://github.com/r2dev2/sozai) | <ul><li>Developed along with development of https://taskaru.app (will be open sourced soon) so it is tested in production</li> <li>Easy to setup</li> <li>I made it</li></ul> | <ul><li>Slider is buggy on safari ios</li> <li>Can only use material icon font</li> <li>I made it</li></ul> | Use this in small/nonimportant apps |
| [svelte-material-ui](https://github.com/hperrin/svelte-material-ui) | <ul><li>Actively maintained</li> <li>Sveltekit support</li> <li>Very stable</li> <li>Accessible</li> <li>Supports both mdicons and material icon font</li> <li>Uses the official material design css</li></ul> | <ul><li>IMO doesn't look the absolute best</li> <li>Ripple effect is not very nice</li> <li>May still be hard to setup (haven't tried recent v6 yet)</li> | Use this if you have a serious app. |
| [smelte](https://github.com/matyunya/smelte) | <ul><li>Works well</li> <li>First-class tailwind support</li></ul> | <ul><li>Looks the ugliest of svelte's material framework (although still looks decent)</li> <li>Unmaintained</li> <li>First-class tailwind support</li></ul> | Use this if you enjoy the pain that is tailwind but be prepared to write wrappers around smelte components. |
| [svelte-materialify](https://github.com/TheComputerM/svelte-materialify) | <ul><li>Components look very nice</li> <li>Looks a lot like vuetify</li></ul> | <ul><li>Buggy</li> <li>Unmaintained</li> <li>Doesn't tree-shake</li></ul> | Don't use at all. |
  
 ## Credits
  
 Sozai's ripple is based off of svelte-materialify's ripple (we changed it to activate on touch events and fixed some bugs with it). Sozai also makes extensive use of svelte-material-ui's event forwarding mechanism which forwards all events dom elements emit. Sozai was initially meant to be smelte without tailwind and due to this, sozai's button and dialog are more or less smelte's but de-tailwinded.
