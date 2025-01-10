<script>
	import { onMount } from "svelte";
	import { talents } from './data.js';

	let circle = $state()

	let scroll = $state(0)
	let winw = $state(0)
	let winh = $state(0)

	let double = $derived(winw / 2)
	let prev_0 = $derived((scroll - 7 * winh + 3 * 250) / 814)
	let prev_1 = $derived((scroll - 7 * winh + 2 * 250) / 814)
	let prev_2 = $derived((scroll - 7 * winh + 1 * 250) / 814)

	let people = talents.map(t => {return {
		color: t.color,
		slug: t.slug,
		name: t.html_name,
		desc: t.role
	}})

	people.push([
		{ color: 'var(--red)', slug: "https://wa.me/51910880595?text=Hola!", name: 'Escríbenos', desc: 'Estamos para tí' },
		{ color: 'var(--red)', slug: "https://wa.me/51910880595?text=Hola!", name: 'Join Studio', desc: 'Agencia Creativa' },
		{ color: 'var(--red)', slug: "https://wa.me/51910880595?text=Hola!", name: 'Escríbenos', desc: 'Estamos para tí' },
		{ color: 'var(--red)', slug: "https://wa.me/51910880595?text=Hola!", name: 'Join Studio', desc: 'Agencia Creativa' },
		{ color: 'var(--red)', slug: "https://wa.me/51910880595?text=Hola!", name: 'Escríbenos', desc: 'Estamos para tí' },
		{ color: 'var(--red)', slug: "https://wa.me/51910880595?text=Hola!", name: 'Join Studio', desc: 'Agencia Creativa' },
	])

	function ayuda() {
		winh = Math.max(winh, window.innerHeight)
	}

	onMount(() => {
		winh = window.innerHeight
	})
</script>

<svelte:window bind:scrollY={scroll} bind:innerWidth={winw} on:resize={ayuda}/>

<section id="circle" class="rel circle" bind:this={circle}>
	<div class="sticky fcol p32">
		<div class:inactive={Math.abs(prev_0) > 0.15} class="person abs fc g32" style="--color: var(--red) ;transform: translate({double * (Math.cos(prev_0) - 1)}px, {-double*Math.sin(prev_0)}px) rotate({-prev_0}rad);">
			<div class="fcol">
				<h1>Bienvenido a</h1>
				<p>Join Studio</p>
			</div>
		</div>
		<div class:inactive={Math.abs(prev_1) > 0.15} class="person abs fc g32" style="--color: var(--ora) ;transform: translate({double * (Math.cos(prev_1) - 1)}px, {-double*Math.sin(prev_1)}px) rotate({-prev_1}rad);">
			<div class="fcol">
				<h1>Somos un <span class="c1">S</span>tudio</h1>
				<p>Lleno de talentos</p>
			</div>
		</div>
		<div class:inactive={Math.abs(prev_2) > 0.15} class="person abs fc g32" style="--color: var(--yel) ;transform: translate({double * (Math.cos(prev_2) - 1)}px, {-double*Math.sin(prev_2)}px) rotate({-prev_2}rad);">
			<div class="fcol">
				<h1>Haga <span class="c2">C</span>lick</h1>
				<p>Para aprender más</p>
			</div>
		</div>
		{#each people as person, idx}
		{@const val = (scroll - 7 * winh - idx * 250)/814 }
			<a href="/{person.slug}" class:inactive={Math.abs(val) > 0.15} class="person abs fc g32" style="--color: {person.color} ;transform: translate({double * (Math.cos(val) - 1)}px, {-double*Math.sin(val)}px) rotate({-val}rad);">
				<div class="fcol">
					<h1>{@html person.name}</h1>
					<p>{person.desc}</p>
				</div>
			</a>
		{/each}
		<div class="shadowtop"></div>
		<div class="shadowbottom"></div>
	</div>
</section>

<style>
	.circle {
		height: 380lvh;
	}
	.sticky {
		height: 100lvh;
		justify-content: center;
		position: sticky;
		top: 0;
		overflow: hidden;
	}
	.shadowtop {
		position: absolute;
		inset: 0 0 75% 0;
		background: linear-gradient(180deg, var(--bg), transparent);
	}
	.shadowbottom {
		position: absolute;
		inset: 75% 0 0 0;
		background: linear-gradient(0deg, var(--bg), transparent);
	}
	.person {
		font-weight: 400;
		transform-origin: left;
    will-change: transform;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
		text-decoration: none;
	}
	.person::before {
		content: '';
		flex-shrink: 0;
		border-radius: 50%;
		background: var(--color);
		width: 3.5vw;
		height: 3.5vw;
		opacity: 1;
		scale: 1;
		transition: 0.3s ease-in-out;
	}
	h1 {
		color: var(--text);
	}
	p {
		color: var(--text-low);
	}
	.person.inactive::before {
		opacity: 0;
		scale: 0;
	}
	.inactive h1, .inactive p, .inactive h1 :global(span) {
		color: var(--deco2);
	}
	h1 {
		font-size: 7vw;	
	}
	p {
		font-size: 5.5vw;
		width: 100%;
	}
</style>