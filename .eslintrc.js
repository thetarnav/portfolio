module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:prettier/recommended',
		'@vue/typescript/recommended',
	],
	plugins: ['prettier'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/no-deprecated-slot-attribute': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-extra-semi': 'off',
		'no-undef': 'off',
		'no-empty': 'warn',
		'no-mixed-spaces-and-tabs': 'warn',
	},
}
