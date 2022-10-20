<template>
    <h1
        class="font-black text-4xl leading-[3.5rem] my-32 w-[600px] mx-auto">
        <i></i>
        <span
            class="flex"
            id="a">
            广播云
        </span>
        <span
            class="flex"
            id="b">
            品牌低成本精准高效传播价值
        </span>
        <span
            class="flex"
            id="c">
            商家零成本增加收益
        </span>
    </h1>
</template>

<style lang="scss" scoped>
*,
:root {
  box-sizing: border-box;

  /* variables */
  --white: #fff;
  --red: #ea4335;
  --green: #34a853;
  --yellow: #fbbc05;
  --speed: 2s;
}


#a {
	color: var(--red);
	background-color: white;
	animation-name: css;
	animation-duration: calc(var(--speed) / 4);
	animation-delay: 0s;
}
#b {
	color: var(--yellow);
	background-color: #fff;
	animation-name: css;
	animation-duration: calc(var(--speed) / 2);
}
#c {
	color: var(--green);
	animation-name: css;
	animation-duration: calc(var(--speed) / 1.4);
}
i {
	display: flex;
	position: absolute;
	height: 4rem;
	width: 9rem;
	background-color: white;
	z-index: -100;
	transform: translate(10rem, 0rem);
	animation: cursor var(--speed) ease-out;
}

@keyframes cursor {
	0% {
		background-color: var(--red);
		transform: translate(10rem, 0rem);
		z-index: 2;
	}
	20% {
		background-color: var(--red);
		transform: translate(0rem, 0rem);
	}
	25% {
		background-color: var(--red);
		transform: translate(-9rem, 0rem);
	}
	30% {
		background-color: var(--yellow);
		transform: translate(-9rem, 5rem);
		width: 10rem;
	}
	40% {
		background-color: var(--yellow);
		transform: translate(0rem, 5rem);
		width: 20rem;
	}
	50% {
		background-color: var(--yellow);
		transform: translate(0rem, 5rem);
		width: 25rem;
	}
	60% {
		background-color: var(--green);
		transform: translate(0rem, 9.5rem);
		width: 27rem;
	}
	80% {
		transform: translate(-10rem, 9.5rem);
		background-color: var(--green);
	}
	89% {
		transform: translate(-20rem, 9.5rem);
		background-color: var(--green);
		z-index: 2;
	}
	91% {
		z-index: -100;
		background-color: var(--white);
	}
	100% {
		z-index: -100;
		background-color: var(--white);
	}
}
@keyframes css {
	0% {
		color: var(--white);
	}
	95% {
		color: var(--white);
	}
}

</style>